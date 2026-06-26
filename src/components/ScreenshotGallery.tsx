"use client";

import React, { useRef } from "react";
import Image from "next/image";
import styles from "./ScreenshotGallery.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SCREENSHOTS = [
  "/screenshots/Screenshot_1782481432.png",
  "/screenshots/Screenshot_1782481441.png",
  "/screenshots/Screenshot_1782481446.png",
  "/screenshots/Screenshot_1782481454.png",
  "/screenshots/Screenshot_1782481462.png",
  "/screenshots/Screenshot_1782481470.png",
  "/screenshots/Screenshot_1782481482.png",
  "/screenshots/Screenshot_1782481495.png"
];

export default function ScreenshotGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth * 0.8
          : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.galleryContainer}>
      <h2 className={styles.galleryTitle}>A Glimpse Inside</h2>
      <p className={styles.galleryDesc}>Swipe through to see the beautiful, carefully crafted interfaces designed for ultimate productivity.</p>
      
      <div className={styles.carouselWrapper}>
        <button className={`${styles.navButton} ${styles.leftBtn}`} onClick={() => scroll("left")} aria-label="Previous image">
          <ChevronLeft size={24} />
        </button>
        
        <div className={styles.carousel} ref={scrollRef}>
          {SCREENSHOTS.map((src, idx) => (
            <div key={idx} className={styles.mockupContainer}>
              <div className={styles.phoneFrame}>
                <Image 
                  src={src} 
                  alt={`App Screenshot ${idx + 1}`} 
                  width={280} 
                  height={600} 
                  className={styles.screenshotImg}
                />
              </div>
            </div>
          ))}
        </div>

        <button className={`${styles.navButton} ${styles.rightBtn}`} onClick={() => scroll("right")} aria-label="Next image">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
