import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Cursor } from "@/components/brand/Cursor";
import { GrainOverlay } from "@/components/brand/GrainOverlay";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
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

export const metadata: Metadata = {
  title: "Nguyễn Minh Trực — Mobile Developer",
  description:
    "Portfolio of Nguyễn Minh Trực, mobile developer working in Flutter and Swift/SwiftUI.",
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
