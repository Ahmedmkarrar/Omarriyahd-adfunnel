"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, ChevronDown, CheckCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { propertyData } from "@/lib/property-data";

export function Hero() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Required";
    else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Enter 10 digit phone";
    }
    setErrors(newErrors);
    console.log("Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted, validating...");

    if (!validateForm()) {
      console.log("Validation failed");
      return;
    }

    console.log("Validation passed, submitting...");
    setIsSubmitting(true);

    try {
      // Submit to Netlify Forms
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "lead-form",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      console.log("Netlify response:", response.status);

      // Also submit to API for email notifications
      try {
        await fetch("/api/submit-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            buyerType: "primary",
            timeline: "0-30",
            budget: "1m-1.25m",
            viewingTime: ["flexible"],
            attendees: "solo",
            hasAgent: "open",
            interestedInShowing: true,
            agreeToTerms: true,
            leadScore: { total: 13, category: "hot", breakdown: { timeline: 5, buyerType: 3, budget: 5, showingInterest: 0 } },
            propertyAddress: propertyData.fullAddress,
            propertyPrice: propertyData.price,
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch {
        // API call is optional, continue even if it fails
      }

      console.log("Redirecting to thank-you...");
      localStorage.setItem("leadEmail", formData.email);
      localStorage.setItem("leadFirstName", formData.firstName);
      router.push("/thank-you");
    } catch (error) {
      console.error("Form submission error:", error);
      // Still redirect on error
      localStorage.setItem("leadEmail", formData.email);
      localStorage.setItem("leadFirstName", formData.firstName);
      router.push("/thank-you");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 lg:py-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photos/hero-bg.jpg"
          alt="Luxury Mediterranean Estate"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Property Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-gold-400 text-sm font-medium uppercase tracking-[0.15em] bg-gold-500/10 px-4 py-2 rounded-full border border-gold-500/20 mb-6">
              <Sparkles className="w-4 h-4" />
              Exclusive Listing
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
              {propertyData.headline}
            </h1>

            {/* Price */}
            <div className="text-gold-400 text-3xl md:text-4xl font-bold mb-4">
              {propertyData.priceFormatted}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-gray-300 mb-6">
              <span><span className="text-white font-semibold">{propertyData.beds}</span> Beds</span>
              <span className="text-gold-500">•</span>
              <span><span className="text-white font-semibold">{propertyData.baths}</span> Baths</span>
              <span className="text-gold-500">•</span>
              <span><span className="text-white font-semibold">{propertyData.sqft.toLocaleString()}</span> Sq Ft</span>
              <span className="text-gold-500">•</span>
              <span><span className="text-white font-semibold">{propertyData.lotSize}</span></span>
            </div>

            {/* Location */}
            <p className="text-gray-400 mb-6">
              {propertyData.fullAddress}
            </p>

            {/* Benefits */}
            <div className="hidden lg:block space-y-3">
              {[
                "Mediterranean architecture with modern luxury finishes",
                "Panoramic lake and hill country views",
                "Chef's kitchen with premium appliances",
                "ADU potential for guests or income",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Lead Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-luxury-charcoal/95 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
              {/* Form Header */}
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-500/20 flex items-center justify-center">
                  <Lock className="w-7 h-7 text-gold-400" />
                </div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">
                  Get the Private Buyer&apos;s Dossier
                </h2>
                <p className="text-gray-400 text-sm">
                  Instant access to photos, floorplans, disclosures & price analysis
                </p>
              </div>

              {/* Form */}
              <form
                name="lead-form"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="lead-form" />
                <input type="hidden" name="bot-field" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      error={errors.firstName}
                    />
                  </div>
                  <div>
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      error={errors.lastName}
                    />
                  </div>
                </div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={errors.email}
                />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  error={errors.phone}
                />

                <Button
                  type="submit"
                  variant="luxury"
                  size="xl"
                  className="w-full"
                  loading={isSubmitting}
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Unlock My Buyer&apos;s Dossier
                </Button>

                <p className="text-gray-500 text-xs text-center">
                  Your information is secure and will never be shared.
                </p>
              </form>

              {/* What's Included */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-3 text-center">What you&apos;ll receive:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {["40+ HD Photos", "Floor Plans", "Disclosures", "Price Analysis", "Market Comps", "Direct Agent Access"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-gold-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-gold-400 transition-colors"
          onClick={() => {
            document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-xs uppercase tracking-wider mb-2">Explore property</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
