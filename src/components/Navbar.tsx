"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

const MENU_ITEMS = [
  { index: "01", label: "Studio", href: "/#hero" },
  { index: "02", label: "Product Suite", href: "/#product-roster" },
  { index: "03", label: "Philosophy", href: "/#studio-philosophy" },
  { index: "04", label: "Loom", href: "/apps/loom" },
  { index: "05", label: "Get Things Done", href: "/apps/reminder-app" },
  { index: "06", label: "Oasis", href: "/apps/oasis" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logoLink} onClick={closeMenu}>
          nexora
        </Link>
        <motion.button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          animate={{ rotate: isMenuOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus size={32} strokeWidth={2} />
        </motion.button>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="nav-overlay"
            className={`${styles.menuOverlay} ${styles.menuOverlayOpen}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Main Navigation">
              <ul className={styles.menuList}>
                {MENU_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.label}
                    className={styles.menuItem}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.045,
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className={styles.itemIndex}>{item.index}</span>
                    <Link href={item.href} className={styles.itemLink} onClick={closeMenu}>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className={styles.menuFooter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
            >
              <div className={styles.menuFooterLinks}>
                <Link href="/privacy" className={styles.footerLink} onClick={closeMenu}>
                  Privacy Policy
                </Link>
                <Link href="/terms" className={styles.footerLink} onClick={closeMenu}>
                  Terms & Conditions
                </Link>
              </div>
              <a
                href="https://github.com/AlvinSyahril/Nexora-Studio"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                GitHub
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
