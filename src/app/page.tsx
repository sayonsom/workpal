import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import VideoDemo from "@/components/landing/VideoDemo";
import HowItWorks from "@/components/landing/HowItWorks";
import BeforeAfter from "@/components/landing/BeforeAfter";
import LiveDemoPreview from "@/components/landing/LiveDemoPreview";
import Personalization from "@/components/landing/Personalization";
import GiftWorkpal from "@/components/landing/GiftWorkpal";
import ForTeams from "@/components/landing/ForTeams";
import Security from "@/components/landing/Security";
import FAQSection from "@/components/landing/FAQ";
import BottomCTA from "@/components/landing/BottomCTA";
import Footer from "@/components/landing/Footer";
import MobileGiftBar from "@/components/landing/MobileGiftBar";

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
        <GiftWorkpal />
        <ForTeams />
        <Security />
        <FAQSection />
        <BottomCTA />
      </main>
      <Footer />
      <MobileGiftBar />
    </>
  );
}
