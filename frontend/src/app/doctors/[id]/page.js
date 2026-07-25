"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getDoctor } from "@/lib/api";
import FadeIn from "@/components/FadeIn";
import { StarIcon } from "@/components/Icons";

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    async function load() {
      try {
        const data = await getDoctor(params.id);
        setDoctor(data);
      } catch (err) {
        console.error("Failed to load doctor:", err);
      }
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) return null;

  if (!doctor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-on-surface">Doctor not found</h1>
        <Link href="/doctors" className="mt-4 inline-block text-primary hover:underline">
          &larr; Back to Find a Doctor
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 text-sm text-on-surface-variant mb-8"
      >
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/doctors" className="hover:text-primary">Doctors</Link>
        <span>/</span>
        <span className="text-on-surface">{doctor.name}</span>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-surface-card rounded-2xl p-8 border border-outline-variant/20"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              {doctor.image_url ? (
                <motion.img
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={doctor.image_url}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full object-cover shrink-0"
                />
              ) : (
                <div
                  className={`w-20 h-20 rounded-full ${doctor.image_color || "bg-blue-100"} flex items-center justify-center text-2xl font-bold shrink-0 ${doctor.image_color ? "text-white" : "text-blue-700"}`}
                >
                  {doctor.image_initials || "DR"}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-primary-light/50 text-primary-dark text-xs font-medium rounded">
                    Verified
                  </span>
                  {doctor.rating >= 4.8 && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                      Top Rated
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-on-surface">
                  {doctor.name}
                </h1>
                <p className="text-on-surface-variant">{doctor.title}</p>
                <div className="flex items-center gap-1 mt-2">
                  <StarIcon />
                  <span className="font-medium text-on-surface">
                    {doctor.rating}
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    ({doctor.reviews_count} reviews)
                  </span>
                </div>
              </div>
            </div>

            <FadeIn delay={0.2}>
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-on-surface mb-3">About</h2>
                <p className="text-on-surface-variant leading-relaxed">{doctor.bio}</p>
              </div>
            </FadeIn>

            {doctor.education?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-6"
              >
                <h2 className="text-lg font-semibold text-on-surface mb-3">Education & Training</h2>
                <ul className="space-y-2">
                  {doctor.education.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {doctor.certifications?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-6"
              >
                <h2 className="text-lg font-semibold text-on-surface mb-3">Certifications</h2>
                <ul className="space-y-2">
                  {doctor.certifications.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {doctor.languages?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-6"
              >
                <h2 className="text-lg font-semibold text-on-surface mb-3">Languages</h2>
                <div className="flex gap-2">
                  {doctor.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 bg-tertiary text-on-surface-variant text-sm rounded-lg">
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-80 shrink-0"
          >
            <div className="bg-tertiary rounded-xl p-6 border border-outline-variant/20">
              <div className="mb-4">
                <p className="text-sm text-on-surface-variant">Experience</p>
                <p className="text-xl font-bold text-on-surface">{doctor.experience_years} Years</p>
              </div>
              <div className="mb-6">
                <p className="text-sm text-on-surface-variant">Next Available</p>
                <p className="text-xl font-bold text-on-surface">{doctor.next_available}</p>
              </div>
              <Link
                href={`/appointment?doctor=${doctor._id}`}
                className="block w-full text-center px-5 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors mb-4"
              >
                Book Appointment
              </Link>
            </div>

            {doctor.accepted_insurance?.length > 0 && (
              <div className="mt-4 bg-surface-card rounded-xl p-6 border border-outline-variant/20">
                <h3 className="font-semibold text-on-surface mb-3">Accepted Insurance</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.accepted_insurance.map((ins) => (
                    <span key={ins} className="px-3 py-1 bg-tertiary text-on-surface-variant text-sm rounded-lg">
                      {ins}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
