"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getDoctors } from "@/lib/api";
import DoctorCard from "@/components/DoctorCard";
import FadeIn from "@/components/FadeIn";
import {
  SearchIcon,
  CalendarIcon,
  QuoteIcon,
  ChevronRightIcon,
} from "@/components/Icons";

const steps = [
  {
    icon: <SearchIcon />,
    step: "1",
    title: "Find Your Expert",
    desc: "Search through our curated network of board-certified specialists by name, location, or medical need.",
  },
  {
    icon: <CalendarIcon />,
    step: "2",
    title: "Instant Booking",
    desc: "View real-time availability and secure your appointment instantly, whether in-person or via secure video.",
  },
  {
    icon: <ChevronRightIcon />,
    step: "3",
    title: "Receive Personalized Care",
    desc: "Receive personalized care and access your digital treatment plan and records through our secure dashboard.",
  },
];

const testimonials = [
  {
    quote:
      "The ease of finding a specialist who actually understood my rare condition was life-changing. HealSync made the whole process stress-free.",
    name: "David Richardson",
    since: "2023",
  },
  {
    quote:
      "Booking appointments used to take hours of phone calls. Now I can do it in seconds on my lunch break. The quality of doctors is exceptional.",
    name: "Elena Vasquez",
    since: "2022",
  },
];

export default function Home() {
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const doctors = await getDoctors();
        setFeaturedDoctors(doctors.slice(0, 3));
        setDataLoaded(true);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError(err.message);
        setDataLoaded(true);
      }
    }
    load();
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-surface via-surface to-primary-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface leading-tight">
              Modern Healthcare
              <span className="block text-primary">Designed for You.</span>
            </h1>
            <p className="mt-6 text-lg text-on-surface-variant leading-relaxed">
              Experience the next generation of patient care. Find world-class
              specialists, manage your health records, and schedule appointments
              in seconds.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/doctors"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                <SearchIcon />
                Find Care
              </Link>
              <Link
                href="/doctors"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-primary border border-primary font-medium rounded-lg hover:bg-primary-light/30 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Find Nearby
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 hidden lg:block">
          <div className="w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      <FadeIn delay={0.2}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-surface-card rounded-xl p-6 shadow-sm border border-outline-variant/20 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-light/50 flex items-center justify-center text-primary shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-on-surface">2.5k+</p>
                <p className="text-sm text-on-surface-variant">
                  Top specialists ready to help
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-surface-card rounded-xl p-6 shadow-sm border border-outline-variant/20 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary-light/30 flex items-center justify-center text-secondary shrink-0">
                <CalendarIcon />
              </div>
              <div>
                <p className="text-2xl font-bold text-on-surface">
                  Next Available
                </p>
                <p className="text-sm text-on-surface-variant">
                  Today at 2:30 PM
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </FadeIn>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-on-surface">
            The HealSync Process
          </h2>
          <p className="mt-4 text-on-surface-variant max-w-xl mx-auto">
            Quality Care in Three Steps
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-surface-card rounded-xl p-8 shadow-sm border border-outline-variant/20 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-light/50 flex items-center justify-center text-primary mx-auto mb-4">
                {item.icon || (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                )}
              </div>
              <div className="w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">
                {item.title}
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-surface-card py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-bold text-on-surface">
                Featured Specialists
              </h2>
              <p className="mt-2 text-on-surface-variant">
                Highly rated doctors accepting new patients this week.
              </p>
            </div>
            <Link
              href="/doctors"
              className="hidden md:inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              View All Doctors
              <ChevronRightIcon />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-500 mb-2">Failed to load specialists</p>
                <p className="text-sm text-on-surface-variant">{error}</p>
              </div>
            ) : dataLoaded ? (
              featuredDoctors.map((doc, i) => (
                <DoctorCard key={doc._id} doctor={doc} index={i} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-on-surface-variant">
                Loading specialists...
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white/80 mb-1">
                Your Health Progress
              </h3>
              <p className="text-white/60 text-sm">
                Track your current treatment journey
              </p>
            </div>
            <span className="text-3xl font-bold">75%</span>
          </div>
          <div className="mt-4 w-full bg-white/20 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "75%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-white h-3 rounded-full"
            />
          </div>
          <p className="mt-4 text-white/80 text-sm italic">
            &ldquo;Excellent progress! Keep following the exercise
            regimen.&rdquo;
          </p>
        </motion.div>
      </section>

      <section className="bg-surface-card py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-on-surface text-center mb-12"
          >
            What Our Patients Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-surface rounded-xl p-8 border border-outline-variant/20"
              >
                <QuoteIcon />
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-on-surface-variant/20 flex items-center justify-center text-sm font-bold text-on-surface">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium text-on-surface text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Patient since {t.since}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-on-surface rounded-2xl p-8 md:p-16 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Better Healthcare?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Join thousands of patients who have found their perfect healthcare
            matches through HealSync.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/doctors"
              className="px-8 py-3 bg-white text-on-surface font-medium rounded-lg hover:bg-white/90 transition-colors"
            >
              Get Started Today
            </Link>
            <button className="px-8 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              Download App
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
