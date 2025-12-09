import Hero from "@/components/Hero";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compassionate Mental Health Care in Seattle & Washington State",
  description: "Find Your Light Psychiatry offers evidence-based psychiatric care for adults, children & adolescents. Led by April Casselman, PMHNP-BC. Services include TMS therapy, medication management, ADHD testing & telehealth.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Find Your Light Psychiatry PLLC - Compassionate Mental Health Care",
    description: "Evidence-based psychiatric care in Seattle & Washington State. TMS therapy, medication management, ADHD testing, child & adolescent psychiatry, and telehealth services.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero section with title, tagline, and image */}
      <Hero 
        title="Find Your Light Psychiatry PLLC"
        subtitle="Compassionate, Evidence-Based Care for Mind, Body, and Soul."
        text={`At Find Your Light Psychiatry, healing begins with understanding.

Led by April Casselman, PMHNP-BC, our practice provides personalized, evidence-based mental health care for adults, children, and adolescents throughout Washington State.

Our mission is to help you restore balance, peace, and purpose through compassionate connection, research-driven treatment, and a holistic approach to mental wellness.`}
        imageSrc="/images/April-Casselman_Portrait.jpeg"
        imageAlt="April Casselman, PMHNP-BC, Psychiatric Mental Health Nurse Practitioner"
        backgroundImage="/images/home-page-background.jpeg"
      />

      {/* About Philosophy Section - Smooth transition */}
      <section className="py-20 sm:py-24 md:py-28 lg:py-32 bg-gradient-to-b from-gray-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-gray-900 font-light leading-relaxed mb-4 sm:mb-6">
              At Find Your Light Psychiatry, we believe that healing happens when science meets empathy.
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif text-gray-800 font-light leading-relaxed">
              We specialize in modern, evidence-based mental-health care rooted in compassion, integrity, and collaboration.
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-gradient-to-r from-[#059669] to-[#10b981] text-white rounded-full hover:from-[#047857] hover:to-[#059669] transition-all duration-500 ease-out font-serif font-semibold text-base sm:text-lg shadow-[0_4px_20px_rgba(5,150,105,0.35)] hover:shadow-[0_8px_30px_rgba(5,150,105,0.5)] transform hover:-translate-y-1.5"
              >
                <span>Meet April</span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Four Pillars Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <Link href="/contact" className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out border border-gray-100 hover:border-emerald-200/60 transform hover:-translate-y-2 cursor-pointer block min-h-[180px] sm:min-h-[200px] flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-3 sm:mb-4 text-gray-900">Compassion</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Every patient deserves to be seen, heard, and understood.
              </p>
            </Link>
            <Link href="/contact" className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out border border-gray-100 hover:border-emerald-200/60 transform hover:-translate-y-2 cursor-pointer block min-h-[180px] sm:min-h-[200px] flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-3 sm:mb-4 text-gray-900">Evidence</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                All treatment plans are guided by the latest psychiatric research.
              </p>
            </Link>
            <Link href="/contact" className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out border border-gray-100 hover:border-emerald-200/60 transform hover:-translate-y-2 cursor-pointer block min-h-[180px] sm:min-h-[200px] flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-3 sm:mb-4 text-gray-900">Collaboration</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Healing thrives when patients and providers work together.
              </p>
            </Link>
            <Link href="/contact" className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out border border-gray-100 hover:border-emerald-200/60 transform hover:-translate-y-2 cursor-pointer block min-h-[180px] sm:min-h-[200px] flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-3 sm:mb-4 text-gray-900">Growth</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Growth is always possible—no matter where your journey begins.
              </p>
            </Link>
          </div>

          {/* Closing Statement */}
          <div className="max-w-3xl mx-auto text-center px-4">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif text-gray-900 font-light leading-relaxed">
              Our goal is to help each person move beyond surviving and begin thriving, with care that honors the connection between mind, body, and soul.
            </p>
          </div>

          {/* Contact Button */}
          <div className="text-center mt-12 sm:mt-16 md:mt-20">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-gradient-to-r from-[#059669] to-[#10b981] text-white rounded-full hover:from-[#047857] hover:to-[#059669] transition-all duration-500 ease-out font-serif font-semibold text-base sm:text-lg md:text-xl shadow-[0_4px_20px_rgba(5,150,105,0.35)] hover:shadow-[0_8px_30px_rgba(5,150,105,0.5)] transform hover:-translate-y-2 hover:scale-105"
            >
              <span>Schedule Your Consultation</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services highlight section - Smooth transition */}
      <section className="py-20 sm:py-24 md:py-28 lg:py-32 bg-gradient-to-b from-white via-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-gray-900 font-light tracking-wide px-4">
            Our Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {[
              {
                href: "/spravato",
                icon: "🌿",
                title: "SPRAVATO® Treatment",
                description:
                  "In-clinic esketamine therapy for adults with treatment-resistant depression.",
              },
              {
                href: "/services",
                icon: "🧠",
                title: "Medication Management",
                description:
                  "Comprehensive psychiatric medication evaluation and ongoing management.",
              },
              {
                href: "/services",
                icon: "🌱",
                title: "TMS Therapy",
                description:
                  "Transcranial Magnetic Stimulation for treatment-resistant depression.",
              },
              {
                href: "/services",
                icon: "💬",
                title: "Psychotherapy",
                description:
                  "Individual and group therapy using evidence-based approaches.",
              },
              {
                href: "/services",
                icon: "🎯",
                title: "Qb Testing for ADHD",
                description:
                  "Comprehensive ADHD assessment using QbTest technology.",
              },
              {
                href: "/services",
                icon: "👧",
                title: "Child & Adolescent Care",
                description:
                  "Specialized mental health services for children and adolescents.",
              },
              {
                href: "/services",
                icon: "💻",
                title: "Telehealth",
                description:
                  "Convenient telehealth appointments across Washington State.",
              },
              {
                href: "/services",
                icon: "✨",
                title: "Adult & Geriatric Psychiatry",
                description:
                  "Holistic care for adults navigating mood, anxiety, and life transitions.",
              },
            ].map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group text-center p-6 sm:p-8 md:p-10 bg-gradient-to-br from-white via-gray-50/50 to-emerald-50/20 rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out border border-white/60 hover:border-emerald-200/60 transform hover:-translate-y-2 backdrop-blur-sm cursor-pointer block min-h-[220px] sm:min-h-[240px] flex flex-col justify-center"
              >
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform transition-transform duration-500 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-semibold mb-3 sm:mb-4 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
            </Link>
            ))}
          </div>
          <div className="text-center mt-12 sm:mt-16 md:mt-20 lg:mt-24">
            <Link
              href="/services"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-[#059669] text-white rounded-2xl hover:bg-[#047857] transition-all duration-500 ease-out font-serif font-semibold text-base sm:text-lg shadow-[0_4px_16px_rgba(5,150,105,0.3)] hover:shadow-[0_8px_24px_rgba(5,150,105,0.4)] transform hover:-translate-y-1.5 min-h-[52px] flex items-center justify-center"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
