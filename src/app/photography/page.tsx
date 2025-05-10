"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Maximize2, Info, ChevronLeft, ChevronRight, Instagram  } from "lucide-react";
import Masonry from 'react-masonry-css';
import SectionHeader from '@/components/ui/SectionHeader';
import { motion, useInView } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { link } from "fs";
import { LINKS } from "@/config/links";
import { FaFlickr } from "react-icons/fa";

const photos = [
  { id: "1", 
    title: "Kitty", 
    category: "Nature, Animal",
    src: "https://live.staticflickr.com/65535/48904657791_0eb41b6637_b.jpg", 
    alt: "Kitty hiding behind plant branches",
    description: "A curious cat peeking through lush green foliage, capturing a moment of natural stealth and beauty." 
  },
  { id: "2", 
    title: "Glowing Gem", 
    category: "Nature, Travel",
    src: "https://live.staticflickr.com/65535/52275162585_902656e733_z.jpg", 
    alt: "Fog Droplet in the Grass",
    description: "Morning dew captured at the perfect moment, transforming an ordinary blade of grass into a natural crystal." },
  { id: "3", 
    title: "Ant", 
    category: "Nature, Travel",
    src: "https://live.staticflickr.com/65535/52274696258_54f033d048_z.jpg", 
    alt: "Ant in Wood",
    description: "Macro photography revealing the intricate details of an ant navigating the textured landscape of weathered wood." },
  { id: "4", 
    title: "Pasadena Building", 
    category: "Nature, Travel",
    src: "https://live.staticflickr.com/65535/52275162490_1f356450c3_z.jpg", 
    alt: "Rain in Pasadena",
    description: "Urban architecture glistening after rainfall, showcasing the contrast between man-made structures and natural elements." },
  { id: "5", 
    title: "Rainy Season", 
    category: "Nature, Travel",
    src: "https://live.staticflickr.com/65535/52275041735_2fee28df22_z.jpg", 
    alt: "Water Droplet in Leaf",
    description: "A perfect water droplet balanced on a vibrant green leaf, symbolizing the renewal and freshness of the rainy season." },
  { id: "6", 
    title: "Fire", 
    category: "Nature, Travel",
    src: "https://live.staticflickr.com/65535/52274815124_f440f9c9fb_z.jpg", 
    alt: "Fire in Swastik",
    description: "The ancient symbol illuminated by ceremonial flames, capturing a moment of spiritual significance and cultural tradition." },
  { id: "7", 
    title: "Buddha Prayer Wheel at Sunset", 
    category: "Nature, Travel",
    src: "https://live.staticflickr.com/65535/52274470263_64a8e03740_z.jpg", 
    alt: "Buddha Prayer Wheel at Sunset",
    description: "Golden hour light bathes this traditional prayer wheel, creating a serene moment where spirituality meets natural beauty." },
  { id: "8", 
    title: "Sunset at Temple", 
    category: "Nature, Travel",
    src: "https://live.staticflickr.com/65535/52274938249_29a99157a4_z.jpg", 
    alt: "Sunset at Temple",
    description: "The silhouette of an ancient temple against a dramatic sunset sky, blending architectural heritage with natural splendor." }
];

const breakpointColumnsObj = {
  default: 3,
  1024: 3,
  768: 2,
  640: 1
};

export default function PhotographyPage() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [selectedImage, setSelectedImage] = useState(null);
    
    // Navigate through images in modal
    const handlePrevImage = () => {
      if (!selectedImage) return;
      const currentIndex = photos.findIndex(photo => photo.id === selectedImage.id);
      const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
      setSelectedImage(photos[prevIndex]);
    };
    
    const handleNextImage = () => {
      if (!selectedImage) return;
      const currentIndex = photos.findIndex(photo => photo.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % photos.length;
      setSelectedImage(photos[nextIndex]);
    };
    
    // Handle keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (!selectedImage) return;
        
        if (e.key === 'ArrowLeft') {
          handlePrevImage();
        } else if (e.key === 'ArrowRight') {
          handleNextImage();
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    return (
    <div className="min-h-screen bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-8">
        <Link href="/" className="inline-flex items-center text-sm text-foreground/70 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader upperText="&lt;captured moments /&gt;" title="Photography" />
        </motion.div>
        <p className="text-lg text-foreground/70 mb-2 text-center">A curated showcase of my best shots spanning nature, travel, and moments that I haven taken over the years.</p>
        <p className="text-lg text-foreground/70 mb-8 flex justify-center gap-1">You can find more on 
          <Link
            href={LINKS.photo_instagram}
            className="hover:underline text-foreground/80 text-primary hover:transition-colors hover:scale-105 flex items-center gap-0.5"
            target="_blank"
          >
            <Instagram className="h-5 w-5" />
              Instagram
          </Link>
          or
          <Link
            href={LINKS.flickr}
            className="hover:underline text-foreground/80 text-primary hover:transition-colors hover:scale-105 flex items-center gap-0.5"
            target="_blank"
          >
            <FaFlickr className="h-5 w-5" />
              Flickr
          </Link>
        </p>

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] overflow-hidden p-0 bg-background border border-primary/20">
          {/* <DialogClose className="absolute right-4 top-4 z-50 px-3 py-1 rounded bg-primary text-white text-sm hover:bg-primary/90 transition-colors">
              Close
            </DialogClose> */}
            <div className="flex flex-col md:flex-row h-full">
              {/* Image Container */}
              <div className="relative flex-1 flex items-center justify-center bg-black/40 min-h-[300px] md:min-h-[400px]">
                {selectedImage && (
                  <>
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      className="max-w-full max-h-[70vh] md:max-h-[85vh] object-contain"
                    />
                    
                    {/* Navigation Controls */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                      className="absolute left-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                      className="absolute right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Info Panel */}
              <div className="w-full md:w-80 p-6 border-t md:border-t-0 md:border-l border-primary/10 overflow-y-auto max-h-[30vh] md:max-h-[85vh]">
                <DialogHeader className="mb-4">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-xl font-semibold text-primary">
                      {selectedImage?.title}
                    </DialogTitle>
                    {/* <span className="text-xs font-mono py-1 px-3 rounded-full bg-primary/10 text-primary">
                      #{selectedImage?.id}
                    </span> */}
                  </div>
                  <DialogDescription className="font-mono text-xs mt-1">
                    {selectedImage?.category}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="h-px w-full bg-primary/10 my-4"></div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                      <Info className="h-3 w-3 mr-1" /> Description
                    </h4>
                    <p className="text-sm text-foreground/80">
                      {selectedImage?.description || selectedImage?.alt}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage?.category.split(', ').map((tag, i) => (
                        <span key={i} className="text-xs bg-primary/5 text-primary/80 px-2 py-1 rounded-md font-mono">
                          #{tag.toLowerCase().replace(' ', '_')}
                        </span>
                      ))}
                      <span className="text-xs bg-primary/5 text-primary/80 px-2 py-1 rounded-md font-mono">
                        #photography
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </DialogContent>
        </Dialog>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative mb-6"
            >
              <div 
                className="cursor-pointer block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow bg-background/70 border border-primary/10"
                onClick={() => setSelectedImage(photo)}
              >
                <div className="relative">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <div className="absolute bottom-0 left-0 p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-white font-medium">{photo.title}</h3>
                    <p className="text-white/80 text-sm">{photo.category}</p>
                  </div>
                  <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-black/50 backdrop-blur-sm p-2 rounded-full flex items-center justify-center">
                      <Maximize2 className="h-4 w-4 text-white" />
                    </span>
                  </div>
                  <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-all" />
                </div>
                <div className="p-3 bg-transparent">
                  <h3 className="text-md font-semibold text-foreground truncate">{photo.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}