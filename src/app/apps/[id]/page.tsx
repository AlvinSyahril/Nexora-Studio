import { APPS_DATA } from "@/data/apps";
import { notFound } from "next/navigation";
import AppDetailsClient from "@/components/AppDetailsClient";

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

  return <AppDetailsClient app={app} />;
}
