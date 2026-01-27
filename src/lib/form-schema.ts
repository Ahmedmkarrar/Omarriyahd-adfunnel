import { z } from "zod";

// Step 1: Interest & Intent
export const step1Schema = z.object({
  buyerType: z.enum(["primary", "vacation", "investment", "browsing"], {
    required_error: "Please select what best describes you",
  }),
  timeline: z.enum(["0-30", "30-90", "3-6", "researching"], {
    required_error: "Please select your buying timeline",
  }),
  budget: z.enum(["under-1m", "1m-1.25m", "1.25m-1.5m", "not-sure"], {
    required_error: "Please select your budget range",
  }),
});

// Step 2: Viewing Preferences
export const step2Schema = z.object({
  viewingTime: z.array(z.string()).min(1, "Please select at least one option"),
  attendees: z.enum(["solo", "spouse", "family", "agent", "virtual"], {
    required_error: "Please select who will attend",
  }),
  hasAgent: z.enum(["yes", "no", "open"], {
    required_error: "Please let us know if you have an agent",
  }),
});

// Step 3: Contact Information
export const step3Schema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Please enter a valid phone number"
    ),
  interestedInShowing: z.boolean().default(true),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to receive communications"),
});

// Combined form schema
export const fullFormSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type FullFormData = z.infer<typeof fullFormSchema>;

// Form options for UI
export const buyerTypeOptions = [
  {
    value: "primary",
    label: "Primary Residence",
    icon: "home",
    description: "Looking for my next home",
  },
  {
    value: "vacation",
    label: "Vacation / Second Home",
    icon: "palm-tree",
    description: "A getaway property",
  },
  {
    value: "investment",
    label: "Investment / Rental",
    icon: "trending-up",
    description: "Income-generating property",
  },
  {
    value: "browsing",
    label: "Just Browsing",
    icon: "eye",
    description: "Exploring options",
  },
];

export const timelineOptions = [
  {
    value: "0-30",
    label: "Ready Now",
    icon: "zap",
    description: "0-30 days",
    highlight: true,
  },
  {
    value: "30-90",
    label: "1-3 Months",
    icon: "calendar",
    description: "30-90 days",
  },
  {
    value: "3-6",
    label: "3-6 Months",
    icon: "calendar-range",
    description: "Taking my time",
  },
  {
    value: "researching",
    label: "Just Researching",
    icon: "search",
    description: "No set timeline",
  },
];

export const budgetOptions = [
  {
    value: "under-1m",
    label: "Under $1M",
    icon: "dollar-sign",
    description: "Budget conscious",
  },
  {
    value: "1m-1.25m",
    label: "$1M - $1.25M",
    icon: "badge-dollar-sign",
    description: "Perfect match!",
    highlight: true,
  },
  {
    value: "1.25m-1.5m",
    label: "$1.25M - $1.5M",
    icon: "gem",
    description: "Flexible budget",
  },
  {
    value: "not-sure",
    label: "Not Sure Yet",
    icon: "help-circle",
    description: "Still determining",
  },
];

export const viewingTimeOptions = [
  { value: "weekday-morning", label: "Weekday Mornings", icon: "sun" },
  { value: "weekday-afternoon", label: "Weekday Afternoons", icon: "sunset" },
  { value: "weekends", label: "Weekends", icon: "calendar-check" },
  { value: "call-to-schedule", label: "I'll Call to Schedule", icon: "phone" },
  { value: "flexible", label: "Flexible / Any Time", icon: "clock" },
];

export const attendeeOptions = [
  { value: "solo", label: "Just Me", icon: "user" },
  { value: "spouse", label: "Me + Spouse/Partner", icon: "users" },
  { value: "family", label: "Family", icon: "users-2" },
  { value: "agent", label: "Me + My Agent", icon: "briefcase" },
  { value: "virtual", label: "Virtual Tour First", icon: "video" },
];

export const agentOptions = [
  { value: "yes", label: "Yes, I Have an Agent", icon: "check-circle" },
  { value: "no", label: "No, Looking for Representation", icon: "search" },
  { value: "open", label: "Not Yet, But Open", icon: "plus-circle" },
];
