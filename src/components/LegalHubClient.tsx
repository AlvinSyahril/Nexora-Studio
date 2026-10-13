"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUp, Check, Copy, ExternalLink, ShieldCheck, FileText, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LEGAL_DOCS } from "@/data/legal";
import styles from "./LegalHub.module.css";

interface LegalHubClientProps {
  initialDoc: "privacy" | "terms";
}

export default function LegalHubClient({ initialDoc }: LegalHubClientProps) {
  const [activeDoc, setActiveDoc] = useState<"privacy" | "terms">(initialDoc);
  const [activeSection, setActiveSection] = useState<string>("");
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const currentDocData = LEGAL_DOCS[activeDoc];

  // Sync tab change with browser URL
  const handleTabChange = (docKey: "privacy" | "terms") => {
    if (docKey === activeDoc) return;
    setActiveDoc(docKey);
    const targetUrl = docKey === "privacy" ? "/privacy" : "/terms";
    window.history.pushState(null, "", targetUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Sync active doc on browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.includes("terms")) {
        setActiveDoc("terms");
      } else if (path.includes("privacy")) {
        setActiveDoc("privacy");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Scrollspy & Reading Progress Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for TOC highlight
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const sectionElements = document.querySelectorAll<HTMLElement>("section[data-section-id]");
    if (sectionElements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by top offset to get the top-most visible section
          const topEntry = visibleEntries.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          );
          const id = topEntry.target.getAttribute("data-section-id");
          if (id) setActiveSection(id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.2, 0.5],
      }
    );

    sectionElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [activeDoc]);

  // Jump to section with smooth scroll
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
      setActiveSection(sectionId);
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  // Copy anchor link to clipboard
  const handleCopyLink = (sectionId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedToast(`Copied link to section`);
      setTimeout(() => {
        setCopiedToast(null);
      }, 2200);
    });
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.hubWrapper}>
      {/* 2px Fixed Reading Progress Bar */}
      <div className={styles.progressBar} style={{ width: `${readingProgress}%` }} />

      {/* Sticky Top Navigation Bar */}
      <header className={styles.topNav}>
        <div className={styles.navLeft}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          <span className={`font-mono-meta ${styles.navBreadcrumb}`}>
            [ LEGAL // {currentDocData.title.toUpperCase()} ]
          </span>
        </div>

        <div className={styles.navRight}>
          <span className={`font-mono-meta ${styles.quickBadge}`}>
            {currentDocData.readingTime}
          </span>
        </div>
      </header>

      {/* Hero Header */}
      <section className={styles.heroSection}>
        <div className={styles.heroEyebrowRow}>
          <span className={`font-mono-meta ${styles.docVersionPill}`}>
            {currentDocData.version}
          </span>
          <span className={`font-mono-meta ${styles.docMetaPill}`}>
            LAST REVISED: {currentDocData.lastUpdated.toUpperCase()}
          </span>
        </div>

        <h1 className={styles.heroTitle}>{currentDocData.title}</h1>
        <p className={styles.heroSubtitle}>{currentDocData.subtitle}</p>

        {/* Tactile Segmented Tab Switcher */}
        <div className={styles.tabBarWrap} role="tablist" aria-label="Legal document switcher">
          <button
            type="button"
            role="tab"
            aria-selected={activeDoc === "privacy"}
            className={`${styles.tabButton} ${activeDoc === "privacy" ? styles.tabButtonActive : ""}`}
            onClick={() => handleTabChange("privacy")}
          >
            {activeDoc === "privacy" && (
              <motion.div
                layoutId="legal-tab-pill"
                className={styles.tabIndicator}
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <ShieldCheck size={16} />
              Privacy Policy
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeDoc === "terms"}
            className={`${styles.tabButton} ${activeDoc === "terms" ? styles.tabButtonActive : ""}`}
            onClick={() => handleTabChange("terms")}
          >
            {activeDoc === "terms" && (
              <motion.div
                layoutId="legal-tab-pill"
                className={styles.tabIndicator}
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <FileText size={16} />
              Terms of Service
            </span>
          </button>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div className={styles.mainContainer}>
        {/* Sticky Sidebar / Table of Contents */}
        <aside className={styles.sidebar} aria-label="Table of contents">
          <div className={styles.sidebarHeader}>
            <span className={`font-mono-meta ${styles.sidebarTitle}`}>TABLE OF CONTENTS</span>
            <span className={`font-mono-meta ${styles.sidebarTitle}`}>
              [ {currentDocData.sections.length} CLAUSES ]
            </span>
          </div>

          <nav>
            <ul className={styles.tocList}>
              {currentDocData.sections.map((section, idx) => {
                const isActive = activeSection === section.id;
                const indexNumber = String(idx + 1).padStart(2, "0");
                return (
                  <li key={section.id} className={styles.tocItem}>
                    <a
                      href={`#${section.id}`}
                      onClick={(e) => handleScrollToSection(e, section.id)}
                      className={`${styles.tocLink} ${isActive ? styles.tocLinkActive : ""}`}
                    >
                      <span className={`font-mono-meta ${styles.tocNumber}`}>{indexNumber}</span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Content Stream (Right Column) */}
        <main className={styles.contentStream}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDoc}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}
            >
              {/* Executive Summary Card */}
              <div className={styles.summaryCard}>
                <span className={`font-mono-meta ${styles.summaryEyebrow}`}>
                  EXECUTIVE SUMMARY // CORE COMMITMENT
                </span>
                <p className={styles.summaryText}>{currentDocData.summary}</p>
              </div>

              {/* Legal Sections */}
              {currentDocData.sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    data-section-id={section.id}
                    className={`${styles.sectionCard} ${isActive ? styles.sectionCardActive : ""}`}
                  >
                    <div className={styles.sectionTopRow}>
                      <span className={`font-mono-meta ${styles.sectionIndex}`}>
                        {section.index}
                      </span>
                      <div className={styles.sectionBadgeWrap}>
                        {section.badge && (
                          <span className={`font-mono-meta ${styles.sectionBadge}`}>
                            {section.badge}
                          </span>
                        )}
                        <button
                          type="button"
                          className={styles.copyAnchorBtn}
                          onClick={() => handleCopyLink(section.id)}
                          title="Copy link to this section"
                          aria-label={`Copy link to section ${section.title}`}
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>

                    <h2 className={styles.sectionTitle}>{section.title}</h2>

                    {/* Plain English Key Takeaway Callout */}
                    <div className={styles.takeawayBox}>
                      <div className={styles.takeawayHeader}>
                        <Info size={13} strokeWidth={2.5} />
                        <span>Key Takeaway</span>
                      </div>
                      <p className={styles.takeawayText}>{section.takeaway}</p>
                    </div>

                    {/* Paragraphs */}
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className={styles.proseParagraph}>
                        {paragraph}
                      </p>
                    ))}

                    {/* Subsections if available */}
                    {section.subsections && section.subsections.length > 0 && (
                      <div className={styles.subsectionsWrap}>
                        {section.subsections.map((sub, sIdx) => (
                          <div key={sIdx} className={styles.subItem}>
                            <h3 className={styles.subTitle}>{sub.subtitle}</h3>
                            <p className={styles.subText}>{sub.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className={styles.toast}
          >
            <Check size={15} />
            <span>{copiedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleBackToTop}
            className={styles.backToTopBtn}
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Legal Hub Footer */}
      <footer className={styles.hubFooter}>
        <div className={styles.footerContent}>
          <h2 className={styles.footerTitle}>Nexora Studio Legal & Architecture</h2>
          <p className={styles.footerDesc}>
            Built with transparency. All software releases and source repositories are published openly.
          </p>
          <div className={styles.footerActions}>
            <a
              href="https://github.com/AlvinSyahril/Nexora-Studio"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerBtn}
            >
              <span>GitHub Repository</span>
              <ExternalLink size={13} />
            </a>
            <a
              href="https://instagram.com/vinnssmokee"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerBtn}
            >
              <span>Contact Creator (@vinnssmokee)</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

