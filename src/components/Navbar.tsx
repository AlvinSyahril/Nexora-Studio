"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <header className={styles.header}>
      <nav ref={navRef} className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <Image src="/nexora-logo-orange.png" alt="Nexora Studio Logo" width={28} height={28} style={{ borderRadius: "7px" }} />
          <span className={styles.logoText}>Nexora Studio</span>
        </Link>

        <div className={styles.links}>
          <Link href="#apps" className={styles.link}>Apps</Link>
          <Link href="#about" className={styles.link}>About</Link>
          <Link href="#apps" className={styles.ctaBtn}>Get Started</Link>
        </div>
      </nav>
    </header>
  );
}
