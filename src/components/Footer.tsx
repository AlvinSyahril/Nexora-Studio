import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* Brand Bio */}
        <div className={styles.brandCol}>
          <h2 className={styles.brandName}>nexora.studio</h2>
          <p className={styles.brandBio}>
            Independent software studio making local-first desktop apps and private mobile tools with zero tracking.
          </p>
        </div>

        {/* Socials / Source */}
        <div>
          <h4 className={`font-mono-meta ${styles.colHeader}`}>Ecosystem</h4>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <a
                href="https://github.com/AlvinSyahril/Nexora-Studio"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </a>
            </li>
            <li className={styles.linkItem}>
              <a
                href="https://github.com/AlvinSyahril/Nexora-Studio/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                Desktop Releases
              </a>
            </li>
            <li className={styles.linkItem}>
              <a
                href="https://trakteer.id/alvin_syahril/tip"
                target="_blank"
                rel="noopener noreferrer"
              >
                Support Work
              </a>
            </li>
          </ul>
        </div>

        {/* Apps & Legal */}
        <div>
          <h4 className={`font-mono-meta ${styles.colHeader}`}>Navigation</h4>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <Link href="/apps/loom">Loom</Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/apps/reminder-app">Get Things Done</Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/apps/oasis">Oasis</Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/terms">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={`font-mono-meta ${styles.bottomText}`}>
          © {currentYear} NEXORA STUDIO. ALL RIGHTS RESERVED.
        </p>
        <p className={`font-mono-meta ${styles.bottomText}`}>
          LOCAL-FIRST // NO TRACKING
        </p>
      </div>
    </footer>
  );
}
