import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import FloatingSupport from "@/components/FloatingSupport";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Nexora Studio - Developer Showcase",
  description: "Official App Studio and Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable}`}
    >
      <body className="main-content">
        {children}
        <FloatingSupport />
        <Analytics />
      </body>
    </html>
  );
}
