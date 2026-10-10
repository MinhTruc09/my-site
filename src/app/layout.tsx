import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Cursor } from "@/components/brand/Cursor";
import { GrainOverlay } from "@/components/brand/GrainOverlay";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Variable font with the width axis: wdth 125 = extended display, wdth 62 = condensed headlines and tabs.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "vietnamese"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const title = "Nguyễn Minh Trực — Mobile Developer";
const description = "Portfolio of Nguyễn Minh Trực, mobile developer working in Flutter and Swift/SwiftUI.";

// The share card and icons come from the file conventions (opengraph-image.png, icon.png,
// apple-icon.png), captured from /lab/og. Contact details stay out of metadata (CLAUDE.md).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "MinhTruc09", title, description, locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <GrainOverlay />
        <Cursor />
      </body>
    </html>
  );
}
