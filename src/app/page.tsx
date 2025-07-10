"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else if (status === "unauthenticated") {
      router.push("/signin-required");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return null;
} 