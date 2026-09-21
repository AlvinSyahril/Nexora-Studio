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
      // Smooth scroll with slight delay for effect
      gsap.to(window, {
        scrollTo: "#apps",
        duration: 1.5,
        ease: "power3.inOut",
        delay: 0.2
      });
    } else {
      // Direct scroll for reduced motion
      gsap.to(window, {
        scrollTo: "#apps",
        duration: 0.5,
        ease: "power2.inOut"
      });
    }
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
