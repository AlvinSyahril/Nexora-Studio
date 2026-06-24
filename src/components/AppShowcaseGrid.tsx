"use client";

import { motion } from "framer-motion";
import styles from "./AppShowcaseGrid.module.css";
import { APPS_DATA } from "../data/apps";
import { Smartphone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AppShowcaseGrid() {
  return (
    <section id="apps" className={styles.gridSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our <span className="text-gradient">Portfolio</span></h2>
          <p className={styles.subtitle}>Explore the applications we've built, focusing on intuitive design and powerful functionality.</p>
        </div>

        <div className={styles.grid}>
          {APPS_DATA.map((app, index) => (
            <Link href={`/apps/${app.id}`} key={app.id} style={{ display: 'block' }}>
              <motion.div
                className={`brutal-card ${styles.card}`}
                style={{ backgroundColor: "var(--accent-violet)", color: "#000" }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className={styles.cardHeader}>
                  <div 
                    className={styles.iconContainer} 
                    style={app.iconUrl && app.iconUrl !== "/placeholders/reminder-icon.png" ? { border: 'none', background: 'transparent', padding: 0 } : {}}
                  >
                    {app.iconUrl && app.iconUrl !== "/placeholders/reminder-icon.png" ? (
                      <Image src={app.iconUrl} alt={app.name} width={64} height={64} style={{ borderRadius: '16px', display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Smartphone size={32} color="#000" />
                    )}
                  </div>
                  <div>
                    <h3 className={`${styles.appName} display-font`}>{app.name}</h3>
                    <p className={styles.tagline} style={{ color: "rgba(0,0,0,0.7)" }}>{app.tagline}</p>
                  </div>
                </div>
                <p className={styles.description} style={{ color: "rgba(0,0,0,0.8)" }}>{app.description}</p>
                
                <div className={styles.features}>
                  {app.features.slice(0, 3).map((feat, i) => (
                    <span key={i} className={styles.featureBadge}>{feat}</span>
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}
          
          {/* Placeholder for future apps to show scalability */}
          <motion.div
            className={`brutal-card ${styles.card} ${styles.comingSoonCard}`}
            style={{ backgroundColor: "var(--surface)", color: "var(--foreground)" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: APPS_DATA.length * 0.2 }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.pulsingDot} />
            </div>
            <h3 className={`${styles.appName} display-font`}>More Coming Soon</h3>
            <p className={styles.description}>We are constantly innovating. Stay tuned for new applications joining the Nexora Studio ecosystem.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
