"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe, getProfile, signOut } from "@/lib/api";

export function useUser({ redirectTo } = {}) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const { user: me } = await getMe();
        setUser(me);

        if (!me) {
          if (redirectTo) router.push(redirectTo);
          setLoading(false);
          return;
        }

        const profileData = await getProfile(me._id);
        setProfile(profileData);
      } catch (err) {
        if (redirectTo) router.push(redirectTo);
      }
      setLoading(false);
    }
    load();
  }, []);

  return { user, profile, loading };
}
