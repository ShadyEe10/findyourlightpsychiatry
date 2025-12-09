import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About April Casselman, PMHNP-BC - Psychiatric Nurse Practitioner",
  description: "Meet April Casselman, PMHNP-BC, founder of Find Your Light Psychiatry. Board-certified psychiatric mental health nurse practitioner providing compassionate care for adults, children & adolescents in Washington State.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About April Casselman, PMHNP-BC - Find Your Light Psychiatry",
    description: "Board-certified psychiatric nurse practitioner providing evidence-based mental health care throughout Washington State.",
    url: "/about",
    type: "profile",
    images: [
      {
        url: "/images/April-Casselman_Portrait.jpeg",
        width: 800,
        height: 600,
        alt: "April Casselman, PMHNP-BC",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="relative w-full">
        {/* Top Section with Title and Portrait - White background */}
        <div className="relative z-20 bg-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-4">
          {/* Header Section - Centered like hero, matching style */}
          <div className="mb-8 md:mb-10 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-script text-[#D4AF37] mb-6 sm:mb-8 leading-[0.95] tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3),_0_0_8px_rgba(255,255,255,0.5)]">
              About April Casselman
            </h1>
          </div>

          {/* Photo Section - Centered, no credit, no download */}
          <div className="mb-0 text-center">
            <Link
              href="/contact"
              aria-label="Schedule a consultation with Find Your Light Psychiatry"
              className="inline-block focus-visible:outline focus-visible:outline-[#059669]/70 rounded-2xl"
            >
              <div 
                className="relative mx-auto rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-transform duration-500 hover:scale-[1.02]"
                style={{ width: '320px', height: '427px' }}
              >
                <Image
                  src="/images/April-Casselman_Portrait.jpeg"
                  alt="April Casselman, PMHNP-BC, Psychiatric Mental Health Nurse Practitioner"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="320px"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Background Image Section - Starts below the portrait with smooth transition */}
        <div className="relative w-full">
          {/* Background Image Container with reduced white overlay for clearer image */}
          <div className="absolute inset-0 z-0 min-h-[calc(100vh-400px)]" aria-hidden="true">
            <Image
              src="/images/about-page-background.jpeg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              loading="lazy"
              style={{ objectPosition: 'center center' }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/10 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15"></div>
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/45 to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/50 to-transparent"></div>
          </div>

          {/* Content Container - Biography and below with smooth spacing */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 sm:pb-12 md:pb-16">
            {/* Biography Section - No blur */}
            <Link
              href="/contact"
              className="block mb-8 md:mb-10 bg-white/85 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-white/70 hover:bg-white/95 hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)] transition-all duration-500 focus-visible:outline focus-visible:outline-[#059669]/60"
              aria-label="Contact Find Your Light Psychiatry"
            >
              <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 font-normal mb-4">
                Biography
              </h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">April Casselman, PMHNP-BC</h3>
                  <p className="text-base sm:text-lg text-gray-700 font-medium">Board-Certified Psychiatric-Mental Health Nurse Practitioner</p>
                </div>
                <p>
                  April Casselman is a compassionate and detail-oriented psychiatric nurse practitioner dedicated to helping individuals achieve emotional balance and lasting wellness. With over two decades of healthcare experience, she brings a deep understanding of both the medical and psychological aspects of mental health.
                </p>
                <p>
                  April provides evidence-based, individualized treatment for a wide range of psychiatric conditions including depression, anxiety disorders, mood disorders, bipolar disorder, trauma and PTSD, obsessive-compulsive disorder (OCD), ADHD, personality disorders, insomnia, psychotic and schizoaffective disorders, eating disorders, and adjustment-related stress conditions. She also supports patients navigating dual diagnoses and co-occurring medical or substance-related challenges.
                </p>
                <p>
                  Her treatment philosophy integrates medication management, supportive therapy, and lifestyle interventions such as mindfulness and stress-reduction strategies. April believes recovery begins with trust, understanding, and collaboration—helping each patient build insight, resilience, and confidence throughout the healing process.
                </p>
                <p>
                  She provides care for children, adolescents, and adults through telehealth and in-person appointments in Seattle, Washington.
                </p>
                <p>
                  Outside of practice, April enjoys exploring the Pacific Northwest, spending time with family, and finding inspiration in nature—a reflection of her belief that healing and growth are always possible.
                </p>
              </div>
            </Link>

            {/* Education Section - No blur */}
            <div className="mb-8 md:mb-10 bg-white/85 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-white/70 hover:bg-white/90 transition-all duration-500">
              <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 font-normal mb-4">
                Education
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-gray-800 leading-relaxed list-disc list-inside ml-2 sm:ml-4">
                <li>Master of Science in Nursing, Psychiatric-Mental Health Nurse Practitioner Program</li>
                <li>Bachelor of Science in Nursing</li>
                <li>Board Certified by the American Nurses Credentialing Center (ANCC) as a Psychiatric-Mental Health Nurse Practitioner (PMHNP-BC)</li>
              </ul>
            </div>

            {/* Certifications Section - No blur */}
            <div className="mb-8 md:mb-10 bg-white/85 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-white/70 hover:bg-white/90 transition-all duration-500">
              <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 font-normal mb-4">
                Certifications
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-gray-800 leading-relaxed list-disc list-inside ml-2 sm:ml-4">
                <li>American Nurses Credentialing Center (ANCC), Board Certified Psychiatric-Mental Health Nurse Practitioner (PMHNP-BC)</li>
                <li>Licensed Advanced Registered Nurse Practitioner, Washington State</li>
                <li>QbTest Certified Provider for ADHD Assessment</li>
              </ul>
            </div>

            {/* Request an Appointment - Centered, no blur */}
            <div className="mb-8 md:mb-10 bg-white/85 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-white/70 hover:bg-white/90 transition-all duration-500">
              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-[#059669] text-white rounded-2xl hover:bg-[#047857] transition-all duration-500 ease-out font-semibold text-base sm:text-lg shadow-[0_4px_16px_rgba(5,150,105,0.3)] hover:shadow-[0_8px_24px_rgba(5,150,105,0.4)] transform hover:-translate-y-1 min-h-[52px] flex items-center justify-center"
                >
                  Request an Appointment
                </Link>
              </div>
            </div>

            {/* Follow Along Section - No blur */}
            <div className="text-center mt-10 md:mt-12 bg-white/85 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-white/70 hover:bg-white/90 transition-all duration-500">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 font-normal mb-4">
                Follow Along.
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
                Receive tips, the latest updates & bonus content from Find Your Light Psychiatry
              </p>
              <div className="flex justify-center items-center space-x-4">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/findyourlightpsychiatry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#059669] transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/findyourlightpsychiatry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#059669] transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/findyourlightpsychiatry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#059669] transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
