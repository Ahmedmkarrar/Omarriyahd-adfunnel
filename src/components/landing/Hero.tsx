"use client";

import { motion } from "framer-motion";
import { Lock, Calendar, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { propertyData } from "@/lib/property-data";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video/Image Background */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder for video - replace with actual drone footage */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/photos/hero-bg.jpg')`,
          }}
        />
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-luxury-charcoal to-luxury-black" />

        {/* Video element (uncomment when video is available) */}
        {/* <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/drone-footage.mp4" type="video/mp4" />
        </video> */}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] video-overlay" />

      {/* Price Badge - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-6 right-6 z-20 hidden md:block"
      >
        <div className="glass-effect rounded-xl px-6 py-4 text-right">
          <div className="text-gold-400 text-sm font-medium uppercase tracking-wider mb-1">
            Listed at
          </div>
          <div className="text-white text-3xl font-serif font-bold">
            {propertyData.priceFormatted}
          </div>
          <div className="text-gray-400 text-sm mt-1">
            {propertyData.city}, {propertyData.state}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-medium uppercase tracking-[0.2em] bg-gold-500/10 px-4 py-2 rounded-full border border-gold-500/20">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            Exclusive Listing
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          {propertyData.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-4"
        >
          {propertyData.tagline}
        </motion.p>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 text-gray-400 mb-10"
        >
          <span className="flex items-center gap-1">
            <span className="text-gold-400 font-semibold">{propertyData.beds}</span> Bed
          </span>
          <span className="hidden md:inline text-gold-500/50">|</span>
          <span className="flex items-center gap-1">
            <span className="text-gold-400 font-semibold">{propertyData.baths}</span> Bath
          </span>
          <span className="hidden md:inline text-gold-500/50">|</span>
          <span className="flex items-center gap-1">
            <span className="text-gold-400 font-semibold">{propertyData.sqft.toLocaleString()}</span> Sq Ft
          </span>
          <span className="hidden md:inline text-gold-500/50">|</span>
          <span className="flex items-center gap-1">
            <span className="text-gold-400 font-semibold">{propertyData.lotSize}</span> Lot
          </span>
        </motion.div>

        {/* Mobile Price Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="md:hidden mb-8"
        >
          <div className="inline-block glass-effect rounded-xl px-6 py-3">
            <span className="text-gold-400 font-semibold text-2xl">
              {propertyData.priceFormatted}
            </span>
            <span className="text-gray-400 text-sm ml-2">
              {propertyData.city}, {propertyData.state}
            </span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/qualify">
            <Button variant="luxury" size="xl" className="group w-full sm:w-auto">
              <Lock className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Get the Private Buyer&apos;s Dossier
            </Button>
          </Link>
          <Link href="/qualify">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Calendar className="w-5 h-5 mr-2" />
              Request a Private Tour
            </Button>
          </Link>
        </motion.div>

        {/* Trust Indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-500 text-sm mt-6"
        >
          Limited showings available. By appointment only.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-gold-400 transition-colors"
          onClick={() => {
            document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-xs uppercase tracking-wider mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
