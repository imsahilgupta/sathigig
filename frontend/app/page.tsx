import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

const benefits = [
  {
    number: "01",
    title: "Find the right talent",
    description:
      "Discover freelancers with the skills you need to bring your projects to life.",
  },
  {
    number: "02",
    title: "Bid with confidence",
    description:
      "Freelancers submit proposals, and employers choose the best fit for their budget.",
  },
  {
    number: "03",
    title: "Complete projects",
    description:
      "Track progress, submit deliverables, and manage project milestones in one place.",
  },
];

const features = [
  {
    title: "For Freelancers",
    description:
      "Showcase your skills, find exciting projects, submit bids, and build your career.",
    href: "/auth/register",
    action: "Start Freelancing",
  },
  {
    title: "For Employers",
    description:
      "Post projects, compare proposals, hire talent, and manage your work efficiently.",
    href: "/auth/register",
    action: "Hire Talent",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
              Your skills. Your opportunities.
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Great work starts with{" "}
              <span className="text-purple-400">the right connection.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
              Find skilled freelancers, discover exciting projects, and turn
              great ideas into reality with SathiGig.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/auth/register">
                <Button size="lg">Get Started</Button>
              </Link>

              <Link href="/auth/login">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/5">
                  Log In
                </Button>
              </Link>
            </div>

            <p className="mt-5 text-sm text-gray-400">
              A place for freelancers and employers to grow together.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <Image
              src="/Hero.png"
              alt="Freelancers and employers collaborating on SathiGig"
              width={1536}
              height={1024}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-purple-600">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
              From opportunity to completed work
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              A simple process that helps both sides work together.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.number}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 font-bold text-purple-700">
                  {benefit.number}
                </span>

                <h3 className="mt-5 text-xl font-bold text-gray-950">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* User types */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-purple-600">
              Built for both sides
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
              What would you like to do?
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-8"
              >
                <h3 className="text-2xl font-bold text-gray-950">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>

                <Link
                  href={feature.href}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-purple-700 hover:text-purple-900"
                >
                  {feature.action}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-purple-700 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold">
              Ready to get started?
            </h2>
            <p className="mt-3 max-w-xl text-purple-100">
              Create your SathiGig account and take the next step toward your
              goals.
            </p>
          </div>

          <Link href="/auth/register">
            <Button variant="secondary" size="lg" className="bg-white text-[#0f2a6d] hover:bg-slate-100">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
