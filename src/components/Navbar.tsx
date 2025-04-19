"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  // { name: "Skills", href: "/#skills" },
  { name: "Photography", href: "/photography" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>(pathname);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(pathname);
      return;
    }
    const sectionElements = navigationItems
      .filter(item => item.href.startsWith("/#"))
      .map(item => document.getElementById(item.href.split("#")[1]))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const hash = `#${id}`;
          if (window.location.hash !== hash) {
            window.history.replaceState(null, '', hash);
          }
          setActiveSection(`/#${id}`);
        }
      });
    }, { rootMargin: "0px 0px -50% 0px", threshold: 0.3 });
    sectionElements.forEach(el => observer.observe(el));
    return () => sectionElements.forEach(el => observer.unobserve(el));
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const handleTop = () => {
      if (window.scrollY === 0) {
        setActiveSection("/");
        window.history.replaceState(null, '', window.location.pathname);
      }
    };
    window.addEventListener("scroll", handleTop);
    return () => window.removeEventListener("scroll", handleTop);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
