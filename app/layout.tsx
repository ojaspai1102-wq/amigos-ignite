import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareerMitra | Student Career Guidance",
  description:
    "A simple multilingual career guidance platform for rural students with personalized pathways, scholarships, entrance exams, and learning roadmaps.",
  openGraph: {
    title: "CareerMitra | Student Career Guidance",
    description:
      "Personalized career pathways, eligibility guidance, scholarships, entrance exams, and roadmaps for rural students.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerMitra | Student Career Guidance",
    description:
      "Discover suitable careers, scholarships, courses, entrance exams, and next steps in one simple guidance flow.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
