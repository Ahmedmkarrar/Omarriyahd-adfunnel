"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Home,
  Palmtree,
  TrendingUp,
  Eye,
  Zap,
  Calendar,
  CalendarRange,
  Search,
  DollarSign,
  BadgeDollarSign,
  Gem,
  HelpCircle,
  Sun,
  Sunset,
  CalendarCheck,
  Phone,
  Clock,
  User,
  Users,
  Users2,
  Briefcase,
  Video,
  CheckCircle,
  PlusCircle,
  ArrowLeft,
  ArrowRight,
  Lock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { propertyData } from "@/lib/property-data";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  type Step1Data,
  type Step2Data,
  type Step3Data,
  buyerTypeOptions,
  timelineOptions,
  budgetOptions,
  viewingTimeOptions,
  attendeeOptions,
  agentOptions,
} from "@/lib/form-schema";
import { supabase } from "@/lib/supabase";
import { calculateLeadScore } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  "palm-tree": Palmtree,
  "trending-up": TrendingUp,
  eye: Eye,
  zap: Zap,
  calendar: Calendar,
  "calendar-range": CalendarRange,
  search: Search,
  "dollar-sign": DollarSign,
  "badge-dollar-sign": BadgeDollarSign,
  gem: Gem,
  "help-circle": HelpCircle,
  sun: Sun,
  sunset: Sunset,
  "calendar-check": CalendarCheck,
  phone: Phone,
  clock: Clock,
  user: User,
  users: Users,
  "users-2": Users2,
  briefcase: Briefcase,
  video: Video,
  "check-circle": CheckCircle,
  "plus-circle": PlusCircle,
};

export default function QualifyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data state
  const [formData, setFormData] = useState<Partial<Step1Data & Step2Data & Step3Data>>({
    viewingTime: [],
    interestedInShowing: true,
    agreeToTerms: false,
  });

  // Step 1 form
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      buyerType: formData.buyerType,
      timeline: formData.timeline,
      budget: formData.budget,
    },
  });

  // Step 2 form
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      viewingTime: formData.viewingTime || [],
      attendees: formData.attendees,
      hasAgent: formData.hasAgent,
    },
  });

  // Step 3 form
  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email || "",
      phone: formData.phone || "",
      interestedInShowing: formData.interestedInShowing ?? true,
      agreeToTerms: formData.agreeToTerms ?? false,
    },
  });

  const handleStep1Submit = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: Step2Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleStep3Submit = async (data: Step3Data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    const finalData = { ...formData, ...data };
    setFormData(finalData);

    // Calculate lead score
    const leadScore = calculateLeadScore({
      buyerType: finalData.buyerType!,
      timeline: finalData.timeline!,
      budget: finalData.budget!,
      interestedInShowing: finalData.interestedInShowing ?? true,
    });

    try {
      const { error } = await supabase.from("leads").insert({
        first_name: finalData.firstName,
        last_name: finalData.lastName,
        email: finalData.email,
        phone: finalData.phone,
        buyer_type: finalData.buyerType,
        timeline: finalData.timeline,
        budget: finalData.budget,
        viewing_time: finalData.viewingTime || [],
        attendees: finalData.attendees,
        has_agent: finalData.hasAgent,
        interested_in_showing: finalData.interestedInShowing ?? true,
        lead_score: leadScore.total,
        lead_category: leadScore.category,
        score_timeline: leadScore.breakdown.timeline,
        score_buyer_type: leadScore.breakdown.buyerType,
        score_budget: leadScore.breakdown.budget,
        score_showing: leadScore.breakdown.showingInterest,
        source: "qualify-form",
      });

      if (error) throw error;

      // Store in localStorage for thank you page
      localStorage.setItem("leadEmail", finalData.email || "");
      localStorage.setItem("leadFirstName", finalData.firstName || "");

      router.push("/thank-you");
    } catch (err) {
      console.error("Failed to submit lead:", err);
      setSubmitError(
        "There was a problem submitting your information. Please try again or contact us directly."
      );
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / 3) * 100;

  return (
    <main className="min-h-screen bg-luxury-black flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="text-gold-400 text-sm font-medium uppercase tracking-[0.2em] mb-2 block">
            {propertyData.fullAddress}
          </span>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
            Private Buyer&apos;s Dossier
          </h1>
          <p className="text-gray-400">
            Complete these quick questions to personalize your experience
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentStep} of 3</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Form Container */}
        <motion.div
          className="bg-luxury-charcoal border border-white/10 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {currentStep === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={step1Form.handleSubmit(handleStep1Submit)}
              >
                <h2 className="text-xl font-semibold text-white mb-2">
                  Is This Home Right For You?
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Answer 3 quick questions to help us personalize your experience
                </p>

                {/* Buyer Type */}
                <div className="mb-8">
                  <Label className="text-white mb-4 block">
                    What best describes you?
                  </Label>
                  <Controller
                    name="buyerType"
                    control={step1Form.control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-3">
                        {buyerTypeOptions.map((option) => {
                          const Icon = iconMap[option.icon] || Home;
                          const isSelected = field.value === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                                isSelected
                                  ? "border-gold-500 bg-gold-500/10"
                                  : "border-white/10 hover:border-white/20 bg-luxury-black/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon
                                  className={`w-5 h-5 ${
                                    isSelected ? "text-gold-400" : "text-gray-400"
                                  }`}
                                />
                                <div>
                                  <p
                                    className={`font-medium ${
                                      isSelected ? "text-gold-400" : "text-white"
                                    }`}
                                  >
                                    {option.label}
                                  </p>
                                  <p className="text-gray-500 text-xs">
                                    {option.description}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                  {step1Form.formState.errors.buyerType && (
                    <p className="text-red-400 text-sm mt-2">
                      {step1Form.formState.errors.buyerType.message}
                    </p>
                  )}
                </div>

                {/* Timeline */}
                <div className="mb-8">
                  <Label className="text-white mb-4 block">
                    Your buying timeline?
                  </Label>
                  <Controller
                    name="timeline"
                    control={step1Form.control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-3">
                        {timelineOptions.map((option) => {
                          const Icon = iconMap[option.icon] || Calendar;
                          const isSelected = field.value === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                                isSelected
                                  ? "border-gold-500 bg-gold-500/10"
                                  : option.highlight
                                  ? "border-gold-500/30 hover:border-gold-500/50 bg-gold-500/5"
                                  : "border-white/10 hover:border-white/20 bg-luxury-black/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon
                                  className={`w-5 h-5 ${
                                    isSelected
                                      ? "text-gold-400"
                                      : option.highlight
                                      ? "text-gold-500"
                                      : "text-gray-400"
                                  }`}
                                />
                                <div>
                                  <p
                                    className={`font-medium ${
                                      isSelected ? "text-gold-400" : "text-white"
                                    }`}
                                  >
                                    {option.label}
                                  </p>
                                  <p className="text-gray-500 text-xs">
                                    {option.description}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                  {step1Form.formState.errors.timeline && (
                    <p className="text-red-400 text-sm mt-2">
                      {step1Form.formState.errors.timeline.message}
                    </p>
                  )}
                </div>

                {/* Budget */}
                <div className="mb-8">
                  <Label className="text-white mb-4 block">
                    Your budget range?
                  </Label>
                  <Controller
                    name="budget"
                    control={step1Form.control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-3">
                        {budgetOptions.map((option) => {
                          const Icon = iconMap[option.icon] || DollarSign;
                          const isSelected = field.value === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                                isSelected
                                  ? "border-gold-500 bg-gold-500/10"
                                  : option.highlight
                                  ? "border-gold-500/30 hover:border-gold-500/50 bg-gold-500/5"
                                  : "border-white/10 hover:border-white/20 bg-luxury-black/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon
                                  className={`w-5 h-5 ${
                                    isSelected
                                      ? "text-gold-400"
                                      : option.highlight
                                      ? "text-gold-500"
                                      : "text-gray-400"
                                  }`}
                                />
                                <div>
                                  <p
                                    className={`font-medium ${
                                      isSelected ? "text-gold-400" : "text-white"
                                    }`}
                                  >
                                    {option.label}
                                  </p>
                                  <p className="text-gray-500 text-xs">
                                    {option.description}
                                  </p>
                                </div>
                              </div>
                              {option.highlight && (
                                <span className="inline-block mt-2 text-xs text-gold-400 bg-gold-500/20 px-2 py-0.5 rounded-full">
                                  Perfect match!
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                  {step1Form.formState.errors.budget && (
                    <p className="text-red-400 text-sm mt-2">
                      {step1Form.formState.errors.budget.message}
                    </p>
                  )}
                </div>

                <Button type="submit" variant="luxury" size="lg" className="w-full">
                  Continue to Access Your Dossier
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.form>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={step2Form.handleSubmit(handleStep2Submit)}
              >
                <h2 className="text-xl font-semibold text-white mb-2">
                  Let&apos;s Plan Your Visit
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Help us schedule the perfect viewing experience
                </p>

                {/* Viewing Time */}
                <div className="mb-8">
                  <Label className="text-white mb-4 block">
                    Preferred viewing time? (select all that apply)
                  </Label>
                  <Controller
                    name="viewingTime"
                    control={step2Form.control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-3">
                        {viewingTimeOptions.map((option) => {
                          const Icon = iconMap[option.icon] || Clock;
                          const isSelected = field.value?.includes(option.value);
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                const current = field.value || [];
                                if (isSelected) {
                                  field.onChange(
                                    current.filter((v) => v !== option.value)
                                  );
                                } else {
                                  field.onChange([...current, option.value]);
                                }
                              }}
                              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                                isSelected
                                  ? "border-gold-500 bg-gold-500/10"
                                  : "border-white/10 hover:border-white/20 bg-luxury-black/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon
                                  className={`w-5 h-5 ${
                                    isSelected ? "text-gold-400" : "text-gray-400"
                                  }`}
                                />
                                <span
                                  className={`font-medium ${
                                    isSelected ? "text-gold-400" : "text-white"
                                  }`}
                                >
                                  {option.label}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                  {step2Form.formState.errors.viewingTime && (
                    <p className="text-red-400 text-sm mt-2">
                      {step2Form.formState.errors.viewingTime.message}
                    </p>
                  )}
                </div>

                {/* Attendees */}
                <div className="mb-8">
                  <Label className="text-white mb-4 block">
                    Who will attend the showing?
                  </Label>
                  <Controller
                    name="attendees"
                    control={step2Form.control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-3">
                        {attendeeOptions.map((option) => {
                          const Icon = iconMap[option.icon] || User;
                          const isSelected = field.value === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                                isSelected
                                  ? "border-gold-500 bg-gold-500/10"
                                  : "border-white/10 hover:border-white/20 bg-luxury-black/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon
                                  className={`w-5 h-5 ${
                                    isSelected ? "text-gold-400" : "text-gray-400"
                                  }`}
                                />
                                <span
                                  className={`font-medium ${
                                    isSelected ? "text-gold-400" : "text-white"
                                  }`}
                                >
                                  {option.label}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                  {step2Form.formState.errors.attendees && (
                    <p className="text-red-400 text-sm mt-2">
                      {step2Form.formState.errors.attendees.message}
                    </p>
                  )}
                </div>

                {/* Has Agent */}
                <div className="mb-8">
                  <Label className="text-white mb-4 block">
                    Are you working with an agent?
                  </Label>
                  <Controller
                    name="hasAgent"
                    control={step2Form.control}
                    render={({ field }) => (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {agentOptions.map((option) => {
                          const Icon = iconMap[option.icon] || CheckCircle;
                          const isSelected = field.value === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                                isSelected
                                  ? "border-gold-500 bg-gold-500/10"
                                  : "border-white/10 hover:border-white/20 bg-luxury-black/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon
                                  className={`w-5 h-5 ${
                                    isSelected ? "text-gold-400" : "text-gray-400"
                                  }`}
                                />
                                <span
                                  className={`font-medium text-sm ${
                                    isSelected ? "text-gold-400" : "text-white"
                                  }`}
                                >
                                  {option.label}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                  {step2Form.formState.errors.hasAgent && (
                    <p className="text-red-400 text-sm mt-2">
                      {step2Form.formState.errors.hasAgent.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={goBack}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                  <Button type="submit" variant="luxury" size="lg" className="flex-1">
                    Almost There
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </motion.form>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <motion.form
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={step3Form.handleSubmit(handleStep3Submit)}
              >
                <h2 className="text-xl font-semibold text-white mb-2">
                  Where Should We Send Your Dossier?
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Get instant access to photos, floorplans, disclosures, price
                  analysis, and tour booking
                </p>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white mb-2 block">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      {...step3Form.register("firstName")}
                      error={step3Form.formState.errors.firstName?.message}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white mb-2 block">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Smith"
                      {...step3Form.register("lastName")}
                      error={step3Form.formState.errors.lastName?.message}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <Label htmlFor="email" className="text-white mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...step3Form.register("email")}
                    error={step3Form.formState.errors.email?.message}
                  />
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <Label htmlFor="phone" className="text-white mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(805) 555-0123"
                    {...step3Form.register("phone")}
                    error={step3Form.formState.errors.phone?.message}
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-4 mb-8">
                  <Controller
                    name="interestedInShowing"
                    control={step3Form.control}
                    render={({ field }) => (
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span className="text-gray-300 text-sm leading-tight group-hover:text-white transition-colors">
                          I&apos;m interested in scheduling a private showing this week
                        </span>
                      </label>
                    )}
                  />

                  <Controller
                    name="agreeToTerms"
                    control={step3Form.control}
                    render={({ field }) => (
                      <div>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <span className="text-gray-300 text-sm leading-tight group-hover:text-white transition-colors">
                            I agree to receive communications about this property and
                            similar listings
                          </span>
                        </label>
                        {step3Form.formState.errors.agreeToTerms && (
                          <p className="text-red-400 text-sm mt-2 ml-7">
                            {step3Form.formState.errors.agreeToTerms.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                {submitError && (
                  <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {submitError}
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={goBack}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="luxury"
                    size="lg"
                    className="flex-1"
                    loading={isSubmitting}
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    Unlock My Dossier
                  </Button>
                </div>

                {/* Trust Signal */}
                <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Your information is secure and will never be shared</span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Property Summary Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            {propertyData.priceFormatted} | {propertyData.beds} Bed | {propertyData.baths} Bath |{" "}
            {propertyData.sqft.toLocaleString()} Sq Ft
          </p>
        </motion.div>
      </div>
    </main>
  );
}
