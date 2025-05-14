"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Shield, Network, Globe, Database, MapIcon, BookOpen } from "lucide-react";
import Link from "next/link";
import { LINKS } from "@/config/links";
import SectionHeader from "@/components/ui/SectionHeader";

const projects = [
  {
    id: "secnet",
    title: "SecNet Scanner",
    description: "An open-source network vulnerability scanner built with Python. Features automated scanning, detailed reports, and CVE database integration.",
    tags: ["Python", "Network Security", "Vulnerability Assessment"],
    link: `${LINKS.github}/SecNet`,
    icon: Network,
  },
  {
    id: "cryptoguard",
    title: "CryptoGuard",
    description: "File encryption tool with secure key management, AES-256 encryption, and intuitive UI for day-to-day secure file sharing.",
    tags: ["Cryptography", "Security", "Python", "Qt"],
    link: `${LINKS.github}/CryptoGuard`,
    icon: Shield,
  },
  {
    id: "threatmap",
    title: "ThreatMap Visualizer",
    description: "Real-time visualization of global cyber attacks and threat intelligence data with geolocation mapping.",
    tags: ["JavaScript", "D3.js", "APIs", "Real-time data"],
    link: `${LINKS.github}/ThreatMap`,
    icon: Globe,
    // Slug: "ThreatMap",
  },
  {
    id: "sqlshield",
    title: "SQLShield",
    description: "Database security tool that monitors for suspicious activity, prevents SQL injection attacks, and provides detailed audit logs.",
    tags: ["SQL", "Database Security", "Java"],
    link: `${LINKS.github}/SQLShield`,
    icon: Database,
  },
  {
    id: "cvemap",
    title: "CVEMap",
    description: "A toolt that scan the network devices and scan for vulnerability, which keeps runs on the network.",
    tags: ["Python", "SQL"],
    link: `${LINKS.github}/CVEMap`,
    icon: MapIcon,
    Slug: "CVEMap",
  }
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="projects" className="py-16 scroll-mt-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <SectionHeader upperText="&lt;featured work /&gt;" title="Projects" />
        </motion.div>

        <div className="cyber-card p-6 mb-10">
          <div className="font-mono text-xs terminal-text mb-6">~/jitendotexe/projects $ ls -la | grep featured</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 center">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="cyber-card overflow-hidden h-full">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <project.icon className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-3">
                        {project.Slug && (
                          <Link
                            href={`/projects/${project.Slug}`}
                            title="View Documentation"
                            className="text-foreground/60 hover:text-primary transition-colors"
                          >
                            <BookOpen className="h-5 w-5" />
                            <span className="sr-only">Documentation</span>
                          </Link>
                        )}
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View on GitHub"
                          className="text-foreground/60 hover:text-primary transition-colors"
                        >
                          <Github className="h-5 w-5" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <CardDescription className="text-sm text-foreground/70">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 pt-2 border-t border-primary/10">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs py-1 px-2 rounded bg-primary/10 text-primary font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-mono text-foreground/70 hover:text-primary transition-all"
            >
              View more on GitHub <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
