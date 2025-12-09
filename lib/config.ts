/**
 * Application configuration
 * Centralized configuration with environment variable support
 */

const FALLBACK_PHONE = "(206) 483-7285";
const FALLBACK_PHONE_LINK = "tel:+12064837285";
const FALLBACK_EMAIL = "contact@findyourlightpsychiatry.org";

export const config = {
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || FALLBACK_PHONE,
  phoneLink: process.env.NEXT_PUBLIC_PHONE_LINK || FALLBACK_PHONE_LINK,
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    process.env.CONTACT_EMAIL ||
    FALLBACK_EMAIL,
  location: process.env.NEXT_PUBLIC_LOCATION || "Seattle, Washington",
  businessName: "Find Your Light Psychiatry PLLC",
  businessType: "Psychiatric Practice",
  // Pricing (can be moved to environment variables if needed)
  pricing: {
    initialEvaluation: process.env.NEXT_PUBLIC_PRICE_INITIAL || "$325",
    followUpVisit: process.env.NEXT_PUBLIC_PRICE_FOLLOWUP || "$175",
  },
  // Copyright year (auto-updated)
  copyrightYear: new Date().getFullYear(),
} as const;

