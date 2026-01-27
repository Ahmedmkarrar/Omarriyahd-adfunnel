"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import { propertyData } from "@/lib/property-data";

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...new Set(propertyData.photos.map((p) => p.category))];

  const filteredPhotos =
    filter === "all"
      ? propertyData.photos
      : propertyData.photos.filter((p) => p.category === filter);

  const handlePrevious = () => {
    if (selectedPhoto !== null) {
      const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto);
      const prevIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
      setSelectedPhoto(filteredPhotos[prevIndex].id);
    }
  };

  const handleNext = () => {
    if (selectedPhoto !== null) {
      const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto);
      const nextIndex = currentIndex === filteredPhotos.length - 1 ? 0 : currentIndex + 1;
      setSelectedPhoto(filteredPhotos[nextIndex].id);
    }
  };

  return (
    <section className="py-24 bg-luxury-black relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold-400 text-sm font-medium uppercase tracking-[0.2em] mb-4 block">
            Visual Tour
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Experience the Estate
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-gold-500 text-luxury-black"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`relative cursor-pointer group overflow-hidden rounded-xl ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                onClick={() => setSelectedPhoto(photo.id)}
              >
                <div
                  className={`relative ${
                    index === 0 ? "aspect-square" : "aspect-[4/3]"
                  } bg-luxury-charcoal`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <Expand className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
                  </div>

                  {/* Category badge */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {photo.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-gray-500 text-sm">
            Click any photo to view full-screen gallery. Full photo set available in the Buyer&apos;s Dossier.
          </p>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedPhoto}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh] m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredPhotos.find((p) => p.id === selectedPhoto)?.src || ""}
                alt={filteredPhotos.find((p) => p.id === selectedPhoto)?.alt || ""}
                fill
                className="object-contain rounded-lg"
              />
            </motion.div>

            {/* Photo counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              {filteredPhotos.findIndex((p) => p.id === selectedPhoto) + 1} / {filteredPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
