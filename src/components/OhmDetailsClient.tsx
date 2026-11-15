"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Cpu,
  Download,
  Headphones,
  Keyboard,
  ListMusic,
  Mic2,
  Moon,
  Radio,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
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
  assets?: GitHubAsset[];
  html_url?: string;
}

gsap.registerPlugin(ScrollTrigger);

const OHM_SHA256 = "93796c3de6e29ad2689eb997b5517bd20be135865bfc77ba15ba57387f78c6c5";

export default function OhmDetailsClient({ app }: { app: AppData }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "playback" | "navigation">("all");
  const [downloadUrl, setDownloadUrl] = useState<string>(
    app.downloadUrl ||
      "https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v0.1.0-ohm/Ohm-Setup-0.1.0.exe"
  );
  const [latestTag, setLatestTag] = useState<string>("v0.1.0");

  useEffect(() => {
    let isMounted = true;
    const fetchLatestOhmRelease = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/repos/AlvinSyahril/Nexora-Studio/releases",
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        if (!res.ok) return;
        const releases: GitHubRelease[] = await res.json();
        if (!Array.isArray(releases) || releases.length === 0) return;

        const ohmRelease = releases.find(
          (r: GitHubRelease) => r.tag_name && r.tag_name.toLowerCase().includes("ohm")
        );

        if (ohmRelease && isMounted) {
          const cleanVer = ohmRelease.tag_name?.replace(/-ohm$/i, "");
          if (cleanVer) setLatestTag(cleanVer);

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

      gsap.to("[data-animate='mockup']", {
        y: -12,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.9,
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
      className={styles.showcaseWrapper}
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
                <Sparkles size={12} /> RELEASE
              </span>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>
                Ohm {latestTag} for Windows
              </span>
              <span style={{ color: "#9ca3af", paddingRight: "0.25rem", fontWeight: 600 }}>→</span>
            </button>
          </div>

          <h1
            data-animate="hero-element"
            className="display-font"
            style={{
              fontSize: "clamp(2.85rem, 6.2vw, 5rem)",
              lineHeight: 1.04,
              color: "var(--foreground)",
              margin: 0,
            }}
          >
            Music Playback,
            <br />
            Distilled to Focus.
          </h1>

          <p
            data-animate="hero-element"
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              maxWidth: "510px",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            A lean dark-mode desktop player with a dual-deck crossfade engine, 3-band EQ presets,
            live synced lyrics, and Windows system tray controls. Built without ads, accounts, or
            telemetry.
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
              <ShieldCheck size={16} /> Zero Telemetry
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Zap size={16} /> Dual-Deck Crossfade
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Headphones size={16} /> Windows 10 / 11 (x64)
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
                padding: "0 1rem",
                gap: "0.5rem",
                userSelect: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F" }} />
              </div>
              <div
                style={{
                  margin: "0 auto",
                  fontSize: "0.74rem",
                  fontFamily: "var(--font-mono)",
                  color: "#a0a8a3",
                }}
              >
                ohm // dual-deck audio engine
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "0.66rem",
                  color: "#2eb872",
                  fontWeight: 600,
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
                <span>READY</span>
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
            Interactive Interface Tour
          </span>
          <h2
            className="display-font"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              color: "var(--foreground)",
              marginTop: "0.5rem",
            }}
          >
            Inspect Every View Before Installing.
          </h2>
          <p
            style={{
              color: "#6b7280",
              fontSize: "1.08rem",
              maxWidth: "640px",
              margin: "0.75rem auto 0",
            }}
          >
            Switch between Home, Now Playing Stage, 3-Band EQ, Queue, Explore, and Library views.
          </p>
        </div>

        <OhmMockupSwitcher />
      </section>

      {/* Core Engineering Pillars */}
      <section className={styles.container} style={{ padding: "4rem 1.5rem 6rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            style={{
              color: "#6b7280",
              fontWeight: 600,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Audio Architecture
          </span>
          <h2
            className="display-font"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--foreground)",
              marginTop: "0.5rem",
            }}
          >
            Engineered for Uninterrupted Listening.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          <div
            data-animate="feature"
            style={{
              padding: "2rem",
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
              borderRadius: "12px",
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
                marginBottom: "1.5rem",
              }}
            >
              <SlidersHorizontal size={20} />
            </div>
            <h3 style={{ fontSize: "1.22rem", fontWeight: 600, marginBottom: "0.6rem" }}>
              Dual-Deck Web Audio Graph
            </h3>
            <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
              Two independent audio decks route through a real-time low-shelf, mid-peak, and
              high-shelf filter chain so crossfades stay smooth and EQ never clips.
            </p>
          </div>

          <div
            data-animate="feature"
            style={{
              padding: "2rem",
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
              borderRadius: "12px",
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
                marginBottom: "1.5rem",
              }}
            >
              <Mic2 size={20} />
            </div>
            <h3 style={{ fontSize: "1.22rem", fontWeight: 600, marginBottom: "0.6rem" }}>
              Live Time-Synced Lyrics
            </h3>
            <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
              Press L to open the full-screen Now Playing Stage with high-res album art, live
              synced lyrics, and one-click radio seeding from the active track.
            </p>
          </div>

          <div
            data-animate="feature"
            style={{
              padding: "2rem",
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
              borderRadius: "12px",
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
                marginBottom: "1.5rem",
              }}
            >
              <Cpu size={20} />
            </div>
            <h3 style={{ fontSize: "1.22rem", fontWeight: 600, marginBottom: "0.6rem" }}>
              Native Windows Tray Shell
            </h3>
            <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
              Frameless dark desktop window backed by an embedded local streaming server, system
              tray playback controls, and SHA-256 verified in-app updates.
            </p>
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts Section */}
      <section className={styles.keyboardSection}>
        <div className={styles.keyboardHeader}>
          <span
            style={{
              color: "#6b7280",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Keyboard Mastery
          </span>
          <h2 className={styles.keyboardSectionTitle}>Control Playback Without Lifting Your Hands</h2>
          <p className={styles.keyboardSectionDesc}>
            Every core action in Ohm has a clean shortcut. Filter by category below.
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
              color: "#6b7280",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Built-In Capabilities
          </span>
          <h2 className={styles.bentoSectionTitle}>Everything You Need. Nothing Else.</h2>
          <p className={styles.bentoSectionDesc}>
            Focused audio tooling engineered cleanly inside a lightweight desktop footprint.
          </p>
        </div>

        <div className={styles.bentoGrid}>
          <div className={styles.bentoCard}>
            <div className={styles.bentoCardInner}>
              <div className={styles.bentoCardIcon}>
                <Radio size={24} />
              </div>
              <h3 className={styles.bentoCardTitle}>Algorithmic Radio & Autoplay</h3>
              <p className={styles.bentoCardDesc}>
                Start an instant radio mix from any track or let Autoplay queue similar songs
                automatically when your playlist wraps up.
              </p>
              <div className={styles.bentoCardFeatures}>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Pre-warmed next-track stream cache</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Adaptive Home recommendations</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Instant typeahead search suggestions</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bentoCard}>
            <div className={styles.bentoCardInner}>
              <div className={styles.bentoCardIcon}>
                <SlidersHorizontal size={24} />
              </div>
              <h3 className={styles.bentoCardTitle}>3-Band EQ & Crossfade</h3>
              <p className={styles.bentoCardDesc}>
                Dial Bass, Vocals, and Treble independently or pick from Balanced, Warm Bass, Clear
                Vocals, and Late Night curves.
              </p>
              <div className={styles.bentoCardFeatures}>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Off, 3s, and 6s dual-deck overlap</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>-6 dB to +6 dB fine adjustment</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Double-click any band to reset flat</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bentoCard}>
            <div className={styles.bentoCardInner}>
              <div className={styles.bentoCardIcon}>
                <ListMusic size={24} />
              </div>
              <h3 className={styles.bentoCardTitle}>Playlists, Library & Queue</h3>
              <p className={styles.bentoCardDesc}>
                Organize Songs, Albums, Artists, Liked Songs, Recently Played, and custom playlists
                with drag-and-drop queue ordering.
              </p>
              <div className={styles.bentoCardFeatures}>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Save active queue into a playlist</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Artist profiles & album collections</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Local persistence with zero sign-in</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bentoCard}>
            <div className={styles.bentoCardInner}>
              <div className={styles.bentoCardIcon}>
                <Moon size={24} />
              </div>
              <h3 className={styles.bentoCardTitle}>Sleep Timer & Tray Controls</h3>
              <p className={styles.bentoCardDesc}>
                Set a 15m, 30m, 60m, or end-of-track sleep timer with gentle volume fade-out, and
                keep playback accessible from the Windows tray.
              </p>
              <div className={styles.bentoCardFeatures}>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Smooth sleep attenuation curve</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>Explore feed for new releases & charts</span>
                </div>
                <div className={styles.bentoFeatureItem}>
                  <div className={styles.bentoFeatureDot} />
                  <span>SHA-256 verified in-app updates</span>
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
            Press Play With Ohm.
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "2.25rem", fontSize: "1.1rem" }}>
            Download the Windows desktop installer and enjoy distraction-free music playback with
            dual-deck crossfade, EQ, and synced lyrics.
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
            <Download size={20} color="#FFFFFF" /> Download Ohm for Windows
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
              maxWidth: "580px",
              maxHeight: "85vh",
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
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>
                  Ohm {latestTag} — Initial Desktop Release
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0.25rem 0 0" }}>
                  Released November 14, 2026
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
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "1.75rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <h4
                  style={{
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#1f8f56",
                    fontWeight: 700,
                    margin: "0 0 0.75rem",
                  }}
                >
                  Release Highlights
                </h4>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "1.1rem",
                    color: "#4b5563",
                    fontSize: "0.94rem",
                    lineHeight: 1.65,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <li>
                    Initial Windows desktop release with embedded loopback audio streaming engine.
                  </li>
                  <li>
                    Dual-deck crossfade, 3-band EQ with presets, sleep timer, synced lyrics, and
                    Explore discovery.
                  </li>
                  <li>
                    System Tray controls, frameless dark window, and SHA-256 verified in-app update
                    notifications.
                  </li>
                </ul>
              </div>

              <div
                style={{
                  padding: "0.9rem 1rem",
                  borderRadius: "10px",
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#6b7280",
                    marginBottom: "0.35rem",
                  }}
                >
                  Installer SHA-256 Checksum (Ohm-Setup-0.1.0.exe)
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
            </div>

            <div
              style={{
                padding: "1.25rem 2rem",
                borderTop: "1px solid var(--surface-border)",
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.75rem",
              }}
            >
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
