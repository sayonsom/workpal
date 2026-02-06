import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import VideoDemo from "@/components/landing/VideoDemo";
import HowItWorks from "@/components/landing/HowItWorks";
import WhyNotChatGPT from "@/components/landing/WhyNotChatGPT";
import AIAdoption from "@/components/landing/AIAdoption";
import Security from "@/components/landing/Security";
import ForBusiness from "@/components/landing/ForBusiness";
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
        <WhyNotChatGPT />
        <AIAdoption />
        <Security />
        <ForBusiness />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
