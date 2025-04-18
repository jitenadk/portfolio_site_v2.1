"use client";

import type React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Define skill categories and items
const skillCategories = [
  {
    title: "Security",
    skills: [
      { name: "Penetration Testing", level: 95 },
      { name: "Vulnerability Analysis", level: 90 },
      { name: "Security Auditing", level: 85 },
      { name: "Incident Response", level: 80 },
    ],
  },
  {
    title: "Programming",
    skills: [
      { name: "Python", level: 85 },
      { name: "Bash/Shell", level: 80 },
      { name: "JavaScript", level: 75 },
      { name: "SQL", level: 70 },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Wireshark", level: 90 },
      { name: "Metasploit", level: 85 },
      { name: "Nmap", level: 90 },
      { name: "Burp Suite", level: 80 },
    ],
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="skills" className="py-16 scroll-mt-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-block font-mono text-primary text-sm mb-3">
            &lt;tech stack /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="cyber-card p-6">
          <div className="font-mono text-xs text-primary mb-6">~/jitendotexe/skills $ ls -la</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIdx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + categoryIdx * 0.1 }}
              >
                <h3 className="text-lg font-bold mb-4 text-primary font-mono">{category.title}/</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-mono">{skill.name}</span>
                        <span className="text-xs text-foreground/60">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-progress"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1,
                            delay: 0.3 + categoryIdx * 0.1 + skillIdx * 0.1,
                          }}
                          style={{ "--progress": `${skill.level}%` } as React.CSSProperties}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications and accolades */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-primary/10"
          >
            <h3 className="text-lg font-bold mb-4 text-primary font-mono">Certifications/</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Certified Ethical Hacker (CEH)",
                "CISSP - Certified Information Systems Security Professional",
                "CompTIA Security+",
                "OSCP - Offensive Security Certified Professional",
                "CCNA - Cisco Certified Network Associate",
                "AWS Certified Security - Specialty",
              ].map((cert) => (
                <div
                  key={cert}
                  className="p-3 border border-primary/20 bg-primary/5 rounded-md flex items-center"
                >
                  <div className="h-2 w-2 rounded-full bg-primary mr-3" />
                  <span className="text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
