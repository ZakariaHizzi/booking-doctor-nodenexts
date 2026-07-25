"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { usePatientAppointments } from "@/hooks/useAppointments";
import StatsCard from "@/components/StatsCard";
import AppointmentCard from "@/components/AppointmentCard";
import FadeIn from "@/components/FadeIn";

export default function DashboardPage() {
  const { user, profile, loading: userLoading } = useUser({ redirectTo: "/auth/login" });
  const { appointments, deleteAppointment } = usePatientAppointments(user?._id);

  if (userLoading) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <FadeIn delay={0.1}>
        <h1 className="text-3xl font-bold text-on-surface mb-2">
          Welcome, {profile?.full_name || "Patient"}
        </h1>
        <p className="text-on-surface-variant mb-8">
          Manage your appointments and health journey
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatsCard value={appointments.length} label="Total Appointments" delay={0.15} />
        <StatsCard value={appointments.filter((a) => a.status === "scheduled").length} label="Upcoming" color="text-green-600" delay={0.2} />
        <StatsCard value={appointments.filter((a) => a.status === "completed").length} label="Completed" delay={0.25} />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-on-surface">
          My Appointments
        </h2>
        <Link
          href="/doctors"
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
        >
          Book New Appointment
        </Link>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-surface-card rounded-xl p-12 shadow-sm border border-outline-variant/20 text-center">
          <p className="text-on-surface-variant mb-4">
            No appointments yet
          </p>
          <Link
            href="/doctors"
            className="inline-block px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Find a Doctor
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt, i) => (
            <AppointmentCard
              key={apt._id}
              appointment={apt}
              index={i}
              onDelete={() => deleteAppointment(apt._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
