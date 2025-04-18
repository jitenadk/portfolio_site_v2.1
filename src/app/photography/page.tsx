"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import clsx from "clsx";

import "./page.css";

// Add your Flickr image URLs below. Example:
// "https://live.staticflickr.com/65535/53123456789_abcdef1234_b.jpg",
const images = [
  {
    src: "https://live.staticflickr.com/65535/48904657791_0eb41b6637_b.jpg",
    alt: "Kitty hiding behind plant branches",
    title: "Kitty",
  },
  {
    src: "https://live.staticflickr.com/65535/52275162585_902656e733_z.jpg",
    alt: "Fog Droplet in the Grass",
    title: "Growing Gem",
  },
  {
    src: "https://live.staticflickr.com/65535/52274696258_54f033d048_z.jpg",
    alt: "Ant in Wood",
    title: "Ant",
  },
  {
    src: "https://live.staticflickr.com/65535/52275162490_1f356450c3_z.jpg",
    alt: "Rain in ",
    title: "Pasadena Building",
  },
  {
    src: "https://live.staticflickr.com/65535/52275041735_2fee28df22_z.jpg",
    alt: "Water Droplet in Leaf",
    title: "Rainy season",
  },
  {
    src: "https://live.staticflickr.com/65535/52274815124_f440f9c9fb_z.jpg",
    alt: "Fire in Swastik",
    title: "Fire",
  },
  {
    src: "https://live.staticflickr.com/65535/52274470263_64a8e03740_z.jpg",
    alt: "buddha Prayer Wheel Sunset",
    title: "buddha Prayer Wheel",
  },
  {
    src: "https://live.staticflickr.com/65535/52274938249_29a99157a4_z.jpg",
    alt: "1",
    title: "1",
  },
  {
    src: "https://live.staticflickr.com/65535/52274709584_6032f6e519_z.jpg",
    alt: "2",
    title: "2",
  },
  {
    src: "https://live.staticflickr.com/65535/52273478002_f06fb1a2f1_z.jpg",
    alt: "3",
    title: "3",
  },
  {
    src: "https://live.staticflickr.com/65535/52274937245_00927a242c_z.jpg",
    alt: "",
    title: "4",
  },
  {
    src: "https://live.staticflickr.com/65535/52273581767_4e070b581c_z.jpg",
    alt: "",
    title: "5",
  },
  {
    src: "https://live.staticflickr.com/65535/52274574583_4cd02f14b5_z.jpg",
    alt: "",
    title: "6",
  },
  {
    src: "https://live.staticflickr.com/65535/52274815439_fbb57b2fc5_z.jpg",
    alt: "",
    title: "6",
  },
  {
    src: "https://live.staticflickr.com/65535/52274938249_29a99157a4_z.jpg",
    alt: "",
    title: "7",
  },
  {
    src: "https://live.staticflickr.com/65535/52274709754_9a62792ae9_z.jpg",
    alt: "",
    title: "8",
  },
  {
    src: "https://live.staticflickr.com/65535/52274696178_ab73ae9db5_z.jpg",
    alt: "",
    title: "9",
  },
  {
    src: "https://live.staticflickr.com/65535/52274634241_b1fff01d66_z.jpg",
    alt: "",
    title: "10",
  },
];

export default function PhotographyPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleScroll = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY;
    const nextIndex = activeIndex === null 
      ? (delta > 0 ? 0 : images.length - 1) 
      : (delta > 0 
        ? (activeIndex + 1) % images.length 
        : (activeIndex - 1 + images.length) % images.length);
    
    setActiveIndex(nextIndex);
  }, [activeIndex]);

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 pt-28 pb-20 px-4">
      {/* Background effects */}
      <div className="scanline absolute inset-0 pointer-events-none" />
      <div className="noise absolute inset-0 pointer-events-none" />
      
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white neon-glow terminal-text">
          Photography
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          A collection of moments captured through my lens. Scroll to navigate through the gallery.
        </p>
      </div>
      
      {/* Gallery */}
      <div 
        className="gallery-container relative w-full h-[80vh] flex items-center justify-center mb-16 overflow-hidden" 
        onWheel={handleScroll}
      >
        <div className="stack-container w-full h-full">
          {images.map((img, idx) => {
            // Track hover state for this image
            const [isHovered, setIsHovered] = useState(false);
            
            // Calculate position based on distance from active index
            const distance = activeIndex === null 
              ? idx - Math.floor(images.length / 2)
              : idx - activeIndex;
            
            // Wrap around for circular effect
            const wrappedDistance = distance > images.length / 2 
              ? distance - images.length 
              : (distance < -images.length / 2 ? distance + images.length : distance);
              
            // Calculate z-index: active has highest, decreases with distance
            const zIndex = 100 - Math.abs(wrappedDistance) * 10;
            
            // Calculate opacity: active is fully opaque, fades with distance
            const opacity = 1 - Math.min(Math.abs(wrappedDistance) * 0.15, 0.6);
            
            // Calculate scale: active is largest, decreases with distance
            const scale = 1 - Math.min(Math.abs(wrappedDistance) * 0.08, 0.3);
            
            // Calculate rotation: increases with distance
            const rotateY = wrappedDistance * 15;
            
            // Calculate horizontal offset: increases with distance - make it larger
            const translateX = wrappedDistance * 120;
            
            // Calculate depth: active is closest, decreases with distance
            const translateZ = -Math.abs(wrappedDistance) * 120;
            
            return (
              <div
                key={`${img.src}-${idx}`}
                className={clsx(
                  "w-80 sm:w-96 md:w-[30rem] h-96 sm:h-[28rem] md:h-[32rem] cursor-pointer",
                  "cyber-card shadow-2xl border rounded-xl overflow-hidden",
                  {
                    "active-card z-50 border-primary/70": activeIndex === idx,
                    "border-primary/30": !isHovered && activeIndex !== idx,
                    "border-primary/60 shadow-primary/20 shadow-xl": isHovered
                  }
                )}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: isHovered ? Math.max(opacity + 0.2, 0.8) : opacity,
                  zIndex: isHovered ? Math.max(zIndex + 10, 90) : zIndex
                }}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div 
                  className={clsx(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 transition-opacity duration-300",
                    {
                      "opacity-100": isHovered || activeIndex === idx,
                      "opacity-0": !isHovered && activeIndex !== idx
                    }
                  )}
                >
                  <div className="absolute bottom-6 left-0 w-full px-6">
                    <h3 className="text-white font-mono text-xl mb-2 neon-glow-text">{img.title}</h3>
                    {img.alt && <p className="text-zinc-300 text-sm">{img.alt}</p>}
                  </div>
                </div>
                <Image
                  src={img.src}
                  alt={img.alt || img.title || `Photo ${idx + 1}`}
                  title={img.title}
                  fill
                  className="object-cover object-center transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  priority={idx === 0}
                />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Preview Modal */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={() => setActiveIndex(null)}
        >
          <div className="relative w-[95vw] max-w-5xl h-[85vh] cyber-card border-primary/40 rounded-xl shadow-2xl shadow-primary/20 overflow-hidden flex items-center justify-center">
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt || images[activeIndex].title || `Photo ${activeIndex + 1}`}
              title={images[activeIndex].title}
              fill
              className="object-contain object-center"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent py-6 px-6">
              <h2 className="text-white text-xl font-mono neon-glow-pink">
                {images[activeIndex].title}
              </h2>
              {images[activeIndex].alt && (
                <p className="text-zinc-300 text-sm mt-1">{images[activeIndex].alt}</p>
              )}
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                className="text-white bg-primary/20 border border-primary/40 rounded-full px-4 py-2 hover:bg-primary/30 transition font-mono text-sm"
                onClick={e => {
                  e.stopPropagation();
                  const prevIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
                  setActiveIndex(prevIndex);
                }}
              >
                Prev
              </button>
              <button
                className="text-white bg-primary/20 border border-primary/40 rounded-full px-4 py-2 hover:bg-primary/30 transition font-mono text-sm"
                onClick={e => {
                  e.stopPropagation();
                  const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
                  setActiveIndex(nextIndex);
                }}
              >
                Next
              </button>
              <button
                className="text-white bg-primary/20 border border-primary/40 rounded-full px-4 py-2 hover:bg-primary/30 transition font-mono text-sm"
                onClick={e => {
                  e.stopPropagation();
                  setActiveIndex(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
