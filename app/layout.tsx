import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErrorBoundaryWrapper from "@/components/ErrorBoundaryWrapper";
import StructuredData from "@/components/StructuredData";

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.findyourlightpsychiatry.org';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Find Your Light Psychiatry PLLC - April Casselman, PMHNP-BC | Seattle Psychiatrist",
    template: "%s | Find Your Light Psychiatry",
  },
  description: "Compassionate, evidence-based mental health care for adults, children, and adolescents throughout Washington State. Led by April Casselman, PMHNP-BC, providing psychiatric medication management, TMS therapy, psychotherapy, ADHD testing, and telehealth services.",
  keywords: [
    "psychiatrist Seattle",
    "mental health Washington State",
    "PMHNP",
    "psychiatric nurse practitioner",
    "TMS therapy",
    "ADHD testing",
    "child psychiatrist",
    "adolescent psychiatry",
    "telehealth psychiatry",
    "medication management",
    "anxiety treatment",
    "depression treatment",
    "April Casselman",
  ],
  authors: [{ name: "April Casselman, PMHNP-BC" }],
  creator: "Find Your Light Psychiatry PLLC",
  publisher: "Find Your Light Psychiatry PLLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Find Your Light Psychiatry PLLC",
    title: "Find Your Light Psychiatry PLLC - Compassionate Mental Health Care",
    description: "Evidence-based psychiatric care for adults, children & adolescents in Washington State. TMS therapy, medication management, psychotherapy & telehealth.",
    images: [
      {
        url: "/images/April-Casselman_Portrait.jpeg",
        width: 800,
        height: 600,
        alt: "April Casselman, PMHNP-BC - Psychiatric Mental Health Nurse Practitioner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Light Psychiatry PLLC - April Casselman, PMHNP-BC",
    description: "Compassionate, evidence-based mental health care in Washington State. TMS therapy, medication management, psychotherapy & telehealth.",
    images: ["/images/April-Casselman_Portrait.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: baseUrl,
  },
  category: 'healthcare',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes.variable} ${playfairDisplay.variable} antialiased min-h-screen flex flex-col`}
      >
        <StructuredData />
        {/* Header with Navigation Bar */}
        <header>
          <Navbar />
        </header>

        {/* Main content area for each page */}
        <main className="flex-grow pt-14 sm:pt-16">
          <ErrorBoundaryWrapper>
            {children}
          </ErrorBoundaryWrapper>
        </main>

        {/* Footer on every page */}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
