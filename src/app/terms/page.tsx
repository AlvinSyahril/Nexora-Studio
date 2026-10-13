import type { Metadata } from "next";
import LegalHubClient from "@/components/LegalHubClient";

export const metadata: Metadata = {
  title: "Terms of Service | Nexora Studio",
  description: "Read the clear, fair Terms of Service governing Nexora Studio applications and services.",
  openGraph: {
    title: "Terms of Service | Nexora Studio",
    description: "Clear and fair software usage terms for independent studio applications.",
    url: "https://nexorastudio.com/terms",
  },
};

export default function TermsAndConditionsPage() {
  return <LegalHubClient initialDoc="terms" />;
}

