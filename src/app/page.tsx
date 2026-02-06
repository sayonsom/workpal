import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import WhyNotChatGPT from "@/components/landing/WhyNotChatGPT";
import AIAdoption from "@/components/landing/AIAdoption";
import ForBusiness from "@/components/landing/ForBusiness";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhyNotChatGPT />
        <AIAdoption />
        <ForBusiness />
      </main>
      <Footer />
    </>
  );
}
