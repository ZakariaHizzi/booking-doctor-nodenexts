"use client";

import { Suspense } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { signIn } from "@/lib/api";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="bg-surface-card rounded-xl p-8 shadow-sm border border-outline-variant/20 space-y-5"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg"
        >
          {error}
        </motion.div>
      )}

      <div>
        <label className="block text-sm font-medium text-on-surface mb-1.5">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/40 bg-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-on-surface"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-on-surface mb-1.5">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/40 bg-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-on-surface"
          placeholder="Enter your password"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign in"}
      </motion.button>

      <p className="text-center text-sm text-on-surface-variant">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="text-primary font-medium hover:underline"
        >
          Register
        </Link>
      </p>
    </motion.form>
  );
}

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface via-surface to-primary-light/20 px-4"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-primary">
            HealSync
          </Link>
          <h1 className="text-2xl font-bold text-on-surface mt-4">
            Welcome back
          </h1>
          <p className="text-on-surface-variant mt-1">
            Sign in to your account
          </p>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-8 text-on-surface-variant">
              Loading...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </motion.div>
  );
}
