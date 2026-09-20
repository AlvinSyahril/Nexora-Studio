"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

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

  const handleAppsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(window, { scrollTo: "#apps", duration: 1, ease: "power3.inOut" });
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(window, { scrollTo: { y: "#about", offsetY: 150 }, duration: 1, ease: "power3.inOut" });
    // Trigger dog animation whimsy!
    window.dispatchEvent(new CustomEvent('play-dog-animation'));
  };

  const handleGetStartedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // 1. Confetti / Emoji explosion (Whimsy Injector)
    const emojis = ['🎉', '✨', '🎊', '🚀', '🧡'];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.position = 'fixed';
        el.style.left = (e.clientX || window.innerWidth / 2) + 'px';
        el.style.top = (e.clientY || 50) + 'px';
        el.style.fontSize = (Math.random() * 20 + 20) + 'px';
        el.style.zIndex = '9999';
        el.style.pointerEvents = 'none';
        document.body.appendChild(el);
        
        gsap.to(el, {
          y: window.innerHeight + 100,
          x: "+=" + (Math.random() * 400 - 200),
          rotation: Math.random() * 360,
          duration: Math.random() * 1.5 + 1.5,
          ease: "power1.in",
          onComplete: () => el.remove()
        });
      }, i * 40);
    }

    // 2. Smooth cinematic scroll to the first app (Loom)
    gsap.to(window, { scrollTo: "#apps", duration: 1.2, ease: "power3.inOut" });
  };

  return (
    <header className={styles.header}>
      <nav ref={navRef} className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <Image src="/nexora-logo-orange.png" alt="Nexora Studio Logo" width={28} height={28} style={{ borderRadius: "7px" }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <span className={styles.logoText}>Nexora Studio</span>
        </Link>

        <div className={styles.links}>
          <a href="#apps" onClick={handleAppsClick} className={styles.link}>Apps</a>
          <a href="#about" onClick={handleAboutClick} className={styles.link}>About</a>
          <a href="#apps" onClick={handleGetStartedClick} className={styles.ctaBtn}>Get Started</a>
        </div>
      </nav>
    </header>
  );
}
