"use client";

import { useState, useEffect } from "react";
import {
  getMyAppointments,
  deleteAppointment,
  getProviderAppointments,
  updateAppointmentStatus,
} from "@/lib/api";

export function usePatientAppointments(userId) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    async function load() {
      try {
        const data = await getMyAppointments();
        setAppointments(data || []);
      } catch (err) {
        console.error("Failed to load appointments:", err);
      }
      setLoading(false);
    }
    load();
  }, [userId]);

  async function handleDeleteAppointment(id) {
    await deleteAppointment(id);
    setAppointments((prev) => prev.filter((a) => a._id !== id));
  }

  return { appointments, setAppointments, deleteAppointment: handleDeleteAppointment, loading };
}

export function useProviderAppointments(doctorId) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorId) {
      setLoading(false);
      return;
    }
    async function load() {
      try {
        const data = await getProviderAppointments();
        setAppointments(data || []);
      } catch (err) {
        console.error("Failed to load provider appointments:", err);
      }
      setLoading(false);
    }
    load();
  }, [doctorId]);

  async function handleUpdateStatus(id, status) {
    await updateAppointmentStatus(id, status);
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status } : a))
    );
  }

  return { appointments, updateStatus: handleUpdateStatus, loading };
}
