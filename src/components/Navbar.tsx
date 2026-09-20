"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.from(navRef.current, {
          y: -80,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.1,
        });
      } else {
        gsap.set(navRef.current, { opacity: 1 });
      }
    });
    return () => ctx.revert();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleAppsClick = (e: React.MouseEvent) => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    gsap.to(window, { scrollTo: "#apps", duration: 1, ease: "power3.inOut" });
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    
    const navHeight = navRef.current?.offsetHeight || 80;
    gsap.to(window, { 
      scrollTo: { y: "#about", offsetY: navHeight + 70 }, 
      duration: 1, 
      ease: "power3.inOut" 
    });
    // Trigger dog animation whimsy!
    window.dispatchEvent(new CustomEvent('play-dog-animation'));
  };

  const handleGetStartedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      // Debounce: only trigger if no active animation
      if (document.querySelectorAll('.emoji-confetti').length > 0) return;
      
      // 1. Confetti / Emoji explosion (Whimsy Injector)
      const emojis = ['🎉', '✨', '🎊', '🚀', '🧡'];
      for (let i = 0; i < 12; i++) { // Reduced from 20 to 12
        const emoji = document.createElement('div');
        emoji.className = 'emoji-confetti';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.top = `${Math.random() * 100}%`;
        emoji.style.fontSize = `${Math.random() * 2 + 1}rem`;
        emoji.style.zIndex = '1000';
        emoji.style.pointerEvents = 'none';
        document.body.appendChild(emoji);

        // Animate
        gsap.to(emoji, {
          y: -100,
          opacity: 0,
          duration: 2,
          ease: "power1.out",
          onComplete: () => emoji.remove()
        });
      }
    }

    // 2. Smooth scroll to apps section
    gsap.to(window, {
      scrollTo: "#apps",
      duration: 1.5,
      ease: "power3.inOut",
      delay: 0.3
    });
  };

  return (
    <header className={styles.header}>
      <nav ref={navRef} className={styles.navbar}>
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          <Image src="/nexora-logo-orange.png" alt="Nexora Studio Logo" width={28} height={28} style={{ borderRadius: "7px" }} onError={(e) => { const parent = e.currentTarget.parentElement; if (parent) parent.innerHTML = '<div style="width: 28px; height: 28px; background: var(--accent-orange); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: white;">N</div>'; }} />
          <span className={styles.logoText}>Nexora Studio</span>
        </Link>

        <button
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${styles.links} ${isMobileMenuOpen ? styles.linksOpen : ''}`}>
          <a href="#apps" onClick={(e) => { handleAppsClick(e); closeMobileMenu(); }} className={styles.link}>Apps</a>
          <a href="#about" onClick={(e) => { handleAboutClick(e); closeMobileMenu(); }} className={styles.link}>About</a>
          <a href="#apps" onClick={(e) => { handleGetStartedClick(e); closeMobileMenu(); }} className={styles.ctaBtn}>Get Started</a>
        </div>
      </nav>
    </header>
  );
}
