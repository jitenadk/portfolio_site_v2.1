import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, Camera, Book } from "lucide-react";
import { LINKS } from "@/config/links";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/10 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-foreground/60">
              &copy; {currentYear} Jiten Adhikari. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href={LINKS.email}
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
        
        {/* Section links */}
        <div className="mt-8 flex flex-col md:flex-row justify-center md:space-x-12 space-y-4 md:space-y-0">
          <div className="flex space-x-2 items-center justify-center">
            <Link
              href="/photography"
              className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 font-mono text-sm"
            >
              <Camera className="h-4 w-4" />
              Photography
            </Link>
          </div>
          <div className="flex space-x-2 items-center justify-center">
            <Link
              href="/blog"
              className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 font-mono text-sm"
            >
              <Book className="h-4 w-4" />
              Blog
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#about" className="text-foreground/80 hover:text-primary transition-colors font-mono text-sm">About</Link>
            <Link href="/#projects" className="text-foreground/80 hover:text-primary transition-colors font-mono text-sm">Projects</Link>
            <Link href="/#contact" className="text-foreground/80 hover:text-primary transition-colors font-mono text-sm">Contact</Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-foreground/40">
          <p>Designed with 💻 and ⚡ and lots of ☕ by jitendotexe</p>
        </div>
      </div>
    </footer>
  );
}
