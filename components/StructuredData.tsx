"use client";

import Script from "next/script";
import { config } from "@/lib/config";
import { logger } from "@/lib/logger";

export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.findyourlightpsychiatry.org";
  const plainPhone = config.phoneLink?.replace(/^tel:/, "") || "+12064837285";
  const normalizedPhone = plainPhone.startsWith("+") ? plainPhone : `+1${plainPhone.replace(/[^\d]/g, "")}`;
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${baseUrl}#organization`,
    name: config.businessName,
    description: "Compassionate, evidence-based mental health care for adults, children, and adolescents throughout Washington State.",
    url: baseUrl,
    logo: `${baseUrl}/images/April-Casselman_Portrait.jpeg`,
    telephone: config.phone,
    email: config.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: config.location,
      addressRegion: "WA",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "State",
      name: "Washington",
    },
    medicalSpecialty: [
      "Psychiatry",
      "Mental Health",
      "Psychiatric Medication Management",
      "TMS Therapy",
      "Psychotherapy",
    ],
    sameAs: [
      "https://www.facebook.com/findyourlightpsychiatry",
      "https://www.linkedin.com/company/findyourlightpsychiatry",
      "https://www.instagram.com/findyourlightpsychiatry",
      "https://www.tiktok.com/@findyourlightpsychiatry",
      "https://www.youtube.com/@findyourlightpsychiatry",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: normalizedPhone,
        email: config.email,
        areaServed: "US-WA",
        availableLanguage: ["en"],
      },
    ],
    priceRange: "$$",
  };

  const healthcareProviderSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "April Casselman",
    jobTitle: "Psychiatric Mental Health Nurse Practitioner",
    credential: "PMHNP-BC",
    url: `${baseUrl}/about`,
    image: `${baseUrl}/images/April-Casselman_Portrait.jpeg`,
    worksFor: {
      "@id": `${baseUrl}#organization`,
    },
    medicalSpecialty: [
      "Psychiatry",
      "Mental Health",
      "Child and Adolescent Psychiatry",
      "Adult Psychiatry",
    ],
  };

  // Safely stringify JSON schemas - these are static data, not user input
  const organizationJson = JSON.stringify(organizationSchema);
  const healthcareProviderJson = JSON.stringify(healthcareProviderSchema);

  // Additional safety: validate that JSON stringification succeeded
  if (!organizationJson || !healthcareProviderJson) {
    logger.error('Failed to stringify structured data schemas');
    return null;
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organizationJson }}
      />
      <Script
        id="healthcare-provider-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: healthcareProviderJson }}
      />
    </>
  );
}

