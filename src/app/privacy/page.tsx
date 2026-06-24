import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Nexora Studio",
};

export default function PrivacyPolicy() {
  return (
    <div className="container" style={{ padding: "6rem 1.5rem", maxWidth: "800px" }}>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-violet)", marginBottom: "2rem", textDecoration: "none", fontWeight: 600 }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <h1 className="display-font" style={{ fontSize: "3rem", marginBottom: "2rem" }}>Privacy Policy</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", color: "var(--foreground)", opacity: 0.9, lineHeight: 1.7, fontSize: "1.05rem" }}>
        <p style={{ color: "var(--accent-violet)", fontWeight: 600 }}>Last Updated: June 24, 2026</p>
        
        <section>
          <h2 className="display-font" style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "1rem" }}>1. Introduction</h2>
          <p>Welcome to Nexora Studio. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website or use our applications (such as "Get Things Done") and tell you about your privacy rights and how the law protects you.</p>
        </section>

        <section>
          <h2 className="display-font" style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "1rem" }}>2. The Data We Collect About You</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, operating system and platform.</li>
            <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
          </ul>
        </section>

        <section>
          <h2 className="display-font" style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "1rem" }}>3. How We Use Your Personal Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>
        </section>

        <section>
          <h2 className="display-font" style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "1rem" }}>4. Data Security</h2>
          <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
        </section>

        <section>
          <h2 className="display-font" style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "1rem" }}>5. Contact Me</h2>
          <p>If you have any questions about this privacy policy or my privacy practices, please contact me via Instagram at <a href="https://instagram.com/vinnssmokee" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-violet)", textDecoration: "underline" }}>@vinnssmokee</a>.</p>
        </section>
      </div>
    </div>
  );
}
