import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Psychiatric Services - TMS, Medication Management, ADHD Testing",
  description: "Comprehensive psychiatric services: TMS therapy, medication management, Qb ADHD testing, psychotherapy, child & adolescent care, and telehealth throughout Washington State.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Psychiatric Services - Find Your Light Psychiatry",
    description: "TMS therapy, medication management, ADHD testing, psychotherapy, child & adolescent psychiatry, and telehealth services in Washington State.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="relative w-full">
        
        {/* Top Section - Opening Message */}
        <div className="relative z-20 bg-white pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-light italic">
              Every story is unique. Together, we&apos;ll find the right path toward healing and stability.
            </p>
          </div>
        </div>

        {/* Background Image Section with Services Overlay */}
        <div className="relative w-full min-h-[1400px] md:min-h-[1600px] lg:min-h-[1800px]">
          {/* Background Image Container */}
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/images/service-background.jpeg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              loading="lazy"
              style={{ objectPosition: 'center center' }}
              aria-hidden="true"
            />
            
            {/* Minimal overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/45 to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white via-white/60 to-transparent"></div>
          </div>

          {/* Services Content Overlay */}
          <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-20">
            
            {/* SPRAVATO Treatment */}
            <Link
              href="/spravato"
              className="block mb-4 sm:mb-5 md:mb-6 bg-white/88 backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/80 hover:bg-white/95 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out cursor-pointer group transform hover:-translate-y-0.5"
            >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 font-semibold mb-3 sm:mb-4 group-hover:text-[#059669] transition-colors duration-300">
                  SPRAVATO® (esketamine) Treatment
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                  FDA-approved nasal spray therapy for adults with
                  treatment-resistant depression, administered entirely in clinic
                  with continuous monitoring, calming recovery suites, and full
                  insurance coordination.
                </p>
              </Link>
              
              {/* Medication Management */}
              <Link
                href="/contact"
                className="block mb-4 sm:mb-5 md:mb-6 bg-white/88 backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/80 hover:bg-white/95 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out cursor-pointer group transform hover:-translate-y-0.5 min-h-[120px] flex flex-col justify-center"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 font-semibold mb-3 sm:mb-4 group-hover:text-[#059669] transition-colors duration-300">
                  Medication Management
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                  Evidence-based prescribing tailored to each patient&apos;s unique needs. We monitor progress closely, ensuring effectiveness, safety, and comfort.
                </p>
              </Link>

              {/* Therapy & Supportive Counseling */}
              <Link
                href="/contact"
                className="block mb-4 sm:mb-5 md:mb-6 bg-white/88 backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/80 hover:bg-white/95 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out cursor-pointer group transform hover:-translate-y-0.5"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 font-semibold mb-3 sm:mb-4 group-hover:text-[#059669] transition-colors duration-300">
                  Therapy & Supportive Counseling
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                  We integrate supportive, solution-focused, and trauma-informed approaches to help patients build coping skills and emotional awareness.
                </p>
              </Link>

              {/* TMS Therapy */}
              <Link
                href="/contact"
                className="block mb-4 sm:mb-5 md:mb-6 bg-white/88 backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/80 hover:bg-white/95 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out cursor-pointer group transform hover:-translate-y-0.5"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 font-semibold mb-3 sm:mb-4 group-hover:text-[#059669] transition-colors duration-300">
                  TMS Therapy (Transcranial Magnetic Stimulation)
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed mb-3 sm:mb-4">
                  TMS is an FDA-approved, non-invasive treatment for depression that uses gentle magnetic pulses to activate underactive brain regions involved in mood regulation.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed mb-3 sm:mb-4">
                  Ideal for individuals who have not achieved full relief from antidepressant medications, TMS offers a safe, medication-free option with lasting results.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                  We partner with trusted regional TMS centers to make this treatment accessible to our patients.
                </p>
              </Link>

              {/* Qb Testing for ADHD */}
              <Link
                href="/contact"
                className="block mb-4 sm:mb-5 md:mb-6 bg-white/88 backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/80 hover:bg-white/95 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out cursor-pointer group transform hover:-translate-y-0.5"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 font-semibold mb-3 sm:mb-4 group-hover:text-[#059669] transition-colors duration-300">
                  Qb Testing for ADHD
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed mb-3 sm:mb-4">
                  Qb Testing is an advanced, computer-based assessment tool that objectively measures attention, impulsivity, and activity level in children, adolescents, and adults.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                  Combined with a full clinical evaluation, Qb results help confirm or rule out ADHD with accuracy—reducing uncertainty and supporting effective treatment planning.
                </p>
              </Link>

              {/* Children & Adolescent Psychiatry */}
              <Link
                href="/contact"
                className="block mb-4 sm:mb-5 md:mb-6 bg-white/88 backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/80 hover:bg-white/95 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out cursor-pointer group transform hover:-translate-y-0.5"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 font-semibold mb-3 sm:mb-4 group-hover:text-[#059669] transition-colors duration-300">
                  Children & Adolescent Psychiatry
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                  We provide age-appropriate evaluations and care for children and teens experiencing anxiety, ADHD, depression, trauma, or behavioral challenges—helping families strengthen connection and communication.
                </p>
              </Link>

              {/* Adult & Geriatric Psychiatry */}
              <Link
                href="/contact"
                className="block mb-4 sm:mb-5 md:mb-6 bg-white/88 backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/80 hover:bg-white/95 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out cursor-pointer group transform hover:-translate-y-0.5"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 font-semibold mb-3 sm:mb-4 group-hover:text-[#059669] transition-colors duration-300">
                  Adult & Geriatric Psychiatry
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                  Depression, anxiety, bipolar disorder, ADHD, PTSD, trauma recovery, insomnia, adjustment and relationship issues, mood, cognitive, neurocognitive changes, emotional healing during life transitions such as divorce, grief, and career change.
                </p>
              </Link>

              {/* Cognitive Behavioral Therapy (CBT) */}
              <Link
                href="/contact"
                className="block mb-4 sm:mb-5 md:mb-6 bg-white/88 backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/80 hover:bg-white/95 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out cursor-pointer group transform hover:-translate-y-0.5"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 font-semibold mb-3 sm:mb-4 group-hover:text-[#059669] transition-colors duration-300">
                  Cognitive Behavioral Therapy (CBT)
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed mb-3 sm:mb-4">
                  CBT is a goal-oriented therapy that helps you identify and change unhelpful thought patterns influencing mood and behavior.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                  It focuses on developing healthier coping skills, improving perspective, and empowering long-term resilience.
                </p>
              </Link>

              {/* Trauma-Focused Cognitive Behavioral Therapy (TF-CBT) */}
              <Link
                href="/contact"
                className="block mb-4 sm:mb-5 md:mb-6 bg-white/88 backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/80 hover:bg-white/95 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out cursor-pointer group transform hover:-translate-y-0.5"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 font-semibold mb-3 sm:mb-4 group-hover:text-[#059669] transition-colors duration-300">
                  Trauma-Focused Cognitive Behavioral Therapy (TF-CBT)
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                  TF-CBT is a structured, short-term approach for individuals recovering from trauma. It blends education, relaxation skills, cognitive processing, and gradual exposure techniques to promote healing and reduce trauma symptoms.
                </p>
              </Link>

              {/* Therapeutic Support & Referrals */}
              <Link
                href="/contact"
                className="block mb-4 sm:mb-5 md:mb-6 bg-white/88 backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/80 hover:bg-white/95 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out cursor-pointer group transform hover:-translate-y-0.5"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 font-semibold mb-3 sm:mb-4 group-hover:text-[#059669] transition-colors duration-300">
                  Therapeutic Support & Referrals
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                  Integrated care with referrals for psychotherapy, support groups, and lifestyle interventions to enhance overall well-being.
                </p>
              </Link>

              {/* Telepsychiatry */}
              <Link
                href="/contact"
                className="block mb-4 sm:mb-5 md:mb-6 bg-white/88 backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/80 hover:bg-white/95 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out cursor-pointer group transform hover:-translate-y-0.5"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 font-semibold mb-3 sm:mb-4 group-hover:text-[#059669] transition-colors duration-300">
                  Telepsychiatry
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                  HIPAA-compliant virtual sessions for residents of Washington, offering convenience and continuity of care.
                </p>
              </Link>

          </div>
        </div>

        {/* Conditions Treated Section - Below Image */}
        <div className="relative z-30 bg-white pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Conditions Treated Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-gray-900 font-light mb-3 sm:mb-4 tracking-wide flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">🌿</span>
                <span className="text-center">CONDITIONS TREATED</span>
              </h2>
            </div>

            {/* Conditions List */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-8 sm:mb-10 md:mb-12 px-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">Depression & Mood Disorders</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">Anxiety & Panic Disorders</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">Bipolar Spectrum Disorders</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">PTSD & Trauma-Related Disorders</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">ADHD (Child, Adolescent, Adult)</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">OCD & Obsessive Thought Patterns</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">Schizoaffective & Psychotic Disorders</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">Personality Disorders</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">Eating Disorders</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">Insomnia & Sleep Disorders</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">Adjustment & Stress Disorders</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">Women&apos;s Mental Health / Perinatal Support</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">Divorce, Grief, & Life Transitions</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-emerald-600 font-bold text-base sm:text-lg mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">Stress-Related Conditions</span>
              </div>
            </div>

            {/* Closing Message */}
            <div className="text-center pt-8 sm:pt-10 md:pt-12 border-t border-gray-200/60 mt-6 sm:mt-8 md:mt-10 px-4">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-gray-800 leading-relaxed font-light italic max-w-4xl mx-auto">
                Every story is unique. Together, we&apos;ll find the right path toward healing and stability.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
