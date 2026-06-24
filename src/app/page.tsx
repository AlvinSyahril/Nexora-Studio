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
      <footer className="footer">
        <div className="footer-links">
          <Link href="/privacy" className="footerLink">Privacy Policy</Link>
          <Link href="/terms" className="footerLink">Terms & Conditions</Link>
        </div>
        <p className="footer-copyright">© {new Date().getFullYear()} Nexora Studio. All rights reserved.</p>
      </footer>
    </>
  );
}
