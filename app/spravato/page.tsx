import type { Metadata } from "next";
import Script from "next/script";
import SpravatoPage from "@/components/spravato/SpravatoPage";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.findyourlightpsychiatry.org";

const spravatoStructuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "SPRAVATO® (esketamine) Treatment",
  description:
    "FDA-approved SPRAVATO® (esketamine) nasal spray therapy for adults with treatment-resistant depression, delivered in monitored in-clinic sessions at Find Your Light Psychiatry.",
  url: `${baseUrl}/spravato`,
  therapyType: "medication",
  areaServed: {
    "@type": "State",
    name: "Washington",
  },
  provider: {
    "@type": "MedicalBusiness",
    name: "Find Your Light Psychiatry",
    url: baseUrl,
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "14535 Bel-Red Road, Suite 200",
        addressLocality: "Bellevue",
        addressRegion: "WA",
        postalCode: "98007",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "200 First Ave West, #400",
        addressLocality: "Seattle",
        addressRegion: "WA",
        postalCode: "98119",
        addressCountry: "US",
      },
    ],
    telephone: "+1-425-780-7460",
  },
  indication: [
    {
      "@type": "MedicalIndication",
      name: "Treatment-Resistant Depression",
    },
    {
      "@type": "MedicalIndication",
      name: "Major Depressive Disorder with acute suicidal ideation or behavior",
    },
  ],
};

export const metadata: Metadata = {
  title: "SPRAVATO® (esketamine) Treatment — Find Your Light Psychiatry",
  description:
    "FDA-approved SPRAVATO® (esketamine) nasal spray for treatment-resistant depression with in-clinic monitoring, insurance support, and expert psychiatric care in Bellevue and Seattle.",
  alternates: {
    canonical: "/spravato",
  },
  openGraph: {
    title: "SPRAVATO® (esketamine) Treatment — Find Your Light Psychiatry",
    description:
      "Breakthrough SPRAVATO® therapy for adults with treatment-resistant depression. Private in-clinic sessions, dedicated monitoring, and insurance support in Bellevue & Seattle.",
    url: "/spravato",
    images: [
      {
        url: "/images/services-picture.jpeg",
        width: 1200,
        height: 630,
        alt: "SPRAVATO treatment at Find Your Light Psychiatry",
      },
    ],
  },
};

export default function SpravatoRoutePage() {
  return (
    <>
      <Script
        id="spravato-therapy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(spravatoStructuredData),
        }}
      />
      <SpravatoPage />
    </>
  );
}

