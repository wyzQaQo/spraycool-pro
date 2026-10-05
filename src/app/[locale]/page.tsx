import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ApplicationsPreview from "@/components/sections/ApplicationsPreview";
import ProblemsPreview from "@/components/sections/ProblemsPreview";
import Technology from "@/components/sections/Technology";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ApplicationsPreview />
      <ProblemsPreview />
      <Technology />
      <CTA />
      <Footer />
    </>
  );
}
