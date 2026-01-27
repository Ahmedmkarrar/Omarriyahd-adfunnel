"use client";

import { motion } from "framer-motion";
import { Home, Mountain, ChefHat, Building } from "lucide-react";
import { propertyData } from "@/lib/property-data";

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  mountain: Mountain,
  "chef-hat": ChefHat,
  building: Building,
};

export function Highlights() {
  return (
    <section id="highlights" className="py-24 bg-luxury-charcoal relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a853' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 text-sm font-medium uppercase tracking-[0.2em] mb-4 block">
            Property Features
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Why This Property Stands Out
          </h2>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyData.highlights.map((highlight, index) => {
            const Icon = iconMap[highlight.icon] || Home;
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="group h-full bg-luxury-black/50 border border-white/5 rounded-2xl p-8 hover:border-gold-500/30 hover:bg-luxury-black/80 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/5">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-gold-400" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                    {highlight.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
