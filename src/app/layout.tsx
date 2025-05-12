import type { Metadata } from "next";
import { Space_Mono, Inter } from "next/font/google";
import Script from "next/script";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jitenadhikari.com.np'),
  title: "jitendotexe | Cyber Security Engineer & Developer",
  description: "Portfolio of Jiten Adhikari - Cyber Security Engineer, Full Stack Developer, Travel & Automotive Enthusiast, and Photographer. Specializing in web security, penetration testing, and modern web development.",
  authors: [{ name: "Jiten Adhikari", url: "https://jitenadhikari.com.np" }],
  generator: "Next.js",
  applicationName: "Jiten Adhikari Portfolio",
  keywords: ["Jiten Adhikari", "Cyber Security", "Web Development", "Full Stack Developer", "Portfolio", "Security Engineer", "Photography", "Travel", "Automotive"],
  creator: "Jitendotexe",
  publisher: "Jitendotexe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Robots & Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jitenadhikari.com.np",
    title: "jitendotexe | Cyber Security Engineer & Developer",
    description: "Portfolio of Jiten Adhikari - Cyber Security Engineer, Full Stack Developer, Travel & Automotive Enthusiast, and Photographer. Specializing in web security, penetration testing, and modern web development.",
    siteName: "Jiten Adhikari Portfolio",
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Jiten Adhikari Portfolio',
    }],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: "jitendotexe | Cyber Security Engineer & Developer",
    description: "Portfolio of Jiten Adhikari - Cyber Security Engineer, Full Stack Developer, Travel & Automotive Enthusiast, and Photographer.",
    images: ['/og-image.jpg'],
    creator: '@jitendotexe',
  },
  
  icons: { 
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    // apple: '/apple-touch-icon.png',  
  },
  
  // Verification
  verification: {
    google: 'google4972bfbd3d6adece', // Add your Google verification code
  },
  
  // Additional metadata
  
  category: 'technology',
  classification: 'Portfolio Website',
  referrer: 'origin-when-cross-origin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
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
        {/* Simple Performance Monitoring Script */}
        <Script
          id="performance-monitor"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Simple performance metric logging
              if (typeof window !== 'undefined') {
                // Performance observer for Largest Contentful Paint
                try {
                  const perfObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.startTime, 'ms');
                  });
                  
                  perfObserver.observe({ type: 'largest-contentful-paint', buffered: true });
                  
                  // Basic metrics using Navigation Timing API
                  window.addEventListener('load', () => {
                    setTimeout(() => {
                      if (performance && performance.timing) {
                        const timing = performance.timing;
                        const loadTime = timing.domContentLoadedEventEnd - timing.navigationStart;
                        console.log('Page load time:', loadTime, 'ms');
                      }
                    }, 0);
                  });
                } catch (e) {
                  console.log('Performance monitoring not supported', e);
                }
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
