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
              
              <p className="font-bold">👋Hello! </p> 
              <p className="text-lg mb-4">I'm <span className="text-primary font-medium">Jiten Adhikari</span>, a self-taught penetration tester and cybersecurity enthusiast 
              based in Kathmandu, Nepal.  I’m drawn to systems — how they work, how they break, and how to fix them better than before. 
              </p>
              
              <p className="mb-4">
                <p className="font-bold mb-2">💻 How I Work</p>
                I like keeping things clean — from code to workspaces. If I know what I'm doing, I prefer working solo or guiding others; if not, I'll gladly learn from those who know more. 
                I don't rush, but I don't like wasting time either. Everything has its place — and I'll fix it if it doesn't.
              </p>
              
              <p className="mb-4">
                <p className="font-bold mb-2">🔧 What I Enjoy</p>
                On screen, I tinker with side projects, play all kinds of games, and try to write (still working on that blog). 
                Off screen, I ride, drive, hike, and quietly enjoy rainy nights. I like calm weather, watching planes take off, peeling electronics apart, and just... figuring things out.
              </p>
              
              <p className="mb-4">
                <p className="font-bold mb-2">🚗 When I'm Off Screen</p>
                If there's no screen, there's probably a road. I'll spend the day traveling, exploring, or just with family. 
                I'm not the kind to sit still for long — unless I'm deep into a project or lost in classic music.
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
