"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import styles from "./ProductRoster.module.css";

interface EngineeringPillar {
  title: string;
  description: string;
}

interface RosterProduct {
  id: string;
  index: string;
  status: string;
  name: string;
  tagline: string;
  manifesto: string;
  iconUrl: string;
  pillars: EngineeringPillar[];
  platformBadges: string[];
  detailsUrl: string;
  downloadUrl?: string;
  downloadLabel?: string;
}

const PRODUCTS: RosterProduct[] = [
  {
    id: "loom",
    index: "01 // WINDOWS WORKSPACE",
    status: "v1.0.1 STABLE // PRODUCTION READY",
    name: "Loom",
    tagline: "Local Markdown notes with live graph connections.",
    manifesto:
      "A fast Windows workspace that saves your notes directly to your hard drive as plain Markdown files. Link concepts with visual relationship nodes, manage projects on a Kanban board, and write without an internet connection.",
    iconUrl: "/showcase/loom/logo.png",
    platformBadges: ["WINDOWS", "LOCAL-FIRST", "OFFLINE-READY"],
    detailsUrl: "/apps/loom",
    downloadUrl:
      "https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v1.0.1-Loom/Loom.Setup.1.0.1.exe",
    downloadLabel: "Download for Windows (.exe)",
    pillars: [
      {
        title: "Visual Graph Links",
        description: "Connect notes with two-way links and browse your ideas as an interactive network.",
      },
      {
        title: "Plain Markdown Files",
        description: "All files remain on your disk in standard formats. No cloud lock-in, no required account.",
      },
      {
        title: "Integrated Kanban",
        description: "Move cards across project stages directly beside your reference documents.",
      },
      {
        title: "Keyboard-First Speed",
        description: "Full-screen writing mode and hotkeys for instant capture without touching a mouse.",
      },
    ],
  },
  {
    id: "reminder-app",
    index: "02 // ANDROID TASK MANAGER",
    status: "v2.1.4 STABLE // PRODUCTION READY",
    name: "Get Things Done",
    tagline: "Type naturally, set reminders automatically.",
    manifesto:
      "Type 'Dentist appointment Friday at 4pm' and the app extracts the date, time, and priority as you write. Keep daily to-dos and recurring monthly bills in one clean view without analytics tracking.",
    iconUrl: "/showcase/logo.png",
    platformBadges: ["ANDROID", "OFFLINE-READY", "NO TRACKING"],
    detailsUrl: "/apps/reminder-app",
    downloadUrl:
      "https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v2.1.4-GTD/Get-Things-Done.apk",
    downloadLabel: "Download v2.1.4 (.apk)",
    pillars: [
      {
        title: "Natural Language Input",
        description: "Type sentences like you talk. The app assigns due dates and priority tags automatically.",
      },
      {
        title: "Recurring Bill Schedule",
        description: "Track utilities and subscriptions so upcoming payments never surprise your bank balance.",
      },
      {
        title: "In-App System Updates",
        description: "Install feature updates and stability patches directly without downloading manual APK files.",
      },
      {
        title: "Zero Analytics Trackers",
        description: "Runs without advertising SDKs or third-party telemetry libraries embedded in the background.",
      },
    ],
  },
  {
    id: "oasis",
    index: "03 // MOOD & JOURNALING APP",
    status: "v1.0.3 STABLE // PRODUCTION READY",
    name: "Oasis",
    tagline: "Track how you feel and unpack your day in private.",
    manifesto:
      "Log your mood in two taps, follow guided breathing rhythms when stress hits, and record personal reflections behind a secure PIN code. Includes an on-device conversational assistant for daily check-ins.",
    iconUrl: "/showcase/oasis/logo.png",
    platformBadges: ["ANDROID", "ON-DEVICE AI", "PIN-LOCKED"],
    detailsUrl: "/apps/oasis",
    downloadUrl:
      "https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v1.0.3-oasis/Oasis-universal.apk",
    downloadLabel: "Download v1.0.3 (.apk)",
    pillars: [
      {
        title: "Ozie Reflection Assistant",
        description: "Talk through rough moments, small wins, or daily stress whenever you need to reflect.",
      },
      {
        title: "Guided Breathing Pacer",
        description: "Visual cadence circles guide your breathing to lower your heart rate in under two minutes.",
      },
      {
        title: "Monthly Mood Insights",
        description: "Identify how work habits, exercise, and sleep correlate with your emotional patterns.",
      },
      {
        title: "PIN-Protected Journal",
        description: "Lock your personal entries and photos on your phone so only you can read them.",
      },
    ],
  },
];

export default function ProductRoster() {
  return (
    <section id="product-roster" className={styles.rosterSection} aria-label="Production Software Suite">
      <div className={styles.rosterHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Production Software Suite</h2>
        </div>
        <span className={`font-mono-meta ${styles.sectionBadge}`}>
          [ 03 PRODUCTION APPS // ZERO TELEMETRY ]
        </span>
      </div>

      <div className={styles.cardStack}>
        {PRODUCTS.map((product) => (
          <motion.article 
            key={product.id} 
            className={styles.cardShell}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
          >
            <div className={styles.cardCore}>
              {/* Eyebrow & Status Row */}
              <div className={styles.topRow}>
                <span className={`font-mono-meta ${styles.eyebrow}`}>
                  {product.index}
                </span>
                <div className={`font-mono-meta ${styles.statusPill}`}>
                  <span className={styles.pulseDot} />
                  <span>{product.status}</span>
                </div>
              </div>

              {/* Product Identity & Manifesto */}
              <div className={styles.identityBlock}>
                <div className={styles.brandHeader}>
                  <div className={styles.appIconWrap}>
                    <Image
                      src={product.iconUrl}
                      alt={`${product.name} icon`}
                      fill
                      sizes="72px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h3 className={styles.appName}>{product.name}</h3>
                    <p className={styles.tagline}>{product.tagline}</p>
                  </div>
                </div>

                <p className={styles.manifesto}>{product.manifesto}</p>
              </div>

              {/* The Engineering Blueprint (Pillars Grid) */}
              <div className={styles.pillarsSection}>
                <span className={`font-mono-meta ${styles.pillarsLabel}`}>
                  Architectural Pillars
                </span>
                <div className={styles.pillarsGrid}>
                  {product.pillars.map((pillar) => (
                    <div key={pillar.title} className={styles.pillarCard}>
                      <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                      <p className={styles.pillarDesc}>{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button-in-Button Action Row */}
              <div className={styles.actionRow}>
                <div className={styles.platformPills}>
                  {product.platformBadges.map((badge) => (
                    <span key={badge} className={`font-mono-meta ${styles.platformTag}`}>
                      {badge}
                    </span>
                  ))}
                </div>

                <div className={styles.actionButtons}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Link href={product.detailsUrl} className={styles.primaryButton}>
                      <span>Explore Architecture & Live Previews</span>
                      <span className={styles.buttonIconCircle}>
                        <ArrowUpRight size={16} strokeWidth={2.2} />
                      </span>
                    </Link>
                  </motion.div>

                  {product.downloadUrl && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <a
                        href={product.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondaryButton}
                      >
                        <Download size={16} strokeWidth={2} />
                        <span>{product.downloadLabel || "Download Installer"}</span>
                      </a>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
