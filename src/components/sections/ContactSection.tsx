"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LINKS } from "@/config/links";
import { Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { FaFlickr } from "react-icons/fa";
import { SiSteam } from "react-icons/si";
import SectionHeader from "@/components/ui/SectionHeader";

const commands = [
  { id: "intro", text: "Interested in working together or just want to say hello?" },
  { id: "connect", text: "Connect with me via the form below or directly at:" },
  { id: "email", text: `Email: ${LINKS.email.replace(/^mailto:/, '')}` },
  // { id: "linkedin", text: `LinkedIn: ${LINKS.linkedin.replace(/^https?:\/\//, '')}` },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [visibleCommands, setVisibleCommands] = useState(0);
  const [typing, setTyping] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Simulate command typing animation
  useEffect(() => {
    if (!isInView) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (visibleCommands < commands.length) {
      timeout = setTimeout(() => {
        setTyping(true);
        setTimeout(() => {
          setVisibleCommands((prev) => prev + 1);
          setTyping(false);
        }, 1000);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [isInView, visibleCommands]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 scroll-mt-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <SectionHeader upperText="&lt;get in touch /&gt;" title="Contact" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="cyber-card p-6"
          >
            <div className="flex flex-col space-y-4">
              <div className="font-mono text-xs terminal-text mb-2">~/jitendotexe/contact $ ./info.sh</div>

              <div className="font-mono text-sm space-y-2 mb-4">
                {commands.slice(0, visibleCommands).map((cmd, index) => (
                  <div key={cmd.id} className="typing text-primary" style={{ animationDelay: `${index * 0.5}s` }}>
                    <span>{cmd.text}</span>
                  </div>
                ))}

                {typing && (
                  <div className="h-5 flex items-center">
                    <span className="cursor">_</span>
                  </div>
                )}
              </div>

              <div className="border-t border-primary/10 pt-4">
                <h3 className="text-lg font-semibold mb-4">Socials:</h3>
                <div className="flex space-x-6">
                  {[
                    { name: "Email", url: LINKS.email, icon: Mail },
                    { name: "GitHub", url: LINKS.github, icon: Github },
                    { name: "LinkedIn", url: LINKS.linkedin, icon: Linkedin },
                    { name: "Twitter", url: LINKS.twitter, icon: Twitter },
                    { name: "Instagram", url: LINKS.instagram, icon: Instagram },
                    { name: "Flickr", url: LINKS.flickr, icon: FaFlickr },
                    { name: "Steam", url: LINKS.steam, icon: SiSteam },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target={social.name === "Email" ? undefined : "_blank"}
                      rel={social.name === "Email" ? undefined : "noopener noreferrer"}
                      className="text-zinc-400 hover:text-primary transition-colors"
                    >
                      <social.icon className="w-6 h-6" />
                      <span className="sr-only">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="cyber-card p-6">
              <div className="font-mono text-xs terminal-text mb-6">~/jitendotexe/contact $ ./send_message.sh</div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    <span className="text-primary">$</span> Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-zinc-800/50 border border-primary/20 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                    disabled={formStatus === "sending" || formStatus === "success"}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    <span className="text-primary">$</span> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-zinc-800/50 border border-primary/20 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                    disabled={formStatus === "sending" || formStatus === "success"}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    <span className="text-primary">$</span> Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={5}
                    className="w-full bg-zinc-800/50 border border-primary/20 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                    disabled={formStatus === "sending" || formStatus === "success"}
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={formStatus === "sending" || formStatus === "success"}
                  >
                    {formStatus === "idle" && "Send Message"}
                    {formStatus === "sending" && "Sending..."}
                    {formStatus === "success" && "Message Sent!"}
                    {formStatus === "error" && "Error - Try Again"}
                  </Button>

                  {formStatus === "success" && (
                    <div className="mt-3 font-mono text-xs terminal-text">
                      <div className="typing" style={{ animationDelay: "0.2s" }}>
                        $ Message sent successfully!
                      </div>
                      <div className="typing" style={{ animationDelay: "1s" }}>
                        $ Thank you for reaching out.
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
