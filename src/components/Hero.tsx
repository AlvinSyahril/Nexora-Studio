"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContent}`}>
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Official Developer Showcase
          </motion.div>
          <h1 className={`${styles.title} display-font`}>
            Crafting Digital <br />
            <span className="text-gradient">Experiences</span>
          </h1>
          <p className={styles.subtitle}>
            Welcome to Nexora Studio. Discover premium mobile applications engineered with precision, smart features, and modern design.
          </p>
          <motion.div 
            className={styles.ctaGroup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="#apps" className="btn-primary">
              Explore Apps <ChevronRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
