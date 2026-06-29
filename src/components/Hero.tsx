"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import orangeAnimation from "../../public/animations/orange.json";
import dogAnimation from "../../public/animations/dog-in-the-park.json";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<LottieRefCurrentProps>(null);
  const [isAwake, setIsAwake] = useState(false);
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. About tag fades in
      tl.from(tagRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.7,
      });

      // 2. Headline — letter by letter reveal
      if (headlineRef.current) {
        // Fallback if SplitText not available (free version)
        tl.from(
          headlineRef.current,
          {
            opacity: 0,
            y: 80,
            skewY: 4,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.3"
        );
      }

      // 3. Sub row slides up
      tl.from(
        subRowRef.current,
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
        },
        "-=0.5"
      );

      // 4. Bottom bento cards stagger in
      tl.from(
        bottomRowRef.current?.children ?? [],
        {
          opacity: 0,
          y: 50,
          stagger: 0.12,
          duration: 0.7,
          ease: "back.out(1.2)",
        },
        "-=0.4"
      );

      // 5. Lottie container fades in
      gsap.from(lottieRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.6,
      });

      // 6. Headline parallax on scroll
      gsap.to(headlineRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      {/* About tag */}
      <div ref={tagRef} className={styles.aboutTag}>
        <span className={styles.dot} />
        About
      </div>

      {/* Giant headline */}
      <h1 ref={headlineRef} className={`${styles.headline} display-font`}>
        DISCOVER OUR APPS
      </h1>

      {/* Lottie animation — center glow */}
      <div ref={lottieRef} className={styles.lottieWrap}>
        <Lottie
          animationData={orangeAnimation}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Sub-row: description left, stats right */}
      <div ref={subRowRef} className={styles.subRow}>
        <div className={styles.leftContent}>
          <p className={styles.description}>
            We build and craft premium mobile applications engineered with precision and modern design.
          </p>
          <Link href="#apps" className={styles.ctaLink}>
            Explore Apps →
          </Link>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.statsCard}>
            <span className={styles.statsNumber}>2+</span>
            <span className={styles.statsLabel}>Apps Available</span>
          </div>
          <div className={styles.statsCard}>
            <span className={styles.statsNumber}>99.99%</span>
            <span className={styles.statsLabel}>Absolutely Cinema</span>
          </div>
        </div>
      </div>

      {/* Bottom bento cards row */}
      <div ref={bottomRowRef} className={styles.bottomRow}>
        {/* Left orange card */}
        <div className={styles.bottomCardOrange}>
          <span className={styles.bottomCardIcon}>✦</span>
          <p className={styles.bottomCardTitle}>Have a question?</p>
          <a href="https://instagram.com/vinnssmokee" target="_blank" rel="noopener noreferrer" className={styles.bottomCardLink}>Get In Touch →</a>
        </div>

        {/* Middle stats card */}
        <div 
          className={styles.bottomCardWhite} 
          style={{ padding: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          onClick={() => {
            const nextState = !isAwake;
            setIsAwake(nextState);
            if (nextState) {
              dogRef.current?.playSegments([230, 425], true);
            } else {
              dogRef.current?.playSegments([0, 120], true);
            }
          }}
        >
          <Lottie
            lottieRef={dogRef}
            animationData={dogAnimation}
            loop={true}
            autoplay={false}
            onDOMLoaded={() => {
              dogRef.current?.playSegments([0, 120], true);
            }}
            style={{ width: "100%", height: "100%", transform: "scale(1.2)" }}
          />
        </div>

        {/* Right white card */}
        <div className={styles.bottomCardWhite} style={{ justifyContent: "space-between" }}>
          <p className={styles.bottomCardText}>We build apps based on real user needs, not assumptions.</p>
          <a href="#apps" className={styles.downloadLink}>Download Now →</a>
        </div>
      </div>
    </section>
  );
}
