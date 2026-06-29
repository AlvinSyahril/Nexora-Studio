import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Nexora Studio",
};

export default function TermsAndConditions() {
  return (
    <div className="container" style={{ padding: "6rem 1.5rem", maxWidth: "800px" }}>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-violet)", marginBottom: "2rem", textDecoration: "none", fontWeight: 600 }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <h1 className="display-font" style={{ fontSize: "3rem", marginBottom: "2rem" }}>Terms & Conditions</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", color: "var(--foreground)", opacity: 0.9, lineHeight: 1.7, fontSize: "1.05rem" }}>
        <p style={{ color: "var(--accent-violet)", fontWeight: 600 }}>Last Updated: June 24, 2026</p>
        
        <section>
          <h2 className="display-font" style={{ fontSize: "1.5rem", color: "var(--foreground)", marginBottom: "1rem" }}>1. Acceptance of Terms</h2>
          <p>By accessing and using the services provided by Nexora Studio, including our website and applications (such as "Get Things Done"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.</p>
        </section>

        <section>
          <h2 className="display-font" style={{ fontSize: "1.5rem", color: "var(--foreground)", marginBottom: "1rem" }}>2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on Nexora Studio's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>Attempt to decompile or reverse engineer any software contained on Nexora Studio's website;</li>
            <li>Remove any copyright or other proprietary notations from the materials.</li>
          </ul>
        </section>

        <section>
          <h2 className="display-font" style={{ fontSize: "1.5rem", color: "var(--foreground)", marginBottom: "1rem" }}>3. Disclaimer</h2>
          <p>The materials on Nexora Studio's website and applications are provided on an 'as is' basis. Nexora Studio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </section>

        <section>
          <h2 className="display-font" style={{ fontSize: "1.5rem", color: "var(--foreground)", marginBottom: "1rem" }}>4. Limitations</h2>
          <p>In no event shall Nexora Studio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Nexora Studio's website, even if Nexora Studio or a Nexora Studio authorized representative has been notified orally or in writing of the possibility of such damage.</p>
        </section>

        <section>
          <h2 className="display-font" style={{ fontSize: "1.5rem", color: "var(--foreground)", marginBottom: "1rem" }}>5. Revisions and Errata</h2>
          <p>The materials appearing on Nexora Studio's website could include technical, typographical, or photographic errors. Nexora Studio does not warrant that any of the materials on its website are accurate, complete or current. Nexora Studio may make changes to the materials contained on its website at any time without notice.</p>
        </section>
      </div>
    </div>
  );
}
