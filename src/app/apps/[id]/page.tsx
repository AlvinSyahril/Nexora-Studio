import { APPS_DATA } from "@/data/apps";
import { notFound } from "next/navigation";
import AppDetailsClient from "@/components/AppDetailsClient";
import type { Metadata } from "next";
import ErrorBoundary from "@/components/ErrorBoundary";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const app = APPS_DATA.find((a) => a.id === resolvedParams.id);
  
  if (!app) {
    return {
      title: "App Not Found | Nexora Studio",
      description: "The requested app is not available."
    };
  }
  
  return {
    title: `${app.name} - ${app.tagline} | Nexora Studio`,
    description: app.description,
    openGraph: {
      title: `${app.name} - ${app.tagline}`,
      description: app.description,
      type: "website",
      url: `https://nexorastudio.com/apps/${app.id}`,
      images: [
        {
          url: app.iconUrl,
          alt: `${app.name} app icon`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${app.name} - ${app.tagline}`,
      description: app.description,
      images: [app.iconUrl]
    }
  };
}

export function generateStaticParams() {
  return APPS_DATA.map((app) => ({
    id: app.id,
  }));
}

export default async function AppDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const app = APPS_DATA.find((a) => a.id === resolvedParams.id);

  if (!app) {
    notFound();
  }

  return (
    <ErrorBoundary
      fallback={
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2 style={{ color: "#dc2626", marginBottom: "1rem" }}>
            Failed to load app details
          </h2>
          <p style={{ color: "#4b5563" }}>
            Please try refreshing the page.
          </p>
        </div>
      }
    >
      <AppDetailsClient app={app} />
    </ErrorBoundary>
  );
}
