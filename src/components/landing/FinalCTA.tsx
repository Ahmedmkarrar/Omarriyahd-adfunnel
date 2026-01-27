"use client";

import { motion } from "framer-motion";
import { Lock, FileText, Camera, LineChart, Map, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { propertyData } from "@/lib/property-data";

export function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-luxury-charcoal to-luxury-black" />

      {/* Gold accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-5 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-gold-400 text-sm font-medium">
            High Interest Property
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Ready to See This Estate in Person?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          Get exclusive access to the Private Buyer&apos;s Dossier including photos,
          floorplan, disclosures, price strategy, and tour booking.
        </motion.p>

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto"
        >
          {[
            { icon: Camera, label: "40+ Photos" },
            { icon: FileText, label: "Floor Plans" },
            { icon: FileText, label: "Disclosures" },
            { icon: LineChart, label: "Price Analysis" },
            { icon: Map, label: "Neighborhood Data" },
            { icon: Phone, label: "Direct Access" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-2 text-gray-400 text-sm"
            >
              <item.icon className="w-4 h-4 text-gold-400" />
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="luxury"
            size="xl"
            className="group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Lock className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Unlock Your Buyer&apos;s Dossier
          </Button>
        </motion.div>

        {/* Trust Signal */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gray-600 text-sm mt-6"
        >
          Your information is secure and will never be sold or shared.
        </motion.p>

        {/* Agent Quick Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-12 border-t border-white/10"
        >
          <p className="text-gray-500 text-sm mb-4">
            Prefer to speak directly with our listing agent?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${propertyData.agent.phone.replace(/\./g, "")}`}
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{propertyData.agent.phone}</span>
            </a>
            <span className="hidden sm:inline text-gray-600">|</span>
            <a
              href={`mailto:${propertyData.agent.email}`}
              className="text-gold-400 hover:text-gold-300 transition-colors"
            >
              {propertyData.agent.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
