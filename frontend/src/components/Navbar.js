"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getMe, signOut } from "@/lib/api";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function load() {
      try {
        const { user: me } = await getMe();
        setUser(me);
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    }
    load();
  }, [pathname]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    setUser(null);
    router.push("/");
  }, []);

  const isActive = (path) =>
    pathname === path ? "text-primary font-semibold" : "text-on-surface-variant";

  return (
    <nav className="bg-white border-b border-outline-variant/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-semibold text-on-surface">
              HealSync
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium hover:text-primary transition-colors ${isActive("/")}`}
            >
              Home
            </Link>
            <Link
              href="/doctors"
              className={`text-sm font-medium hover:text-primary transition-colors ${isActive("/doctors")}`}
            >
              Find a Doctor
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium hover:text-primary transition-colors ${isActive("/dashboard")}`}
              >
                My Dashboard
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {loading ? null : user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="text-sm text-on-surface-variant hover:text-primary"
                >
                  {user.full_name || user.email}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary-light/30 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary-light/30 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:text-on-surface"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-outline-variant/30 pt-4">
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-sm font-medium text-on-surface-variant hover:text-primary">Home</Link>
              <Link href="/doctors" className="text-sm font-medium text-on-surface-variant hover:text-primary">Find a Doctor</Link>
              {user && (
                <Link href="/dashboard" className="text-sm font-medium text-on-surface-variant hover:text-primary">My Dashboard</Link>
              )}
              <div className="flex gap-3 pt-2">
                {user ? (
                  <button onClick={handleSignOut} className="flex-1 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg">
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link href="/auth/login" className="flex-1 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg text-center">
                      Sign In
                    </Link>
                    <Link href="/auth/register" className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg text-center">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
