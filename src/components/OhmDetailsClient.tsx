"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Headphones,
  Keyboard,
  ListMusic,
  Mic2,
  Moon,
  Radio,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  X,
  Zap,
} from "lucide-react";

import styles from "../app/apps/[id]/page.module.css";
import FaqAccordion from "./FaqAccordion";
import OhmMockupSwitcher from "./OhmMockupSwitcher";
import { AppData } from "../data/apps";

interface GitHubAsset {
  name?: string;
  browser_download_url?: string;
}

interface GitHubRelease {
  tag_name?: string;
  published_at?: string;
  assets?: GitHubAsset[];
  html_url?: string;
}

gsap.registerPlugin(ScrollTrigger);

const OHM_SHA256 = "29d293e630c12fe83bf24061ff12c5ab955e3344c844c1cf59193f1221f56ff5";
const OHM_RELEASE_URL = "https://github.com/AlvinSyahril/ohm/releases/tag/v0.2.0";

export default function OhmDetailsClient({ app }: { app: AppData }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "playback" | "navigation">("all");
  const [downloadUrl, setDownloadUrl] = useState<string>(
    app.downloadUrl ||
      "https://github.com/AlvinSyahril/ohm/releases/download/v0.2.0/Ohm-Setup-0.2.0.exe"
  );
  const [releasePageUrl, setReleasePageUrl] = useState<string>(OHM_RELEASE_URL);
  const [latestTag, setLatestTag] = useState<string>("v0.2.0");
  const [releaseDate, setReleaseDate] = useState<string>("November 19, 2026");
  const [copiedSha, setCopiedSha] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const copyChecksum = async () => {
    try {
      await navigator.clipboard.writeText(OHM_SHA256);
      if (copyTimerRef.current !== null) clearTimeout(copyTimerRef.current);
      setCopiedSha(true);
      copyTimerRef.current = window.setTimeout(() => {
        copyTimerRef.current = null;
        setCopiedSha(false);
      }, 1800);
    } catch {
      // Ignore clipboard failures in restricted contexts
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchLatestOhmRelease = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/repos/AlvinSyahril/ohm/releases",
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        if (!res.ok) return;
        const releases: GitHubRelease[] = await res.json();
        if (!Array.isArray(releases) || releases.length === 0) return;

        const ohmRelease = releases.find((r: GitHubRelease) => Boolean(r.tag_name));

        if (ohmRelease && isMounted) {
          const cleanVer = ohmRelease.tag_name?.replace(/-ohm$/i, "");
          if (cleanVer) setLatestTag(cleanVer);
          if (ohmRelease.html_url) setReleasePageUrl(ohmRelease.html_url);
          if (ohmRelease.published_at) {
            const parsed = new Date(ohmRelease.published_at);
            if (!Number.isNaN(parsed.getTime())) {
              setReleaseDate(
                parsed.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              );
            }
          }

          if (Array.isArray(ohmRelease.assets) && ohmRelease.assets.length > 0) {
            const exeAsset = ohmRelease.assets.find(
              (a: GitHubAsset) =>
                typeof a.name === "string" && a.name.toLowerCase().endsWith(".exe")
            );
            if (exeAsset?.browser_download_url) {
              setDownloadUrl(exeAsset.browser_download_url);
              return;
            }
          }
          if (ohmRelease.html_url) {
            setDownloadUrl(ohmRelease.html_url);
          }
        }
      } catch {
        // Keep fallback URL from app.downloadUrl
      }
    };

    fetchLatestOhmRelease();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-animate='nav']", {
        y: -40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from("[data-animate='hero-element']", {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.15,
      });

      gsap.from("[data-animate='mockup']", {
        y: 24,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        delay: 0.25,
      });

      const features = gsap.utils.toArray<HTMLElement>("[data-animate='feature']");
      features.forEach((feature) => {
        gsap.from(feature, {
          scrollTrigger: {
            trigger: feature,
            start: "top 82%",
          },
          y: 44,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`${styles.showcaseWrapper} ${styles.ohmTheme}`}
      ref={wrapperRef}
      style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}
    >
      {/* Top Bar */}
      <nav className={`${styles.container} ${styles.nav}`} data-animate="nav">
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <motion.div
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link
              href="/#product-roster"
              className={styles.backButton}
              title="Back to Nexora"
              style={{
                color: "var(--foreground)",
                border: "1px solid var(--surface-border)",
                background: "var(--surface)",
              }}
            >
              <ArrowLeft size={16} /> <span className={styles.backText}>Back</span>
            </Link>
          </motion.div>

          <div className={styles.navBrand}>
            <div className={styles.navLogo} style={{ borderRadius: "8px", overflow: "hidden" }}>
              <Image
                src="/showcase/ohm/logo.png"
                alt="Ohm Logo"
                width={38}
                height={38}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className={styles.navTitle} style={{ color: "var(--foreground)", fontWeight: 600 }}>
                Ohm
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  background: "rgba(46, 184, 114, 0.12)",
                  color: "#1f8f56",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "4px",
                  letterSpacing: "0.05em",
                }}
              >
                DESKTOP
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href="#showcase"
            style={{
              fontWeight: 500,
              color: "#6b7280",
              textDecoration: "none",
              fontSize: "0.9rem",
              transition: "color 0.2s ease",
            }}
            className="hidden md:block"
          >
            Interactive Tour
          </a>
          <motion.a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.65rem 1.35rem",
              background: "#000000",
              color: "#FFFFFF",
              borderRadius: "var(--radius-md)",
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            <Download size={16} color="#FFFFFF" /> Download .exe
          </motion.a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className={styles.container}
        style={{
          padding: "5.5rem 2rem 4rem",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          <div
            data-animate="hero-element"
            style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.25rem 0.75rem 0.25rem 0.25rem",
                background: "rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "9999px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                color: "#111827",
              }}
            >
              <span
                style={{
                  background: "#0c0e0d",
                  color: "#2eb872",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#2eb872",
                    display: "inline-block",
                  }}
                />
                {latestTag}
              </span>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>
                Ohm {latestTag} for Windows — What&apos;s new
              </span>
              <span style={{ color: "#9ca3af", paddingRight: "0.25rem", fontWeight: 600 }}>→</span>
            </button>
          </div>

          <h1
            data-animate="hero-element"
            className="display-font"
            style={{
              fontSize: "clamp(2.75rem, 6vw, 4.75rem)",
              lineHeight: 1.05,
              color: "var(--foreground)",
              margin: 0,
            }}
          >
            A desktop music player
            <br />
            built for listening.
          </h1>

          <p
            data-animate="hero-element"
            style={{
              fontSize: "1.1rem",
              color: "#6b7280",
              maxWidth: "520px",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Stream music in a fast, dark Windows app with smooth song crossfades, live synced
            lyrics, shareable lyric cards, and Discord Rich Presence. Free, open-source, and no
            account required.
          </p>

          <div
            data-animate="hero-element"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "0.5rem",
            }}
          >
            <motion.a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.85rem 2rem",
                background: "#000000",
                color: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
              }}
            >
              <Download size={18} color="#FFFFFF" /> Download for Windows
            </motion.a>

            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                padding: "0.85rem 1.25rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--surface-border)",
                background: "var(--surface)",
                color: "var(--foreground)",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Release Notes & SHA-256
            </button>
          </div>

          <div
            data-animate="hero-element"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
              color: "#6b7280",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <ShieldCheck size={16} color="#1f8f56" /> Free &amp; Open Source
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Zap size={16} color="#1f8f56" /> No Account or Ads
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Headphones size={16} color="#1f8f56" /> Windows 10 &amp; 11 (64-bit)
            </span>
          </div>
        </div>

        {/* Hero Window Preview */}
        <div
          data-animate="mockup"
          style={{
            width: "100%",
            position: "relative",
            maxWidth: "620px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid rgba(0, 0, 0, 0.16)",
              boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.2)",
              background: "#070807",
            }}
          >
            <div
              style={{
                height: "34px",
                background: "#0c0e0d",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 1rem",
                gap: "0.75rem",
                userSelect: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  fontSize: "0.72rem",
                  fontFamily: "var(--font-mono)",
                  color: "#d1d5db",
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "2px",
                    background: "#2eb872",
                    display: "inline-block",
                  }}
                />
                <span>Ohm {latestTag}</span>
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-mono)",
                  color: "#6b7280",
                }}
              >
                Windows Desktop
              </div>
              <div
                aria-hidden="true"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  color: "#6b7280",
                  fontSize: "0.72rem",
                  lineHeight: 1,
                }}
              >
                <span>—</span>
                <span>□</span>
                <span>×</span>
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
              <Image
                src="/showcase/ohm/home.png"
                alt="Ohm Windows Desktop Player Home"
                fill
                priority
                unoptimized
                quality={100}
                sizes="(max-width: 768px) 100vw, 620px"
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Showcase */}
      <section
        id="showcase"
        className={styles.container}
        style={{ padding: "4rem 1.5rem 6rem", background: "var(--background)" }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            style={{
              color: "#6b7280",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Inside Ohm
          </span>
          <h2
            className="display-font"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              color: "var(--foreground)",
              marginTop: "0.5rem",
            }}
          >
            See Every Screen Before You Download.
          </h2>
          <p
            style={{
              color: "#6b7280",
              fontSize: "1.06rem",
              maxWidth: "620px",
              margin: "0.75rem auto 0",
              lineHeight: 1.6,
            }}
          >
            Click through Home, Lyrics Stage, Lyric Card Studio, EQ &amp; Crossfade, Queue, Explore, and Library views.
          </p>
        </div>

        <OhmMockupSwitcher />
      </section>

      {/* What's New in v0.2.0 */}
      <section className={styles.container} style={{ padding: "4rem 1.5rem 6rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            style={{
              color: "#1f8f56",
              fontWeight: 700,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            What&apos;s New in v0.2.0
          </span>
          <h2
            className="display-font"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--foreground)",
              marginTop: "0.5rem",
              marginBottom: "0.75rem",
            }}
          >
            Built for How You Listen and Share.
          </h2>
          <p
            style={{
              color: "#6b7280",
              fontSize: "1.06rem",
              maxWidth: "640px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Version 0.2.0 adds shareable lyric cards, personal listening receipts, Discord Rich Presence, and cleaner audio playback.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div
            data-animate="feature"
            style={{
              padding: "2rem",
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
              borderRadius: "14px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "rgba(46, 184, 114, 0.12)",
                color: "#1f8f56",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <Share2 size={20} />
            </div>
            <h3 style={{ fontSize: "1.18rem", fontWeight: 600, marginBottom: "0.6rem" }}>
              Lyric Card Studio
            </h3>
            <p style={{ color: "#6b7280", lineHeight: 1.65, fontSize: "0.94rem", margin: 0 }}>
              Select 1 to 4 lines from any synced song — or tap Best Part to jump straight to the
              chorus — and export a 4:5, 1:1, or 9:16 card.
            </p>
          </div>

          <div
            data-animate="feature"
            style={{
              padding: "2rem",
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
              borderRadius: "14px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "rgba(46, 184, 114, 0.12)",
                color: "#1f8f56",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <FileText size={20} />
            </div>
            <h3 style={{ fontSize: "1.18rem", fontWeight: 600, marginBottom: "0.6rem" }}>
              Your Sound Receipt
            </h3>
            <p style={{ color: "#6b7280", lineHeight: 1.65, fontSize: "0.94rem", margin: 0 }}>
              Generate a clean thermal-paper or dark-studio receipt of your most-played tracks, top
              artist, and listening time for the week or all time.
            </p>
          </div>

          <div
            data-animate="feature"
            style={{
              padding: "2rem",
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
              borderRadius: "14px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "rgba(46, 184, 114, 0.12)",
                color: "#1f8f56",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <Radio size={20} />
            </div>
            <h3 style={{ fontSize: "1.18rem", fontWeight: 600, marginBottom: "0.6rem" }}>
              Discord Rich Presence
            </h3>
            <p style={{ color: "#6b7280", lineHeight: 1.65, fontSize: "0.94rem", margin: 0 }}>
              Show the song and artist you are listening to on your Discord profile automatically,
              complete with live elapsed and remaining time.
            </p>
          </div>

          <div
            data-animate="feature"
            style={{
              padding: "2rem",
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
              borderRadius: "14px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "rgba(46, 184, 114, 0.12)",
                color: "#1f8f56",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <SlidersHorizontal size={20} />
            </div>
            <h3 style={{ fontSize: "1.18rem", fontWeight: 600, marginBottom: "0.6rem" }}>
              Opus Audio &amp; Volume Leveling
            </h3>
            <p style={{ color: "#6b7280", lineHeight: 1.65, fontSize: "0.94rem", margin: 0 }}>
              Streams the highest-quality Opus or AAC audio available, shows the live codec and
              bitrate, and levels out volume jumps between quiet and loud tracks.
            </p>
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts Section */}
      <section className={styles.keyboardSection}>
        <div className={styles.keyboardHeader}>
          <span
            style={{
              color: "#1f8f56",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Keyboard Shortcuts
          </span>
          <h2 className={styles.keyboardSectionTitle}>Control Music Without Leaving Your Keyboard</h2>
          <p className={styles.keyboardSectionDesc}>
            Every common action in Ohm works with a single keystroke.
          </p>
        </div>

        <div className={styles.keyboardTabs}>
          <button
            className={`${styles.keyboardTab} ${activeTab === "all" ? styles.keyboardTabActive : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Shortcuts
          </button>
          <button
            className={`${styles.keyboardTab} ${
              activeTab === "playback" ? styles.keyboardTabActive : ""
            }`}
            onClick={() => setActiveTab("playback")}
          >
            Playback & Audio
          </button>
          <button
            className={`${styles.keyboardTab} ${
              activeTab === "navigation" ? styles.keyboardTabActive : ""
            }`}
            onClick={() => setActiveTab("navigation")}
          >
            Navigation & Panels
          </button>
        </div>

        <div className={styles.keyboardGrid}>
          {activeTab === "all" || activeTab === "playback" ? (
            <div className={styles.keyboardCategory}>
              <div className={styles.keyboardCategoryTitle}>
                <div className={styles.keyboardCategoryIcon}>
                  <Headphones size={20} />
                </div>
                <span>Playback & Audio</span>
              </div>

              <div className={styles.shortcutList}>
                <div className={styles.shortcutItem}>
                  <div className={styles.shortcutKeys}>
                    <span className={styles.shortcutKbd}>Space</span>
                  </div>
                  <span className={styles.shortcutDesc}>Play or pause</span>
                </div>
                <div className={styles.shortcutItem}>
                  <div className={styles.shortcutKeys}>
                    <span className={styles.shortcutKbd}>N</span>
                    <span className={styles.shortcutPlus}>/</span>
                    <span className={styles.shortcutKbd}>P</span>
                  </div>
                  <span className={styles.shortcutDesc}>Next or previous track</span>
                </div>
                <div className={styles.shortcutItem}>
                  <div className={styles.shortcutKeys}>
                    <span className={styles.shortcutKbd}>Left</span>
                    <span className={styles.shortcutPlus}>/</span>
                    <span className={styles.shortcutKbd}>Right</span>
                  </div>
                  <span className={styles.shortcutDesc}>Seek 5 seconds</span>
                </div>
                <div className={styles.shortcutItem}>
                  <div className={styles.shortcutKeys}>
                    <span className={`${styles.shortcutKbd} ${styles.shortcutKbdModifier}`}>Shift</span>
                    <span className={styles.shortcutPlus}>+</span>
                    <span className={styles.shortcutKbd}>Left / Right</span>
                  </div>
                  <span className={styles.shortcutDesc}>Previous or next track</span>
                </div>
                <div className={styles.shortcutItem}>
                  <div className={styles.shortcutKeys}>
                    <span className={styles.shortcutKbd}>M</span>
                  </div>
                  <span className={styles.shortcutDesc}>Mute or unmute</span>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "all" || activeTab === "navigation" ? (
            <div className={styles.keyboardCategory}>
              <div className={styles.keyboardCategoryTitle}>
                <div className={styles.keyboardCategoryIcon}>
                  <Keyboard size={20} />
                </div>
                <span>Navigation & Panels</span>
              </div>

              <div className={styles.shortcutList}>
                <div className={styles.shortcutItem}>
                  <div className={styles.shortcutKeys}>
                    <span className={styles.shortcutKbd}>1–5</span>
                  </div>
                  <span className={styles.shortcutDesc}>Home, Explore, Songs, Albums, Artists</span>
                </div>
                <div className={styles.shortcutItem}>
                  <div className={styles.shortcutKeys}>
                    <span className={styles.shortcutKbd}>/</span>
                    <span className={styles.shortcutPlus}>or</span>
                    <span className={`${styles.shortcutKbd} ${styles.shortcutKbdModifier}`}>Ctrl</span>
                    <span className={styles.shortcutPlus}>+</span>
                    <span className={styles.shortcutKbd}>K</span>
                  </div>
                  <span className={styles.shortcutDesc}>Focus typeahead search</span>
                </div>
                <div className={styles.shortcutItem}>
                  <div className={styles.shortcutKeys}>
                    <span className={styles.shortcutKbd}>L</span>
                  </div>
                  <span className={styles.shortcutDesc}>Toggle Now Playing stage</span>
                </div>
                <div className={styles.shortcutItem}>
                  <div className={styles.shortcutKeys}>
                    <span className={styles.shortcutKbd}>Q</span>
                  </div>
                  <span className={styles.shortcutDesc}>Toggle Up Next queue drawer</span>
                </div>
                <div className={styles.shortcutItem}>
                  <div className={styles.shortcutKeys}>
                    <span className={styles.shortcutKbd}>?</span>
                  </div>
                  <span className={styles.shortcutDesc}>Open shortcuts reference</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Bento Feature Highlights */}
      <section className={styles.bentoSection}>
        <div className={styles.bentoHeader}>
          <span
            style={{
              color: "#1f8f56",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Everyday Essentials
          </span>
          <h2 className={styles.bentoSectionTitle}>Fast, Private, and Out of Your Way.</h2>
          <p className={styles.bentoSectionDesc}>
            Everything works right after install — no sign-up forms, no background bloat, and no paywalls.
          </p>
        </div>

        <div className={styles.bentoGrid}>
          <div className={styles.bentoCard}>
            <div className={styles.bentoCardInner}>
              <div className={styles.bentoCardIcon}>
                <SlidersHorizontal size={22} />
              </div>
              <h3 className={styles.bentoCardTitle}>Smooth Crossfade &amp; EQ</h3>
              <p className={styles.bentoCardDesc}>
                Blend songs seamlessly and tune Bass, Vocals, and Treble with quick presets or clean Pure Path playback.
              </p>
              <div className={styles.bentoCardFeatures}>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>3s or 6s song overlap</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Balanced, Bass, Vocal &amp; Night modes</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Pure Path bypass when EQ is flat</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bentoCard}>
            <div className={styles.bentoCardInner}>
              <div className={styles.bentoCardIcon}>
                <Mic2 size={22} />
              </div>
              <h3 className={styles.bentoCardTitle}>Synced Lyrics &amp; Radio</h3>
              <p className={styles.bentoCardDesc}>
                Follow live synced lyrics in full-screen Stage view, or start a nonstop radio mix from any track you like.
              </p>
              <div className={styles.bentoCardFeatures}>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Tap Best Part to find the chorus</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Autoplay similar songs at queue end</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Instant search suggestions as you type</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bentoCard}>
            <div className={styles.bentoCardInner}>
              <div className={styles.bentoCardIcon}>
                <ListMusic size={22} />
              </div>
              <h3 className={styles.bentoCardTitle}>Local Library &amp; Playlists</h3>
              <p className={styles.bentoCardDesc}>
                Save your favorite songs, albums, and artists, drag to reorder your queue, and save mixes into playlists.
              </p>
              <div className={styles.bentoCardFeatures}>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Save your active queue as a playlist</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Artist pages and album collections</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Stored locally on your PC — no sign-in</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bentoCard}>
            <div className={styles.bentoCardInner}>
              <div className={styles.bentoCardIcon}>
                <Moon size={22} />
              </div>
              <h3 className={styles.bentoCardTitle}>System Tray &amp; Sleep Timer</h3>
              <p className={styles.bentoCardDesc}>
                Keep playback handy in the Windows tray, set a sleep timer that gently fades out, and update right inside the app.
              </p>
              <div className={styles.bentoCardFeatures}>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>15m, 30m, 60m, or end-of-song timer</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Background tray play/pause &amp; skip</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Verified one-click in-app updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem 6rem" }}>
        <FaqAccordion appId="ohm" />
      </div>

      {/* Footer CTA */}
      <footer
        style={{
          background: "var(--background)",
          borderTop: "1px solid var(--surface-border)",
          padding: "6rem 1.5rem 4rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            className="display-font"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--foreground)",
              marginBottom: "1rem",
            }}
          >
            Ready to Listen?
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "2.25rem", fontSize: "1.08rem", lineHeight: 1.6 }}>
            Download Ohm {latestTag} for Windows. Free, open-source, and installs in seconds.
          </p>
          <motion.a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "1.05rem 2.4rem",
              background: "#000000",
              color: "#FFFFFF",
              borderRadius: "9999px",
              fontWeight: 600,
              fontSize: "1.05rem",
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Download size={20} color="#FFFFFF" /> Download Ohm {latestTag}
          </motion.a>
          <p style={{ marginTop: "2.75rem", color: "#9ca3af", fontSize: "0.85rem" }}>
            © 2026 Nexora Studio. Crafted by @vinnssmokee.
          </p>
        </div>
      </footer>

      {/* Release Notes & SHA-256 Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            background: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "88vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: "1.5rem 2rem",
                borderBottom: "1px solid var(--surface-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.18rem", fontWeight: 700, margin: 0 }}>
                  Ohm {latestTag} — Lyric Cards, Sound Receipt &amp; Pure Audio
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0.25rem 0 0" }}>
                  Released {releaseDate}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close release modal"
                style={{
                  background: "rgba(0,0,0,0.05)",
                  border: "none",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--foreground)",
                  flexShrink: 0,
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "1.75rem 2rem", display: "flex", flexDirection: "column", gap: "1.35rem" }}>
              <div>
                <h4
                  style={{
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#1f8f56",
                    fontWeight: 700,
                    margin: "0 0 0.75rem",
                  }}
                >
                  What&apos;s New in v0.2.0
                </h4>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "1.1rem",
                    color: "#4b5563",
                    fontSize: "0.93rem",
                    lineHeight: 1.65,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.55rem",
                  }}
                >
                  <li>
                    <strong>Lyric Card Studio:</strong> Pick 1–4 lyric lines or use Best Part
                    auto-detection, style with Obsidian Matte, Editorial Paper, or Cover Palette,
                    and export crisp PNG cards.
                  </li>
                  <li>
                    <strong>Your Sound Receipt:</strong> Generate a shareable weekly or all-time
                    listening receipt with your top tracks, top artist, and total listening time.
                  </li>
                  <li>
                    <strong>Discord Rich Presence:</strong> Display your active track, artist, and
                    live playback timer on Discord automatically.
                  </li>
                  <li>
                    <strong>Cleaner Audio &amp; Volume Leveling:</strong> Smart Opus/AAC stream
                    selection, Pure Path filter bypass, live codec/bitrate readout, and loudness
                    normalization.
                  </li>
                  <li>
                    <strong>Smoother UI &amp; Faster Startup:</strong> 60fps Stage transitions,
                    smaller bundle footprint, and hardened in-app updater.
                  </li>
                </ul>
              </div>

              <div
                style={{
                  padding: "0.95rem 1rem",
                  borderRadius: "10px",
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#6b7280",
                    }}
                  >
                    Installer SHA-256 Checksum (Ohm-Setup-0.2.0.exe)
                  </div>
                  <button
                    type="button"
                    onClick={copyChecksum}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      background: "#ffffff",
                      color: copiedSha ? "#1f8f56" : "#374151",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {copiedSha ? <Check size={12} /> : <Copy size={12} />}
                    {copiedSha ? "Copied" : "Copy"}
                  </button>
                </div>
                <code
                  style={{
                    fontSize: "0.78rem",
                    wordBreak: "break-all",
                    color: "var(--foreground)",
                  }}
                >
                  {OHM_SHA256}
                </code>
              </div>

              <div
                style={{
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--surface-border)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#6b7280",
                    marginBottom: "0.4rem",
                  }}
                >
                  Previous Release — v0.1.0 (November 14, 2026)
                </div>
                <p style={{ margin: 0, fontSize: "0.86rem", color: "#6b7280", lineHeight: 1.6 }}>
                  Initial Windows release featuring dual-deck crossfade, 3-band EQ presets, sleep
                  timer, live synced lyrics, Explore discovery, and System Tray controls.
                </p>
              </div>
            </div>

            <div
              style={{
                padding: "1.25rem 2rem",
                borderTop: "1px solid var(--surface-border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <a
                href={releasePageUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.86rem",
                  fontWeight: 600,
                  color: "#4b5563",
                  textDecoration: "none",
                }}
              >
                View on GitHub <ExternalLink size={14} />
              </a>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.65rem 1.35rem",
                  background: "#000000",
                  color: "#FFFFFF",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                <Download size={16} color="#FFFFFF" /> Download Installer
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
