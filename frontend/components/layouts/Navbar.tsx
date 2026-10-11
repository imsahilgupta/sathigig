
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import SiteLogo from "@/components/layouts/SiteLogo";
import { apiRequest, type User } from "@/lib/api";

const navLinks = [
  { label: "Find Work", href: "/freelancer" },
  { label: "Hire Talent", href: "/employer" },
  { label: "How It Works", href: "/#how-it-works" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function loadUser() {
      setLoadingUser(true);

      try {
        const currentUser = await apiRequest<User>("/api/auth/me");
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }

    const handleSessionChange = () => {
      void loadUser();
    };

    void loadUser();
    window.addEventListener("sathigig:user-change", handleSessionChange);

    return () => {
      window.removeEventListener("sathigig:user-change", handleSessionChange);
    };
  }, []);

  function isActive(href: string) {
    if (href === "/#how-it-works") {
      return false;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function getDashboardPath() {
    if (user?.role === "admin") return "/admin";
    if (user?.role === "employer") return "/employer";
    if (user?.role === "freelancer") return "/freelancer";
    return "/dashboard";
  }

  async function handleLogout() {
    try {
      await apiRequest<{ message: string }>("/api/auth/logout", {
        method: "POST",
      });
    } catch {
      // Ignore logout errors and continue to clear the session locally.
    }

    setUser(null);
    setLoadingUser(false);
    setMenuOpen(false);
    setShowUserMenu(false);
    window.dispatchEvent(new Event('sathigig:user-change'));
    router.replace('/auth/login');
    router.refresh();
  }

  const dashboardPath = getDashboardPath();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          aria-label="SathiGig homepage"
          onClick={() => setMenuOpen(false)}
          className="flex items-center"
        >
          <SiteLogo compact className="!gap-0" href={null} />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-[#d93a3a] ${
                isActive(link.href) ? "text-[#d93a3a]" : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {!loadingUser && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-base text-violet-700">
                  👤
                </span>
                <span>{user.full_name.split(" ")[0]}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                  <Link
                    href={dashboardPath}
                    onClick={() => setShowUserMenu(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Log in
              </Link>

              <Link href="/auth/register">
                <Button size="md">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-3 text-sm font-medium ${
                  isActive(link.href)
                    ? "bg-[#fef2f2] text-[#d93a3a]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 border-t border-slate-100 pt-4">
              {!loadingUser && user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                      👤
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {user.full_name.split(" ")[0]}
                    </span>
                  </div>

                  <Link
                    href={dashboardPath}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>

                  <Link href="/auth/register" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
