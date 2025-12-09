import Link from "next/link";

const headingId = "spravato-benefits-heading";

const benefits = [
  {
    icon: "🌤️",
    title: "Relief from long-lasting depression",
  },
  {
    icon: "⚡",
    title: "More daily energy and motivation",
  },
  {
    icon: "🧠",
    title: "Improved emotional regulation & clarity",
  },
  {
    icon: "💬",
    title: "Reduced intrusive or suicidal thoughts",
  },
  {
    icon: "🌱",
    title: "Faster progress alongside therapy & meds",
  },
  {
    icon: "✨",
    title: "Renewed sense of hope and possibility",
  },
];

/**
 * Highlights key outcomes that patients often report during treatment.
 */
export default function SpravatoBenefits() {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-gradient-to-b from-white via-emerald-50/40 to-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700/80">
            Patient Wins
          </p>
          <h2
            id={headingId}
            className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl md:text-5xl"
          >
            Benefits Patients Frequently Experience
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Every nervous system is unique, yet many patients describe the
            following improvements as they move through the treatment series.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const cardId = `${headingId}-card-${index}`;
            return (
              <Link
                href="/contact?service=spravato"
                key={benefit.title}
                className="group block"
              >
                <article
                  role="region"
                  aria-labelledby={cardId}
                  className="rounded-3xl border border-white bg-white p-6 text-center shadow-[0_15px_35px_rgba(15,23,42,0.08)] transition group-hover:-translate-y-1 group-hover:shadow-[0_25px_45px_rgba(15,23,42,0.12)]"
                >
                  <span className="text-4xl" aria-hidden="true">
                    {benefit.icon}
                  </span>
                  <h3
                    id={cardId}
                    className="mt-4 text-lg font-semibold text-slate-900"
                  >
                    {benefit.title}
                  </h3>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

