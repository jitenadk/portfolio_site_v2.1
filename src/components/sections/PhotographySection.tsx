"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Photography gallery data
const galleryItems = [
  {
    id: "photo1",
    title: "Urban Neon",
    category: "Cityscape",
    src: "/images/placeholder-1.jpg",
    aspectRatio: "aspect-square",
  },
  {
    id: "photo2",
    title: "Mountain Range",
    category: "Landscape",
    src: "/images/placeholder-2.jpg",
    aspectRatio: "aspect-video",
  },
  {
    id: "photo3",
    title: "Desert Road",
    category: "Travel",
    src: "/images/placeholder-3.jpg",
    aspectRatio: "aspect-square",
  },
  {
    id: "photo4",
    title: "Classic Roadster",
    category: "Automotive",
    src: "/images/placeholder-4.jpg",
    aspectRatio: "aspect-video",
  },
  {
    id: "photo5",
    title: "Vintage Motorcycle",
    category: "Automotive",
    src: "/images/placeholder-5.jpg",
    aspectRatio: "aspect-square",
  },
  {
    id: "photo6",
    title: "Ocean Sunset",
    category: "Nature",
    src: "/images/placeholder-6.jpg",
    aspectRatio: "aspect-video",
  },
];

export default function PhotographySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(galleryItems.map(item => item.category))];

  const filteredGallery = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="photography" className="py-16 scroll-mt-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-block font-mono text-primary text-sm mb-3">
            &lt;captured moments /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Photography</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="mb-8 flex justify-center flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-mono transition-all",
                activeCategory === category
                  ? "bg-primary/20 text-primary"
                  : "bg-transparent hover:bg-zinc-800 text-foreground/60"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="cyber-card p-6">
          <div className="font-mono text-xs text-primary mb-6">~/jitendotexe/gallery $ ls -la | grep {activeCategory.toLowerCase()}</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={cn("group relative rounded-md overflow-hidden", item.aspectRatio)}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />

                      <div className="absolute bottom-0 left-0 p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <p className="text-white/80 text-sm">{item.category}</p>
                      </div>

                      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-all" />

                      <div className="w-full h-full bg-zinc-900 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
                          {/* Placeholder for when image isn't available */}                          <span className="font-mono text-sm">Image {index + 1}</span>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-lg border border-primary/20">
                    <DialogTitle className="sr-only">{item.title}</DialogTitle>
                    <DialogClose asChild>
                    <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition">
                      Close
                    </button>
                  </DialogClose>
                    <div className="p-1">
                      <div className="relative aspect-[16/9] w-full">
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-zinc-700">
                          <span className="font-mono text-sm">Image {index + 1} (Full view)</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-foreground/60">{item.category}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}