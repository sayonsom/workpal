import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import VideoDemo from "@/components/landing/VideoDemo";
import HowItWorks from "@/components/landing/HowItWorks";
import OutputShowcase from "@/components/landing/OutputShowcase";
import WhyNotChatGPT from "@/components/landing/WhyNotChatGPT";
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
        <VideoDemo />
        <HowItWorks />
        <OutputShowcase />
        <WhyNotChatGPT />
        <ForTeams />
        <Security />
        <FAQSection />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
