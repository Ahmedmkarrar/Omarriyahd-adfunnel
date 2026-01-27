"use client";

import { motion } from "framer-motion";
import { Wine, Waves, Store, MapPin } from "lucide-react";
import { propertyData } from "@/lib/property-data";

const iconMap: Record<string, React.ElementType> = {
  wine: Wine,
  waves: Waves,
  store: Store,
};

export function Location() {
  return (
    <section className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-gold-500/5 to-transparent pointer-events-none" />

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
            Location & Lifestyle
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Prime Paso Robles Location
          </h2>
        </motion.div>

        {/* Map and Info Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-luxury-charcoal">
              {/* Google Maps Embed */}
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.1234567890!2d${propertyData.coordinates.lng}!3d${propertyData.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDM2JzMyLjAiTiAxMjDCsDUxJzU2LjIiVw!5e0!3m2!1sen!2sus!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Property Location Map"
              />
            </div>

            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-xs"
            >
              <div className="bg-luxury-charcoal border border-white/10 rounded-xl p-5 shadow-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {propertyData.address}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {propertyData.city}, {propertyData.state} {propertyData.zip}
                    </p>
                    <p className="text-gold-400 text-sm mt-2">
                      Heritage Ranch Community
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Lifestyle Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:pt-4"
          >
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-0.5 bg-gold-500" />
              Lifestyle Benefits
            </h3>

            <div className="space-y-6">
              {propertyData.lifestyle.map((item, index) => {
                const Icon = iconMap[item.icon] || Wine;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group bg-luxury-charcoal/50 border border-white/5 rounded-xl p-6 hover:border-gold-500/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                        <Icon className="w-6 h-6 text-gold-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-2 group-hover:text-gold-400 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              <div className="bg-luxury-charcoal/30 rounded-xl p-4 text-center">
                <p className="text-gold-400 text-2xl font-bold">5 min</p>
                <p className="text-gray-500 text-sm">to Lake Nacimiento</p>
              </div>
              <div className="bg-luxury-charcoal/30 rounded-xl p-4 text-center">
                <p className="text-gold-400 text-2xl font-bold">15 min</p>
                <p className="text-gray-500 text-sm">to Downtown Paso</p>
              </div>
              <div className="bg-luxury-charcoal/30 rounded-xl p-4 text-center">
                <p className="text-gold-400 text-2xl font-bold">200+</p>
                <p className="text-gray-500 text-sm">Nearby Wineries</p>
              </div>
              <div className="bg-luxury-charcoal/30 rounded-xl p-4 text-center">
                <p className="text-gold-400 text-2xl font-bold">A+</p>
                <p className="text-gray-500 text-sm">School District</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
