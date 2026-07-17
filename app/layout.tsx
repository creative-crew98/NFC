import type { Metadata } from "next";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import { LeadModalProvider } from "@/components/LeadModalProvider";
import StickyFooterCTA from "@/components/Home/StickyFooterCTA";

export const metadata: Metadata = {
  title: "NFC Funnel",
  description: "Premium NFC landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ ["--font-lato" as string]: "'Lato', sans-serif" }}>

      <body suppressHydrationWarning>
        <LeadModalProvider>
          {children}
          <Footer />
          <StickyFooterCTA />
        </LeadModalProvider>
      </body>
    </html>
  );
}