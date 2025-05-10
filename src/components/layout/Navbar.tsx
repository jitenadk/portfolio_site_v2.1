"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Only include in-page sections in the main navigation
const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  // { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>(pathname);

  useEffect(() => {
    setActiveSection(pathname);

    if (pathname === '/') {
      // Auto-detect all sections with IDs on the page
      const allSections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
      
      if (allSections.length === 0) return;

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (window.scrollY > 100) {
              // Update URL to reflect current section
              window.history.replaceState(null, '', `/#${id}`);
              
              // Check if this section is in the navbar
              const navItem = navigationItems.find(item => item.href === `/#${id}`);
              if (navItem) {
                setActiveSection(`/#${id}`);
              }
            }
          }
        });
      }, { rootMargin: "-20% 0px -50% 0px", threshold: 0.3 }); // Increased threshold for better accuracy

      allSections.forEach(el => observer.observe(el));

      return () => {
        allSections.forEach(el => observer.unobserve(el));
      };
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const handleTopScroll = () => {
      if (window.scrollY < 100) {
        if (activeSection !== "/") {
          setActiveSection("/");
          window.history.replaceState(null, '', '/');
        }
      }
    };

    window.addEventListener("scroll", handleTopScroll, { passive: true });
    handleTopScroll();

    return () => window.removeEventListener("scroll", handleTopScroll);
  }, [pathname, activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update URL when scrolling only on homepage
      if (pathname === '/') {
        // Auto-detect all sections with IDs
        const allSections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
        
        // Sort sections by their position in the document
        // This ensures we highlight the most relevant section when multiple are visible
        const sortedSections = allSections.sort((a, b) => {
          const aRect = a.getBoundingClientRect();
          const bRect = b.getBoundingClientRect();
          return Math.abs(aRect.top) - Math.abs(bRect.top);
        });
        
        // Find the first visible section
        const visibleSection = sortedSections.find(el => {
          const rect = el.getBoundingClientRect();
          // Adjust the viewport criteria for better accuracy
          return rect.top <= 150 && rect.bottom >= 100;
        });
        
        if (visibleSection) {
          const id = visibleSection.id;
          const href = `/#${id}`;
          setActiveSection(href);
          
          // Only update URL if needed
          if (window.location.hash !== `#${id}`) {
            window.history.replaceState(null, '', href);
          }
        }
      }
    };

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Call once on mount to set initial active section
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300 pointer-events-none flex justify-center",
        scrolled ? "top-4" : "top-8"
      )}
    >
      <div
        className={cn(
          "w-full max-w-6xl xl:max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-10 lg:px-16",
          "bg-transparent border border-white/20 shadow-xl rounded-2xl backdrop-blur-2xl pointer-events-auto",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-mono text-lg md:text-xl font-bold neon-glow terminal-text">
            jitendotexe<span className="cursor">_</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map(item => {
              const isActive = item.href === activeSection;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "font-mono text-sm transform transition duration-200 inline-block",
                    isActive
                      ? "text-primary neon-glow scale-105"
                      : "text-foreground/70 hover:text-primary hover:neon-glow hover:scale-105"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

        {/* Mobile navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background/95 backdrop-blur-lg border-l border-primary/20 w-64">
              <div className="flex flex-col space-y-6 pt-6">
                {navigationItems.map(item => {
                  const isActive = item.href === activeSection;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "font-mono text-sm transform transition duration-200",
                        isActive
                          ? "text-primary neon-glow scale-105"
                          : "text-foreground/70 hover:text-primary hover:neon-glow hover:scale-105"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
