"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getMe, getProfile, getInsuranceProviders, getDoctor, createAppointment } from "@/lib/api";
import FadeIn from "@/components/FadeIn";

const steps = ["Schedule", "Details", "Insurance", "Confirm"];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((s, i) => {
        const idx = i + 1;
        const isActive = idx === current;
        const isDone = idx < current;
        return (
          <div key={s} className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                isDone || isActive
                  ? "bg-primary text-white"
                  : "bg-tertiary text-on-surface-variant"
              }`}
            >
              {isDone ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                idx
              )}
            </motion.div>
            <span
              className={`text-sm font-medium hidden sm:inline ${
                isActive ? "text-on-surface" : "text-on-surface-variant"
              }`}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`hidden sm:block w-12 h-0.5 mx-2 ${
                  isDone ? "bg-primary" : "bg-outline-variant/30"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function AppointmentForm() {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [insuranceProviders, setInsuranceProviders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "", dob: "", reason: "", firstVisit: false,
    insuranceProvider: "", memberId: "", groupNumber: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctor");

  useEffect(() => {
    async function init() {
      try {
        const { user: me } = await getMe();
        if (!me) {
          router.push("/auth/login?redirect=/appointment" + (doctorId ? `?doctor=${doctorId}` : ""));
          return;
        }
        setUser(me);

        const profile = await getProfile(me._id);
        if (profile) {
          setForm((f) => ({ ...f, fullName: profile.full_name || "" }));
        }

        const insurance = await getInsuranceProviders();
        setInsuranceProviders(insurance || []);

        if (doctorId) {
          const doc = await getDoctor(doctorId);
          setDoctor(doc);
        }
      } catch (err) {
        router.push("/auth/login?redirect=/appointment");
        return;
      }
      setLoading(false);
    }
    init();
  }, []);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  async function handleBook() {
    if (!doctor || !user) return;
    setSubmitting(true);

    try {
      await createAppointment({
        doctor_id: doctor._id,
        appointment_date: new Date().toISOString().split("T")[0],
        appointment_time: "10:30:00",
        reason_for_visit: form.reason,
        is_first_visit: form.firstVisit,
        insurance_provider: form.insuranceProvider,
        insurance_member_id: form.memberId,
        insurance_group_number: form.groupNumber,
      });
      setConfirmed(true);
    } catch (err) {
      console.error("Booking failed:", err);
    }
    setSubmitting(false);
  }

  if (loading) return null;

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto px-4 py-20 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-on-surface mb-2">Booking Confirmed!</h1>
        <p className="text-on-surface-variant mb-8">
          Your appointment with {doctor?.name} has been scheduled.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard" className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors">
            View My Appointments
          </Link>
          <Link href="/" className="px-6 py-2.5 border border-outline-variant/30 text-on-surface font-medium rounded-lg hover:bg-tertiary transition-colors">
            Return Home
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FadeIn delay={0.1}>
        <StepIndicator current={step} />
      </FadeIn>

      <div className="bg-surface-card rounded-2xl p-8 border border-outline-variant/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold text-on-surface mb-2">Confirm Appointment Time</h2>
                <p className="text-on-surface-variant text-sm mb-6">Please review the selected slot.</p>

                {doctor && (
                  <div className="bg-tertiary rounded-xl p-4 flex items-center gap-4 mb-8">
                    {doctor.image_url ? (
                      <img src={doctor.image_url} alt={doctor.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className={`w-12 h-12 rounded-full ${doctor.image_color || "bg-indigo-100"} flex items-center justify-center text-lg font-bold shrink-0 ${doctor.image_color ? "text-white" : "text-indigo-700"}`}>
                        {doctor.image_initials || "DR"}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-on-surface">{doctor.name}</p>
                      <p className="text-sm text-on-surface-variant">{doctor.specialty} &bull; {doctor.experience_years} yrs exp.</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 border border-outline-variant/20 rounded-xl">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm text-on-surface-variant">Date</p>
                      <p className="font-medium text-on-surface">
                        {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 border border-outline-variant/20 rounded-xl">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-on-surface-variant">Time</p>
                      <p className="font-medium text-on-surface">10:30 AM &mdash; 11:00 AM (EST)</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link href="/doctors" className="text-primary text-sm font-medium hover:underline">Change Doctor</Link>
                  <button onClick={() => setStep(2)} className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center gap-2">
                    Confirm &amp; Continue
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold text-on-surface mb-2">Patient Details</h2>
                <p className="text-on-surface-variant text-sm mb-6">Help us prepare for your visit.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Full Name</label>
                    <input type="text" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Johnathan Doe"
                      className="w-full px-4 py-2.5 border border-outline-variant/30 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Date of Birth</label>
                    <input type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)}
                      className="w-full px-4 py-2.5 border border-outline-variant/30 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Reason for Visit</label>
                    <textarea value={form.reason} onChange={(e) => update("reason", e.target.value)} placeholder="Recurring chest tightness..." rows={3}
                      className="w-full px-4 py-2.5 border border-outline-variant/30 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none" />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.firstVisit} onChange={(e) => update("firstVisit", e.target.checked)}
                      className="w-4 h-4 rounded border-outline text-primary focus:ring-primary" />
                    <span className="text-sm text-on-surface-variant">This is my first time visiting this clinic</span>
                  </label>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <button onClick={() => setStep(1)} className="text-on-surface-variant text-sm font-medium hover:text-on-surface inline-flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Back
                  </button>
                  <button onClick={() => setStep(3)} className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center gap-2">
                    Insurance Info
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-bold text-on-surface mb-2">Insurance Information</h2>
                <p className="text-on-surface-variant text-sm mb-6">We&apos;ll verify your coverage before the appointment.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Insurance Provider</label>
                    <select value={form.insuranceProvider} onChange={(e) => update("insuranceProvider", e.target.value)}
                      className="w-full px-4 py-2.5 border border-outline-variant/30 rounded-lg text-sm text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select Provider</option>
                      {insuranceProviders.map((p) => (<option key={p.name}>{p.name}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Member ID</label>
                    <input type="text" value={form.memberId} onChange={(e) => update("memberId", e.target.value)} placeholder="ABC123456789"
                      className="w-full px-4 py-2.5 border border-outline-variant/30 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Group Number (Optional)</label>
                    <input type="text" value={form.groupNumber} onChange={(e) => update("groupNumber", e.target.value)} placeholder="GRP-001"
                      className="w-full px-4 py-2.5 border border-outline-variant/30 rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <button onClick={() => setStep(2)} className="text-on-surface-variant text-sm font-medium hover:text-on-surface inline-flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Back
                  </button>
                  <button onClick={() => setStep(4)} className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center gap-2">
                    Final Review
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-xl font-bold text-on-surface mb-2">Final Review</h2>
                <p className="text-on-surface-variant text-sm mb-6">Review your information before booking.</p>
                <div className="space-y-4 mb-8">
                  {[
                    { label: "Patient", value: form.fullName },
                    { label: "Doctor", value: doctor?.name || "Selected Doctor" },
                    { label: "Date & Time", value: `${new Date().toLocaleDateString()} at 10:30 AM` },
                    { label: "Insurance", value: form.insuranceProvider || "None" },
                    { label: "Reason", value: `"${form.reason || "Not specified"}"` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-3 border-b border-outline-variant/20">
                      <span className="text-sm text-on-surface-variant">{label}</span>
                      <span className="text-sm font-medium text-on-surface text-right max-w-xs truncate">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 mb-8">
                  <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-on-surface-variant">By clicking &quot;Book Now,&quot; you agree to our Terms of Service and Privacy Policy.</p>
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={() => setStep(3)} className="text-on-surface-variant text-sm font-medium hover:text-on-surface inline-flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Back
                  </button>
                  <button onClick={handleBook} disabled={submitting}
                    className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center gap-2 disabled:opacity-50">
                    {submitting ? "Booking..." : "Book Appointment"}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense fallback={null}>
      <AppointmentForm />
    </Suspense>
  );
}
