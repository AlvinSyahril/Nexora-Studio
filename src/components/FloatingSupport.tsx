"use client";

import Image from "next/image";
import styles from "./FloatingSupport.module.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingSupport() {
  const [isVisible, setIsVisible] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingFinished, setIsTypingFinished] = useState(false);
  const fullText = "Hi! If you love my apps, consider supporting my work! ☕️";

  useEffect(() => {
    // Show avatar first
    const timer1 = setTimeout(() => setIsVisible(true), 1500);
    // Show bubble shortly after
    const timer2 = setTimeout(() => setBubbleVisible(true), 2200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (bubbleVisible) {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayedText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          // Wait 1 extra second of blinking before hiding the cursor
          setTimeout(() => setIsTypingFinished(true), 1000);
        }
      }, 40); // speed of typing
      return () => clearInterval(typingInterval);
    }
  }, [bubbleVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className={styles.floatingContainer}>
          <a href="https://trakteer.id/alvin_syahril/tip" target="_blank" rel="noopener noreferrer" className={styles.wrapper}>
            <AnimatePresence>
              {bubbleVisible && (
                <motion.div 
                  className={styles.bubble}
                  initial={{ opacity: 0, scale: 0.5, y: 20, transformOrigin: "bottom right" }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  {displayedText}
                  {!isTypingFinished && <span className={styles.cursor}>|</span>}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div 
              className={styles.avatar}
              initial={{ y: 50, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
            >
              <Image 
                src="/nexora-logo.png" 
                alt="Support Nexora" 
                width={60} 
                height={60} 
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </a>
        </div>
      )}
    </AnimatePresence>
  );
}
