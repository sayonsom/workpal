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
  title: "Workpal — Your AI Operator, In Your Inbox",
  description:
    "Get a free AI operator that works from your email. No signups, no dashboards. Forward tasks, get them done. You stay in control.",
  openGraph: {
    title: "Workpal — Your AI Operator, In Your Inbox",
    description:
      "Get a free AI operator that works from your email. No signups, no dashboards. Forward tasks, get them done. You stay in control.",
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
