import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexora Studio - Developer Showcase",
  description: "Official App Studio and Developer Portfolio",
};

import FloatingSupport from "@/components/FloatingSupport";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${unbounded.variable}`}
    >
      <body className="main-content">
        {children}
        <FloatingSupport />
      </body>
    </html>
  );
}
