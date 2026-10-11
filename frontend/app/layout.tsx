import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "SathiGig | Connect • Collaborate • Earn",
    template: "%s | SathiGig",
  },
  description:
    "SathiGig connects freelancers and employers in Nepal to find work, hire talent, and grow together on meaningful projects.",
  applicationName: "SathiGig",
  keywords: [
    "SathiGig",
    "freelancers Nepal",
    "hire talent Nepal",
    "work marketplace Nepal",
  ],
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
  openGraph: {
    title: "SathiGig | Connect • Collaborate • Earn",
    description:
      "A modern platform for freelancers and employers to connect, collaborate, and grow together.",
    images: [{ url: "/Logo.png", width: 1200, height: 1200, alt: "SathiGig logo" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-slate-900">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
