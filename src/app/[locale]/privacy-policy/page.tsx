import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <section className="pt-28 pb-20 bg-deep-950">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
          <p className="text-gray-400 mb-4">Last updated: June 2026</p>
          <div className="text-gray-300 space-y-6 text-sm leading-relaxed">
            <p>100Cooling ("we", "our", or "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard information when you visit our website or submit inquiries.</p>
            <h2 className="text-white text-lg font-semibold mt-8 mb-3">Information We Collect</h2>
            <p>We collect information you voluntarily provide through contact forms, including: name, company name, email address, phone number, and project details. We also collect standard web analytics data (pages visited, time on site, referring source) through Google Analytics and similar tools.</p>
            <h2 className="text-white text-lg font-semibold mt-8 mb-3">How We Use Your Information</h2>
            <p>We use your information to: respond to inquiries and provide quotations, improve our website and services, send relevant product updates if you have opted in, and comply with legal obligations.</p>
            <h2 className="text-white text-lg font-semibold mt-8 mb-3">Data Protection</h2>
            <p>We implement industry-standard security measures to protect your data. We do not sell, trade, or rent your personal information to third parties. Data is retained only for as long as necessary to fulfill the purposes outlined above.</p>
            <h2 className="text-white text-lg font-semibold mt-8 mb-3">Cookies</h2>
            <p>Our website uses cookies for analytics and functionality. You can control cookie preferences through your browser settings.</p>
            <h2 className="text-white text-lg font-semibold mt-8 mb-3">Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data by contacting us at privacy@mistguard-pro.com. We will respond within 30 days.</p>
            <h2 className="text-white text-lg font-semibold mt-8 mb-3">Contact</h2>
            <p>For privacy-related inquiries: privacy@mistguard-pro.com</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
