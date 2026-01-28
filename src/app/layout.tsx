import "../../globals.css";
import "../lib/assets/css/index.css";
import "../lib/assets/css/loaders.css";
import "../lib/assets/css/navbar.css";
import "../lib/assets/css/style.css";
import "../lib/assets/css/editor.css";
import "../lib/assets/css/swiperr.css";

import NextTopLoader from "nextjs-toploader";
import localFont from "next/font/local";

import { AuthProvider } from "@/lib/context/AuthContext";
import type { Viewport } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/lib/components/Common/Toaster";
import DeploymentMonitor from "@/components/deployment-monitor";

type Props = {
  children: React.ReactNode;
};

const neue = localFont({
  src: "../../public/fonts/Lato.ttf",
  display: "swap",
  variable: "--font-neue",
  adjustFontFallback: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // userScalable: false,
  themeColor: "#ffffff",
};

export async function generateMetadata() {
  const metadataBase = new URL("https://fmcshops.com");

  return {
    title: "FMC",
    description: "Create your perfect restaurant menu",
    applicationName: "FMC",
    referrer: "origin-when-cross-origin",
    authors: [{ name: "Abdellatif" }],
    metadataBase: metadataBase,
    icons: {
      icon: [`/favicon.ico`],
      apple: ["/apple-touch-icon.png"],
      shorcut: ["/apple-touch-icon.png"],
    },
    manifest: "/site.webmanifest",
    background_color: "#fff",
    theme_color: "#ffffff",
  };
}

export default async function RootLayout({ children }: Props) {
  return (
    <html
      suppressHydrationWarning
      className={`transition-all ${neue.className}`}
    >
      <body>
        <Toaster />
        <NextTopLoader color="#a41f13" showSpinner={false} />
        <DeploymentMonitor />

        <AuthProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </AuthProvider>
      </body>
    </html>
  );
}
