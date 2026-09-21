"use client";

import React, { useEffect, useRef } from "react";
import styles from "../app/apps/[id]/page.module.css";
import loomStyles from "../app/apps/[id]/loom.module.css";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, CreditCard, Cloud, Globe, Bell, Heart, Sun, HardDrive, Star, Edit3, LayoutDashboard, Link2, Table } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FaqAccordion from "./FaqAccordion";
import ScreenshotGallery from "./ScreenshotGallery";
import DownloadButton from "./DownloadButton";
import ArchitectureDownloadModal from "./ArchitectureDownloadModal";
import DesktopMockupSwitcher from "./DesktopMockupSwitcher";
import { Download, Monitor, ShieldCheck, Zap, Sparkles, FolderTree, Cpu, Flame } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AppDetailsClient({ app }: { app: any }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [gridColumns, setGridColumns] = React.useState("1fr");
  const [activeTab, setActiveTab] = React.useState<'all' | 'global' | 'editor'>('all');

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGridColumns(window.innerWidth > 768 ? "1fr 1fr" : "1fr");
    }
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
            <Link 
              href="/#apps" 
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
            <a 
              href={app.downloadUrl || "https://github.com/vinnssmokee/loom-desktop/releases/latest"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1.35rem",
                background: "var(--foreground)",
                color: "var(--surface)",
                borderRadius: "var(--radius-md)",
                fontWeight: 500,
                fontSize: "0.875rem",
                textDecoration: "none",
                transition: "opacity 0.2s ease"
              }}
            >
              <Download size={16} /> Download .exe
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className={`${styles.container}`} style={{ padding: "6rem 2rem 4rem", maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: gridColumns, gap: "3rem", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
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
              Thinking at<br />Human Speed.
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
              The unified desktop sanctuary designed for obsessive thinkers. 
              Intertwines bi-directional markdown, Kanban boards, and 2D knowledge graphs 
              into one lightning-fast, local-first interface.
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
              <a 
                href={app.downloadUrl || "https://github.com/vinnssmokee/loom-desktop/releases/latest"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.85rem 2rem",
                  background: "var(--foreground)",
                  color: "var(--surface)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 500,
                  fontSize: "1rem",
                  textDecoration: "none",
                }}
              >
                Download for Windows
              </a>
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

          <div data-animate="hero-element" style={{ width: "100%", height: "100%", minHeight: "300px" }}>
            {/* Kept empty for asymmetric minimalist layout */}
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
              Ready to Upgrade Your Mind Palace?
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "2.5rem", fontSize: "1.1rem" }}>
              Download Loom today and experience the ultimate personal workspace tailored for speed, aesthetics, and privacy.
            </p>
            <a 
              href={app.downloadUrl || "https://github.com/vinnssmokee/loom-desktop/releases/latest"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "1.1rem 2.5rem",
                background: "var(--foreground)",
                color: "var(--surface)",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "1.05rem",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
              }}
            >
              <Download size={20} /> Download Loom for Windows
            </a>
            <p style={{ marginTop: "3rem", color: "#9ca3af", fontSize: "0.85rem" }}>
              © 2026 Nexora Studio. Crafted with obsession by @vinnssmokee.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  if (app.id === "oasis") {
    return (
      <div className={styles.showcaseWrapper} ref={wrapperRef}>
        {/* Background Blobs - customized colors for Oasis */}
        <div className={`${styles.blob} ${styles.blobGreen}`} style={{ background: 'rgba(182, 226, 211, 0.4)' }}></div>
        <div className={`${styles.blob} ${styles.blobBlue}`} style={{ background: 'rgba(212, 240, 240, 0.4)' }}></div>
        <div className={`${styles.blob} ${styles.blobPurple}`} style={{ background: 'rgba(250, 232, 224, 0.4)' }}></div>

        {/* Navbar */}
        <nav className={`${styles.container} ${styles.nav}`} data-animate="nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="/#apps" className={styles.backButton} title="Back to Nexora">
              <ArrowLeft size={16} /> <span className={styles.backText}>Back</span>
            </Link>
            <div className={styles.navBrand}>
              <div className={styles.navLogo}>
                <Image src="/showcase/oasis/logo.png" alt="Oasis Logo" width={40} height={40} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <span className={styles.navTitle}>Oasis</span>
            </div>
          </div>
          <button onClick={() => setIsModalOpen(true)} className={styles.navBtn}>Download App</button>
        </nav>

        {/* Hero Section */}
        <section className={`${styles.container} ${styles.hero}`}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle} data-animate="hero-element">
              Your Daily Space to <br/>
              <span className={styles.textGradient} style={{ background: 'linear-gradient(to right, #B6E2D3, #D4F0F0)', WebkitBackgroundClip: 'text' }}>Breathe and Reflect.</span>
            </h1>
            <p className={styles.heroDesc} data-animate="hero-element">
              {app.description}
            </p>
            <div className={styles.heroActions} data-animate="hero-element">
              <button onClick={() => setIsModalOpen(true)} className={styles.btnPrimary} style={{ background: '#B6E2D3', color: '#3F3F3F', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Get Started Free</button>
              <a href="#features" className={styles.btnSecondary}>Explore Features</a>
            </div>
          </div>
          <div className={styles.heroVisual} data-animate="hero-element">
            <div className={`${styles.samsungMockup} ${styles.heroMockup}`} data-animate="mockup">
              <Image src="/showcase/oasis/welcome.png" alt="Oasis Welcome Home" width={300} height={649} priority style={{ borderRadius: '30px', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
          </div>
        </section>

        {/* Feature 1: Mood History */}
        <section id="features" className={`${styles.container} ${styles.feature1}`} data-animate="feature">
          <div className={styles.f1Text}>
            <div className={styles.iconBadgeGreen} style={{ background: 'rgba(182, 226, 211, 0.2)', color: '#4CAF50' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <h2 className={styles.fTitle}>Track Your Mood & Activities.</h2>
            <p className={styles.fDesc}>
              Easily log your daily emotions and activities. Build a streak and visualize your mental health journey over time with our beautiful calendar view.
            </p>
            <ul className={styles.fList}>
              <li className={styles.fListItem}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                Cute cat mascots for every mood
              </li>
              <li className={styles.fListItem}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                Attach images and write journals
              </li>
            </ul>
          </div>
          <div className={styles.f1Visual}>
            <div className={`${styles.samsungMockup} ${styles.floatCenter}`}>
               <Image src="/showcase/oasis/history.png" alt="Mood History" width={300} height={649} style={{ borderRadius: '30px', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
          </div>
        </section>

        {/* Feature 2: Insights */}
        <section className={`${styles.container} ${styles.feature2}`} data-animate="feature">
          <div className={styles.f2Text}>
            <div className={styles.iconBadgeBlue} style={{ background: 'rgba(212, 240, 240, 0.5)', color: '#5C9EAD' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <h2 className={styles.fTitle}>Discover Deep Insights.</h2>
            <p className={styles.fDesc}>
              Identify your top mood boosters and stress triggers with detailed monthly statistics. Understand yourself better and focus on what makes you happy.
            </p>
          </div>
          <div className={styles.f2Visual}>
             <div className={`${styles.samsungMockup} ${styles.floatCenter}`}>
               <Image src="/showcase/oasis/insights.png" alt="Oasis Insights" width={300} height={649} style={{ borderRadius: '30px', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
          </div>
        </section>

        {/* Feature 3: Ozie AI */}
        <section className={`${styles.container} ${styles.feature1}`} data-animate="feature">
          <div className={styles.f1Text}>
            <div className={styles.iconBadgeGreen} style={{ background: 'rgba(250, 232, 224, 1)', color: '#E59866' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <h2 className={styles.fTitle}>Meet Ozie, Your AI Companion.</h2>
            <p className={styles.fDesc}>
              Feel lonely or just want to vent? Chat with Ozie, your virtual Oasis companion. Share stories, complaints, or happiness anytime you need a listening ear.
            </p>
          </div>
          <div className={styles.f1Visual}>
            <div className={`${styles.samsungMockup} ${styles.floatCenter}`}>
               <Image src="/showcase/oasis/chat.png" alt="Ozie AI Chat" width={300} height={649} style={{ borderRadius: '30px', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
          </div>
        </section>

        {/* Feature 4: Privacy & PIN */}
        <section className={`${styles.container} ${styles.feature2}`} data-animate="feature">
          <div className={styles.f2Text}>
            <div className={styles.iconBadgeBlue} style={{ background: 'rgba(232, 232, 232, 0.5)', color: '#A0AAB2' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h2 className={styles.fTitle}>100% Private & Secure.</h2>
            <p className={styles.fDesc}>
              Your journals and thoughts belong to you. Secure your safe space with a PIN lock, ensuring that no one else can read your personal reflections.
            </p>
          </div>
          <div className={styles.f2Visual}>
             <div className={`${styles.samsungMockup} ${styles.floatCenter}`}>
               <Image src="/showcase/oasis/pin.png" alt="Oasis PIN Lock" width={300} height={649} style={{ borderRadius: '30px', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
          </div>
        </section>

        {/* All Features Grid Section (No Mockups) for Oasis */}
        <section id="all-features" className={`${styles.container} ${styles.featuresSection}`} data-animate="feature">
          <div className={styles.featuresHeader}>
            <h2 className={styles.featuresSectionTitle}>Everything You Need to Heal.</h2>
            <p className={styles.featuresSectionDesc}>
              Discover all the core capabilities designed to help you breathe, reflect, and stay mindful every single day.
            </p>
          </div>
          
          <div className={styles.featuresGrid}>
            {/* Card 1 */}
            <div className={styles.featureCard}>
              <div className={`${styles.featureIconWrapper} ${styles.fcGreen}`}>
                <Heart />
              </div>
              <h3 className={styles.featureCardTitle}>Emergency Warmth</h3>
              <p className={styles.featureCardDesc}>
                Feeling anxious? The screen dims to a calming green, playing soothing instrumentals while guiding you through a 5-second breathing exercise.
              </p>
            </div>

            {/* Card 2 */}
            <div className={styles.featureCard}>
              <div className={`${styles.featureIconWrapper} ${styles.fcPink}`}>
                <Sun />
              </div>
              <h3 className={styles.featureCardTitle}>Wellness Report</h3>
              <p className={styles.featureCardDesc}>
                Receive a self-appreciation report every Sunday night summarizing your positivity and resilience throughout the week.
              </p>
            </div>

            {/* Card 3 */}
            <div className={styles.featureCard}>
              <div className={`${styles.featureIconWrapper} ${styles.fcOrange}`}>
                <Star />
              </div>
              <h3 className={styles.featureCardTitle}>Adaptive Themes</h3>
              <p className={styles.featureCardDesc}>
                The app's background colors dynamically adapt based on your mood history, from Warm Sunset for joyful days to Calming Forest for stress.
              </p>
            </div>

            {/* Card 4 */}
            <div className={styles.featureCard}>
              <div className={`${styles.featureIconWrapper} ${styles.fcBlue}`}>
                <HardDrive />
              </div>
              <h3 className={styles.featureCardTitle}>Backup & Restore</h3>
              <p className={styles.featureCardDesc}>
                Securely backup your precious journals and mood history, or export them to CSV and PDF whenever you need them.
              </p>
            </div>

            {/* Card 5 */}
            <div className={styles.featureCard}>
              <div className={`${styles.featureIconWrapper} ${styles.fcPurple}`}>
                <Globe />
              </div>
              <h3 className={styles.featureCardTitle}>Milestone Achievements</h3>
              <p className={styles.featureCardDesc}>
                Earn exclusive badges like "Resilient Soul" as a validation of your emotional strength and consistency in journaling.
              </p>
            </div>
          </div>
        </section>

        {/* Screenshot Gallery Section */}
        <section style={{ width: '100%', overflow: 'hidden' }} data-animate="feature">
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
        <div data-animate="feature">
          <FaqAccordion appId="oasis" />
        </div>

        {/* Footer CTA */}
        <footer className={styles.footer} data-animate="feature">
          <div className={styles.footerBg} style={{ background: 'linear-gradient(135deg, #B6E2D3 0%, #D4F0F0 100%)' }}></div>
          <div className={styles.container}>
            <h2 className={styles.footerTitle}>Ready to find your peace?</h2>
            <button onClick={() => setIsModalOpen(true)} className={styles.footerBtn} style={{ padding: '14px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, background: '#fff', color: '#B6E2D3' }}>Download Oasis</button>
            <p className={styles.footerCopy}>© 2026 Nexora Studio. All rights reserved.</p>
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

  return (
    <div className={styles.showcaseWrapper} ref={wrapperRef}>
      {/* Background Blobs */}
      <div className={`${styles.blob} ${styles.blobPurple}`}></div>
      <div className={`${styles.blob} ${styles.blobGreen}`}></div>
      <div className={`${styles.blob} ${styles.blobBlue}`}></div>

      {/* Navbar */}
      <nav className={`${styles.container} ${styles.nav}`} data-animate="nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/#apps" className={styles.backButton} title="Back to Nexora">
            <ArrowLeft size={16} /> <span className={styles.backText}>Back</span>
          </Link>
          <div className={styles.navBrand}>
            <div className={styles.navLogo}>
              <Image src="/showcase/logo.png" alt="Get Things Done app logo showing task management icon" width={40} height={40} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <span className={styles.navTitle}>Get Things Done</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="#all-features" style={{ fontWeight: 600, color: '#1a1a2e', textDecoration: 'none', display: 'none' }} className="hidden md:block">All Features</a>
          <DownloadButton href="https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v2.1.4-GTD/Get-Things-Done.apk" className={styles.navBtn}>Download App</DownloadButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`${styles.container} ${styles.hero}`}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle} data-animate="hero-element">
            Your Minimalist <br/>Companion to <br/>
            <span className={styles.textGradient}>Get Things Done.</span>
          </h1>
          <p className={styles.heroDesc} data-animate="hero-element">
            Designed for focus. No clutter, just what you need to achieve your goals today. Sync instantly across all your devices securely.
          </p>
          <div className={styles.heroActions} data-animate="hero-element">
            <DownloadButton href="https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v2.1.4-GTD/Get-Things-Done.apk" className={styles.btnPrimary}>Get Started Free</DownloadButton>
            <a href="#features" className={styles.btnSecondary}>Explore Features</a>
          </div>
        </div>
        <div className={styles.heroVisual} data-animate="hero-element">
          <div className={`${styles.samsungMockup} ${styles.heroMockup}`} data-animate="mockup">
            <Image src="/screenshots/1.png" alt="Get Things Done Home" width={300} height={600} priority style={{ borderRadius: '30px' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
        </div>
      </section>

      {/* Feature 3: System Update Dashboard */}
      <section id="features" className={`${styles.container} ${styles.feature1}`} data-animate="feature">
        <div className={styles.f1Text}>
          <div className={styles.iconBadgeGreen}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          </div>
          <h2 className={styles.fTitle}>Seamless System Updates.</h2>
          <p className={styles.fDesc}>
            Stay on the cutting edge effortlessly. With our new Global Update Checker and dedicated Update Dashboard, you'll never miss a new feature or bug fix again.
          </p>
          <ul className={styles.fList}>
            <li className={styles.fListItem}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Automatic background checks on startup
            </li>
            <li className={styles.fListItem}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Non-intrusive global notification popups
            </li>
            <li className={styles.fListItem}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Detailed changelogs built-in natively
            </li>
          </ul>
        </div>
        <div className={styles.f1Visual}>
          <div className={`${styles.samsungMockup} ${styles.floatCenter}`}>
             <Image src="/screenshots/2.png" alt="System Update Dashboard" width={300} height={600} style={{ borderRadius: '30px' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
        </div>
      </section>

      {/* Feature 4: Bill Schedule & Financial Tracking */}
      <section className={`${styles.container} ${styles.feature2}`} data-animate="feature">
        <div className={styles.f2Text}>
          <div className={styles.iconBadgeBlue} style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 className={styles.fTitle}>Track Bills Effortlessly.</h2>
          <p className={styles.fDesc}>
            Manage your finances seamlessly with the brand new Bill Schedule feature. Never miss a payment deadline again, neatly integrated with your daily reminders.
          </p>
        </div>
        <div className={styles.f2Visual}>
           <div className={`${styles.samsungMockup} ${styles.floatCenter}`}>
             <Image src="/screenshots/Screenshot_1782481470.png" alt="Bill Schedule" width={300} height={600} style={{ borderRadius: '30px' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
        </div>
      </section>

      {/* All Features Grid Section (No Mockups) */}
      <section id="all-features" className={`${styles.container} ${styles.featuresSection}`} data-animate="feature">
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresSectionTitle}>Everything You Need.</h2>
          <p className={styles.featuresSectionDesc}>
            Discover all the core capabilities designed to help you stay focused, organized, and ahead of your schedule.
          </p>
        </div>
        
        <div className={styles.featuresGrid}>
          {/* Card 1 */}
          <div className={styles.featureCard}>
            <div className={`${styles.featureIconWrapper} ${styles.fcPurple}`}>
              <MapPin />
            </div>
            <h3 className={styles.featureCardTitle}>Location Reminders</h3>
            <p className={styles.featureCardDesc}>
              Never forget to buy groceries again. Set geographical triggers that alert you the moment you arrive at or leave a specific location.
            </p>
          </div>

          {/* Card 2 */}
          <div className={styles.featureCard}>
            <div className={`${styles.featureIconWrapper} ${styles.fcBlue}`}>
              <Calendar />
            </div>
            <h3 className={styles.featureCardTitle}>Daily Plan Agenda</h3>
            <p className={styles.featureCardDesc}>
              Visualize your entire day at a glance. Our beautiful calendar view organizes your tasks logically so you know exactly what's next.
            </p>
          </div>

          {/* Card 3 */}
          <div className={styles.featureCard}>
            <div className={`${styles.featureIconWrapper} ${styles.fcOrange}`}>
              <CreditCard />
            </div>
            <h3 className={styles.featureCardTitle}>Smart Bill Tracker</h3>
            <p className={styles.featureCardDesc}>
              Automatically track your recurring financial obligations. Get reminded ahead of time and keep your credit score pristine.
            </p>
          </div>

          {/* Card 4 */}
          <div className={styles.featureCard}>
            <div className={`${styles.featureIconWrapper} ${styles.fcGreen}`}>
              <Cloud />
            </div>
            <h3 className={styles.featureCardTitle}>Real-time Cloud Sync</h3>
            <p className={styles.featureCardDesc}>
              Powered by Firebase, your data securely syncs across all your devices in real-time, instantly. Always accessible, anywhere.
            </p>
          </div>

          {/* Card 5 */}
          <div className={styles.featureCard}>
            <div className={`${styles.featureIconWrapper} ${styles.fcPink}`}>
              <Globe />
            </div>
            <h3 className={styles.featureCardTitle}>Multi-Language</h3>
            <p className={styles.featureCardDesc}>
              Fully localized for global users. Seamlessly switch between English, Indonesian, and other supported languages on the fly.
            </p>
          </div>

          {/* Card 6 */}
          <div className={styles.featureCard}>
            <div className={`${styles.featureIconWrapper} ${styles.fcTeal}`}>
              <Bell />
            </div>
            <h3 className={styles.featureCardTitle}>Push Notifications</h3>
            <p className={styles.featureCardDesc}>
              Reliable background alerts ensure you never miss a beat, even if the app is closed. Stay notified without draining your battery.
            </p>
          </div>
        </div>
      </section>

      {/* Screenshot Gallery Section */}
      <section style={{ width: '100%', overflow: 'hidden' }} data-animate="feature">
        <ScreenshotGallery />
      </section>

      {/* FAQ Section */}
      <div data-animate="feature">
        <FaqAccordion appId="gtd" />
      </div>

      {/* Footer CTA */}
      <footer className={styles.footer} data-animate="feature">
        <div className={styles.footerBg}></div>
        <div className={styles.container}>
          <h2 className={styles.footerTitle}>Ready to organize your life?</h2>
          <DownloadButton href="https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v2.1.4-GTD/Get-Things-Done.apk" className={styles.footerBtn}>Download Get Things Done</DownloadButton>
          <p className={styles.footerCopy}>© 2026 Nexora Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
