const headingId = "spravato-overview-heading";

/**
 * Explains the SPRAVATO® treatment indication and mechanism of action.
 */
export default function SpravatoOverview() {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-gradient-to-b from-gray-50/70 via-white to-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700/80">
            Clinical Overview
          </p>
          <h2
            id={headingId}
            className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl md:text-5xl"
          >
            What Is SPRAVATO®?
          </h2>
          <p className="mt-6 text-base text-gray-700 sm:text-lg">
            SPRAVATO® (esketamine) is an FDA-approved nasal spray that pairs
            with an oral antidepressant to target stubborn depressive symptoms
            through the NMDA receptor pathway—something traditional SSRIs and
            SNRIs don’t directly address.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Treatment-Resistant Depression (TRD)",
              description:
                "For adults who have tried two or more antidepressants without adequate relief. SPRAVATO® can interrupt the cycle of partial response and plateaued mood gains.",
            },
            {
              title:
                "Major Depressive Disorder with Acute Suicidal Ideation or Behavior",
              description:
                "Provides a rapidly acting option for adults experiencing significant depressive symptoms alongside active or recent suicidal thoughts.",
            },
          ].map((item) => {
            const cardId = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
            <article
                key={item.title}
                role="region"
                aria-labelledby={cardId}
                className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]"
              >
              <h3
                  id={cardId}
                  className="font-serif text-2xl text-[#059669] sm:text-2xl"
                >
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-gray-700">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
        <div className="mt-10 rounded-3xl bg-white p-6 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)] md:p-8">
          <p className="text-base text-gray-700 sm:text-lg">
            Because SPRAVATO® acts on glutamate transmission instead of solely
            on serotonin or norepinephrine, many patients report meaningful
            improvements within 4–6 weeks along with greater stability,
            motivation, and clarity.
          </p>
        </div>
      </div>
    </section>
  );
}

