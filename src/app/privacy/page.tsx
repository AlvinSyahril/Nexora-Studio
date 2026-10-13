import type { Metadata } from "next";
import LegalHubClient from "@/components/LegalHubClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Nexora Studio",
  description: "Learn how Nexora Studio protects your privacy with local-first software and zero remote telemetry.",
  openGraph: {
    title: "Privacy Policy | Nexora Studio",
    description: "Local-first data sovereignty and zero telemetry standards.",
    url: "https://nexorastudio.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return <LegalHubClient initialDoc="privacy" />;
}

