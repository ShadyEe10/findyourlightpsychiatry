import Image from "next/image";
import type { Metadata } from "next";
import { config } from "@/lib/config";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Schedule an Appointment - Contact Find Your Light Psychiatry",
  description: "Request a psychiatric appointment with Find Your Light Psychiatry in Seattle, WA. In-person and telehealth appointments available throughout Washington State. Contact us today.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Find Your Light Psychiatry - Schedule an Appointment",
    description: "Request an appointment for psychiatric care. Serving Seattle and all of Washington State with in-person and telehealth options.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="relative w-full">
        {/* Top Section with Title - White background */}
        <div className="relative z-30 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-12">
            {/* Header Section - Centered, matching home page style */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-script text-[#D4AF37] mb-6 sm:mb-8 leading-[0.95] tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3),_0_0_8px_rgba(255,255,255,0.5)]">
                Contact Find Your Light Psychiatry
              </h1>
            </div>
          </div>
        </div>

        {/* Background Image Section - Starts above form, behind form and location info */}
        <div className="relative w-full -mt-12 sm:-mt-16 md:-mt-20" style={{ paddingBottom: '144px' }}>
          {/* Background Image Container - Larger container to show more of image, extended 6 inches at bottom */}
          <div className="absolute left-0 right-0 z-0" style={{ top: '-15vh', height: 'calc(140vh + 144px)' }} aria-hidden="true">
            <Image
              src="/images/contact-page-background.jpeg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              loading="lazy"
              style={{ objectPosition: 'center 40%' }}
              aria-hidden="true"
            />
            {/* Top fade overlay - strong white fade from top */}
            <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white from-20% via-white/80 via-50% to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/45 to-transparent"></div>
          </div>

          {/* Content Section - Form and Location Info on top of background */}
          <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 pb-36">
            {/* Contact Form Section - On background image */}
            <div className="max-w-3xl mx-auto mb-16 sm:mb-20 md:mb-24">
              <ContactForm />
            </div>

            {/* Location and Services Info - Below form, on background */}
            <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10 mb-16 sm:mb-20 md:mb-24">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-white/70">
                <div className="space-y-6 sm:space-y-8">
                  <p className="text-lg sm:text-xl md:text-2xl font-serif font-light text-gray-800 leading-relaxed">
                    {config.businessName}&apos;s primary clinical office is located in <span className="text-gray-900 font-normal">{config.location}</span>.
                  </p>
                  
                  <p className="text-base sm:text-lg md:text-xl font-serif font-light text-gray-700 leading-relaxed">
                    We offer services in psychiatric medication management, TMS therapy, psychotherapy, Qb testing for ADHD, child and adolescent care, and telehealth appointments throughout Washington State.
                  </p>
                </div>
                
                <div className="pt-6 sm:pt-8 border-t border-gray-200/50 space-y-6 mt-6 sm:mt-8">
                  <p className="text-base sm:text-lg md:text-xl font-serif font-light text-gray-700 leading-relaxed">
                    For professional inquiries and appointment requests, please use the contact form above or call <a href={config.phoneLink} className="text-[#059669] hover:text-[#047857] font-normal transition-colors duration-300 underline underline-offset-2">{config.phone}</a>.
                  </p>
                  
                  <p className="text-sm sm:text-base font-serif font-light text-gray-600 leading-relaxed italic">
                    Please note that emails sent through this site are not confidential. For sensitive information, please call our office directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Follow Along Section - On background */}
            <div className="max-w-3xl mx-auto pb-12 sm:pb-16 md:pb-20">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-white/70 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 font-light mb-6 tracking-wide">
                  Follow Along
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-serif font-light">
                  Stay connected with Find Your Light Psychiatry for mental health tips, updates, and resources.
                </p>
                <div className="flex justify-center items-center space-x-6">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/findyourlightpsychiatry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#059669] transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/findyourlightpsychiatry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#059669] transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/findyourlightpsychiatry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#059669] transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
