"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import styles from "./FaqAccordion.module.css";

const gtdFaqs = [
  { q: "Is Get Things Done really free?", a: "Yes, absolutely! The core app is 100% free to use with no hidden subscription fees. You get access to all the beautiful themes, offline reminders, and calendar features right out of the box." },
  { q: "Where do I download the app?", a: "You can download the latest APK directly from this website. Thanks to our built-in OTA (Over-The-Air) update system, you will automatically be notified inside the app whenever a new version is released!" },
  { q: "Does it require an internet connection?", a: "No. Get Things Done is designed to work completely offline. Your reminders, categories, and alarms will work perfectly without internet. Internet is only required if you choose to use the Cloud Sync feature." },
  { q: "Do I need an account to use it?", a: "You don't need an account to start using the app. You can use it as a guest immediately! However, creating a free account allows you to securely back up your reminders to the cloud and sync them across multiple devices." },
  { q: "What Android version do I need?", a: "The app is highly optimized and requires Android 8.0 (Oreo) or later to run smoothly with all its fluid animations and background alarm features." },
  { q: "Are my reminders and data private?", a: "Your privacy is our top priority. By default, all data is stored locally on your device. If you use the Cloud Sync feature, your data is securely transmitted and stored, and we never share your information with third parties." },
  { q: "Can I customize the look of the app?", a: "Definitely! We offer a variety of gorgeous, hand-crafted themes including Dark Mode, Sakura, Lavender, Mint, Ocean, and Coffee. Even the app's buttons will dynamically adapt to the theme you choose!" },
];

const oasisFaqs = [
  { q: "Is Oasis really free?", a: "Yes! Oasis is a 100% free app designed as a safe space for your mental health. Enjoy mood tracking and journaling without any subscriptions." },
  { q: "Where do I download the app?", a: "You can download the Oasis APK directly from this page. Oasis also has a built-in Over-The-Air (OTA) updater, so you will always get the latest version seamlessly inside the app." },
  { q: "Does it require an internet connection?", a: "Your journals, mood history, and statistics work completely offline! However, an internet connection is required if you want to chat with Ozie, your AI companion." },
  { q: "Are my journals completely private?", a: "Absolutely. All your stories, moods, and photos are saved directly on your local device. For extra security, you can lock the app with a secure PIN code so no one else can read your thoughts." },
  { q: "Who is Ozie?", a: "Ozie is your virtual AI companion built into the app! Whenever you feel lonely, stressed, or just want to share a happy moment, Ozie is there 24/7 to listen and chat with you." },
  { q: "What Android version do I need?", a: "Oasis requires Android 8.0 (Oreo) or later to ensure smooth animations and stable AI capabilities." },
];

interface FaqAccordionProps {
  appId?: string;
}

export default function FaqAccordion({ appId = "gtd" }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const activeFaqs = appId === "oasis" ? oasisFaqs : gtdFaqs;

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.title}>Straight answers</h2>
      <div className={styles.accordionList}>
        {activeFaqs.map((faq, index) => {
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
