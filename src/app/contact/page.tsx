import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us — Workpal",
  description:
    "Get in touch with the Workpal team. Schedule a call, ask about enterprise plans, or send us a message.",
  openGraph: {
    title: "Contact Us — Workpal",
    description:
      "Get in touch with the Workpal team. Schedule a call, ask about enterprise plans, or send us a message.",
    type: "website",
  },
};

export default function Contact() {
  return (
    <>
      <Navbar />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
