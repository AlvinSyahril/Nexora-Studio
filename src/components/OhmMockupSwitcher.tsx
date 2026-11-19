"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home as House,
  Mic2,
  SlidersHorizontal,
  ListMusic,
  Compass,
  Music,
  Disc3,
  Keyboard,
  Sparkles,
} from "lucide-react";

interface OhmViewItem {
  id: string;
  label: string;
  icon: React.ElementType;
  image: string;
  tagline: string;
  description: string;
  shortcutHint: string;
}

const OHM_VIEWS: OhmViewItem[] = [
  {
    id: "home",
    label: "Home & Radio",
    icon: House,
    image: "/showcase/ohm/home.png",
    tagline: "Made Around What You Listen To",
    description:
      "Your daily rotation, recently played tracks, and smart recommendations that adapt to your taste.",
    shortcutHint: "1 Home",
  },
  {
    id: "stage",
    label: "Lyrics Stage",
    icon: Mic2,
    image: "/showcase/ohm/stage.png",
    tagline: "Full-Screen Artwork & Live Lyrics",
    description:
      "Full-screen album artwork paired with live time-synced lyrics that scroll smoothly with the song.",
    shortcutHint: "L Stage",
  },
  {
    id: "lyric-card",
    label: "Lyric Card Studio",
    icon: Sparkles,
    image: "/showcase/ohm/lyric-card.png",
    tagline: "Shareable Lyric Cards",
    description:
      "Highlight up to 4 lines or click Best Part to grab the hook, pick a theme and aspect ratio (4:5, 1:1, 9:16), and copy or download the PNG.",
    shortcutHint: "Share lyric",
  },
  {
    id: "eq",
    label: "Audio & EQ",
    icon: SlidersHorizontal,
    image: "/showcase/ohm/eq.png",
    tagline: "Equalizer, Crossfade & Volume Leveling",
    description:
      "Fine-tune Bass, Vocals, and Treble, enable 3s or 6s song crossfades, turn on volume leveling across tracks, or set a sleep timer.",
    shortcutHint: "Space Play/Pause",
  },
  {
    id: "queue",
    label: "Up Next Queue",
    icon: ListMusic,
    image: "/showcase/ohm/queue.png",
    tagline: "Live Queue & Autoplay",
    description:
      "See what is playing next, drag to reorder songs, save your queue as a playlist, or let Autoplay keep the music going.",
    shortcutHint: "Q Queue",
  },
  {
    id: "explore",
    label: "Explore",
    icon: Compass,
    image: "/showcase/ohm/explore.png",
    tagline: "New Releases, Charts & Moods",
    description:
      "Browse new releases, trending charts, and mood playlists whenever you want something fresh.",
    shortcutHint: "2 Explore",
  },
  {
    id: "songs",
    label: "Songs",
    icon: Music,
    image: "/showcase/ohm/songs.png",
    tagline: "Instant Search & Sort",
    description:
      "Search and sort your saved tracks by title, artist, or date added, and start playback in one click.",
    shortcutHint: "3 Songs",
  },
  {
    id: "albums",
    label: "Albums",
    icon: Disc3,
    image: "/showcase/ohm/albums.png",
    tagline: "Clean Album Grid",
    description:
      "A clean cover-art grid of every album and single saved in your library.",
    shortcutHint: "4 Albums",
  },
  {
    id: "shortcuts",
    label: "Shortcuts",
    icon: Keyboard,
    image: "/showcase/ohm/shortcuts.png",
    tagline: "Keyboard-First Control",
    description:
      "Control playback, switch views with 1-5, search with /, and open Lyrics or Queue without touching the mouse.",
    shortcutHint: "? Shortcuts",
  },
];

function OhmSlide({ item }: { item: OhmViewItem }) {
  const [imageError, setImageError] = useState(false);
  const [hasFallback, setHasFallback] = useState(false);
  const [imgSrc, setImgSrc] = useState(item.image);

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Image
        key={`${item.id}-${hasFallback ? "fallback" : "primary"}`}
        src={imgSrc}
        alt={`Ohm desktop app — ${item.label}`}
        fill
        priority={item.id === "home"}
        unoptimized
        quality={100}
        sizes="100vw"
        style={{
          objectFit: "contain",
          objectPosition: "center",
          display: imageError ? "none" : "block",
        }}
        onLoad={() => setImageError(false)}
        onError={(e) => {
          if (!hasFallback && item.image.startsWith("/")) {
            setHasFallback(true);
            setImgSrc(
              `https://raw.githubusercontent.com/AlvinSyahril/Nexora-Studio/main/public${item.image}`
            );
          } else {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            setImageError(true);
          }
        }}
      />

      {imageError && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "0.75rem",
            color: "#9ca3af",
            padding: "2rem",
          }}
        >
          <Image src="/showcase/ohm/logo.png" alt="Ohm" width={48} height={48} />
          <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 500 }}>
            Preview unavailable for {item.label}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function OhmMockupSwitcher() {
  const [activeId, setActiveId] = useState("home");
  const currentItem = OHM_VIEWS.find((item) => item.id === activeId) || OHM_VIEWS[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const currentIndex = OHM_VIEWS.findIndex((item) => item.id === activeId);
      let newIndex = currentIndex;
      if (e.key === "ArrowRight") newIndex = (currentIndex + 1) % OHM_VIEWS.length;
      if (e.key === "ArrowLeft") newIndex = (currentIndex - 1 + OHM_VIEWS.length) % OHM_VIEWS.length;
      if (e.key === "Home") newIndex = 0;
      if (e.key === "End") newIndex = OHM_VIEWS.length - 1;
      if (newIndex !== currentIndex) {
        setActiveId(OHM_VIEWS[newIndex].id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId]);

  return (
    <div style={{ width: "100%", margin: "0 auto", maxWidth: "1200px" }}>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",
          paddingBottom: "2rem",
          scrollbarWidth: "none",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        role="tablist"
        aria-label="Ohm desktop interface views"
      >
        {OHM_VIEWS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`ohm-panel-${item.id}`}
              id={`ohm-tab-${item.id}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1.15rem",
                borderRadius: "9999px",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                border: "1px solid transparent",
                background: "transparent",
                color: isActive ? "#07120c" : "#6b7280",
                outline: "none",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="ohmSwitcherActivePill"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "9999px",
                    background: "linear-gradient(135deg, #2eb872 0%, #38ca7f 100%)",
                    boxShadow: "0 4px 18px rgba(46, 184, 114, 0.3)",
                    border: "1px solid #2eb872",
                    zIndex: 0,
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Icon size={15} />
                <span>{item.label}</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Desktop Window Shell */}
      <div
        style={{
          position: "relative",
          borderRadius: "14px",
          background: "var(--surface)",
          border: "1px solid var(--surface-border)",
          boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.14)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "38px",
            background: "#0c0e0d",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            padding: "0 1.25rem",
            userSelect: "none",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F" }} />
          </div>
          <div
            style={{
              margin: "0 auto",
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "#a0a8a3",
              letterSpacing: "-0.01em",
            }}
          >
            Ohm v0.2.0 — {currentItem.label}
          </div>
          <div style={{ fontSize: "0.68rem", color: "#2eb872", fontWeight: 600, letterSpacing: "0.06em" }}>
            {currentItem.id.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 10",
            background: "#070807",
            overflow: "hidden",
          }}
        >
          <AnimatePresence>
            <OhmSlide key={currentItem.id} item={currentItem} />
          </AnimatePresence>
        </div>

        <div
          id={`ohm-panel-${currentItem.id}`}
          role="tabpanel"
          aria-labelledby={`ohm-tab-${currentItem.id}`}
          style={{
            padding: "1.5rem 2rem",
            background: "var(--surface)",
            borderTop: "1px solid var(--surface-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ flex: 1, minWidth: "280px" }}
            >
              <h4 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 600, color: "var(--foreground)" }}>
                {currentItem.tagline}
              </h4>
              <p
                style={{
                  margin: "0.5rem 0 0",
                  fontSize: "0.95rem",
                  color: "#6b7280",
                  maxWidth: "800px",
                  lineHeight: 1.6,
                }}
              >
                {currentItem.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#6b7280",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              ← → Navigate
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.35rem 0.75rem",
                background: "rgba(46, 184, 114, 0.12)",
                borderRadius: "9999px",
                color: "#1f8f56",
                fontSize: "0.72rem",
                fontWeight: 600,
              }}
            >
              <span>{currentItem.shortcutHint}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
