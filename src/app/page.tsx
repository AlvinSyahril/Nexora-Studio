import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AppShowcaseGrid from "@/components/AppShowcaseGrid";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AppShowcaseGrid />
      </main>
      <footer className="footer" id="about">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#111" }}>NEXORA STUDIO</span>
          <p style={{ color: "#9ca3af", fontSize: "0.875rem", margin: 0 }}>Crafting digital experiences with precision.</p>
        </div>
        <div className="footer-links">
          <Link href="/privacy" className="footerLink">Privacy Policy</Link>
          <Link href="/terms" className="footerLink">Terms & Conditions</Link>
        </div>
        <p className="footer-copyright">© {new Date().getFullYear()} Nexora Studio. All rights reserved.</p>
      </footer>
    </>
  );
}
