import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import VideoDemo from "@/components/landing/VideoDemo";
import HowItWorks from "@/components/landing/HowItWorks";
import OutputShowcase from "@/components/landing/OutputShowcase";
import WhyNotChatGPT from "@/components/landing/WhyNotChatGPT";
import UseCases from "@/components/landing/UseCases";
import LiveDemo from "@/components/landing/LiveDemo";
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
        <OutputShowcase />
        <WhyNotChatGPT />
        <UseCases />
        <LiveDemo />
        <ForTeams />
        <Security />
        <FAQSection />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
