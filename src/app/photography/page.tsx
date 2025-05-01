"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Masonry from 'react-masonry-css';

const photos = [
  { src: "https://live.staticflickr.com/65535/48904657791_0eb41b6637_b.jpg", alt: "Kitty hiding behind plant branches", title: "Kitty" },
  { src: "https://live.staticflickr.com/65535/52275162585_902656e733_z.jpg", alt: "Fog Droplet in the Grass", title: "Growing Gem" },
  { src: "https://live.staticflickr.com/65535/52274696258_54f033d048_z.jpg", alt: "Ant in Wood", title: "Ant" },
  { src: "https://live.staticflickr.com/65535/52275162490_1f356450c3_z.jpg", alt: "Rain in Pasadena", title: "Pasadena Building" },
  { src: "https://live.staticflickr.com/65535/52275041735_2fee28df22_z.jpg", alt: "Water Droplet in Leaf", title: "Rainy Season" },
  { src: "https://live.staticflickr.com/65535/52274815124_f440f9c9fb_z.jpg", alt: "Fire in Swastik", title: "Fire" },
  { src: "https://live.staticflickr.com/65535/52274470263_64a8e03740_z.jpg", alt: "Buddha Prayer Wheel at Sunset", title: "Buddha Prayer Wheel" },
  { src: "https://live.staticflickr.com/65535/52274938249_29a99157a4_z.jpg", alt: "Sunset at Temple", title: "Temple Sunset" }
];

const breakpointColumnsObj = {
  default: 3,
  1024: 3,
  768: 2,
  640: 1
};

export default function PhotographyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-8">
        <Link href="/" className="inline-flex items-center text-sm text-foreground/70 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Photography</h1>
        <p className="text-lg text-foreground/70 mb-8">A curated showcase of my best shots spanning nature, travel, and moments.</p>
        <p className="text-lg text-foreground/70 mb-8">This page is under maintenance</p>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos.map((photo) => (
            <a
              key={photo.src}
              href={photo.src}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow bg-background/70 border border-primary/10 mb-6"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto block"
                loading="lazy"
              />
              <div className="p-3 bg-transparent">
                <h3 className="text-md font-semibold text-foreground truncate">{photo.title}</h3>
              </div>
            </a>
          ))}
        </Masonry>
      </div>
    </div>
  );
}
