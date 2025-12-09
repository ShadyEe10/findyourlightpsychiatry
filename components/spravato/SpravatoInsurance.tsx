const headingId = "spravato-insurance-heading";

const supportItems = [
  "Benefit verification and coordination with payers",
  "Prior authorization submissions and tracking",
  "On-going documentation for continued coverage",
  "Transparent billing + patient support every step",
];

/**
 * Details insurance coverage support for SPRAVATO® therapy.
 */
export default function SpravatoInsurance() {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-gradient-to-b from-emerald-50/80 via-white to-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-emerald-100 bg-white/90 p-8 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700/80">
              Insurance & Billing
            </p>
            <h2
              id={headingId}
              className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl"
            >
              Insurance Coverage
            </h2>
            <p className="mt-4 text-base text-gray-700 sm:text-lg">
              SPRAVATO® is covered by many major insurance plans. Our dedicated
              team handles the approvals so you can focus on healing.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 text-gray-800 sm:grid-cols-2">
            {supportItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-emerald-50/80 p-4 text-left"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#059669] text-sm font-semibold text-white"
                >
                  ✓
                </span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <a
              href="/contact?service=spravato&inquiry=insurance"
              className="inline-flex items-center justify-center rounded-2xl border-2 border-[#059669] px-8 py-3 text-base font-semibold text-[#059669] transition hover:bg-[#059669] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#047857]"
            >
              Verify Your Benefits
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

