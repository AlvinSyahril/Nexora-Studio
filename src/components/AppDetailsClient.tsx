"use client";

import React, { useEffect, useRef } from "react";
import styles from "../app/apps/[id]/page.module.css";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Cloud, 
  Globe, 
  Bell, 
  Heart, 
  Sun, 
  HardDrive, 
  Star, 
  Edit3, 
  LayoutDashboard, 
  Link2, 
  Table,
  Download, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  FolderTree, 
  Cpu, 
  AlertTriangle, 
  X,
  RefreshCw
} from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import FaqAccordion from "./FaqAccordion";
import ScreenshotGallery from "./ScreenshotGallery";
import DownloadButton from "./DownloadButton";
import ArchitectureDownloadModal from "./ArchitectureDownloadModal";
import DesktopMockupSwitcher from "./DesktopMockupSwitcher";
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

export default function AppDetailsClient({ app }: { app: AppData }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'all' | 'global' | 'editor'>('all');
  const [downloadUrl, setDownloadUrl] = React.useState<string>(
    app.downloadUrl || "https://github.com/AlvinSyahril/Nexora-Studio/releases"
  );

  useEffect(() => {
    if (app.id !== "loom") return;

    let isMounted = true;
    const fetchLatestLoomRelease = async () => {
      try {
        const res = await fetch("https://api.github.com/repos/AlvinSyahril/Nexora-Studio/releases", {
          headers: { Accept: "application/vnd.github.v3+json" }
        });
        if (!res.ok) return;
        const releases: GitHubRelease[] = await res.json();
        if (!Array.isArray(releases) || releases.length === 0) return;

        const loomRelease = releases.find((r: GitHubRelease) =>
          r.tag_name && (r.tag_name.toLowerCase().includes("loom") || (!r.tag_name.toLowerCase().includes("gtd") && !r.tag_name.toLowerCase().includes("oasis")))
        ) || releases[0];

        if (loomRelease && isMounted) {
          if (Array.isArray(loomRelease.assets) && loomRelease.assets.length > 0) {
            const exeAsset = loomRelease.assets.find((a: GitHubAsset) =>
              typeof a.name === "string" && a.name.toLowerCase().endsWith(".exe")
            );
            if (exeAsset?.browser_download_url) {
              setDownloadUrl(exeAsset.browser_download_url);
              return;
            }
          }
          if (loomRelease.html_url) {
            setDownloadUrl(loomRelease.html_url);
          }
        }
      } catch {
        // Fallback remains as app.downloadUrl
      }
    };

    fetchLatestLoomRelease();
    return () => {
      isMounted = false;
    };
  }, [app.id]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav entrance
      gsap.from("[data-animate='nav']", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Hero stagger
      gsap.from("[data-animate='hero-element']", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.2,
      });

      // Hero mockup float
      gsap.to("[data-animate='mockup']", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1, // Start after entrance
      });

      // Features ScrollTriggers
      const features = gsap.utils.toArray<HTMLElement>("[data-animate='feature']");
      features.forEach((feature) => {
        gsap.from(feature, {
          scrollTrigger: {
            trigger: feature,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  if (app.id === "loom") {
    return (
      <div 
        className={styles.showcaseWrapper} 
        ref={wrapperRef}
        style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}
      >
        {/* Navbar */}
        <nav className={`${styles.container} ${styles.nav}`} data-animate="nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
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
                  background: "var(--surface)"
                }}
              >
                <ArrowLeft size={16} /> <span className={styles.backText}>Back</span>
              </Link>
            </motion.div>
            <div className={styles.navBrand}>
              <div className={styles.navLogo} style={{ borderRadius: "8px", overflow: "hidden" }}>
                <Image src="/showcase/loom/logo.png" alt="Loom Logo" width={38} height={38} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className={styles.navTitle} style={{ color: "var(--foreground)", fontWeight: 600 }}>Loom</span>
                <span style={{ 
                  fontSize: "0.7rem", 
                  fontWeight: 600, 
                  background: "rgba(0,0,0,0.05)", 
                  color: "#6b7280", 
                  padding: "0.2rem 0.5rem", 
                  borderRadius: "4px",
                  letterSpacing: "0.05em"
                }}>
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
                transition: "color 0.2s ease"
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
                textDecoration: "none"
              }}
            >
              <Download size={16} color="#FFFFFF" /> Download .exe
            </motion.a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className={`${styles.container}`} style={{ padding: "6rem 2rem 4rem", maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: "3rem", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Premium Agency Update Pill */}
            <div 
              data-animate="hero-element" 
              style={{ display: "flex", justifyContent: "flex-start", width: "100%", marginBottom: "1rem" }}
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
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  color: "#111827"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.06)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ 
                  background: "#111827", 
                  color: "#ffffff", 
                  padding: "0.25rem 0.75rem", 
                  borderRadius: "9999px", 
                  fontSize: "0.7rem", 
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}>
                  <Sparkles size={12} /> LATEST
                </span>
                <span style={{ 
                  fontSize: "0.85rem", 
                  fontWeight: 600,
                  color: "#374151"
                }}>
                  Loom v1.0.1 is available
                </span>
                <span style={{ color: "#9ca3af", paddingRight: "0.25rem", fontWeight: 600 }}>→</span>
              </button>
            </div>

            <h1 
              data-animate="hero-element"
              className="display-font"
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                lineHeight: 1.05,
                color: "var(--foreground)",
                margin: 0
              }}
            >
              Your Notes and<br />Ideas, Connected.
            </h1>

            <p 
              data-animate="hero-element"
              style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                maxWidth: "500px",
                lineHeight: 1.6,
                margin: 0
              }}
            >
              Write in standard Markdown, connect related concepts on a visual graph, and organize projects on a Kanban board. Everything saves directly to your hard drive.
            </p>

            <div 
              data-animate="hero-element"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: "1rem"
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
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)"
                }}
              >
                <Download size={18} color="#FFFFFF" /> Download for Windows
              </motion.a>
            </div>

            {/* Quick Spec Pills */}
            <div 
              data-animate="hero-element"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                color: "#6b7280",
                fontSize: "0.85rem",
                fontWeight: 500,
                marginTop: "1rem"
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <ShieldCheck size={16} /> Local-First & Private
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Zap size={16} /> Zero Latency
              </span>
            </div>
          </div>

          {/* Desktop Window Mockup Preview */}
          <div 
            data-animate="mockup" 
            style={{ 
              width: "100%", 
              position: "relative",
              maxWidth: "600px",
              margin: "0 auto"
            }}
          >
            <div
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                boxShadow: "0 20px 45px -10px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)",
                background: "#FAFAFA"
              }}
            >
              {/* Window Titlebar */}
              <div
                style={{
                  height: "36px",
                  background: "#F5F5F7",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 1rem",
                  gap: "0.5rem",
                  userSelect: "none"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56", border: "1px solid rgba(0,0,0,0.1)" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E", border: "1px solid rgba(0,0,0,0.1)" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F", border: "1px solid rgba(0,0,0,0.1)" }} />
                </div>
                <div style={{ margin: "0 auto", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "#737373", letterSpacing: "-0.01em" }}>
                  loom // vault-local / workspace.md
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", color: "#16a34a", fontWeight: 600 }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a", display: "inline-block" }}></span>
                  <span>SYNCED</span>
                </div>
              </div>

              {/* Window Content / Mockup Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  background: "#111111",
                  overflow: "hidden"
                }}
              >
                <Image
                  src="/showcase/loom/home.png"
                  alt="Loom Workspace Dashboard"
                  fill
                  priority
                  unoptimized
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 600px"
                  style={{
                    objectFit: "contain",
                    objectPosition: "top center",
                    display: "block"
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Desktop Showcase Section */}
        <section id="showcase" className={`${styles.container}`} style={{ padding: "4rem 1.5rem 6rem", background: "var(--background)" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ 
              color: "#6b7280", 
              fontWeight: 600, 
              fontSize: "0.75rem", 
              letterSpacing: "0.1em",
              textTransform: "uppercase" 
            }}>
              Interactive Workspace Experience
            </span>
            <h2 className="display-font" style={{ 
              fontSize: "clamp(2rem, 4vw, 3.25rem)", 
              color: "var(--foreground)", 
              marginTop: "0.5rem" 
            }}>
              Click Any Menu to Preview The Interface.
            </h2>
            <p style={{ 
              color: "#6b7280", 
              fontSize: "1.1rem", 
              maxWidth: "640px", 
              margin: "0.75rem auto 0" 
            }}>
              Test-drive the actual views of Loom directly from your browser. Every module is crafted to keep you in effortless flow.
            </p>
          </div>

          <DesktopMockupSwitcher />
        </section>

        {/* Deep Pillars Grid */}
        <section className={`${styles.container}`} style={{ padding: "4rem 1.5rem 7rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ color: "#6b7280", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Core Philosophy
            </span>
            <h2 className="display-font" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)", marginTop: "0.5rem" }}>
              Built for Those Who Demand Craftsmanship.
            </h2>
          </div>

          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem"
            }}
          >
            {/* Pillar 1 */}
            <div style={{ padding: "2rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "12px", boxShadow: "var(--shadow-card)" }}>
              <div 
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "rgba(0,0,0,0.04)",
                  color: "var(--foreground)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem"
                }}
              >
                <FolderTree size={20} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.65rem", letterSpacing: "-0.01em" }}>
                Bi-Directional Knowledge Graph
              </h3>
              <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
                Your brain doesn’t think in rigid silos. Connect ideas dynamically with [[wiki-links]] and tags, and watch your thoughts self-organize into a luminous, interactive 2D mind palace.
              </p>
            </div>

            {/* Pillar 2 */}
            <div style={{ padding: "2rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "12px", boxShadow: "var(--shadow-card)" }}>
              <div 
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "rgba(0,0,0,0.04)",
                  color: "var(--foreground)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem"
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.65rem", letterSpacing: "-0.01em" }}>
                Sovereign & Local-First
              </h3>
              <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
                Your private thoughts should never sit in someone else’s cloud database. Loom stores everything in standard, human-readable markdown on your disk. Works 100% offline, anywhere.
              </p>
            </div>

            {/* Pillar 3 */}
            <div style={{ padding: "2rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "12px", boxShadow: "var(--shadow-card)" }}>
              <div 
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "rgba(0,0,0,0.04)",
                  color: "var(--foreground)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem"
                }}
              >
                <Cpu size={20} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.65rem", letterSpacing: "-0.01em" }}>
                Hyper-Speed Frictionless Engine
              </h3>
              <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
                Engineered with typed IPC contracts, instant full-text search, and quick capture hotkeys. No loading spinners, no bloated memory leaks, just pure fluid responsiveness.
              </p>
            </div>
          </div>
        </section>

        {/* Keyboard Shortcuts Section */}
                <section className={`${styles.keyboardSection}`}>
                  <div className={`${styles.keyboardHeader}`}>
                    <span style={{ 
                      color: "#6b7280", 
                      fontWeight: 600, 
                      fontSize: "0.75rem", 
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" 
                    }}>
                      Keyboard Mastery
                    </span>
                    <h2 className={`${styles.keyboardSectionTitle}`}>
                      Interactive Keyboard Shortcuts
                    </h2>
                    <p className={`${styles.keyboardSectionDesc}`}>
                      Discover the power of Loom's keyboard-driven workflows. Click a tab to filter shortcuts.
                    </p>
                  </div>

                  <div className={`${styles.keyboardTabs}`}>
                    <button 
                      className={`${styles.keyboardTab} ${activeTab === 'all' ? styles.keyboardTabActive : ''}`}
                      onClick={() => setActiveTab('all')}
                    >All Shortcuts</button>
                    <button 
                      className={`${styles.keyboardTab} ${activeTab === 'global' ? styles.keyboardTabActive : ''}`}
                      onClick={() => setActiveTab('global')}
                    >Global Desktop</button>
                    <button 
                      className={`${styles.keyboardTab} ${activeTab === 'editor' ? styles.keyboardTabActive : ''}`}
                      onClick={() => setActiveTab('editor')}
                    >Editor & Flow</button>
                  </div>

                  <div className={`${styles.keyboardGrid}`}>
                    {activeTab === 'all' || activeTab === 'global' ? (
                                          <div className={`${styles.keyboardCategory}`} style={{ animation: 'fadeIn 0.4s ease forwards' }}>
                                            <div className={`${styles.keyboardCategoryTitle}`}>
                                              <div className={`${styles.keyboardCategoryIcon}`}>
                                                <Globe size={20} />
                                              </div>
                                              <span>Global Desktop</span>
                                            </div>

                                            <div className={`${styles.shortcutList}`}>
                                              <div className={`${styles.shortcutItem}`}>
                                                <div className={`${styles.shortcutKeys}`}>
                                                  <span className={`${styles.shortcutKbd} ${styles.shortcutKbdModifier}`}>Alt</span>
                                                  <span className={`${styles.shortcutPlus}`}>+</span>
                                                  <span className={`${styles.shortcutKbd}`}>Space</span>
                                                </div>
                                                <span className={`${styles.shortcutDesc}`}>Floating Desktop Quick Capture</span>
                                              </div>

                                              <div className={`${styles.shortcutItem}`}>
                                                <div className={`${styles.shortcutKeys}`}>
                                                  <span className={`${styles.shortcutKbd} ${styles.shortcutKbdModifier}`}>Ctrl</span>
                                                  <span className={`${styles.shortcutPlus}`}>+</span>
                                                  <span className={`${styles.shortcutKbd}`}>Space</span>
                                                </div>
                                                <span className={`${styles.shortcutDesc}`}>Brain Dump Fullscreen</span>
                                              </div>

                                              <div className={`${styles.shortcutItem}`}>
                                                <div className={`${styles.shortcutKeys}`}>
                                                  <span className={`${styles.shortcutKbd} ${styles.shortcutKbdModifier}`}>Ctrl</span>
                                                  <span className={`${styles.shortcutPlus}`}>+</span>
                                                  <span className={`${styles.shortcutKbd} ${styles.shortcutKbdModifier}`}>Alt</span>
                                                  <span className={`${styles.shortcutPlus}`}>+</span>
                                                  <span className={`${styles.shortcutKbd}`}>H</span>
                                                </div>
                                                <span className={`${styles.shortcutDesc}`}>Stealth Mode</span>
                                              </div>

                                              <div className={`${styles.shortcutItem}`}>
                                                <div className={`${styles.shortcutKeys}`}>
                                                  <span className={`${styles.shortcutKbd} ${styles.shortcutKbdModifier}`}>Ctrl</span>
                                                  <span className={`${styles.shortcutPlus}`}>+</span>
                                                  <span className={`${styles.shortcutKbd}`}>S</span>
                                                </div>
                                                <span className={`${styles.shortcutDesc}`}>Global Search</span>
                                              </div>

                                              <div className={`${styles.shortcutItem}`}>
                                                <div className={`${styles.shortcutKeys}`}>
                                                  <span className={`${styles.shortcutKbd} ${styles.shortcutKbdModifier}`}>Ctrl</span>
                                                  <span className={`${styles.shortcutPlus}`}>+</span>
                                                  <span className={`${styles.shortcutKbd}`}>K</span>
                                                </div>
                                                <span className={`${styles.shortcutDesc}`}>Command Palette</span>
                                              </div>

                                              <div className={`${styles.shortcutItem}`}>
                                                <div className={`${styles.shortcutKeys}`}>
                                                  <span className={`${styles.shortcutKbd} ${styles.shortcutKbdModifier}`}>Ctrl</span>
                                                  <span className={`${styles.shortcutPlus}`}>+</span>
                                                  <span className={`${styles.shortcutKbd}`}>N</span>
                                                </div>
                                                <span className={`${styles.shortcutDesc}`}>New Document / Tab</span>
                                              </div>
                                            </div>
                                          </div>
                                        ) : null}

                                        {activeTab === 'all' || activeTab === 'editor' ? (
                                          <div className={`${styles.keyboardCategory}`} style={{ animation: 'fadeIn 0.4s ease forwards', animationDelay: '0.05s' }}>
                                            <div className={`${styles.keyboardCategoryTitle}`}>
                                              <div className={`${styles.keyboardCategoryIcon}`}>
                                                <Edit3 size={20} />
                                              </div>
                                              <span>Editor & Flow</span>
                                            </div>

                                            <div className={`${styles.shortcutList}`}>
                                              <div className={`${styles.shortcutItem}`}>
                                                <div className={`${styles.shortcutKeys}`}>
                                                  <span className={`${styles.shortcutKbd}`}>F11</span>
                                                </div>
                                                <span className={`${styles.shortcutDesc}`}>Zen Mode</span>
                                              </div>

                                              <div className={`${styles.shortcutItem}`}>
                                                <div className={`${styles.shortcutKeys}`}>
                                                  <span className={`${styles.shortcutKbd} ${styles.shortcutKbdModifier}`}>Ctrl</span>
                                                  <span className={`${styles.shortcutPlus}`}>+</span>
                                                  <span className={`${styles.shortcutKbd}`}>H</span>
                                                </div>
                                                <span className={`${styles.shortcutDesc}`}>Time Machine</span>
                                              </div>

                                              <div className={`${styles.shortcutItem}`}>
                                                <div className={`${styles.shortcutKeys}`}>
                                                  <span className={`${styles.shortcutKbd} ${styles.shortcutKbdModifier}`}>Ctrl</span>
                                                  <span className={`${styles.shortcutPlus}`}>+</span>
                                                  <span className={`${styles.shortcutKbd}`}>J</span>
                                                </div>
                                                <span className={`${styles.shortcutDesc}`}>Daily Journal</span>
                                              </div>

                                              <div className={`${styles.shortcutItem}`}>
                                                <div className={`${styles.shortcutKeys}`}>
                                                  <span className={`${styles.shortcutKbd} ${styles.shortcutKbdModifier}`}>Ctrl</span>
                                                  <span className={`${styles.shortcutPlus}`}>+</span>
                                                  <span className={`${styles.shortcutKbd}`}>E</span>
                                                </div>
                                                <span className={`${styles.shortcutDesc}`}>Multi-Format Export</span>
                                              </div>

                                              <div className={`${styles.shortcutItem}`}>
                                                <div className={`${styles.shortcutKeys}`}>
                                                  <span className={`${styles.shortcutKbd} ${styles.shortcutKbdModifier}`}>Shift</span>
                                                  <span className={`${styles.shortcutPlus}`}>+</span>
                                                  <span className={`${styles.shortcutKbd}`}>B</span>
                                                </div>
                                                <span className={`${styles.shortcutDesc}`}>Auto-Tidy Bento Grid</span>
                                              </div>
                                            </div>
                                          </div>
                                        ) : null}
                  </div>
                </section>

        {/* Bento Grid Killer Features */}
        <section className={`${styles.bentoSection}`}>
          <div className={`${styles.bentoHeader}`}>
            <span style={{ 
              color: "#6b7280", 
              fontWeight: 600, 
              fontSize: "0.75rem", 
              letterSpacing: "0.1em",
              textTransform: "uppercase" 
            }}>
              Killer Features
            </span>
            <h2 className={`${styles.bentoSectionTitle}`}>
              Bento Grid Killer Features
            </h2>
            <p className={`${styles.bentoSectionDesc}`}>
              These unique capabilities set Loom apart from traditional productivity tools.
            </p>
          </div>

          <div className={`${styles.bentoGrid}`}>
            {/* Card 1 */}
            <div className={`${styles.bentoCard}`}>
              <div className={`${styles.bentoCardInner}`}>
                <div className={`${styles.bentoCardIcon}`}>
                  <LayoutDashboard size={24} />
                </div>
                <h3 className={`${styles.bentoCardTitle}`}>Hybrid Canvas & Docs</h3>
                <p className={`${styles.bentoCardDesc}`}>
                  Switch seamlessly between rich text documents and spatial canvas layouts with a single click. The best of both worlds in one unified workspace.
                </p>
                <div className={`${styles.bentoCardFeatures}`}>
                  <div className={`${styles.bentoFeatureItem}`}>
                    <div className={`${styles.bentoFeatureDot}`}></div>
                    <span>Tiptap-powered rich text editor</span>
                  </div>
                  <div className={`${styles.bentoFeatureItem}`}>
                    <div className={`${styles.bentoFeatureDot}`}></div>
                    <span>Tldraw spatial canvas integration</span>
                  </div>
                  <div className={`${styles.bentoFeatureItem}`}>
                    <div className={`${styles.bentoFeatureDot}`}></div>
                    <span>Context-aware transitions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className={`${styles.bentoCard}`}>
              <div className={`${styles.bentoCardInner}`}>
                <div className={`${styles.bentoCardIcon}`}>
                  <Link2 size={24} />
                </div>
                <h3 className={`${styles.bentoCardTitle}`}>Bi-Directional Wiki-Links</h3>
                <p className={`${styles.bentoCardDesc}`}>
                  Connect your ideas with [[wiki-links]] and explore them through an interactive graph view. Your knowledge base becomes a living, breathing network.
                </p>
                <div className={`${styles.bentoCardFeatures}`}>
                  <div className={`${styles.bentoFeatureItem}`}>
                    <div className={`${styles.bentoFeatureDot}`}></div>
                    <span>Markdown-compatible syntax</span>
                  </div>
                  <div className={`${styles.bentoFeatureItem}`}>
                    <div className={`${styles.bentoFeatureDot}`}></div>
                    <span>Interactive graph visualization</span>
                  </div>
                  <div className={`${styles.bentoFeatureItem}`}>
                    <div className={`${styles.bentoFeatureDot}`}></div>
                    <span>Tag-based navigation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className={`${styles.bentoCard}`}>
              <div className={`${styles.bentoCardInner}`}>
                <div className={`${styles.bentoCardIcon}`}>
                                  <Table size={24} />
                                </div>
                <h3 className={`${styles.bentoCardTitle}`}>True Multi-Tab Engine</h3>
                <p className={`${styles.bentoCardDesc}`}>
                  Work with multiple documents and canvases simultaneously, just like a modern browser. Never lose your place in your creative flow.
                </p>
                <div className={`${styles.bentoCardFeatures}`}>
                  <div className={`${styles.bentoFeatureItem}`}>
                    <div className={`${styles.bentoFeatureDot}`}></div>
                    <span>Tab persistence across sessions</span>
                  </div>
                  <div className={`${styles.bentoFeatureItem}`}>
                    <div className={`${styles.bentoFeatureDot}`}></div>
                    <span>Tab group organization</span>
                  </div>
                  <div className={`${styles.bentoFeatureItem}`}>
                    <div className={`${styles.bentoFeatureDot}`}></div>
                    <span>Cross-document references</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className={`${styles.bentoCard}`}>
              <div className={`${styles.bentoCardInner}`}>
                <div className={`${styles.bentoCardIcon}`}>
                  <HardDrive size={24} />
                </div>
                <h3 className={`${styles.bentoCardTitle}`}>Zero Cloud Lock-in</h3>
                <p className={`${styles.bentoCardDesc}`}>
                  Your data stays yours. Export your entire knowledge base as a single .kns archive file that works anywhere, anytime.
                </p>
                <div className={`${styles.bentoCardFeatures}`}>
                  <div className={`${styles.bentoFeatureItem}`}>
                    <div className={`${styles.bentoFeatureDot}`}></div>
                    <span>Local-first architecture</span>
                  </div>
                  <div className={`${styles.bentoFeatureItem}`}>
                    <div className={`${styles.bentoFeatureDot}`}></div>
                    <span>One-click export/import</span>
                  </div>
                  <div className={`${styles.bentoFeatureItem}`}>
                    <div className={`${styles.bentoFeatureDot}`}></div>
                    <span>Human-readable markdown</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem 6rem" }}>
          <FaqAccordion appId="loom" />
        </div>

        {/* Footer CTA */}
        <footer 
          style={{
            background: "var(--background)",
            borderTop: "1px solid var(--surface-border)",
            padding: "6rem 1.5rem 4rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
            <h2 className="display-font" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)", marginBottom: "1rem" }}>
              Start writing with Loom.
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "2.5rem", fontSize: "1.1rem" }}>
              Install Loom and start organizing your thoughts locally in standard Markdown files. Free, private, and offline-ready.
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
                padding: "1.1rem 2.5rem",
                background: "#000000",
                color: "#FFFFFF",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "1.05rem",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
              }}
            >
              <Download size={20} color="#FFFFFF" /> Download Loom for Windows
            </motion.a>
            <p style={{ marginTop: "3rem", color: "#9ca3af", fontSize: "0.85rem" }}>
              © 2026 Nexora Studio. Crafted with obsession by @vinnssmokee.
            </p>
          </div>
        </footer>

        {/* Premium Changelog Modal */}
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
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(8px)",
              animation: "fadeIn 0.2s ease-out"
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
                maxHeight: "85vh",
                overflowY: "auto",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                display: "flex",
                flexDirection: "column",
                animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              onClick={e => e.stopPropagation()}
              className="custom-scrollbar"
            >
              <div style={{ 
                padding: "1.5rem 2rem", 
                borderBottom: "1px solid var(--surface-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "sticky",
                top: 0,
                background: "var(--surface)",
                zIndex: 10
              }}>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--foreground)" }}>What's New in v1.0.1</h3>
                  <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0.25rem 0 0 0" }}>September 2026 Update</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
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
                    transition: "background 0.2s ease"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.05)"}
                >
                  <X size={18} />
                </button>
              </div>
              
              <div style={{ padding: "2rem" }}>
                {/* Feature Highlights */}
                <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#10B981", fontWeight: 700, marginBottom: "1rem" }}>
                  Hotfixes & Stability
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <li style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ marginTop: "4px", color: "#10B981" }}><AlertTriangle size={18} /></div>
                    <div>
                      <strong style={{ display: "block", color: "var(--foreground)", fontSize: "0.95rem", marginBottom: "0.25rem" }}>Tldraw Infinite Canvas Restored</strong>
                      <span style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.5, display: "block" }}>The v1.0.0 bug causing the Edgeless mode to suddenly disappear has been completely bypassed and patched.</span>
                    </div>
                  </li>
                  <li style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ marginTop: "4px", color: "#10B981" }}><AlertTriangle size={18} /></div>
                    <div>
                      <strong style={{ display: "block", color: "var(--foreground)", fontSize: "0.95rem", marginBottom: "0.25rem" }}>Prevent Workspace Reset</strong>
                      <span style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.5, display: "block" }}>Resolved startup storage race condition with a hydration gate splash screen ensuring notes are fully loaded.</span>
                    </div>
                  </li>
                </ul>

                <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#3B82F6", fontWeight: 700, marginBottom: "1rem" }}>
                  New Features
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <li style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ marginTop: "4px", color: "#3B82F6" }}><LayoutDashboard size={18} /></div>
                    <div>
                      <strong style={{ display: "block", color: "var(--foreground)", fontSize: "0.95rem", marginBottom: "0.25rem" }}>Modern Bento Grid Layouts</strong>
                      <span style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.5, display: "block" }}>Tags, Collections, and Favorites redesigned into responsive bento cards with micro-elevation and smooth hover feedback.</span>
                    </div>
                  </li>
                  <li style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ marginTop: "4px", color: "#3B82F6" }}><ShieldCheck size={18} /></div>
                    <div>
                      <strong style={{ display: "block", color: "var(--foreground)", fontSize: "0.95rem", marginBottom: "0.25rem" }}>Safe Deletion Dialogs</strong>
                      <span style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.5, display: "block" }}>Clear confirmation prompts before deleting tags or collections ensure your notes stay completely safe in the library.</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div style={{ padding: "1.5rem 2rem", background: "var(--background)", borderTop: "1px solid var(--surface-border)", display: "flex", justifyContent: "flex-end" }}>
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
                    padding: "0.75rem 1.5rem",
                    background: "#000000",
                    color: "#FFFFFF",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                  }}
                >
                  <Download size={16} color="#FFFFFF" /> Download v1.0.1
                </motion.a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (app.id === "oasis") {
    return (
      <div 
        className={styles.showcaseWrapper} 
        ref={wrapperRef}
        style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}
      >
        {/* Navbar */}
        <nav className={`${styles.container} ${styles.nav}`} data-animate="nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
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
                  background: "var(--surface)"
                }}
              >
                <ArrowLeft size={16} /> <span className={styles.backText}>Back</span>
              </Link>
            </motion.div>
            <div className={styles.navBrand}>
              <div className={styles.navLogo} style={{ borderRadius: "8px", overflow: "hidden" }}>
                <Image src="/showcase/oasis/logo.png" alt="Oasis Logo" width={38} height={38} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className={styles.navTitle} style={{ color: "var(--foreground)", fontWeight: 600 }}>Oasis</span>
                <span className="font-mono-meta" style={{ 
                  fontSize: "0.7rem", 
                  fontWeight: 600, 
                  background: "rgba(0,0,0,0.05)", 
                  color: "#6b7280", 
                  padding: "0.2rem 0.5rem", 
                  borderRadius: "4px",
                  letterSpacing: "0.05em"
                }}>
                  ANDROID // v1.0.3
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
                transition: "color 0.2s ease"
              }}
              className="hidden md:block"
            >
              Architecture & Previews
            </a>
            <motion.button 
              onClick={() => setIsModalOpen(true)}
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
                border: "none",
                cursor: "pointer"
              }}
            >
              <Download size={16} color="#FFFFFF" /> Download .apk
            </motion.button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className={`${styles.container}`} style={{ padding: "6rem 2rem 4rem", maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: "3rem", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Spec Pill */}
            <div 
              data-animate="hero-element" 
              style={{ display: "flex", justifyContent: "flex-start", width: "100%", marginBottom: "1rem" }}
            >
              <motion.button 
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.25rem 0.75rem 0.25rem 0.25rem",
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  color: "#111827"
                }}
              >
                <span style={{ 
                  background: "#111827", 
                  color: "#ffffff", 
                  padding: "0.25rem 0.75rem", 
                  borderRadius: "9999px", 
                  fontSize: "0.7rem", 
                  fontWeight: 600, 
                  letterSpacing: "0.03em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}>
                  <Sparkles size={12} /> LATEST
                </span>
                <span style={{ 
                  fontSize: "0.85rem", 
                  fontWeight: 600, 
                  color: "#374151"
                }}>
                  Oasis v1.0.3 is available
                </span>
                <span style={{ color: "#9ca3af", paddingRight: "0.25rem", fontWeight: 600 }}>→</span>
              </motion.button>
            </div>

            <h1 
              data-animate="hero-element"
              className="display-font"
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                lineHeight: 1.05,
                color: "var(--foreground)",
                margin: 0
              }}
            >
              Your Daily Space to<br />Breathe and Reflect.
            </h1>

            <p 
              data-animate="hero-element"
              style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                maxWidth: "520px",
                lineHeight: 1.6,
                margin: 0
              }}
            >
              Log your mood in two taps, follow guided breathing rhythms when stress hits, and record personal reflections behind a secure PIN code. Includes an on-device conversational assistant for daily check-ins.
            </p>

            <div 
              data-animate="hero-element"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: "1rem"
              }}
            >
              <motion.button 
                onClick={() => setIsModalOpen(true)}
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
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)"
                }}
              >
                <Download size={18} color="#FFFFFF" /> Download Oasis v1.0.3 (.apk)
              </motion.button>
              <motion.a 
                href="#pillars"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.85rem 1.5rem",
                  background: "var(--surface)",
                  color: "var(--foreground)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none"
                }}
              >
                Explore Architecture
              </motion.a>
            </div>

            {/* Quick Spec Badges */}
            <div 
              data-animate="hero-element"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                color: "#6b7280",
                fontSize: "0.85rem",
                fontWeight: 500,
                marginTop: "1rem",
                flexWrap: "wrap"
              }}
            >
              <span className="font-mono-meta" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <ShieldCheck size={16} /> PIN-PROTECTED
              </span>
              <span className="font-mono-meta" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Sparkles size={16} /> ON-DEVICE AI
              </span>
              <span className="font-mono-meta" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Zap size={16} /> ZERO TELEMETRY
              </span>
            </div>
          </div>

          {/* Clean Hardware Smartphone Mockup */}
          <div 
            data-animate="mockup" 
            style={{ 
              width: "100%", 
              position: "relative",
              maxWidth: "340px",
              margin: "0 auto"
            }}
          >
            <div
              style={{
                borderRadius: "44px",
                overflow: "hidden",
                border: "1px solid rgba(0, 0, 0, 0.14)",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                background: "#0D0D0E",
                padding: "10px"
              }}
            >
              {/* Top Punch-Hole / Camera Pill */}
              <div style={{ width: "88px", height: "18px", borderRadius: "10px", background: "#050505", margin: "4px auto 8px" }} />
              
              {/* Mockup Screen Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "9 / 19.5",
                  borderRadius: "32px",
                  overflow: "hidden",
                  background: "#000000"
                }}
              >
                <Image
                  src="/showcase/oasis/welcome.png"
                  alt="Oasis Welcome Screen"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 340px"
                  style={{
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Structured Architectural Pillars Section */}
        <section id="pillars" className={`${styles.container}`} style={{ padding: "5rem 1.5rem 6rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="font-mono-meta" style={{ color: "#6b7280", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.12em" }}>
              [ ARCHITECTURAL PILLARS // SYSTEM DESIGN ]
            </span>
            <h2 className="display-font" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)", marginTop: "0.5rem" }}>
              Private Wellness Engineering
            </h2>
            <p style={{ color: "#6b7280", maxWidth: "620px", margin: "0.75rem auto 0", fontSize: "1.05rem", lineHeight: 1.6 }}>
              Built without cloud telemetry, surveillance SDKs, or algorithmic feeds. Your personal reflections stay strictly on your device.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {/* Pillar 1 */}
            <div style={{ padding: "2rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", color: "var(--foreground)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <Sparkles size={20} />
              </div>
              <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280", display: "block", marginBottom: "0.5rem" }}>PILLAR 01 // LOCAL AI</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.65rem", letterSpacing: "-0.01em" }}>
                Ozie Reflection Assistant
              </h3>
              <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
                Talk through rough moments, small wins, or daily stress whenever you need to reflect. Conversational check-ins run securely without third-party data tracking.
              </p>
            </div>

            {/* Pillar 2 */}
            <div style={{ padding: "2rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", color: "var(--foreground)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <Sun size={20} />
              </div>
              <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280", display: "block", marginBottom: "0.5rem" }}>PILLAR 02 // SOMATIC CADENCE</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.65rem", letterSpacing: "-0.01em" }}>
                Guided Breathing Pacer
              </h3>
              <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
                Visual cadence circles guide your breathing to lower your heart rate in under two minutes with scientifically validated pacing intervals.
              </p>
            </div>

            {/* Pillar 3 */}
            <div style={{ padding: "2rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", color: "var(--foreground)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <LayoutDashboard size={20} />
              </div>
              <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280", display: "block", marginBottom: "0.5rem" }}>PILLAR 03 // ANALYTICS</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.65rem", letterSpacing: "-0.01em" }}>
                Monthly Mood Insights
              </h3>
              <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
                Identify how work habits, exercise, and sleep correlate with your emotional patterns with high-resolution monthly visual analytics.
              </p>
            </div>

            {/* Pillar 4 */}
            <div style={{ padding: "2rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", color: "var(--foreground)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <ShieldCheck size={20} />
              </div>
              <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280", display: "block", marginBottom: "0.5rem" }}>PILLAR 04 // CRYPTOGRAPHY</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.65rem", letterSpacing: "-0.01em" }}>
                PIN-Protected Storage
              </h3>
              <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
                Lock your personal entries, journal logs, and photos on your phone behind cryptographic on-device PIN authentication.
              </p>
            </div>
          </div>
        </section>

        {/* Interface & Native Hardware Mockup Showcase */}
        <section id="showcase" className={`${styles.container}`} style={{ padding: "4rem 1.5rem 6rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="font-mono-meta" style={{ color: "#6b7280", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.12em" }}>
              [ SYSTEM INTERFACE // SCREEN SPECIFICATIONS ]
            </span>
            <h2 className="display-font" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)", marginTop: "0.5rem" }}>
              Interface & Native Workflows
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.1rem", maxWidth: "640px", margin: "0.75rem auto 0", lineHeight: 1.6 }}>
              Engineered for fluid touch interaction, minimal cognitive friction, and immediate comfort.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {/* Screen 1 */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "20px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", boxShadow: "var(--shadow-card)" }}>
              <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280" }}>01 // TEMPORAL LOGGING</span>
              <div style={{ width: "210px", background: "#0D0D0E", borderRadius: "34px", padding: "8px", border: "1px solid rgba(0, 0, 0, 0.12)", boxShadow: "0 16px 36px -10px rgba(0,0,0,0.18)", margin: "1.5rem 0" }}>
                <div style={{ width: "60px", height: "14px", borderRadius: "8px", background: "#050505", margin: "2px auto 6px" }} />
                <div style={{ position: "relative", width: "100%", aspectRatio: "9 / 19.5", borderRadius: "24px", overflow: "hidden", background: "#000" }}>
                  <Image src="/showcase/oasis/history.png" alt="Mood History" fill sizes="210px" style={{ objectFit: "cover" }} />
                </div>
              </div>
              <h4 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--foreground)", margin: "0 0 0.5rem" }}>Visual Mood Timeline</h4>
              <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.5, margin: 0 }}>Log emotions in two taps, maintain streaks, and inspect monthly calendar trends.</p>
            </div>

            {/* Screen 2 */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "20px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", boxShadow: "var(--shadow-card)" }}>
              <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280" }}>02 // DATA SYNTHESIS</span>
              <div style={{ width: "210px", background: "#0D0D0E", borderRadius: "34px", padding: "8px", border: "1px solid rgba(0, 0, 0, 0.12)", boxShadow: "0 16px 36px -10px rgba(0,0,0,0.18)", margin: "1.5rem 0" }}>
                <div style={{ width: "60px", height: "14px", borderRadius: "8px", background: "#050505", margin: "2px auto 6px" }} />
                <div style={{ position: "relative", width: "100%", aspectRatio: "9 / 19.5", borderRadius: "24px", overflow: "hidden", background: "#000" }}>
                  <Image src="/showcase/oasis/insights.png" alt="Oasis Insights" fill sizes="210px" style={{ objectFit: "cover" }} />
                </div>
              </div>
              <h4 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--foreground)", margin: "0 0 0.5rem" }}>Deep Wellness Insights</h4>
              <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.5, margin: 0 }}>Correlate activities with mood trends using comprehensive monthly statistical charts.</p>
            </div>

            {/* Screen 3 */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "20px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", boxShadow: "var(--shadow-card)" }}>
              <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280" }}>03 // LOCAL COMPANION</span>
              <div style={{ width: "210px", background: "#0D0D0E", borderRadius: "34px", padding: "8px", border: "1px solid rgba(0, 0, 0, 0.12)", boxShadow: "0 16px 36px -10px rgba(0,0,0,0.18)", margin: "1.5rem 0" }}>
                <div style={{ width: "60px", height: "14px", borderRadius: "8px", background: "#050505", margin: "2px auto 6px" }} />
                <div style={{ position: "relative", width: "100%", aspectRatio: "9 / 19.5", borderRadius: "24px", overflow: "hidden", background: "#000" }}>
                  <Image src="/showcase/oasis/chat.png" alt="Ozie AI Chat" fill sizes="210px" style={{ objectFit: "cover" }} />
                </div>
              </div>
              <h4 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--foreground)", margin: "0 0 0.5rem" }}>Ozie Reflection Assistant</h4>
              <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.5, margin: 0 }}>Private conversational companion for venting, working through stress, or quiet reflection.</p>
            </div>

            {/* Screen 4 */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "20px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", boxShadow: "var(--shadow-card)" }}>
              <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280" }}>04 // SECURITY VAULT</span>
              <div style={{ width: "210px", background: "#0D0D0E", borderRadius: "34px", padding: "8px", border: "1px solid rgba(0, 0, 0, 0.12)", boxShadow: "0 16px 36px -10px rgba(0,0,0,0.18)", margin: "1.5rem 0" }}>
                <div style={{ width: "60px", height: "14px", borderRadius: "8px", background: "#050505", margin: "2px auto 6px" }} />
                <div style={{ position: "relative", width: "100%", aspectRatio: "9 / 19.5", borderRadius: "24px", overflow: "hidden", background: "#000" }}>
                  <Image src="/showcase/oasis/pin.png" alt="Oasis PIN Lock" fill sizes="210px" style={{ objectFit: "cover" }} />
                </div>
              </div>
              <h4 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--foreground)", margin: "0 0 0.5rem" }}>PIN-Protected Vault</h4>
              <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.5, margin: 0 }}>Secure personal entries and memories behind encrypted on-device PIN authentication.</p>
            </div>
          </div>
        </section>

        {/* Core Capabilities Bento Grid */}
        <section id="all-features" className={`${styles.container}`} style={{ padding: "4rem 1.5rem 6rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="font-mono-meta" style={{ color: "#6b7280", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.12em" }}>
              [ CORE CAPABILITIES // FEATURE MATRIX ]
            </span>
            <h2 className="display-font" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)", marginTop: "0.5rem" }}>
              Everything Built In
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.05rem", maxWidth: "600px", margin: "0.75rem auto 0" }}>
              Complete suite of wellness tools built into a single lightweight Android application.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {/* Card 1 */}
            <div style={{ padding: "1.75rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <Heart size={18} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.5rem" }}>Emergency Warmth</h3>
              <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
                Dims the screen to a soothing dark hue and guides you through instant calming 5-second cadence breathing.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{ padding: "1.75rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <Sun size={18} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.5rem" }}>Weekly Wellness Synthesis</h3>
              <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
                Automated summary generated every Sunday night reviewing emotional stability, top activities, and streaks.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{ padding: "1.75rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <Star size={18} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.5rem" }}>Adaptive Color Palettes</h3>
              <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
                Interface accents subtly adapt to prevailing emotional states, from warm amber tones to serene forest tones.
              </p>
            </div>

            {/* Card 4 */}
            <div style={{ padding: "1.75rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <HardDrive size={18} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.5rem" }}>Local Vault Backup & Export</h3>
              <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
                Export full journal archives and mood timelines to standard CSV and JSON with zero cloud dependency.
              </p>
            </div>

            {/* Card 5 */}
            <div style={{ padding: "1.75rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <Globe size={18} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.5rem" }}>Consistency Milestones</h3>
              <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
                Visual milestone markers celebrate reflective consistency and long-term mindfulness streaks.
              </p>
            </div>
          </div>
        </section>

        {/* Screenshot Gallery Section */}
        <section style={{ width: '100%', overflow: 'hidden' }}>
          <ScreenshotGallery screenshots={[
            "/showcase/oasis/gallery/Screenshot_1782649668.png",
            "/showcase/oasis/gallery/Screenshot_1782649679.png",
            "/showcase/oasis/gallery/Screenshot_1782649868.png",
            "/showcase/oasis/gallery/Screenshot_1782649947.png",
            "/showcase/oasis/gallery/Screenshot_1782649960.png",
            "/showcase/oasis/gallery/Screenshot_1782649969.png",
            "/showcase/oasis/gallery/Screenshot_1782649973.png",
            "/showcase/oasis/gallery/Screenshot_1782650948.png",
            "/showcase/oasis/gallery/Screenshot_1782650960.png",
            "/showcase/oasis/gallery/Screenshot_1782656190.png",
            "/showcase/oasis/gallery/Screenshot_1782656216.png"
          ]} />
        </section>

        {/* FAQ Section */}
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem 6rem" }}>
          <FaqAccordion appId="oasis" />
        </div>

        {/* Footer CTA */}
        <footer 
          style={{
            background: "var(--background)",
            borderTop: "1px solid var(--surface-border)",
            padding: "6rem 1.5rem 4rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
            <h2 className="display-font" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)", marginBottom: "1rem" }}>
              Take two minutes to check in with yourself.
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "2.5rem", fontSize: "1.1rem" }}>
              Install Oasis and start recording your reflections with complete privacy. Free, offline-ready, and PIN-secured.
            </p>
            <motion.button 
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "1.1rem 2.5rem",
                background: "#000000",
                color: "#FFFFFF",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "1.05rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
              }}
            >
              <Download size={20} color="#FFFFFF" /> Download Oasis v1.0.3 (.apk)
            </motion.button>
            <p style={{ marginTop: "3rem", color: "#9ca3af", fontSize: "0.85rem" }}>
              © 2026 Nexora Studio. Crafted with obsession by @vinnssmokee.
            </p>
          </div>
        </footer>

        <ArchitectureDownloadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          appName="Oasis"
          links={{
            arm64: "https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v1.0.3-oasis/Oasis-arm64.apk",
            arm32: "https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v1.0.3-oasis/Oasis-arm32.apk",
            universal: "https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v1.0.3-oasis/Oasis-universal.apk"
          }}
        />
      </div>
    );
  }

  // Get Things Done (reminder-app)
  return (
    <div 
      className={styles.showcaseWrapper} 
      ref={wrapperRef}
      style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}
    >
      {/* Navbar */}
      <nav className={`${styles.container} ${styles.nav}`} data-animate="nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
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
                background: "var(--surface)"
              }}
            >
              <ArrowLeft size={16} /> <span className={styles.backText}>Back</span>
            </Link>
          </motion.div>
          <div className={styles.navBrand}>
            <div className={styles.navLogo} style={{ borderRadius: "8px", overflow: "hidden" }}>
              <Image src="/showcase/logo.png" alt="Get Things Done Logo" width={38} height={38} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className={styles.navTitle} style={{ color: "var(--foreground)", fontWeight: 600 }}>Get Things Done</span>
              <span className="font-mono-meta" style={{ 
                fontSize: "0.7rem", 
                fontWeight: 600, 
                background: "rgba(0,0,0,0.05)", 
                color: "#6b7280", 
                padding: "0.2rem 0.5rem", 
                borderRadius: "4px",
                letterSpacing: "0.05em"
              }}>
                ANDROID // v2.1.4
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
              transition: "color 0.2s ease"
            }}
            className="hidden md:block"
          >
            Architecture & Previews
          </a>
          <DownloadButton 
            href="https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v2.1.4-GTD/Get-Things-Done.apk" 
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
              textDecoration: "none"
            }}
          >
            <Download size={16} color="#FFFFFF" /> Download .apk
          </DownloadButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`${styles.container}`} style={{ padding: "6rem 2rem 4rem", maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: "3rem", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Spec Pill */}
          <div 
            data-animate="hero-element" 
            style={{ display: "flex", justifyContent: "flex-start", width: "100%", marginBottom: "1rem" }}
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.25rem 0.75rem 0.25rem 0.25rem",
                background: "rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "9999px",
                color: "#111827",
                cursor: "default"
              }}
            >
              <span style={{ 
                background: "#111827", 
                color: "#ffffff", 
                padding: "0.25rem 0.75rem", 
                borderRadius: "9999px", 
                fontSize: "0.7rem", 
                fontWeight: 600, 
                letterSpacing: "0.03em",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}>
                <Sparkles size={12} /> LATEST
              </span>
              <span style={{ 
                fontSize: "0.85rem", 
                fontWeight: 600, 
                color: "#374151"
              }}>
                Get Things Done v2.1.4 is available
              </span>
              <span style={{ color: "#9ca3af", paddingRight: "0.25rem", fontWeight: 600 }}>→</span>
            </motion.div>
          </div>

          <h1 
            data-animate="hero-element"
            className="display-font"
            style={{
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              lineHeight: 1.05,
              color: "var(--foreground)",
              margin: 0
            }}
          >
            Type Tasks Naturally.<br />Never Miss a Due Date.
          </h1>

          <p 
            data-animate="hero-element"
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              maxWidth: "520px",
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Type reminders in plain English to assign dates, times, and priorities automatically. Keep your daily to-dos and recurring monthly bills organized in one clean view without analytics tracking.
          </p>

          <div 
            data-animate="hero-element"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "1rem"
            }}
          >
            <DownloadButton 
              href="https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v2.1.4-GTD/Get-Things-Done.apk"
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
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)"
              }}
            >
              <Download size={18} color="#FFFFFF" /> Download v2.1.4 (.apk)
            </DownloadButton>
            <motion.a 
              href="#pillars"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.5rem",
                background: "var(--surface)",
                color: "var(--foreground)",
                border: "1px solid var(--surface-border)",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none"
              }}
            >
              Explore Architecture
            </motion.a>
          </div>

          {/* Quick Spec Badges */}
          <div 
            data-animate="hero-element"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              color: "#6b7280",
              fontSize: "0.85rem",
              fontWeight: 500,
              marginTop: "1rem",
              flexWrap: "wrap"
            }}
          >
            <span className="font-mono-meta" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Zap size={16} /> NATURAL LANGUAGE NLP
            </span>
            <span className="font-mono-meta" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <ShieldCheck size={16} /> 100% OFFLINE-READY
            </span>
            <span className="font-mono-meta" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <RefreshCw size={16} /> IN-APP OTA UPDATES
            </span>
          </div>
        </div>

        {/* Clean Hardware Smartphone Mockup */}
        <div 
          data-animate="mockup" 
          style={{ 
            width: "100%", 
            position: "relative",
            maxWidth: "340px",
            margin: "0 auto"
          }}
        >
          <div
            style={{
              borderRadius: "44px",
              overflow: "hidden",
              border: "1px solid rgba(0, 0, 0, 0.14)",
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              background: "#0D0D0E",
              padding: "10px"
            }}
          >
            {/* Top Punch-Hole / Camera Pill */}
            <div style={{ width: "88px", height: "18px", borderRadius: "10px", background: "#050505", margin: "4px auto 8px" }} />
            
            {/* Mockup Screen Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "9 / 19.5",
                borderRadius: "32px",
                overflow: "hidden",
                background: "#000000"
              }}
            >
              <Image
                src="/screenshots/1.png"
                alt="Get Things Done Home Screen"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 340px"
                style={{
                  objectFit: "cover",
                  display: "block"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Structured Architectural Pillars Section */}
      <section id="pillars" className={`${styles.container}`} style={{ padding: "5rem 1.5rem 6rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="font-mono-meta" style={{ color: "#6b7280", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.12em" }}>
            [ ARCHITECTURAL PILLARS // SYSTEM DESIGN ]
          </span>
          <h2 className="display-font" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)", marginTop: "0.5rem" }}>
            Task Execution Architecture
          </h2>
          <p style={{ color: "#6b7280", maxWidth: "620px", margin: "0.75rem auto 0", fontSize: "1.05rem", lineHeight: 1.6 }}>
            Built from the ground up for speed, local autonomy, and zero telemetry overhead.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {/* Pillar 1 */}
          <div style={{ padding: "2rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", color: "var(--foreground)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <Zap size={20} />
            </div>
            <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280", display: "block", marginBottom: "0.5rem" }}>PILLAR 01 // PARSER CORE</span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.65rem", letterSpacing: "-0.01em" }}>
              Natural Language Input
            </h3>
            <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
              Type sentences naturally like &quot;Dentist Friday at 4pm&quot;. The parser extracts due dates, times, and priority tiers in real time as you write.
            </p>
          </div>

          {/* Pillar 2 */}
          <div style={{ padding: "2rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", color: "var(--foreground)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <CreditCard size={20} />
            </div>
            <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280", display: "block", marginBottom: "0.5rem" }}>PILLAR 02 // FINANCIAL CADENCE</span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.65rem", letterSpacing: "-0.01em" }}>
              Recurring Bill Schedule
            </h3>
            <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
              Track utilities, subscriptions, and recurring commitments so upcoming dues never surprise your cash flow.
            </p>
          </div>

          {/* Pillar 3 */}
          <div style={{ padding: "2rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", color: "var(--foreground)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <RefreshCw size={20} />
            </div>
            <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280", display: "block", marginBottom: "0.5rem" }}>PILLAR 03 // LIFECYCLE</span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.65rem", letterSpacing: "-0.01em" }}>
              In-App System Updates
            </h3>
            <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
              Install feature updates and stability patches directly through our built-in release checker without downloading manual APK files.
            </p>
          </div>

          {/* Pillar 4 */}
          <div style={{ padding: "2rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", color: "var(--foreground)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <ShieldCheck size={20} />
            </div>
            <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280", display: "block", marginBottom: "0.5rem" }}>PILLAR 04 // ZERO TELEMETRY</span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.65rem", letterSpacing: "-0.01em" }}>
              Zero Analytics Trackers
            </h3>
            <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>
              Runs completely offline without advertising SDKs or third-party telemetry libraries embedded in the background.
            </p>
          </div>
        </div>
      </section>

      {/* Interface & Native Hardware Mockup Showcase */}
      <section id="showcase" className={`${styles.container}`} style={{ padding: "4rem 1.5rem 6rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="font-mono-meta" style={{ color: "#6b7280", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.12em" }}>
            [ SYSTEM INTERFACE // SCREEN SPECIFICATIONS ]
          </span>
          <h2 className="display-font" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)", marginTop: "0.5rem" }}>
            Interface & Native Workflows
          </h2>
          <p style={{ color: "#6b7280", fontSize: "1.1rem", maxWidth: "640px", margin: "0.75rem auto 0", lineHeight: 1.6 }}>
            Every screen optimized for speed, clarity, and rapid one-handed task capture.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
          {/* Screen 1 */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "20px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", boxShadow: "var(--shadow-card)" }}>
            <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280" }}>01 // TASK SCHEDULING</span>
            <div style={{ width: "210px", background: "#0D0D0E", borderRadius: "34px", padding: "8px", border: "1px solid rgba(0, 0, 0, 0.12)", boxShadow: "0 16px 36px -10px rgba(0,0,0,0.18)", margin: "1.5rem 0" }}>
              <div style={{ width: "60px", height: "14px", borderRadius: "8px", background: "#050505", margin: "2px auto 6px" }} />
              <div style={{ position: "relative", width: "100%", aspectRatio: "9 / 19.5", borderRadius: "24px", overflow: "hidden", background: "#000" }}>
                <Image src="/screenshots/1.png" alt="Get Things Done Home" fill sizes="210px" style={{ objectFit: "cover" }} />
              </div>
            </div>
            <h4 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--foreground)", margin: "0 0 0.5rem" }}>Daily Plan Agenda</h4>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.5, margin: 0 }}>Type reminders in plain English to automatically extract dates, times, and priority tiers.</p>
          </div>

          {/* Screen 2 */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "20px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", boxShadow: "var(--shadow-card)" }}>
            <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280" }}>02 // RELEASE LIFECYCLE</span>
            <div style={{ width: "210px", background: "#0D0D0E", borderRadius: "34px", padding: "8px", border: "1px solid rgba(0, 0, 0, 0.12)", boxShadow: "0 16px 36px -10px rgba(0,0,0,0.18)", margin: "1.5rem 0" }}>
              <div style={{ width: "60px", height: "14px", borderRadius: "8px", background: "#050505", margin: "2px auto 6px" }} />
              <div style={{ position: "relative", width: "100%", aspectRatio: "9 / 19.5", borderRadius: "24px", overflow: "hidden", background: "#000" }}>
                <Image src="/screenshots/2.png" alt="System Update Dashboard" fill sizes="210px" style={{ objectFit: "cover" }} />
              </div>
            </div>
            <h4 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--foreground)", margin: "0 0 0.5rem" }}>System Update Dashboard</h4>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.5, margin: 0 }}>Automatic background checks and in-app version patching with full changelog visibility.</p>
          </div>

          {/* Screen 3 */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "20px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", boxShadow: "var(--shadow-card)" }}>
            <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280" }}>03 // FISCAL OBLIGATIONS</span>
            <div style={{ width: "210px", background: "#0D0D0E", borderRadius: "34px", padding: "8px", border: "1px solid rgba(0, 0, 0, 0.12)", boxShadow: "0 16px 36px -10px rgba(0,0,0,0.18)", margin: "1.5rem 0" }}>
              <div style={{ width: "60px", height: "14px", borderRadius: "8px", background: "#050505", margin: "2px auto 6px" }} />
              <div style={{ position: "relative", width: "100%", aspectRatio: "9 / 19.5", borderRadius: "24px", overflow: "hidden", background: "#000" }}>
                <Image src="/screenshots/Screenshot_1782481470.png" alt="Bill Schedule" fill sizes="210px" style={{ objectFit: "cover" }} />
              </div>
            </div>
            <h4 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--foreground)", margin: "0 0 0.5rem" }}>Recurring Bill Tracker</h4>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.5, margin: 0 }}>Organize utilities and subscription billing cycles directly alongside daily to-dos.</p>
          </div>

          {/* Screen 4 */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "20px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", boxShadow: "var(--shadow-card)" }}>
            <span className="font-mono-meta" style={{ fontSize: "0.7rem", color: "#6b7280" }}>04 // GEO-FENCED ALERTS</span>
            <div style={{ width: "210px", background: "#0D0D0E", borderRadius: "34px", padding: "8px", border: "1px solid rgba(0, 0, 0, 0.12)", boxShadow: "0 16px 36px -10px rgba(0,0,0,0.18)", margin: "1.5rem 0" }}>
              <div style={{ width: "60px", height: "14px", borderRadius: "8px", background: "#050505", margin: "2px auto 6px" }} />
              <div style={{ position: "relative", width: "100%", aspectRatio: "9 / 19.5", borderRadius: "24px", overflow: "hidden", background: "#000" }}>
                <Image src="/screenshots/Screenshot_1782481446.png" alt="Location Reminders" fill sizes="210px" style={{ objectFit: "cover" }} />
              </div>
            </div>
            <h4 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--foreground)", margin: "0 0 0.5rem" }}>Location Triggers</h4>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.5, margin: 0 }}>Geographical triggers notify you when arriving at or departing designated places.</p>
          </div>
        </div>
      </section>

      {/* Core Capabilities Bento Grid */}
      <section id="all-features" className={`${styles.container}`} style={{ padding: "4rem 1.5rem 6rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="font-mono-meta" style={{ color: "#6b7280", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.12em" }}>
            [ CORE CAPABILITIES // FEATURE MATRIX ]
          </span>
          <h2 className="display-font" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)", marginTop: "0.5rem" }}>
            Every Capability Built In
          </h2>
          <p style={{ color: "#6b7280", fontSize: "1.05rem", maxWidth: "600px", margin: "0.75rem auto 0" }}>
            Designed for frictionless execution, reliability, and precision scheduling.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {/* Card 1 */}
          <div style={{ padding: "1.75rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <MapPin size={18} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.5rem" }}>Location Reminders</h3>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
              Set geographical triggers that alert you the moment you arrive at or leave a specific location.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{ padding: "1.75rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <Calendar size={18} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.5rem" }}>Daily Plan Agenda</h3>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
              Visualize your entire day at a glance with chronological ordering and priority indicators.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{ padding: "1.75rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <CreditCard size={18} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.5rem" }}>Smart Bill Tracker</h3>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
              Track recurring financial commitments and get notified in advance of billing cutoffs.
            </p>
          </div>

          {/* Card 4 */}
          <div style={{ padding: "1.75rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <Cloud size={18} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.5rem" }}>Optional Cloud Sync</h3>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
              Optional real-time encrypted backup allows seamless synchronization across devices when desired.
            </p>
          </div>

          {/* Card 5 */}
          <div style={{ padding: "1.75rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <Globe size={18} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.5rem" }}>Multi-Language Support</h3>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
              Fully localized for global users, supporting seamless language toggling between English and Indonesian.
            </p>
          </div>

          {/* Card 6 */}
          <div style={{ padding: "1.75rem", background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "16px", boxShadow: "var(--shadow-card)" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <Bell size={18} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.5rem" }}>High-Precision Alarms</h3>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
              Battery-optimized background service ensures alarms fire on the exact second, even in deep sleep mode.
            </p>
          </div>
        </div>
      </section>

      {/* Screenshot Gallery Section */}
      <section style={{ width: '100%', overflow: 'hidden' }}>
        <ScreenshotGallery />
      </section>

      {/* FAQ Section */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem 6rem" }}>
        <FaqAccordion appId="gtd" />
      </div>

      {/* Footer CTA */}
      <footer 
        style={{
          background: "var(--background)",
          borderTop: "1px solid var(--surface-border)",
          padding: "6rem 1.5rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
          <h2 className="display-font" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)", marginBottom: "1rem" }}>
            Keep your daily schedule in order.
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "2.5rem", fontSize: "1.1rem" }}>
            Install Get Things Done and experience natural language reminder capture. Free, private, and offline-ready.
          </p>
          <DownloadButton 
            href="https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v2.1.4-GTD/Get-Things-Done.apk"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "1.1rem 2.5rem",
              background: "#000000",
              color: "#FFFFFF",
              borderRadius: "9999px",
              fontWeight: 600,
              fontSize: "1.05rem",
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
            }}
          >
            <Download size={20} color="#FFFFFF" /> Download Get Things Done v2.1.4 (.apk)
          </DownloadButton>
          <p style={{ marginTop: "3rem", color: "#9ca3af", fontSize: "0.85rem" }}>
            © 2026 Nexora Studio. Crafted with obsession by @vinnssmokee.
          </p>
        </div>
      </footer>
    </div>
  );
}
