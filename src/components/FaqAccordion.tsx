"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import styles from "./FaqAccordion.module.css";

const faqs = [
  { q: "Is Get Things Done really free?", a: "Yes, absolutely! The core app is 100% free to use with no hidden subscription fees. You get access to all the beautiful themes, offline reminders, and calendar features right out of the box." },
  { q: "Where do I download the app?", a: "You can download the latest APK directly from this website. Thanks to our built-in OTA (Over-The-Air) update system, you will automatically be notified inside the app whenever a new version is released!" },
  { q: "Does it require an internet connection?", a: "No. Get Things Done is designed to work completely offline. Your reminders, categories, and alarms will work perfectly without internet. Internet is only required if you choose to use the Cloud Sync feature." },
  { q: "Do I need an account to use it?", a: "You don't need an account to start using the app. You can use it as a guest immediately! However, creating a free account allows you to securely back up your reminders to the cloud and sync them across multiple devices." },
  { q: "What Android version do I need?", a: "The app is highly optimized and requires Android 8.0 (Oreo) or later to run smoothly with all its fluid animations and background alarm features." },
  { q: "Are my reminders and data private?", a: "Your privacy is our top priority. By default, all data is stored locally on your device. If you use the Cloud Sync feature, your data is securely transmitted and stored, and we never share your information with third parties." },
  { q: "Can I customize the look of the app?", a: "Definitely! We offer a variety of gorgeous, hand-crafted themes including Dark Mode, Sakura, Lavender, Mint, Ocean, and Coffee. Even the app's buttons will dynamically adapt to the theme you choose!" },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.title}>Straight answers</h2>
      <div className={styles.accordionList}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className={styles.card}>
              <button 
                className={styles.questionBtn} 
                onClick={() => toggleOpen(index)}
                aria-expanded={isOpen}
              >
                <h3 className={styles.questionText}>{faq.q}</h3>
                <div className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>
                  <Plus size={20} strokeWidth={2.5} />
                </div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className={styles.answerWrapper}
                  >
                    <div className={styles.answer}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
