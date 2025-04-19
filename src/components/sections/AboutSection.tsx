"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Car, Camera, Compass, Code } from "lucide-react";

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
          <span className="inline-block font-mono text-primary text-sm mb-3">
            &lt;about me /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Am I?</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
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
                Hello! I'm <span className="text-primary font-medium">Jiten Adhikari</span>, a cyber security engineer
                with a passion for strengthening digital defenses and finding vulnerabilities before they become threats.
              </p>
              <p className="mb-4">
                With years of experience in network security, penetration testing, and security architecture, I work to ensure systems
                remain protected in an ever-evolving threat landscape. My expertise extends to:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-4 ml-2">
                <li>Vulnerability assessment and penetration testing</li>
                <li>Security infrastructure design and implementation</li>
                <li>Incident response and forensics</li>
                <li>Compliance and risk management</li>
              </ul>
              <p>
                Outside of my professional life, I'm an avid car and bike enthusiast, a photography hobbyist, and love exploring new
                places through travel. These diverse interests help me maintain a well-rounded perspective that enhances my security
                work.
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

            <div className="w-full max-w-sm">
              <div className="flex justify-between mb-2">
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
