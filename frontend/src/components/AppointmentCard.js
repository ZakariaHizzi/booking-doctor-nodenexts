"use client";

import { motion } from "framer-motion";
import { TrashIcon } from "./Icons";

const statusStyles = {
  scheduled: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AppointmentCard({
  appointment,
  onDelete,
  index = 0,
  showPatient = false,
}) {
  const doctorData = appointment.doctor_id || {};
  const patientData = appointment.patient_id || {};

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      layout
      className="bg-surface-card rounded-xl p-6 shadow-sm border border-outline-variant/20 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full ${doctorData.image_color || "bg-blue-100"} flex items-center justify-center text-sm font-bold ${doctorData.image_color ? "text-white" : "text-blue-700"}`}
        >
          {doctorData.image_initials || "DR"}
        </div>
        <div>
          <p className="font-semibold text-on-surface">
            {showPatient
              ? patientData.full_name || "Patient"
              : doctorData.name || "Doctor"}
          </p>
          {showPatient ? (
            <p className="text-sm text-on-surface-variant">
              {patientData.email}
            </p>
          ) : (
            <p className="text-sm text-on-surface-variant">
              {doctorData.specialty}
            </p>
          )}
          <p className="text-xs text-on-surface-variant mt-1">
            {new Date(appointment.appointment_date).toLocaleDateString()} at{" "}
            {appointment.appointment_time?.slice(0, 5)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusStyles[appointment.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {appointment.status.charAt(0).toUpperCase() +
            appointment.status.slice(1)}
        </span>
        {appointment.status === "scheduled" && onDelete && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            title="Cancel appointment"
          >
            <TrashIcon />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
