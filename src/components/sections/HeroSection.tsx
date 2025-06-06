"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Camera, Book } from "lucide-react";
import { LINKS } from "@/config/links";

export default function HeroSection() {
  const [typingComplete, setTypingComplete] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTypingComplete(true);
    }, 1000);

    const lineTimer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= 3) {
          clearInterval(lineTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => {
      clearTimeout(timer);
      clearInterval(lineTimer);
    };
  }, []);

  return (
    <section className="min-h-[90vh] flex flex-col justify-center relative pt-16">
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-bl from-primary/5 to-transparent opacity-50" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="cyber-card p-6 mb-6">
          <div className="font-mono text-sm mb-1 terminal-text">
            $ <span className="typing">whoami</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 glitch" data-text="Jiten Adhikari">
            Jiten Adhikari
          </h1>
          <div className="h-8 relative">
            {typingComplete && (
              <h2 className="text-xl md:text-2xl text-foreground/80 typing">
                <span className="text-primary">&gt;</span> Cyber Security Engineer
              </h2>
            )}
          </div>

          <div className="font-mono text-sm mt-6 text-foreground/60 space-y-1">
            {visibleLines >= 1 && (
              <div className="typing terminal-text" style={{ animationDelay: "1.2s" }}>
                $ <span>ls</span> ./interests
              </div>
            )}
            {visibleLines >= 2 && (
              <div className="typing" style={{ animationDelay: "2s" }}>
                automotive/ photography/ cybersecurity/ travel/ technology/
              </div>
            )}
            {visibleLines >= 3 && (
              <div className="typing terminal-text" style={{ animationDelay: "2.8s" }}>
                $ <span className="cursor">_</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 flex-wrap">
          <Button asChild className="group text-background" size="lg">
            <Link href="/#projects">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/#contact">Contact Me</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={LINKS.resume} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button asChild variant="ghost" size="sm" className="group border border-primary/20 hover:bg-primary/5">
            <Link href="/photography" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Photography
              <ArrowRight className="ml-1 h-3 w-3 opacity-70 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="group border border-primary/20 hover:bg-primary/5">
            <Link href="/blog" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Blog
              <ArrowRight className="ml-1 h-3 w-3 opacity-70 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link href="/#about" className="text-primary">
          <ChevronDown className="h-8 w-8" />
        </Link>
      </div>
    </section>
  );
}
