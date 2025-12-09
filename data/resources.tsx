import type { ComponentType, SVGProps } from "react";

// Icon Components
export const PhoneIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const BookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// Types
export interface Resource {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
}

// Crisis & Support Hotlines
export const CRISIS_RESOURCES: Resource[] = [
  {
    title: "988 Suicide & Crisis Lifeline",
    description: "Free, confidential support for people in distress, prevention and crisis resources for you or your loved ones.",
    icon: PhoneIcon,
    href: "https://988lifeline.org",
  },
  {
    title: "NAMI Helpline",
    description: "National Alliance on Mental Illness provides information, referrals, and support to people with mental health conditions and their families. Call 1-800-950-NAMI (6264), text 'NAMI' to 62640, or email help@nami.org.",
    icon: PhoneIcon,
    href: "https://www.nami.org/help",
  },
  {
    title: "SAMHSA Treatment Locator",
    description: "Find treatment facilities for substance use and mental health disorders in your area.",
    icon: PhoneIcon,
    href: "https://findtreatment.gov",
  },
];

// Trusted Mental Health Education
export const EDUCATION_RESOURCES: Resource[] = [
  {
    title: "American Psychiatric Association (APA)",
    description: "Trusted resources and information about mental health conditions, treatments, and finding a psychiatrist.",
    icon: BookIcon,
    href: "https://www.psychiatry.org/patients-families",
  },
  {
    title: "National Institute of Mental Health (NIMH)",
    description: "Authoritative information on mental health disorders, research, and treatment options from the leading federal agency.",
    icon: BookIcon,
    href: "https://www.nimh.nih.gov/health",
  },
  {
    title: "Mental Health America",
    description: "Leading community-based nonprofit dedicated to addressing the needs of those living with mental illness and promoting mental health.",
    icon: BookIcon,
    href: "https://www.mhanational.org",
  },
];

// Self-Care & Mindfulness Tools
export const SELFCARE_RESOURCES: Resource[] = [
  {
    title: "Headspace",
    description: "Meditation and mindfulness app with guided sessions to help reduce stress, improve sleep, and enhance overall well-being.",
    icon: HeartIcon,
    href: "https://www.headspace.com",
  },
  {
    title: "Calm App",
    description: "Meditation, sleep stories, and relaxation tools designed to help you manage stress and improve mental wellness.",
    icon: HeartIcon,
    href: "https://www.calm.com",
  },
  {
    title: "Insight Timer",
    description: "Free meditation app with thousands of guided meditations, music tracks, and courses for mindfulness and relaxation.",
    icon: HeartIcon,
    href: "https://insighttimer.com",
  },
];




