import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import VideoDemo from "@/components/landing/VideoDemo";
import HowItWorks from "@/components/landing/HowItWorks";
import BeforeAfter from "@/components/landing/BeforeAfter";
import LiveDemoPreview from "@/components/landing/LiveDemoPreview";
import Personalization from "@/components/landing/Personalization";
import SkillsShowcase from "@/components/landing/SkillsShowcase";
import LongTermMemory from "@/components/landing/LongTermMemory";
import ForTeams from "@/components/landing/ForTeams";
import Security from "@/components/landing/Security";
import FAQSection from "@/components/landing/FAQ";
import BottomCTA from "@/components/landing/BottomCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <VideoDemo />
        <HowItWorks />
        <BeforeAfter />
        <LiveDemoPreview />
        <Personalization />
        <SkillsShowcase />
        <LongTermMemory />
        <ForTeams />
        <Security />
        <FAQSection />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
