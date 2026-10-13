export interface AppData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconUrl: string;
  accentColor: string;
  platform: "mobile" | "desktop";
  features: string[];
  downloadUrl?: string;
}

export const APPS_DATA: AppData[] = [
  {
    id: "loom",
    name: "Loom",
    tagline: "Local Markdown notes with live graph connections",
    description: "A fast Windows workspace that saves your notes directly to your hard drive as plain Markdown files. Link concepts with visual relationship nodes, manage projects on a Kanban board, and write without an internet connection.",
    iconUrl: "/showcase/loom/logo.png",
    accentColor: "#F59E0B", // Warm Amber
    platform: "desktop",
    features: [
      "Visual Relationship Graph",
      "Local Filesystem Storage",
      "Unified Notes & Kanban Boards",
      "Keyboard-First Writing Mode",
      "F11 Full-Screen Focus",
      "Frameless Native Window"
    ],
    downloadUrl: "https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v1.0.1-Loom/Loom.Setup.1.0.1.exe"
  },
  {
    id: "reminder-app",
    name: "Get Things Done",
    tagline: "Type naturally, set reminders automatically",
    description: "Type reminders in plain English, and the app sets dates and priorities automatically. Manage daily tasks and recurring bills in one place without tracking or third-party ads.",
    iconUrl: "/showcase/logo.png",
    accentColor: "#8b5cf6", // violet-500
    platform: "mobile",
    features: [
      "Natural Language Parsing",
      "Recurring Bill Schedules",
      "In-App Over-the-Air Updates",
      "Zero Telemetry Tracking"
    ],
    downloadUrl: "https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v2.1.4-GTD/Get-Things-Done.apk"
  },
  {
    id: "oasis",
    name: "Oasis",
    tagline: "Track how you feel and unpack your day in private",
    description: "Log your daily mood in two taps, follow guided breathing when stress hits, and write private reflections locked behind a secure PIN.",
    iconUrl: "/showcase/oasis/logo.png",
    accentColor: "#B6E2D3", // Pastel Green
    platform: "mobile",
    features: [
      "Two-Tap Mood Logging",
      "Ozie Reflection Assistant",
      "Guided Breathing Pacer",
      "PIN-Protected Storage"
    ],
    downloadUrl: "https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v1.0.3-oasis/Oasis-universal.apk"
  }
];
