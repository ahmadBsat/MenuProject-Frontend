import "../../globals.css";
import "../lib/assets/css/index.css";
import "../lib/assets/css/loaders.css";
import "../lib/assets/css/navbar.css";
import "../lib/assets/css/style.css";
import "../lib/assets/css/editor.css";

import NextTopLoader from "nextjs-toploader";
import localFont from "next/font/local";

import { AuthProvider } from "@/lib/context/AuthContext";
import type { Viewport } from "next";
import { LanguagePageProps } from "@/lib/types/page";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/lib/components/Common/Toaster";

type Props = {
  children: React.ReactNode;
} & LanguagePageProps;

const neue = localFont({
  src: "../../public/fonts/neue-montreal.woff2",
  display: "swap",
  variable: "--font-neue",
  adjustFontFallback: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // userScalable: false,
  themeColor: "#a41f13",
};

export async function generateMetadata() {
  const metadataBase = new URL("https://FMC.com");

  return {
    title: "FMC",
    description:
      "Agent is an all-in-one AI customer assistance tool that saves your thousands of dollars, it works as stand-alone or with your current support stack.",
    applicationName: "AI Agent",
    referrer: "origin-when-cross-origin",
    keywords: ["AI", "Customer support", "assistant"],
    authors: [{ name: "Abdellatif" }],
    creator: "Abdellatif Edlby",
    metadataBase: metadataBase,
    openGraph: {
      images: "/preview.png",
    },
    icons: {
      icon: [`/favicon.ico`],
      apple: ["/apple-touch-icon.png"],
      shorcut: ["/apple-touch-icon.png"],
    },
    manifest: "/site.webmanifest",
    background_color: "#fff",
    theme_color: "#a41f13",
  };
}

export default async function RootLayout({ children, params }: Props) {
  return (
    <html
      suppressHydrationWarning
      className={`transition-all ${neue.className}`}
    >
      <body>
        <Toaster />
        <NextTopLoader color="#a41f13" showSpinner={false} />

        <AuthProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </AuthProvider>
      </body>
    </html>
  );
}
