"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import styles from "./Hero.module.css";

const FIRST_WORD = "NEXORA";
const SECOND_WORD = "STUDIO";

export default function Hero() {
  const handleScrollToRoster = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const rosterEl = document.getElementById("product-roster");
    if (rosterEl) {
      rosterEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className={styles.heroSection}>
      <h1 className={styles.headline}>
        <span className={styles.word}>
          {FIRST_WORD.split("").map((letter, index) => {
            const delay = 0.1 + index * 0.04;
            return (
              <span key={`first-${index}`} className="headline-reveal">
                <span style={{ animationDelay: `${delay.toFixed(2)}s` }}>{letter}</span>
              </span>
            );
          })}
        </span>

        <span className={styles.wordSpacing} aria-hidden="true" />

        <span className={styles.word}>
          {SECOND_WORD.split("").map((letter, index) => {
            const delay = 0.1 + (FIRST_WORD.length + index) * 0.04;
            return (
              <span key={`second-${index}`} className="headline-reveal">
                <span style={{ animationDelay: `${delay.toFixed(2)}s` }}>{letter}</span>
              </span>
            );
          })}
        </span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={styles.subheadline}
      >
        Independent software for focused work and clear thinking. Fast local notes, structured tasks, and zero telemetry.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={styles.heroActionWrap}
      >
        <motion.a
          href="#product-roster"
          onClick={handleScrollToRoster}
          className={styles.explorePill}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <span className="font-mono-meta">[ EXPLORE SOFTWARE ]</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ display: "inline-flex" }}
          >
            <ArrowDown size={14} />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
