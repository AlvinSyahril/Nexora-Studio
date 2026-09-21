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
import { APPS_DATA } from "../data/apps";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = "100%", height = "24px", borderRadius = "8px" }) => (
  <div
    style={{
      width,
      height,
      borderRadius,
      background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
      backgroundSize: "200% 100%",
      animation: "pulse 2s infinite"
    }}
  />
);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<LottieRefCurrentProps>(null);
  const [isAwake, setIsAwake] = useState(false);
  const lottieRef = useRef<HTMLDivElement>(null);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [dogLoaded, setDogLoaded] = useState(false);

  useEffect(() => {
    // Suppress Next.js Turbopack missing image [object Event] crash
    const handleRejection = (e: PromiseRejectionEvent) => {
      // Check for [object Event] or any Event-like object
      if (e.reason && (e.reason instanceof Event || 
          (typeof e.reason === 'object' && (e.reason.type === 'error' || e.reason.toString() === '[object Event]')))) {
        e.preventDefault();
        return;
      }
      
      // Also suppress generic Turbopack error about missing image src
      if (typeof e.reason === 'string' && e.reason.includes('Turbopack') && e.reason.includes('image')) {
        e.preventDefault();
        return;
      }
    };
    window.addEventListener('unhandledrejection', handleRejection);
    
    const playDog = () => {
      dogRef.current?.playSegments([230, 425], true);
      setIsAwake(true);
    };
    window.addEventListener('play-dog-animation', playDog);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (!prefersReducedMotion) {
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
      } else {
        // Instant reveal without animation
        gsap.set([tagRef.current, headlineRef.current, subRowRef.current, lottieRef.current], { opacity: 1 });
        gsap.set(bottomRowRef.current?.children ?? [], { opacity: 1 });
      }
    }, sectionRef);

    return () => {
      window.removeEventListener('unhandledrejection', handleRejection);
      window.removeEventListener('play-dog-animation', playDog);
      ctx.revert();
    };
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
        {!animationLoaded && <Skeleton width="100%" height="300px" borderRadius="16px" />}
        <Lottie
          animationData={orangeAnimation}
          loop
          autoplay
          onDOMLoaded={() => setAnimationLoaded(true)}
          style={{ width: "100%", height: "100%", display: animationLoaded ? "block" : "none" }}
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
                    <span className={styles.statsNumber}>{APPS_DATA.length}</span>
                    <span className={styles.statsLabel}>Apps Available</span>
                  </div>
                  <div className={styles.statsCard}>
                    <span className={styles.statsNumber}>99.99%</span>
                    <span className={styles.statsLabel}>Absolutely Cinema</span>
                  </div>
                </div>
      </div>

      {/* Bottom bento cards row */}
      <div id="about" ref={bottomRowRef} className={styles.bottomRow}>
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
          {!dogLoaded && <Skeleton width="100%" height="100%" borderRadius="0" />}
          <Lottie
            lottieRef={dogRef}
            animationData={dogAnimation}
            loop={true}
            autoplay={false}
            onDOMLoaded={() => {
              setDogLoaded(true);
              dogRef.current?.playSegments([0, 120], true);
            }}
            style={{ width: "100%", height: "100%", transform: "scale(1.2)", display: dogLoaded ? "block" : "none" }}
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
