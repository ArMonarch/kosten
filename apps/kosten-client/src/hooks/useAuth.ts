"use client";

import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useAuth(redirect = "/auth/login") {
  const router = useRouter();
  const [hydrated, setHydrated] = useState<boolean>(false);
  const { user, logout } = useUserStore();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !user) {
      router.replace(redirect);
    }
  }, [user, hydrated]);

  return { user, logout };
}

export { useAuth };
