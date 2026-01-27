"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Check,
  Mail,
  Phone,
  Calendar,
  Home,
  FileText,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { propertyData } from "@/lib/property-data";

export default function ThankYouPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    // Get stored lead info
    const storedEmail = localStorage.getItem("leadEmail") || "";
    const storedFirstName = localStorage.getItem("leadFirstName") || "";
    setEmail(storedEmail);
    setFirstName(storedFirstName);

    // Fire confetti on load
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#d4a853", "#f5e9d1", "#c49340"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#d4a853", "#f5e9d1", "#c49340"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-luxury-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-luxury-black" strokeWidth={3} />
          </motion.div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            {firstName ? `${firstName}, Your` : "Your"} Buyer&apos;s Dossier is On The Way!
          </h1>
          <p className="text-gray-400 text-lg">
            Check your email{" "}
            {email && (
              <span className="text-gold-400">({email})</span>
            )}{" "}
            for immediate access to the exclusive property dossier.
          </p>
        </motion.div>

        {/* What's Included Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-luxury-charcoal border border-white/10 rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold-400" />
            What&apos;s Included in Your Dossier
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {propertyData.dossierContents.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-gold-400" />
                </div>
                <span className="text-gray-300 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Urgency Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 mb-8"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h3 className="text-yellow-400 font-semibold mb-1">
                Don&apos;t Miss This Opportunity
              </h3>
              <p className="text-yellow-200/80 text-sm">
                This property is generating strong interest. Private tours are being
                scheduled this week. Showings are limited to qualified buyers to
                protect seller privacy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Calendar Booking Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-luxury-charcoal border border-white/10 rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              Book Your Private Showing Now
            </h2>
            <p className="text-gray-400">
              Reserve your exclusive tour slot before they&apos;re all taken
            </p>
          </div>

          {/* Calendly Embed Placeholder */}
          <div className="bg-luxury-black rounded-xl border border-white/5 overflow-hidden">
            {/* Replace this div with actual Calendly embed */}
            <div className="aspect-video md:aspect-[16/10] flex items-center justify-center flex-col gap-4 p-8">
              <Calendar className="w-12 h-12 text-gold-400" />
              <p className="text-gray-400 text-center">
                Calendar booking widget will appear here
              </p>
              <p className="text-gray-500 text-sm text-center">
                Add your Calendly or Cal.com embed code to enable scheduling
              </p>

              {/* Temporary placeholder buttons */}
              <div className="flex gap-4 mt-4">
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Book via Calendly
                  </Button>
                </a>
              </div>
            </div>

            {/* Uncomment and configure when ready:
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/omar-revel/property-showing?hide_gdpr_banner=1&primary_color=d4a853"
              style={{ minWidth: '320px', height: '700px' }}
            />
            <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
            */}
          </div>

          <p className="text-gray-500 text-sm text-center mt-6">
            Not ready to book? Reply to the dossier email with questions or to
            schedule a call.
          </p>
        </motion.div>

        {/* What Happens Next Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-luxury-charcoal border border-white/10 rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-8 text-center">
            What Happens Next
          </h2>

          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: "Right Now",
                description:
                  "You'll receive your dossier via email within 60 seconds",
                status: "complete",
              },
              {
                icon: Phone,
                title: "Within 1 Hour",
                description:
                  "Our listing agent will send you a personal text to answer any questions",
                status: "pending",
              },
              {
                icon: Home,
                title: "Your Private Tour",
                description:
                  "Experience the property in person and fall in love with your future home",
                status: "pending",
              },
              {
                icon: FileText,
                title: "Make Your Move",
                description:
                  "If it's the one, we'll guide you through a smooth offer process",
                status: "pending",
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === "complete"
                        ? "bg-gold-500"
                        : "bg-white/10"
                    }`}
                  >
                    {step.status === "complete" ? (
                      <Check className="w-5 h-5 text-luxury-black" />
                    ) : (
                      <step.icon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  {index < 3 && (
                    <div className="w-0.5 h-full bg-white/10 my-2" />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Agent Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-luxury-charcoal to-luxury-black border border-gold-500/20 rounded-2xl p-6 md:p-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Meet Your Listing Agent
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Agent Photo */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-luxury-slate overflow-hidden border-2 border-gold-500/30">
                {/* Placeholder - replace with actual agent photo */}
                <div className="w-full h-full flex items-center justify-center text-gold-400 text-4xl font-serif">
                  {propertyData.agent.name.split(" ").map((n) => n[0]).join("")}
                </div>
                {/* Uncomment when photo available:
                <Image
                  src={propertyData.agent.photo}
                  alt={propertyData.agent.name}
                  fill
                  className="object-cover"
                />
                */}
              </div>
            </div>

            {/* Agent Info */}
            <div className="text-center md:text-left flex-1">
              <h3 className="text-2xl font-serif font-bold text-white mb-1">
                {propertyData.agent.name}
              </h3>
              <p className="text-gold-400 font-medium mb-2">
                {propertyData.agent.title}
              </p>
              <p className="text-gray-400 text-sm mb-1">
                {propertyData.agent.brokerage}
              </p>
              <p className="text-gray-500 text-xs mb-4">
                {propertyData.agent.license}
              </p>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {propertyData.agent.bio}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a href={`tel:${propertyData.agent.phone.replace(/\./g, "")}`}>
                  <Button variant="luxury" size="lg" className="w-full sm:w-auto">
                    <Phone className="w-4 h-4 mr-2" />
                    Call {propertyData.agent.phone}
                  </Button>
                </a>
                <a href={`mailto:${propertyData.agent.email}`}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Omar
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-500 text-sm">
              Questions? Text or call Omar directly:{" "}
              <a
                href={`tel:${propertyData.agent.phone.replace(/\./g, "")}`}
                className="text-gold-400 hover:text-gold-300"
              >
                {propertyData.agent.phone}
              </a>
            </p>
          </div>
        </motion.div>

        {/* Back to Property Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <Link href="/" className="text-gray-500 hover:text-gold-400 transition-colors text-sm">
            ← Back to Property Details
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
