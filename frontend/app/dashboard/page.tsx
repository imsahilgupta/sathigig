
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, type User, type UserRole } from "@/lib/api";

const roleLabels: Record<UserRole, string> = {
  freelancer: "Freelancer",
  employer: "Employer",
  admin: "Admin",
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const currentUser = await apiRequest<User>("/api/auth/me");

        if (cancelled) {
          return;
        }

        setUser(currentUser);
        setLoading(false);

        if (currentUser.role === "freelancer") {
          router.replace("/freelancer");
        } else if (currentUser.role === "employer") {
          router.replace("/employer");
        } else if (currentUser.role === "admin") {
          router.replace("/admin");
        } else {
          setError("Your account has an unrecognized role.");
        }
      } catch {
        if (!cancelled) {
          setLoading(false);
          setError("Please log in to access your dashboard.");
          router.replace("/auth/login");
        }
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (loading) {
    return <main className="p-8">Checking your session...</main>;
  }

  if (!user) {
    return <main className="p-8">Redirecting to login...</main>;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div>
        <h1 className="text-3xl font-bold">SathiGig Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome, {user.full_name}!</p>
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Your account</h2>
        <p className="mt-3">Email: {user.email}</p>
        <p className="mt-2">Account type: {roleLabels[user.role]}</p>

        <p className="mt-4 text-sm text-gray-600">
          {user.role === "freelancer" &&
            "Your workspace will help you find jobs, submit proposals, and manage projects."}
          {user.role === "employer" &&
            "Your workspace will help you post jobs, review bids, and manage freelancers."}
          {user.role === "admin" &&
            "Your workspace will help you manage users, roles, and platform activity."}
        </p>
      </section>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}
    </main>
  );
}
