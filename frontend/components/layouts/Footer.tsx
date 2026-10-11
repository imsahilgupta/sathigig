
import Link from "next/link";
import SiteLogo from "@/components/layouts/SiteLogo";

const footerGroups = [
  {
    title: "For Freelancers",
    links: [
      { label: "Find Work", href: "/freelancer" },
      { label: "Create Account", href: "/auth/register" },
    ],
  },
  {
    title: "For Employers",
    links: [
      { label: "Hire Talent", href: "/employer" },
      { label: "Post a Project", href: "/auth/login" },
    ],
  },
  {
    title: "SathiGig",
    links: [
      { label: "Home", href: "/" },
      { label: "Log In", href: "/auth/login" },
      { label: "Sign Up", href: "/auth/register" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <SiteLogo className="!items-center" href={null} />

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
              Connect talented people with meaningful opportunities and build
              stronger collaborations across Nepal.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-900">
                {group.title}
              </h2>

              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-violet-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SathiGig. All rights reserved.</p>
          <p>Connect • Collaborate • Earn</p>
        </div>
      </div>
    </footer>
  );
}
