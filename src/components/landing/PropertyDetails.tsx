"use client";

import { motion } from "framer-motion";
import {
  Square,
  Bed,
  Bath,
  Trees,
  Calendar,
  Car,
  Flame,
  Layers,
  Check,
} from "lucide-react";
import { propertyData } from "@/lib/property-data";

const iconMap: Record<string, React.ElementType> = {
  square: Square,
  bed: Bed,
  bath: Bath,
  trees: Trees,
  calendar: Calendar,
  car: Car,
  flame: Flame,
  layers: Layers,
};

export function PropertyDetails() {
  return (
    <section className="py-24 bg-luxury-charcoal relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 text-sm font-medium uppercase tracking-[0.2em] mb-4 block">
            The Details
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Property Specifications
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Key Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-0.5 bg-gold-500" />
              Key Statistics
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {propertyData.stats.map((stat, index) => {
                const Icon = iconMap[stat.icon] || Square;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-luxury-black/50 border border-white/5 rounded-xl p-5 hover:border-gold-500/20 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-5 h-5 text-gold-400" />
                      <span className="text-gray-400 text-sm">{stat.label}</span>
                    </div>
                    <div className="text-white text-2xl font-semibold">
                      {stat.value}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Price Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-500/20 rounded-xl p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gold-400 text-sm font-medium uppercase tracking-wider mb-1">
                    List Price
                  </p>
                  <p className="text-white text-3xl font-serif font-bold">
                    {propertyData.priceFormatted}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">
                    ${Math.round(propertyData.price / propertyData.sqft).toLocaleString()}/sq ft
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    MLS# {propertyData.mlsNumber}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Premium Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-0.5 bg-gold-500" />
              Premium Features
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {propertyData.keyFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                >
                  <div className="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                    <Check className="w-3 h-3 text-gold-400" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Description Excerpt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 p-6 bg-luxury-black/30 border-l-2 border-gold-500 rounded-r-xl"
            >
              <p className="text-gray-400 leading-relaxed italic">
                &quot;{propertyData.description.split(".").slice(0, 2).join(".")}...&quot;
              </p>
              <p className="text-gold-400 text-sm mt-3">
                Full description available in the Buyer&apos;s Dossier
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
