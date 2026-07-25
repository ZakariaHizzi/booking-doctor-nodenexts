"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDoctors, getSpecialties } from "@/lib/api";
import FadeIn from "@/components/FadeIn";
import { StarIcon } from "@/components/Icons";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState();
  const [specialties, setSpecialties] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState("Anytime");

  useEffect(() => {
    async function load() {
      try {
        const docs = await getDoctors();
        setDoctors(docs || []);

        const specs = await getSpecialties();
        setSpecialties(specs?.map((s) => s.name) || []);
      } catch (err) {
        console.error("Failed to load doctors:", err);
        setError(err.message);
      }
      setDataLoaded(true);
    }
    load();
  }, []);

  const toggleSpecialty = (s) => {
    setSelectedSpecialties((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  const filtered = selectedSpecialties.length
    ? doctors.filter((d) => selectedSpecialties.includes(d.specialty))
    : doctors;

  if (!dataLoaded) return null;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-on-surface mb-2">
          Failed to load doctors
        </h1>
        <p className="text-on-surface-variant">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full lg:w-72 shrink-0"
        >
          <div className="bg-surface-card rounded-xl p-6 border border-outline-variant/20 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-on-surface">Filters</h2>
              <button
                onClick={() => {
                  setSelectedSpecialties([]);
                  setSelectedAvailability("Anytime");
                }}
                className="text-sm text-primary hover:underline"
              >
                Clear all
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-on-surface mb-3 uppercase tracking-wider">
                Specialty
              </h3>
              <div className="space-y-2">
                {specialties.map((s) => (
                  <label
                    key={s}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSpecialties.includes(s)}
                      onChange={() => toggleSpecialty(s)}
                      className="w-4 h-4 rounded border-outline text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                      {s}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-on-surface mb-3 uppercase tracking-wider">
                Availability
              </h3>
              <div className="space-y-2">
                {["Today", "Next 3 days", "Anytime"].map((a) => (
                  <label
                    key={a}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="availability"
                      checked={selectedAvailability === a}
                      onChange={() => setSelectedAvailability(a)}
                      className="w-4 h-4 border-outline text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                      {a}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>

        <div className="flex-1 min-w-0">
          <FadeIn delay={0.1}>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-on-surface">
                Top-rated Specialists
              </h1>
              <p className="text-sm text-on-surface-variant mt-1">
                Showing {filtered.length} result
                {filtered.length !== 1 ? "s" : ""} in your area
              </p>
            </div>
          </FadeIn>

          <AnimatePresence mode="popLayout">
            <div className="space-y-4">
              {filtered.map((doc, i) => (
                <motion.div
                  key={doc._id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    href={`/doctors/${doc._id}`}
                    className="block bg-surface-card rounded-xl p-6 border border-outline-variant/20 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {doc.image_url ? (
                        <img
                          src={doc.image_url}
                          alt={doc.name}
                          className="w-16 h-16 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div
                          className={`w-16 h-16 rounded-full ${doc.image_color || "bg-blue-100"} flex items-center justify-center text-xl font-bold shrink-0 ${doc.image_color ? "text-white" : "text-blue-700"}`}
                        >
                          {doc.image_initials || "DR"}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 bg-primary-light/50 text-primary-dark text-xs font-medium rounded">
                                {doc.specialty}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-on-surface">
                              {doc.name}
                            </h3>
                            <p className="text-sm text-on-surface-variant">
                              {doc.title}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <StarIcon />
                              <span className="font-medium text-sm text-on-surface">
                                {doc.rating}
                              </span>
                              <span className="text-xs text-on-surface-variant">
                                ({doc.reviews_count} reviews)
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm text-on-surface-variant">
                              <span className="font-medium text-on-surface">
                                Experience
                              </span>
                              <br />
                              {doc.experience_years} Years
                            </p>
                            <p className="text-sm text-on-surface-variant mt-2">
                              <span className="font-medium text-on-surface">
                                Next Availability
                              </span>
                              <br />
                              {doc.next_available}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-outline-variant/20">
                          <div className="flex gap-2">
                            {(doc.accepted_insurance || [])
                              .slice(0, 3)
                              .map((ins) => (
                                <span
                                  key={ins}
                                  className="px-2 py-1 bg-tertiary text-on-surface-variant text-xs rounded"
                                >
                                  {ins}
                                </span>
                              ))}
                            {doc.accepted_insurance?.length > 3 && (
                              <span className="px-2 py-1 text-xs text-on-surface-variant">
                                +{doc.accepted_insurance.length - 3} more
                              </span>
                            )}
                          </div>
                          <span className="px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                            Book Now
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
