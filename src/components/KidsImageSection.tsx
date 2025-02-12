import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/lovable-uploads/carousel/5fbab967f8fa494854f532d17244c974.jpeg",
  "/lovable-uploads/carousel/91831059745750edf4b2eb2150a2167f.jpeg",
  "/lovable-uploads/carousel/a3d54beb23358516b5fe5d8a46139611.jpeg",
  "/lovable-uploads/carousel/c09fdd71c367debac9cd07522cd9a8c2.jpeg",
  "/lovable-uploads/carousel/cb7855764a11b18838df0ec7d78f3a1a.png",
  "/lovable-uploads/carousel/e5052a36cb5df38399540e0af9ea9f56.jpeg",
  "/lovable-uploads/carousel/f37db8f57d3489ae8ea1f363e306a2ba.jpeg",
];

const KidsImageSection = () => {
  return (
    <section className="relative w-full h-[236px] overflow-hidden bg-transparent">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }} // Moves halfway to keep it seamless
        transition={{
          ease: "linear",
          duration: 20, // Adjust speed
          repeat: Infinity, // Infinite loop
        }}
      >
        {/* Duplicate images to ensure seamless transition */}
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="w-[300px] h-[236px] object-cover mx-1"
          />
        ))}
      </motion.div>
    </section>
  );
};


export default KidsImageSection;
