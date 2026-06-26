import { APPS_DATA } from "@/data/apps";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import FaqAccordion from "@/components/FaqAccordion";
import ScreenshotGallery from "@/components/ScreenshotGallery";

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
            <Image src="/screenshots/Screenshot_1782481432.png" alt="Get Things Done Home" width={300} height={600} priority style={{ borderRadius: '30px' }} />
          </div>
        </div>
      </section>

      {/* Feature 3: System Update Dashboard */}
      <section id="features" className={`${styles.container} ${styles.feature1}`}>
        <div className={styles.f1Text}>
          <div className={styles.iconBadgeGreen}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          </div>
          <h2 className={styles.fTitle}>Seamless System Updates.</h2>
          <p className={styles.fDesc}>
            Stay on the cutting edge effortlessly. With our new Global Update Checker and dedicated Update Dashboard, you'll never miss a new feature or bug fix again.
          </p>
          <ul className={styles.fList}>
            <li className={styles.fListItem}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Automatic background checks on startup
            </li>
            <li className={styles.fListItem}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Non-intrusive global notification popups
            </li>
            <li className={styles.fListItem}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Detailed changelogs built-in natively
            </li>
          </ul>
        </div>
        <div className={styles.f1Visual}>
          <div className={`${styles.samsungMockup} ${styles.floatCenter}`}>
             <Image src="/screenshots/Screenshot_1782481482.png" alt="System Update Dashboard" width={300} height={600} style={{ borderRadius: '30px' }} />
          </div>
        </div>
      </section>

      {/* Feature 4: Bill Schedule & Financial Tracking */}
      <section className={`${styles.container} ${styles.feature2}`}>
        <div className={styles.f2Text}>
          <div className={styles.iconBadgeBlue} style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 className={styles.fTitle}>Track Bills Effortlessly.</h2>
          <p className={styles.fDesc}>
            Manage your finances seamlessly with the brand new Bill Schedule feature. Never miss a payment deadline again, neatly integrated with your daily reminders.
          </p>
        </div>
        <div className={styles.f2Visual}>
           <div className={`${styles.samsungMockup} ${styles.floatCenter}`}>
             <Image src="/screenshots/Screenshot_1782481470.png" alt="Bill Schedule" width={300} height={600} style={{ borderRadius: '30px' }} />
          </div>
        </div>
      </section>

      {/* Screenshot Gallery Section */}
      <section style={{ width: '100%', overflow: 'hidden' }}>
        <ScreenshotGallery />
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
