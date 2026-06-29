"use client";

import { useEffect, useRef } from "react";
import styles from "./AppShowcaseGrid.module.css";
import { APPS_DATA } from "../data/apps";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARD_THEMES: Record<string, { bg: string; text: string; accent: string }> = {
  "reminder-app": { bg: "#FFF7ED", text: "#1a1a1a", accent: "#F97316" }, // Soft orange background
  oasis: { bg: "#E8F5E9", text: "#1a3a1a", accent: "#4CAF50" },
};

export default function AppShowcaseGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal on scroll
      gsap.from([tagRef.current, titleRef.current], {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tagRef.current,
          start: "top 85%",
        },
      });

      // Cards stagger in with pop effect
      const cards = gridRef.current?.querySelectorAll("[data-card]") ?? [];
      gsap.from(cards, {
        opacity: 0,
        y: 80,
        scale: 0.94,
        stagger: {
          amount: 0.5,
          from: "start",
        },
        duration: 0.8,
        ease: "back.out(1.1)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      });

      // Hover magnetic effect on cards
      cards.forEach((card) => {
        const el = card as HTMLElement;

        el.addEventListener("mouseenter", () => {
          gsap.to(el, { scale: 1.025, duration: 0.3, ease: "power2.out" });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, { scale: 1, y: 0, x: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
        });

        el.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / rect.width;
          const dy = (e.clientY - cy) / rect.height;
          gsap.to(el, {
            rotateY: dx * 6,
            rotateX: -dy * 6,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 800,
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="apps" className={styles.section}>
      <div className={`container ${styles.container}`}>
        {/* Section header */}
        <div className={styles.sectionHeader}>
          <span ref={tagRef} className={styles.sectionTag}>
            <span className={styles.tagDot} />
            Our Portfolio
          </span>
          <h2 ref={titleRef} className={`${styles.sectionTitle} display-font`}>OUR APPS</h2>
        </div>

        {/* Bento grid */}
        <div ref={gridRef} className={styles.bentoGrid}>
          {APPS_DATA.map((app, index) => {
            const theme = CARD_THEMES[app.id] ?? { bg: "#F3F4F6", text: "#111", accent: "#6b7280" };
            const isFirst = index === 0;

            return (
              <Link href={`/apps/${app.id}`} key={app.id} className={`${styles.cardLink} ${isFirst ? styles.cardWide : ""}`}>
                <div
                  data-card
                  className={styles.card}
                  style={{ background: theme.bg, color: theme.text }}
                >
                  {/* Top row */}
                  <div className={styles.cardTop}>
                    <div className={styles.iconWrap}>
                      {app.iconUrl ? (
                        <Image
                          src={app.iconUrl}
                          alt={app.name}
                          width={48}
                          height={48}
                          style={{ borderRadius: "12px", objectFit: "cover" }}
                        />
                      ) : (
                        <div className={styles.iconPlaceholder} style={{ background: theme.accent }} />
                      )}
                    </div>
                    <span className={styles.arrowBtn} style={{ background: theme.accent }}>→</span>
                  </div>

                  {/* App info */}
                  <div className={styles.cardBody}>
                    <h3 className={`${styles.appName} display-font`}>{app.name}</h3>
                    <p className={styles.appTagline} style={{ color: "rgba(0,0,0,0.55)" }}>
                      {app.tagline}
                    </p>
                    <p className={styles.appDesc} style={{ color: "rgba(0,0,0,0.75)" }}>
                      {app.description}
                    </p>
                  </div>

                  {/* Feature pills */}
                  <div className={styles.pills}>
                    {app.features.slice(0, 3).map((feat, i) => (
                      <span
                        key={i}
                        className={styles.pill}
                        style={{
                          background: "rgba(0,0,0,0.05)",
                          color: "rgba(0,0,0,0.7)",
                          border: "1px solid rgba(0,0,0,0.1)"
                        }}
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Coming Soon card */}
          <div
            data-card
            className={`${styles.card} ${styles.comingSoonCard}`}
          >
            <div className={styles.pulseWrap}>
              <span className={styles.pulse} />
              <span className={styles.pulseRing} />
            </div>
            <h3 className={`${styles.appName} display-font`} style={{ color: "#111" }}>More Coming</h3>
            <p className={styles.appDesc} style={{ color: "#6b7280" }}>
              New applications are in development. Stay tuned for what&apos;s next from Nexora Studio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
