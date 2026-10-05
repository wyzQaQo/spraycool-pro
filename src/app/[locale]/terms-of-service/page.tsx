export const dynamicParams = false;
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <section className="pt-28 pb-20 bg-deep-950">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
          <div className="text-gray-300 space-y-6 text-sm leading-relaxed">
            <p>These Terms of Service govern your use of the 100Cooling website and services. By accessing our website, you agree to these terms.</p>
            <h2 className="text-white text-lg font-semibold mt-8 mb-3">Website Use</h2>
            <p>Content on this website is for informational purposes. Product specifications, pricing, and availability are subject to change without notice. All product images are representative; actual products may vary.</p>
            <h2 className="text-white text-lg font-semibold mt-8 mb-3">Intellectual Property</h2>
            <p>All content, trademarks, and intellectual property on this website are owned by 100Cooling unless otherwise stated. Reproduction or redistribution without written permission is prohibited.</p>
            <h2 className="text-white text-lg font-semibold mt-8 mb-3">Product Sales</h2>
            <p>All product sales are governed by separate purchase agreements. Quotations provided through this website are estimates and do not constitute binding offers. Lead times, pricing, and specifications are confirmed in the final purchase order.</p>
            <h2 className="text-white text-lg font-semibold mt-8 mb-3">Limitation of Liability</h2>
            <p>100Cooling shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or reliance on its content.</p>
            <h2 className="text-white text-lg font-semibold mt-8 mb-3">Governing Law</h2>
            <p>These terms are governed by the laws of the People&apos;s Republic of China. Any disputes shall be resolved through arbitration in Shenzhen, China.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
