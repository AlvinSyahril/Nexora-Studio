"use client";

import React, { useState, useEffect } from "react";
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
  const [imageOpacity, setImageOpacity] = useState(1);
  const currentItem = MENU_ITEMS.find((item) => item.id === activeMenuId) || MENU_ITEMS[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const currentIndex = MENU_ITEMS.findIndex((item) => item.id === activeMenuId);
      let newIndex = currentIndex;
      if (e.key === "ArrowRight") newIndex = (currentIndex + 1) % MENU_ITEMS.length;
      if (e.key === "ArrowLeft") newIndex = (currentIndex - 1 + MENU_ITEMS.length) % MENU_ITEMS.length;
      if (e.key === "Home") newIndex = 0;
      if (e.key === "End") newIndex = MENU_ITEMS.length - 1;
      if (newIndex !== currentIndex) {
        setActiveMenuId(MENU_ITEMS[newIndex].id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMenuId]);

  // Smooth image transition
  const handleImageSwitch = (id: string) => {
    setImageOpacity(0);
    setTimeout(() => {
      setActiveMenuId(id);
      setImageOpacity(1);
    }, 150);
  };

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
        role="tablist"
        aria-label="Loom feature categories"
      >
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeMenuId;
          return (
            <button
              key={item.id}
              onClick={() => handleImageSwitch(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleImageSwitch(item.id);
                }
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
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
                border: isActive ? "1px solid #F59E0B" : "1px solid transparent",
                background: isActive ? "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)" : "transparent",
                color: isActive ? "#1a1a2e" : "#6b7280",
                boxShadow: isActive ? "0 4px 20px rgba(245, 158, 11, 0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                outline: "none"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "#F59E0B";
                  e.currentTarget.style.color = "#F59E0B";
                  e.currentTarget.style.background = "rgba(245, 158, 11, 0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.color = "#6b7280";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <Icon size={16} style={{ transition: "transform 0.2s ease" }} />
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
            <button 
              style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444", border: "none", cursor: "pointer", transition: "transform 0.15s ease" }}
              onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.9)"}
              onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              aria-label="Close window"
            />
            <button 
              style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#eab308", border: "none", cursor: "pointer", transition: "transform 0.15s ease" }}
              onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.9)"}
              onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              aria-label="Minimize window"
            />
            <button 
              style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e", border: "none", cursor: "pointer", transition: "transform 0.15s ease" }}
              onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.9)"}
              onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              aria-label="Maximize window"
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", margin: "0 auto", transform: "translateX(-1.5rem)" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#6b7280" }}>
              Loom — {currentItem.label}
            </span>
          </div>

          {/* App Icon in Title Bar */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem", opacity: 0.6 }}>
            <span style={{ fontSize: "0.7rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {currentItem.id.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Mockup Screen Display */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9.5",
            background: "#111111",
            overflow: "hidden"
          }}
        >
          <div style={{ position: "absolute", inset: 0, transition: "opacity 0.25s ease", opacity: imageOpacity }}>
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
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Placeholder when image fails to load */}
            <div style={{ 
              position: "absolute", 
              inset: 0, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              flexDirection: "column",
              gap: "1rem",
              color: "#4b5563",
              padding: "2rem"
            }}>
              <div style={{ 
                width: "80px", 
                height: "80px", 
                borderRadius: "50%", 
                background: "rgba(245, 158, 11, 0.15)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                animation: "pulse 2s infinite ease-in-out"
              }}>
                <Image src="/showcase/loom/logo.png" alt="Loom" width={40} height={40} />
              </div>
              <p style={{ fontSize: "1rem", fontWeight: 500 }}>Preview unavailable</p>
              <p style={{ fontSize: "0.85rem", textAlign: "center", maxWidth: "280px" }}>
                Screenshot for <strong>{currentItem.label}</strong> not found. Add image at <code>{currentItem.image}</code>
              </p>
            </div>
          </div>
        </div>

        {/* Feature Context Banner Below Mockup */}
        <div
          id={`panel-${currentItem.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentItem.id}`}
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ 
              fontSize: "0.75rem", 
              fontWeight: 600, 
              color: "#6b7280",
              letterSpacing: "0.1em",
              textTransform: "uppercase"
            }}>
              ← → Navigate
            </span>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "0.35rem",
              padding: "0.35rem 0.75rem",
              background: "rgba(245, 158, 11, 0.1)",
              borderRadius: "9999px",
              color: "#F59E0B",
              fontSize: "0.7rem",
              fontWeight: 600
            }}>
              <kbd style={{ fontFamily: "inherit" }}>Space</kbd> Quick Capture
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
