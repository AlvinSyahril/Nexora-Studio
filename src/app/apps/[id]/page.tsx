import { APPS_DATA } from "@/data/apps";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import FaqAccordion from "@/components/FaqAccordion";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import DownloadButton from "@/components/DownloadButton";

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

  if (app.id === "oasis") {
    return (
      <div className={styles.showcaseWrapper}>
        {/* Background Blobs - customized colors for Oasis */}
        <div className={`${styles.blob} ${styles.blobGreen}`} style={{ background: 'rgba(182, 226, 211, 0.4)' }}></div>
        <div className={`${styles.blob} ${styles.blobBlue}`} style={{ background: 'rgba(212, 240, 240, 0.4)' }}></div>
        <div className={`${styles.blob} ${styles.blobPurple}`} style={{ background: 'rgba(250, 232, 224, 0.4)' }}></div>

        {/* Navbar */}
        <nav className={`${styles.container} ${styles.nav}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="/#apps" className={styles.backButton} title="Back to Nexora">
              <ArrowLeft size={16} /> <span className={styles.backText}>Back</span>
            </Link>
            <div className={styles.navBrand}>
              <div className={styles.navLogo}>
                <Image src="/showcase/oasis/logo.png" alt="Oasis Logo" width={40} height={40} />
              </div>
              <span className={styles.navTitle}>Oasis</span>
            </div>
          </div>
          <DownloadButton href="https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v1.0.0-oasis/Oasis.apk" className={styles.navBtn}>Download App</DownloadButton>
        </nav>

        {/* Hero Section */}
        <section className={`${styles.container} ${styles.hero}`}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Your Daily Space to <br/>
              <span className={styles.textGradient} style={{ background: 'linear-gradient(to right, #B6E2D3, #D4F0F0)', WebkitBackgroundClip: 'text' }}>Breathe and Reflect.</span>
            </h1>
            <p className={styles.heroDesc}>
              {app.description}
            </p>
            <div className={styles.heroActions}>
              <DownloadButton href="https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v1.0.0-oasis/Oasis.apk" className={styles.btnPrimary} style={{ background: '#B6E2D3', color: '#3F3F3F' }}>Get Started Free</DownloadButton>
              <a href="#features" className={styles.btnSecondary}>Explore Features</a>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={`${styles.samsungMockup} ${styles.heroMockup}`}>
              <Image src="/showcase/oasis/welcome.png" alt="Oasis Welcome Home" width={300} height={649} priority style={{ borderRadius: '30px', objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        {/* Feature 1: Mood History */}
        <section id="features" className={`${styles.container} ${styles.feature1}`}>
          <div className={styles.f1Text}>
            <div className={styles.iconBadgeGreen} style={{ background: 'rgba(182, 226, 211, 0.2)', color: '#4CAF50' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <h2 className={styles.fTitle}>Track Your Mood & Activities.</h2>
            <p className={styles.fDesc}>
              Easily log your daily emotions and activities. Build a streak and visualize your mental health journey over time with our beautiful calendar view.
            </p>
            <ul className={styles.fList}>
              <li className={styles.fListItem}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                Cute cat mascots for every mood
              </li>
              <li className={styles.fListItem}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                Attach images and write journals
              </li>
            </ul>
          </div>
          <div className={styles.f1Visual}>
            <div className={`${styles.samsungMockup} ${styles.floatCenter}`}>
               <Image src="/showcase/oasis/history.png" alt="Mood History" width={300} height={649} style={{ borderRadius: '30px', objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        {/* Feature 2: Insights */}
        <section className={`${styles.container} ${styles.feature2}`}>
          <div className={styles.f2Text}>
            <div className={styles.iconBadgeBlue} style={{ background: 'rgba(212, 240, 240, 0.5)', color: '#5C9EAD' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <h2 className={styles.fTitle}>Discover Deep Insights.</h2>
            <p className={styles.fDesc}>
              Identify your top mood boosters and stress triggers with detailed monthly statistics. Understand yourself better and focus on what makes you happy.
            </p>
          </div>
          <div className={styles.f2Visual}>
             <div className={`${styles.samsungMockup} ${styles.floatCenter}`}>
               <Image src="/showcase/oasis/insights.png" alt="Oasis Insights" width={300} height={649} style={{ borderRadius: '30px', objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        {/* Feature 3: Ozie AI */}
        <section className={`${styles.container} ${styles.feature1}`}>
          <div className={styles.f1Text}>
            <div className={styles.iconBadgeGreen} style={{ background: 'rgba(250, 232, 224, 1)', color: '#E59866' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <h2 className={styles.fTitle}>Meet Ozie, Your AI Companion.</h2>
            <p className={styles.fDesc}>
              Feel lonely or just want to vent? Chat with Ozie, your virtual Oasis companion. Share stories, complaints, or happiness anytime you need a listening ear.
            </p>
          </div>
          <div className={styles.f1Visual}>
            <div className={`${styles.samsungMockup} ${styles.floatCenter}`}>
               <Image src="/showcase/oasis/chat.png" alt="Ozie AI Chat" width={300} height={649} style={{ borderRadius: '30px', objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        {/* Feature 4: Privacy & PIN */}
        <section className={`${styles.container} ${styles.feature2}`}>
          <div className={styles.f2Text}>
            <div className={styles.iconBadgeBlue} style={{ background: 'rgba(232, 232, 232, 0.5)', color: '#A0AAB2' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h2 className={styles.fTitle}>100% Private & Secure.</h2>
            <p className={styles.fDesc}>
              Your journals and thoughts belong to you. Secure your safe space with a PIN lock, ensuring that no one else can read your personal reflections.
            </p>
          </div>
          <div className={styles.f2Visual}>
             <div className={`${styles.samsungMockup} ${styles.floatCenter}`}>
               <Image src="/showcase/oasis/pin.png" alt="Oasis PIN Lock" width={300} height={649} style={{ borderRadius: '30px', objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        {/* Screenshot Gallery Section */}
        <section style={{ width: '100%', overflow: 'hidden' }}>
          <ScreenshotGallery screenshots={[
            "/showcase/oasis/gallery/Screenshot_1782649668.png",
            "/showcase/oasis/gallery/Screenshot_1782649679.png",
            "/showcase/oasis/gallery/Screenshot_1782649868.png",
            "/showcase/oasis/gallery/Screenshot_1782649947.png",
            "/showcase/oasis/gallery/Screenshot_1782649960.png",
            "/showcase/oasis/gallery/Screenshot_1782649969.png",
            "/showcase/oasis/gallery/Screenshot_1782649973.png",
            "/showcase/oasis/gallery/Screenshot_1782650948.png",
            "/showcase/oasis/gallery/Screenshot_1782650960.png",
            "/showcase/oasis/gallery/Screenshot_1782656190.png",
            "/showcase/oasis/gallery/Screenshot_1782656216.png"
          ]} />
        </section>

        {/* FAQ Section */}
        <FaqAccordion />

        {/* Footer CTA */}
        <footer className={styles.footer}>
          <div className={styles.footerBg} style={{ background: 'linear-gradient(135deg, #B6E2D3 0%, #D4F0F0 100%)' }}></div>
          <div className={styles.container}>
            <h2 className={styles.footerTitle}>Ready to find your peace?</h2>
            <DownloadButton href="https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v1.0.0-oasis/Oasis.apk" className={styles.footerBtn}>Download Oasis</DownloadButton>
            <p className={styles.footerCopy}>© 2026 Nexora Studio. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
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
        <DownloadButton href="https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v1.0.0-gtd/Get-Things-Done.apk" className={styles.navBtn}>Download App</DownloadButton>
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
            <DownloadButton href="https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v1.0.0-gtd/Get-Things-Done.apk" className={styles.btnPrimary}>Get Started Free</DownloadButton>
            <a href="#features" className={styles.btnSecondary}>Explore Features</a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={`${styles.samsungMockup} ${styles.heroMockup}`}>
            <Image src="/screenshots/1.png" alt="Get Things Done Home" width={300} height={600} priority style={{ borderRadius: '30px' }} />
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
             <Image src="/screenshots/2.png" alt="System Update Dashboard" width={300} height={600} style={{ borderRadius: '30px' }} />
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
          <DownloadButton href="https://github.com/AlvinSyahril/Nexora-Studio/releases/download/v1.0.0-gtd/Get-Things-Done.apk" className={styles.footerBtn}>Download Get Things Done</DownloadButton>
          <p className={styles.footerCopy}>© 2026 Nexora Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
