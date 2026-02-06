import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Workpal — Your Intellectual Clone, In Your Inbox",
  description:
    "Workpal learns how you think, write, and deliver. Forward any task — it produces your quality of work, in your voice. No chat history pollution.",
  openGraph: {
    title: "Workpal — Your Intellectual Clone, In Your Inbox",
    description:
      "An AI that works like you. Forward any task from your inbox. Get finished work back in your voice, your frameworks, your standards.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
