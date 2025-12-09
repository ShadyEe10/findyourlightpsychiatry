import Link from "next/link";

const headingId = "spravato-how-it-works";

const steps = [
  {
    title: "Self-administer in clinic",
    detail:
      "You comfortably self-administer the nasal spray while seated in a private treatment suite.",
  },
  {
    title: "Rest & reset for ~2 hours",
    detail:
      "We provide a calm environment with dimmed lights, blankets, and continuous observation while the medication takes effect.",
  },
  {
    title: "Safety monitoring & discharge",
    detail:
      "Vitals are monitored at regular intervals. Once you feel steady—and a support person is present—you’re cleared to head home.",
  },
];

/**
 * Displays the in-clinic flow for SPRAVATO® treatments.
 */
export default function SpravatoHowItWorks() {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700/80">
            In-Clinic Flow
          </p>
          <h2
            id={headingId}
            className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl md:text-5xl"
          >
            How SPRAVATO® Works
          </h2>
          <p className="mt-6 text-base text-gray-700 sm:text-lg">
            SPRAVATO® is administered in clinic under continuous supervision. Each
            appointment lasts about two hours so we can ensure the medication is
            working effectively and safely.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const cardId = `${headingId}-step-${index + 1}`;
            return (
              <Link
                href="/contact?service=spravato"
                key={step.title}
                className="group block"
              >
                <article
                  role="region"
                  aria-labelledby={cardId}
                  className="relative rounded-3xl border border-emerald-50 bg-gradient-to-b from-white to-emerald-50/30 p-6 shadow-[0_15px_40px_rgba(15,23,42,0.08)] transition group-hover:-translate-y-1 group-hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]"
                >
                  <div className="text-3xl font-semibold text-[#D4AF37]">
                    {(index + 1).toString().padStart(2, "0")}
                  </div>
                  <h3
                    id={cardId}
                    className="mt-4 text-2xl font-semibold text-slate-900"
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-700">{step.detail}</p>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

