import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import BusinessHero from "@/components/business/BusinessHero";
import TheProblem from "@/components/business/TheProblem";
import HowTeamsWork from "@/components/business/HowTeamsWork";
import SecurityCompliance from "@/components/business/SecurityCompliance";
import UseCases from "@/components/business/UseCases";
import DeploymentOptions from "@/components/business/DeploymentOptions";
import EnterpriseCTA from "@/components/business/EnterpriseCTA";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Workpal for Business — Governed AI for Every Team",
  description:
    "Give every team member a governed AI operator accessible through email. Full audit trails, private cloud deployment, and enterprise-grade security.",
  openGraph: {
    title: "Workpal for Business — Governed AI for Every Team",
    description:
      "Give every team member a governed AI operator accessible through email. Full audit trails, private cloud deployment, and enterprise-grade security.",
    type: "website",
  },
};

export default function BusinessPage() {
  return (
    <>
      <Navbar />
      <main>
        <BusinessHero />
        <TheProblem />
        <HowTeamsWork />
        <SecurityCompliance />
        <UseCases />
        <DeploymentOptions />
        <EnterpriseCTA />
      </main>
      <Footer />
    </>
  );
}
