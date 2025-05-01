import type { Metadata } from "next";
import { Space_Mono, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "jitendotexe",
  description: "Portfolio of Jiten Adhikari - Cyber Security Engineer, Travel & Automotive Enthusiast, Photographerrrrrrrr",
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(
        spaceMono.variable,
        inter.variable,
        "min-h-screen font-sans antialiased bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative"
      )}>
        <div className="scanline" />
        <div className="noise" />
        <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
          <main className="pb-20">{children}</main>
          <Footer />
        </div>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
