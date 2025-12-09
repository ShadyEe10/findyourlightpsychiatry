import Image from "next/image";
import Link from "next/link";

/**
 * Hero section for the SPRAVATO® page with the main headline and CTA.
 */
export default function SpravatoHero() {
  return (
    <header className="relative overflow-hidden bg-white">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
      </div>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:justify-between lg:gap-16 lg:px-8 lg:py-24">
        <div className="w-full max-w-2xl text-center lg:text-left">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-700/80">
            SPRAVATO® Care
          </p>
          <h1 className="mt-4 font-script text-4xl text-[#D4AF37] sm:text-5xl md:text-6xl">
            SPRAVATO® (Esketamine) Treatment at Find Your Light Psychiatry
          </h1>
          <p className="mt-6 text-base text-gray-800 sm:text-lg md:text-xl">
            A breakthrough option for adults with treatment-resistant
            depression—delivered in a calm, private space with continuous
            monitoring, compassionate support, and full insurance coordination.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/contact?service=spravato"
              className="rounded-2xl bg-[#059669] px-8 py-3 text-center text-base font-semibold text-white shadow-[0_10px_25px_rgba(5,150,105,0.25)] transition duration-300 hover:bg-[#047857] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#047857]"
            >
              Request Consultation
            </Link>
            <Link
              href="/contact?service=spravato&inquiry=insurance"
              className="rounded-2xl border-2 border-[#059669] px-8 py-3 text-center text-base font-semibold text-[#059669] transition duration-300 hover:bg-[#059669] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#047857]"
            >
              Verify Insurance
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Covered by many major insurance plans • Supervised by PMHNP-BC
          </p>
        </div>
        <div className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-[32px] shadow-[0_20px_45px_rgba(15,23,42,0.15)]">
          <Image
            src="/images/service-background.jpeg"
            alt="Calm treatment room prepared for SPRAVATO therapy"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 40vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </div>
    </header>
  );
}

