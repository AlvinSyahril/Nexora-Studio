import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Anton } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexorastudio.com"),
  title: "Nexora Studio - Independent Software Tools",
  description: "Independent software studio building local-first desktop tools and private mobile applications without telemetry.",
  openGraph: {
    title: "Nexora Studio - Independent Software Tools",
    description: "Independent software studio building local-first desktop tools and private mobile applications without telemetry.",
    url: "https://nexorastudio.com",
    siteName: "Nexora Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora Studio - Independent Software Tools",
    description: "Independent software studio building local-first desktop tools and private mobile applications without telemetry.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${anton.variable} scroll-smooth`}
    >
      <body>
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
