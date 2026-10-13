"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Zap, GitBranch, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./StudioBento.module.css";

export default function StudioBento() {
  return (
    <section id="studio-philosophy" className={styles.bentoSection} aria-label="Studio Philosophy & Technical Standards">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={styles.bentoHeader}
      >
        <div>
          <h2 className={styles.sectionTitle}>How We Build Software</h2>
        </div>
        <span className={`font-mono-meta ${styles.sectionBadge}`}>
          [ ENGINEERING STANDARDS ]
        </span>
      </motion.div>

      <div className={styles.grid}>
        {/* Card 1: Local-First Storage (Span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className={`${styles.card} ${styles.cardCol2}`}
        >
          <div>
            <div className={styles.cardTop}>
              <span className={`font-mono-meta ${styles.cardIndex}`}>01 / STORAGE</span>
              <ShieldCheck size={24} strokeWidth={1.5} color="#171717" />
            </div>
            <h3 className={styles.cardTitle}>Files Stay On Your Machine</h3>
            <p className={styles.cardDesc}>
              We save your data in open formats directly on your local drive. That means standard Markdown files for notes, immediate offline launch, and no subscription lock-in.
            </p>
          </div>

          <div className={styles.terminalBox}>
            <pre className={styles.terminalCode}>
              <code>
                <span className={styles.termMuted}>{"// Nexora Storage Invariant"}</span><br />
                storage: <span className={styles.termGreen}>&quot;filesystem://local-vault&quot;</span><br />
                telemetry: <span className={styles.termGreen}>false</span><br />
                offline_first: <span className={styles.termGreen}><span className={styles.pulsingDot} />true</span> {"// zero network latency"}
              </code>
            </pre>
          </div>
        </motion.div>

        {/* Card 2: 60 FPS Micro-Motion (Span 1) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className={`${styles.card} ${styles.cardCol1}`}
        >
          <div>
            <div className={styles.cardTop}>
              <span className={`font-mono-meta ${styles.cardIndex}`}>02 / INTERACTION</span>
              <Zap size={24} strokeWidth={1.5} color="#171717" />
            </div>
            <h3 className={styles.cardTitle}>Snappy Native Feel</h3>
            <p className={styles.cardDesc}>
              Hardware-accelerated rendering and immediate keyboard shortcuts. Transitions are tuned so the interface keeps up with fast typing without lag.
            </p>
          </div>
          <span className={`font-mono-meta ${styles.cardIndex}`} style={{ marginTop: "2rem" }}>
            [ CUBIC-BEZIER(0.16, 1, 0.3, 1) ]
          </span>
        </motion.div>

        {/* Card 3: Open Distribution & Releases (Span 1) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className={`${styles.card} ${styles.cardCol1}`}
        >
          <div>
            <div className={styles.cardTop}>
              <span className={`font-mono-meta ${styles.cardIndex}`}>03 / RELEASES</span>
              <GitBranch size={24} strokeWidth={1.5} color="#171717" />
            </div>
            <h3 className={styles.cardTitle}>Direct GitHub Downloads</h3>
            <p className={styles.cardDesc}>
              Download installer packages directly with verifiable checksums. Follow development progress, inspect changelogs, and submit bug reports in public.
            </p>
          </div>
          <motion.a
            href="https://github.com/AlvinSyahril/Nexora-Studio"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-mono-meta ${styles.cardIndex}`}
            style={{ marginTop: "2rem", display: "inline-flex", alignItems: "center", gap: "0.25rem", color: "#171717" }}
            whileHover={{ x: 3 }}
          >
            <span>GITHUB REPOSITORY</span>
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>

        {/* Card 4: Unified Application Directory (Span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className={`${styles.card} ${styles.cardCol2}`}
        >
          <div>
            <div className={styles.cardTop}>
              <span className={`font-mono-meta ${styles.cardIndex}`}>04 / DIRECTORY</span>
              <LayoutGrid size={24} strokeWidth={1.5} color="#171717" />
            </div>
            <h3 className={styles.cardTitle}>Software Directory</h3>
            <p className={styles.cardDesc}>
              Technical specifications, feature guides, and release downloads for every tool in the studio.
            </p>
          </div>

          <div className={styles.catalogList}>
            <Link href="/apps/loom" className={styles.catalogItem}>
              <div className={styles.itemLeft}>
                <span className={styles.itemName}>Loom</span>
                <span className={`font-mono-meta ${styles.itemPlatform}`}>Windows Desktop</span>
              </div>
              <div className={styles.itemRight}>
                <span className={`font-mono-meta ${styles.itemVersion}`}>v1.0.1 Stable</span>
                <ArrowUpRight size={16} />
              </div>
            </Link>

            <Link href="/apps/reminder-app" className={styles.catalogItem}>
              <div className={styles.itemLeft}>
                <span className={styles.itemName}>Get Things Done</span>
                <span className={`font-mono-meta ${styles.itemPlatform}`}>Android App</span>
              </div>
              <div className={styles.itemRight}>
                <span className={`font-mono-meta ${styles.itemVersion}`}>v2.1.4 Stable</span>
                <ArrowUpRight size={16} />
              </div>
            </Link>

            <Link href="/apps/oasis" className={styles.catalogItem}>
              <div className={styles.itemLeft}>
                <span className={styles.itemName}>Oasis</span>
                <span className={`font-mono-meta ${styles.itemPlatform}`}>Android App</span>
              </div>
              <div className={styles.itemRight}>
                <span className={`font-mono-meta ${styles.itemVersion}`}>v1.0.3 Stable</span>
                <ArrowUpRight size={16} />
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
