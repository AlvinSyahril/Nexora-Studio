"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Home as House, 
  FileText, 
  Kanban, 
  Share2 as Graph, 
  Calendar as CalendarBlank, 
  BookOpen, 
  Target, 
  LineChart as ChartLineUp, 
  Inbox as Tray, 
  FolderTree as FolderDashed
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  image: string;
  tagline: string;
  description: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "home",
    label: "Bento Dashboard",
    icon: House,
    image: "/showcase/loom/home.png",
    tagline: "Your Daily Command Center",
    description: "Instant access to current focus tasks, recent documents, deep work statistics, and upcoming agenda in an elegant bento grid."
  },
  {
    id: "notes",
    label: "Notes & Canvas",
    icon: FileText,
    image: "/showcase/loom/notes.png",
    tagline: "Fluid Markdown & Infinite Whiteboard",
    description: "Write distraction-free with rich markdown, code syntax highlighting, slash commands, or switch to an infinite canvas drawing board."
  },
  {
    id: "tasks",
    label: "Kanban Board",
    icon: Kanban,
    image: "/showcase/loom/tasks.png",
    tagline: "Tactile Workflow Engine",
    description: "Manage projects effortlessly with drag-and-drop Kanban columns, sub-tasks, priority tags, and automated progress calculation."
  },
  {
    id: "graph",
    label: "Knowledge Graph",
    icon: Graph,
    image: "/showcase/loom/graph.png",
    tagline: "See How Your Ideas Connect",
    description: "Interactive 2D force-directed graph revealing implicit connections between your wiki-links, documents, tags, and research threads."
  },
  {
    id: "calendar",
    label: "Agenda & Timeline",
    icon: CalendarBlank,
    image: "/showcase/loom/calendar.png",
    tagline: "Time-Blocking Simplified",
    description: "Harmonize deadlines, periodic milestones, and daily schedule directly mapped from your notes and task dates."
  },
  {
    id: "journal",
    label: "Daily Journal",
    icon: BookOpen,
    image: "/showcase/loom/journal.png",
    tagline: "Mindful Reflection & Streaks",
    description: "Capture daily morning intentions and evening gratitude with zero friction, complete with mood tracking and chronological memory logs."
  },
  {
    id: "focus",
    label: "Focus HUD",
    icon: Target,
    image: "/showcase/loom/focus.png",
    tagline: "Hyper-Focus Without Distractions",
    description: "Built-in timer, ambient soundscapes, full-screen zen mode, and floating mini-hud to keep you in flow state for hours."
  },
  {
    id: "insights",
    label: "Insights",
    icon: ChartLineUp,
    image: "/showcase/loom/insights.png",
    tagline: "Data-Driven Self Improvement",
    description: "Visualize word count velocity, completed sprint trends, focus hour ratios, and cognitive habits over time."
  },
  {
    id: "inbox",
    label: "Inbox & Triage",
    icon: Tray,
    image: "/showcase/loom/inbox.png",
    tagline: "Zero-Friction Quick Capture",
    description: "Dumb-dump fleeting ideas immediately. Review, tag, or promote them to structured project spaces whenever you have time."
  },
  {
    id: "collections",
    label: "Collections",
    icon: FolderDashed,
    image: "/showcase/loom/collections.png",
    tagline: "Hierarchical Folder Spaces",
    description: "Group documents into custom branded collections and sub-collections with drag-and-drop ease."
  }
];

export default function DesktopMockupSwitcher() {
  const [activeMenuId, setActiveMenuId] = useState("home");
  const currentItem = MENU_ITEMS.find((item) => item.id === activeMenuId) || MENU_ITEMS[0];

  return (
    <div style={{ width: "100%", margin: "0 auto", maxWidth: "1200px" }}>
      {/* Category Pills Slider */}
      <div 
        style={{ 
          display: "flex", 
          gap: "0.5rem", 
          overflowX: "auto", 
          paddingBottom: "2rem",
          scrollbarWidth: "none",
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeMenuId;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenuId(item.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1.15rem",
                borderRadius: "9999px",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: isActive ? "1px solid rgba(0,0,0,0.1)" : "1px solid transparent",
                background: isActive ? "var(--surface)" : "transparent",
                color: isActive ? "var(--foreground)" : "#6b7280",
                boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.04)" : "none"
              }}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Frame Laptop / Desktop Mockup Window */}
      <div
        style={{
          position: "relative",
          borderRadius: "12px",
          background: "var(--surface)",
          border: "1px solid var(--surface-border)",
          boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.08)",
          overflow: "hidden"
        }}
      >
        {/* Clean Title Bar */}
        <div
          style={{
            height: "40px",
            background: "#FAFAFA",
            borderBottom: "1px solid var(--surface-border)",
            display: "flex",
            alignItems: "center",
            padding: "0 1.25rem",
            userSelect: "none",
            gap: "1rem"
          }}
        >
          {/* Interactive Window Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#eab308" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e" }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", margin: "0 auto", transform: "translateX(-1.5rem)" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#6b7280" }}>
              Loom — {currentItem.label}
            </span>
          </div>
        </div>

        {/* Mockup Screen Display */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9.5",
            background: "#111111", // Keeping dark background inside frame because Loom is a dark app
            overflow: "hidden"
          }}
        >
          <Image
            key={currentItem.id}
            src={currentItem.image}
            alt={`${currentItem.label} - screenshot showing ${currentItem.label.toLowerCase()} feature`}
            fill
            priority
            unoptimized
            quality={100}
            sizes="100vw"
            style={{
              objectFit: "contain",
              objectPosition: "top center",
              imageRendering: "-webkit-optimize-contrast",
              transition: "opacity 0.25s ease"
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Feature Context Banner Below Mockup */}
        <div
          style={{
            padding: "1.5rem 2rem",
            background: "var(--surface)",
            borderTop: "1px solid var(--surface-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <div>
            <h4 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 600, color: "var(--foreground)" }}>
              {currentItem.tagline}
            </h4>
            <p style={{ margin: "0.5rem 0 0", fontSize: "0.95rem", color: "#6b7280", maxWidth: "800px", lineHeight: 1.6 }}>
              {currentItem.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
