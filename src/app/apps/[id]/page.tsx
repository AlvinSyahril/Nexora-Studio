import { APPS_DATA } from "@/data/apps";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import MockupSwitcher from "@/components/MockupSwitcher";
import FaqAccordion from "@/components/FaqAccordion";

export function generateStaticParams() {
  return APPS_DATA.map((app) => ({
    id: app.id,
  }));
}

export default async function AppDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const app = APPS_DATA.find((a) => a.id === resolvedParams.id);

  if (!app) {
    notFound();
  }

  return (
    <div className={styles.showcaseWrapper}>
      {/* Background Blobs */}
      <div className={`${styles.blob} ${styles.blobPurple}`}></div>
      <div className={`${styles.blob} ${styles.blobGreen}`}></div>
      <div className={`${styles.blob} ${styles.blobBlue}`}></div>

      {/* Navbar */}
      <nav className={`${styles.container} ${styles.nav}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/#apps" className={styles.backButton} title="Back to Nexora">
            <ArrowLeft size={16} /> <span className={styles.backText}>Back</span>
          </Link>
          <div className={styles.navBrand}>
            <div className={styles.navLogo}>
              <Image src="/showcase/logo.png" alt="Logo" width={40} height={40} />
            </div>
            <span className={styles.navTitle}>Get Things Done</span>
          </div>
        </div>
        <a href="/downloads/Get-Things-Done.apk" download className={styles.navBtn}>Download App</a>
      </nav>

      {/* Hero Section */}
      <section className={`${styles.container} ${styles.hero}`}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            Your Minimalist <br/>Companion to <br/>
            <span className={styles.textGradient}>Get Things Done.</span>
          </h1>
          <p className={styles.heroDesc}>
            Designed for focus. No clutter, just what you need to achieve your goals today. Sync instantly across all your devices securely.
          </p>
          <div className={styles.heroActions}>
            <a href="/downloads/Get-Things-Done.apk" download className={styles.btnPrimary}>Get Started Free</a>
            <a href="#features" className={styles.btnSecondary}>Explore Features</a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={`${styles.samsungMockup} ${styles.heroMockup}`}>
            <Image src="/showcase/home.jpg" alt="Home Screen" width={300} height={600} priority />
          </div>
        </div>
      </section>

      {/* Feature 1: Clean & Focused Interface */}
      <section id="features" className={`${styles.container} ${styles.feature1}`}>
        <div className={styles.f1Text}>
          <div className={styles.iconBadgeGreen}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          </div>
          <h2 className={styles.fTitle}>Designed for Focus.</h2>
          <p className={styles.fDesc}>
            Experience a clutter-free interface that puts your tasks front and center. Adding subtasks, setting priorities, and picking dates feels incredibly intuitive and looks stunning in our signature dark mode.
          </p>
          <ul className={styles.fList}>
            <li className={styles.fListItem}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Smart time detection based on titles
            </li>
            <li className={styles.fListItem}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Detailed subtask management
            </li>
            <li className={styles.fListItem}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Customizable priorities & frequencies
            </li>
          </ul>
        </div>
        <div className={styles.f1Visual}>
          <div className={`${styles.samsungMockup} ${styles.floatCenter}`}>
            <Image src="/showcase/add.jpg" alt="Add Reminder" width={300} height={600} />
          </div>
        </div>
      </section>

      {/* Feature 2: Seamless Cloud Sync & Categories */}
      <section className={`${styles.container} ${styles.feature2}`}>
        <div className={styles.f2Text}>
          <div className={styles.iconBadgeBlue}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          </div>
          <h2 className={styles.fTitle}>Never Lose a Task Again.</h2>
          <p className={styles.fDesc}>
            Organize your life into beautiful, color-coded categories. Your calendar, daily progress, and tasks are automatically backed up and synced securely across all your devices using Google Cloud infrastructure.
          </p>
        </div>
        {/* Visual mockups with 3D animation */}
        <MockupSwitcher />
      </section>

      {/* FAQ Section */}
      <FaqAccordion />

      {/* Footer CTA */}
      <footer className={styles.footer}>
        <div className={styles.footerBg}></div>
        <div className={styles.container}>
          <h2 className={styles.footerTitle}>Ready to organize your life?</h2>
          <a href="/downloads/Get-Things-Done.apk" download className={styles.footerBtn}>Download Get Things Done</a>
          <p className={styles.footerCopy}>© 2026 Nexora Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
