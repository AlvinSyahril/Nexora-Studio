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
    tagline: "Thinking at the Speed of Thought",
    description: "An ultra-fast, local-first personal workspace for thinkers, creators, and doers. Seamlessly intertwines markdown notes, bi-directional knowledge graphs, fluid Kanban tasks, and mindful journaling in one unified sanctuary.",
    iconUrl: "/showcase/loom/logo.png",
    accentColor: "#F59E0B", // Warm Amber
    platform: "desktop",
    features: [
      "Bi-Directional Knowledge Graph",
      "Local-First & Full Privacy",
      "Unified Notes & Kanban Tasks",
      "Mindful Daily Journal & Focus Mode",
      "Quick Capture & Zen Mode (F11)",
      "Native Discord-Style Titlebar"
    ],
    downloadUrl: "https://github.com/vinnssmokee/loom-desktop/releases/latest"
  },
  {
    id: "reminder-app",
    name: "Get Things Done",
    tagline: "Your Smart Daily Companion",
    description: "An intelligent productivity companion equipped with NLP for smart input, comprehensive task tracking, seamless bill management, and real-time OTA system updates.",
    iconUrl: "/showcase/logo.png",
    accentColor: "#8b5cf6", // violet-500
    platform: "mobile",
    features: [
      "Smart Input NLP",
      "Bill & Finance Tracking",
      "OTA System Updates",
      "Daily Progress Tracking"
    ]
  },
  {
    id: "oasis",
    name: "Oasis",
    tagline: "Your Daily Space to Breathe",
    description: "A calming mental health and journaling app featuring mood tracking, breathing exercises, and a virtual AI companion named Ozie to help you reflect on your day.",
    iconUrl: "/showcase/oasis/logo.png",
    accentColor: "#B6E2D3", // Pastel Green
    platform: "mobile",
    features: [
      "Mood & Activity Tracking",
      "Ozie AI Companion",
      "Breathing Exercises",
      "Detailed Insights"
    ]
  }
];
