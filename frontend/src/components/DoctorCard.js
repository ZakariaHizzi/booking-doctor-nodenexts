"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StarIcon } from "./Icons";

export default function DoctorCard({ doctor, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/doctors/${doctor._id}`}
        className="block bg-surface rounded-xl p-6 border border-outline-variant/20 hover:shadow-md transition-shadow h-full"
      >
        {doctor.rating >= 4.8 && (
          <div className="flex gap-2 mb-4">
            <span className="px-2 py-1 bg-primary-light/50 text-primary-dark text-xs font-medium rounded">
              Top Rated
            </span>
          </div>
        )}
        <div className="flex items-start gap-4">
          {doctor.image_url ? (
            <img
              src={doctor.image_url}
              alt={doctor.name}
              className="w-14 h-14 rounded-full object-cover shrink-0"
            />
          ) : (
            <div
              className={`w-14 h-14 rounded-full ${doctor.image_color || "bg-blue-100"} flex items-center justify-center text-lg font-bold shrink-0 ${doctor.image_color ? "text-white" : "text-blue-700"}`}
            >
              {doctor.image_initials || "DR"}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs text-on-surface-variant mb-1">
              {doctor.specialty} &bull; {doctor.experience_years} Yrs
            </p>
            <h3 className="font-semibold text-on-surface truncate">
              {doctor.name}
            </h3>
            <p className="text-sm text-on-surface-variant mt-1">
              {doctor.location}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <StarIcon />
              <span className="text-sm font-medium text-on-surface">
                {doctor.rating}
              </span>
              <span className="text-xs text-on-surface-variant">
                ({doctor.reviews_count} reviews)
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2 mb-4">
            {doctor.bio}
          </p>
          <span className="inline-block w-full text-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
            Book Visit
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
