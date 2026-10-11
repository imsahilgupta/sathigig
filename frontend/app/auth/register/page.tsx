
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiRequest, type User } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"freelancer" | "employer">(
    "freelancer",
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await apiRequest<User>("/api/auth/register", {
        method: "POST",
        body: {
          full_name: fullName,
          email,
          password,
          role,
        },
      });

      // Registration creates the account but does not log the user in.
      // Send them to login to establish a session.
      router.push(
        `/auth/login?registered=1&email=${encodeURIComponent(user.email)}`,
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Registration failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold">Join SathiGig</h1>
      <p className="mt-2 text-gray-600">
        Create your account to get started.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="fullName" className="mb-1 block">
            Full name
          </label>
          <input
            id="fullName"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={128}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="At least 8 characters"
          />
        </div>

        <div>
          <label htmlFor="role" className="mb-1 block">
            I want to
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) =>
              setRole(e.target.value as "freelancer" | "employer")
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="freelancer">Work as a freelancer</option>
            <option value="employer">Hire freelancers</option>
          </select>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-violet-700 p-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-sm">
        Already registered?{" "}
        <Link className="font-semibold underline" href="/auth/login">
          Log in
        </Link>
      </p>
    </main>
  );
}
