import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://workpal.email"),
  title: "Workpal — Your Personal AI, In Your Inbox",
  description:
    "Workpal learns how you think, write, and deliver. Forward any task — it produces your quality of work, in your voice. No chat history pollution.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Workpal — Your Personal AI, In Your Inbox",
    description:
      "An AI that works like you. Forward any task from your inbox. Get finished work back in your voice, your frameworks, your standards.",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Workpal logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Workpal — Your Personal AI, In Your Inbox",
    description:
      "Forward any task from your inbox. Get finished work back, done. No prompts. No dashboards. Just email.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6CMCHPCSSD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6CMCHPCSSD');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
