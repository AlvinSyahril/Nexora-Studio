"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <motion.nav 
        className={`${styles.navbar} brutal-card`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Image src="/nexora-logo.png" alt="Nexora Studio Logo" width={32} height={32} style={{ borderRadius: "8px" }} />
            <span className="display-font">Nexora Studio</span>
          </Link>
          <div className={styles.links}>
            <Link href="#apps" className={styles.link}>Apps</Link>
            <Link href="#about" className={styles.link}>About</Link>
          </div>
        </div>
      </motion.nav>
    </header>
  );
}
