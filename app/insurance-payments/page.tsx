import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: "Insurance & Payment Options - Find Your Light Psychiatry",
  description: "We accept most major insurance plans including Aetna, Cigna, Kaiser Permanente, United Healthcare, Medicare, Medicaid, and more. Private pay options also available.",
  alternates: {
    canonical: "/insurance-payments",
  },
  openGraph: {
    title: "Insurance & Payment Options - Find Your Light Psychiatry",
    description: "Review accepted insurance plans, private-pay rates, and billing details for Find Your Light Psychiatry.",
    url: "/insurance-payments",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insurance accepted by Find Your Light Psychiatry",
    description: "See accepted plans, private pay rates, and how to verify your mental health benefits.",
  },
};

interface InsuranceProvider {
  name: string;
}

interface InsurancePaymentsPageProps {
  title?: string;
  heading?: string;
  description?: string;
  insuranceProviders?: InsuranceProvider[];
}

const defaultInsuranceProviders: InsuranceProvider[] = [
  { name: "Aetna" },
  { name: "Cigna" },
  { name: "Optum" },
  { name: "Kaiser Permanente" },
  { name: "United Healthcare" },
  { name: "Medicare" },
  { name: "Medicaid (WA)" },
  { name: "Blue Cross Blue Shield" },
  { name: "Tricare" },
  { name: "Molina" },
  { name: "Amerigroup" },
  { name: "First Choice Health" },
  { name: "Premera and Lifewise" },
  { name: "Regence" },
  { name: "Medicaid" },
];

const defaultDescription = `Now accepting new patients.

Appointments are available in-person in Seattle and Bellevue and via telehealth statewide.

Please complete the contact form below to request an appointment.

A member of our team will reach out promptly with next steps and secure intake paperwork.

Your journey toward healing begins with a single step—let us help you find your light.

We accept most major insurance plans including:`;

export default function InsurancePaymentsPage({
  heading = "Insurance We Accept",
  description = defaultDescription,
  insuranceProviders = defaultInsuranceProviders,
}: InsurancePaymentsPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative w-full h-[40vh] min-h-[300px] max-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src="/images/services-picture.jpeg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            loading="lazy"
            aria-hidden="true"
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Hero Title */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light text-white tracking-tight">
            {heading}
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative bg-gradient-to-b from-gray-50/50 via-white to-white py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Description Paragraph */}
          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 sm:mb-10 md:mb-12 lg:mb-14 max-w-3xl mx-auto space-y-4 sm:space-y-5 mt-4 sm:mt-6 md:mt-8 px-4">
            {description && typeof description === 'string' ? (
              description.split('\n\n').map((paragraph, index) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;
                
                // Check if this is the last paragraph before insurance list
                const isLastBeforeList = trimmed.includes('We accept most major insurance plans including:');
                
                return (
                  <p 
                    key={index} 
                    className={`${isLastBeforeList ? 'text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-light text-gray-800 mb-6 sm:mb-8' : 'text-gray-700 leading-relaxed'}`}
                  >
                    {trimmed}
                  </p>
                );
              })
            ) : null}
          </div>

          {/* Insurance Providers List */}
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-4">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-3xl mx-auto">
              {insuranceProviders && insuranceProviders.length > 0 ? (
                insuranceProviders.map((provider, index) => (
                  <li
                    key={provider.name || index}
                    className="flex items-center gap-2 sm:gap-3 md:gap-4 animate-fade-in-up min-h-[44px]"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                  {/* Checkmark Icon - more subtle design */}
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#059669] rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  {/* Provider Name */}
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed">
                    {provider.name || 'Insurance Provider'}
                  </span>
                </li>
                ))
              ) : (
                <li className="col-span-full text-center text-gray-600">No insurance providers listed.</li>
              )}
            </ul>
          </div>

          {/* Private Pay Notice */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-100 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto px-4">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-light text-gray-800 leading-relaxed text-center">
              Private-pay options are also available.
            </p>
          </div>

          {/* Payment Options Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-100 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto px-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4 sm:mb-6 md:mb-8 tracking-tight">
              Private Pay
            </h3>
            <ul className="space-y-3 sm:space-y-4 md:space-y-5 text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              <li className="flex items-start gap-3 sm:gap-4">
                <span className="text-[#059669] mt-1.5 font-semibold flex-shrink-0">•</span>
                <span><strong className="text-gray-900">Initial Evaluation:</strong> {config.pricing.initialEvaluation}</span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <span className="text-[#059669] mt-1.5 font-semibold flex-shrink-0">•</span>
                <span><strong className="text-gray-900">Follow-Up Visits:</strong> {config.pricing.followUpVisit}</span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <span className="text-[#059669] mt-1.5 font-semibold flex-shrink-0">•</span>
                <span>HSA/FSA accepted | Out-of-network receipts available</span>
              </li>
            </ul>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                <strong className="text-gray-900">Note:</strong> Payment is due at the time of service.
              </p>
              <p>
                <strong className="text-gray-900">Payments:</strong> Secure online or via patient portal. AppleCash accepted.
              </p>
            </div>
          </div>

          {/* Verifying Your Insurance Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-100 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto px-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4 sm:mb-6 md:mb-8 tracking-tight">
              Verifying Your Insurance
            </h3>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Before your visit, please contact your insurance provider to confirm network eligibility and mental-health benefits.
              </p>
              <p>
                For out-of-network patients, we provide superbills for reimbursement upon request.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-10 sm:mt-12 md:mt-16 lg:mt-20 max-w-3xl mx-auto px-4">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-light text-gray-800 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
              Have questions about insurance or payment options?
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-[#059669] text-white rounded-2xl hover:bg-[#047857] transition-all duration-500 ease-out font-semibold text-base sm:text-lg shadow-[0_4px_16px_rgba(5,150,105,0.3)] hover:shadow-[0_8px_24px_rgba(5,150,105,0.4)] transform hover:-translate-y-1.5 min-h-[52px] flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
