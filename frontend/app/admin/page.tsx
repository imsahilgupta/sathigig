"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, type User } from "@/lib/api";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const currentUser = await apiRequest<User>("/api/auth/me");

        if (!active) {
          return;
        }

        if (currentUser.role !== "admin") {
          if (currentUser.role === "freelancer") {
            router.replace("/freelancer");
          } else if (currentUser.role === "employer") {
            router.replace("/employer");
          } else {
            router.replace("/dashboard");
          }
          return;
        }

        setUser(currentUser);
      } catch {
        if (active) {
          router.replace("/auth/login");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      active = false;
    };
  }, [router]);

  if (loading) {
    return <main className="p-8">Loading admin dashboard...</main>;
  }

  if (!user) {
    return <main className="p-8">Redirecting...</main>;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome, {user.full_name}.</p>
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Platform overview</h2>
        <p className="mt-3 text-gray-600">
          Review activity, manage users, and keep marketplace operations running smoothly.
        </p>
      </section>
    </main>
  );
}
