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
  title: "Workpal — The AI Colleague Who Only Talks to You",
  description:
    "Your private AI email address. Forward any email, get the work done. Workpal reads context like a colleague, drafts in your voice, and learns how you work.",
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
    title: "Workpal — The AI Colleague Who Only Talks to You",
    description:
      "Your private AI email address. Forward any email, get the work done. No apps, no prompts, no inbox access.",
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
    title: "Workpal — The AI Colleague Who Only Talks to You",
    description:
      "Forward any email. Get the work done. Workpal reads context like a colleague and drafts in your voice.",
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
