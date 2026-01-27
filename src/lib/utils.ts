import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
}

export interface LeadScore {
  total: number;
  category: "hot" | "warm" | "cold";
  breakdown: {
    timeline: number;
    buyerType: number;
    budget: number;
    showingInterest: number;
  };
}

export function calculateLeadScore(formData: {
  buyerType: string;
  timeline: string;
  budget: string;
  interestedInShowing: boolean;
}): LeadScore {
  const breakdown = {
    timeline: 0,
    buyerType: 0,
    budget: 0,
    showingInterest: 0,
  };

  // Timeline scoring
  switch (formData.timeline) {
    case "0-30":
      breakdown.timeline = 5;
      break;
    case "30-90":
      breakdown.timeline = 3;
      break;
    case "3-6":
      breakdown.timeline = 1;
      break;
    default:
      breakdown.timeline = 0;
  }

  // Buyer type scoring
  switch (formData.buyerType) {
    case "primary":
    case "vacation":
      breakdown.buyerType = 3;
      break;
    case "investment":
      breakdown.buyerType = 2;
      break;
    default:
      breakdown.buyerType = 0;
  }

  // Budget scoring
  switch (formData.budget) {
    case "1m-1.25m":
    case "1.25m-1.5m":
      breakdown.budget = 5;
      break;
    case "under-1m":
      breakdown.budget = 2;
      break;
    default:
      breakdown.budget = 0;
  }

  // Showing interest
  breakdown.showingInterest = formData.interestedInShowing ? 5 : 0;

  const total =
    breakdown.timeline +
    breakdown.buyerType +
    breakdown.budget +
    breakdown.showingInterest;

  let category: "hot" | "warm" | "cold";
  if (total >= 12) {
    category = "hot";
  } else if (total >= 6) {
    category = "warm";
  } else {
    category = "cold";
  }

  return { total, category, breakdown };
}
