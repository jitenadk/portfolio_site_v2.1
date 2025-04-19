"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LINKS } from "@/config/links";

const commands = [
  { id: "intro", text: "Interested in working together or just want to say hello?" },
  { id: "connect", text: "Connect with me via the form below or directly at:" },
  { id: "email", text: `Email: ${LINKS.email.replace(/^mailto:/, '')}` },
  { id: "linkedin", text: `LinkedIn: ${LINKS.linkedin.replace(/^https?:\/\//, '')}` },
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
          <span className="inline-block font-mono text-primary text-sm mb-3">
            &lt;get in touch /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="cyber-card p-6"
          >
            <div className="flex flex-col space-y-4">
              <div className="font-mono text-xs text-primary mb-2">~/jitendotexe/contact $ ./info.sh</div>

              <div className="font-mono text-sm space-y-2 mb-4">
                {commands.slice(0, visibleCommands).map((cmd, index) => (
                  <div key={cmd.id} className="typing" style={{ animationDelay: `${index * 0.5}s` }}>
                    <span className={index <= 1 ? "text-foreground" : "text-primary"}>{cmd.text}</span>
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
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "Email", url: LINKS.email },
                    { name: "GitHub", url: LINKS.github },
                    { name: "LinkedIn", url: LINKS.linkedin },
                    { name: "Twitter", url: LINKS.twitter },
                    { name: "Instagram", url: LINKS.instagram },
                    { name: "Flickr", url: LINKS.flickr },
                  ].map((social) => (
                    <div key={social.name} className="flex items-center space-x-2">
                      <span className="text-primary">$</span>
                      <div>
                        <div className="font-medium">{social.name}</div>
                        <a href={social.url} className="text-xs text-foreground/60 hover:underline" target="_blank" rel="noopener noreferrer">
                          {social.url.replace(/^mailto:|https?:\/\//, "")}
                        </a>
                      </div>
                    </div>
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
              <div className="font-mono text-xs text-primary mb-6">~/jitendotexe/contact $ ./send_message.sh</div>

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
                    <div className="mt-3 font-mono text-xs text-primary">
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
