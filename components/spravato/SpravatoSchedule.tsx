const headingId = "spravato-schedule-heading";

const schedulePhases = [
  {
    phase: "Weeks 1–4",
    frequency: "2 treatments per week",
    detail:
      "Builds momentum quickly while your brain creates new glutamate pathways.",
  },
  {
    phase: "Weeks 5–8",
    frequency: "1 treatment per week",
    detail:
      "Stabilizes gains, reduces symptom spikes, and reinforces new neural connections.",
  },
  {
    phase: "Week 9+",
    frequency: "Every 1–2 weeks",
    detail:
      "Maintenance visits are tailored to your progress, therapy schedule, and goals.",
  },
];

/**
 * Presents the SPRAVATO® treatment timeline in grid and accordion layouts.
 */
export default function SpravatoSchedule() {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700/80">
            Treatment Timeline
          </p>
          <h2
            id={headingId}
            className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl md:text-5xl"
          >
            Treatment Schedule
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Plans are customized for each person—but here’s the cadence most
            adults follow as we taper to meet your stability goals.
          </p>
        </div>

        {/* Mobile Accordion */}
        <div className="mt-10 space-y-4 md:hidden">
          {schedulePhases.map((phase) => {
            const accordionId = `${headingId}-${phase.phase
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}`;
            return (
              <details
                key={phase.phase}
                className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-4 text-gray-800"
              >
                <summary
                  id={accordionId}
                  className="list-none cursor-pointer text-lg font-semibold text-slate-900"
                >
                  {phase.phase}
                  <span className="block text-sm font-normal text-gray-600">
                    {phase.frequency}
                  </span>
                </summary>
                <p className="mt-3 text-base">{phase.detail}</p>
              </details>
            );
          })}
        </div>

        {/* Desktop Grid */}
        <div className="mt-10 hidden md:grid md:grid-cols-3 md:gap-6">
          {schedulePhases.map((phase, index) => {
            const cardId = `${headingId}-grid-${index}`;
            return (
              <article
                key={phase.phase}
                role="region"
                aria-labelledby={cardId}
                className="relative rounded-3xl border border-emerald-100 bg-gradient-to-b from-emerald-50 via-white to-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.08)]"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-700/80">
                  {phase.phase}
                </p>
                <h3
                  id={cardId}
                  className="mt-3 text-2xl font-semibold text-slate-900"
                >
                  {phase.frequency}
                </h3>
                <p className="mt-3 text-base text-gray-700">{phase.detail}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

