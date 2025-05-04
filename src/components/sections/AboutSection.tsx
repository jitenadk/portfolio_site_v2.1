"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Car, Camera, Compass, Code, Cpu, Gamepad2, Leaf } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
// Install framer-motion: bun add framer-motion

const passions = [
  {
    id: "cyber",
    title: "Cyber Security",
    description: "Protecting systems, finding vulnerabilities, and fortifying networks.",
    icon: Shield,
  },
  {
    id: "automotive",
    title: "Cars & Bikes",
    description: "Automotive enthusiast with a passion for mechanics and design.",
    icon: Car,
  },
  {
    id: "photo",
    title: "Photography",
    description: "Capturing moments and perspectives through the lens.",
    icon: Camera,
  },
  {
    id: "travel",
    title: "Travel",
    description: "Exploring new places, cultures, and expanding horizons.",
    icon: Compass,
  },
  {
    id: "tech",
    title: "Technology",
    description: "Staying on the cutting edge of tech trends and advancements.",
    icon: Code,
  },
  {
    id: "mechatronics",
    title: "Mechatronics",
    description: "Designing and building drones, embedded systems, and robotics.",
    icon: Cpu,
  },
  {
    id: "gaming",
    title: "Gaming",
    description: "Enjoy playing video games, exploring virtual worlds, and strategizing challenges.",
    icon: Gamepad2,
  },
  {
    id: "plants",
    title: "Plants",
    description: "Caring for plants, botany enthusiast, and indoor gardening.",
    icon: Leaf,
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === passions.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  // Dynamically get active passion
  const activePassion = passions[activeTab];
  const ActiveIcon = activePassion.icon;

  return (
    <section id="about" className="py-16 scroll-mt-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <SectionHeader upperText="&lt;about me /&gt;" title="Who Am I?" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <div className="cyber-card p-6">
              <div className="font-mono text-xs terminal-text mb-2">~/jitendotexe/about $ cat bio.md</div>
              <p className="text-lg mb-4">
                Hello! I'm <span className="text-primary font-medium">Jiten Adhikari</span>, a SOC Engineer at Thakral One Nepal
                with a focus on cybersecurity and digital forensics.
              </p>
              <p className="mb-4">
                Currently working as a full-time SOC Engineer, I monitor security events and conduct analysis using SIEM tools to enhance system security.
                Previously, I worked as a SOC Analyst intern where I assisted in threat detection and incident response using SIEM.
              </p>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Key Skills & Expertise:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Programming: Python, C, C++, HTML, JavaScript</li>
                  <li>Linux: Proficient in system administration and tools</li>
                  <li>Offensive Security: Nmap, Metasploit, Hydra, John the Ripper, Burp Suite</li>
                  <li>Defensive Security: Wireshark, Autopsy, SIEM (Qradar, Logpoint), Incident Response</li>
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Achievements & Certifications:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Winner, TBC CyberSec Club CTF (2023)</li>
                  <li>Digital Forensics Essentials (DFE), EC Council (2023)</li>
                  <li>Network Defense Essentials (NDE), EC Council (2023)</li>
                  <li>Ethical Hacking Essentials (EHE), EC Council (2022)</li>
                </ul>
              </div>
              <p>
                I've also contributed as a Linux Bootcamp Instructor, teaching system administration to over 30 participants, and actively participate in CTF competitions to enhance my cybersecurity skills.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 order-1 lg:order-2 flex flex-col items-center"
          >
            <Avatar className="w-48 h-48 border-4 border-primary/20 mb-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Jiten Adhikari" />
              <AvatarFallback className="text-5xl bg-zinc-800">JA</AvatarFallback>
            </Avatar>

            <div className="w-full max-w-md">
              <div className="flex justify-between space-x-4 mb-2">
                {passions.map((passion, index) => (
                  <button
                    key={passion.id}
                    className={`${
                      activeTab === index ? "text-primary" : "text-zinc-500"
                    } transition-colors`}
                    onClick={() => setActiveTab(index)}
                  >
                    {/* Use the component from the array dynamically */}
                    {React.createElement(passion.icon, { className: "h-6 w-6" })}
                  </button>
                ))}
              </div>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    {React.createElement(ActiveIcon, { className: "h-5 w-5 text-primary" })}
                    {activePassion.title}
                  </h3>
                  <p className="text-sm text-zinc-400">{activePassion.description}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
