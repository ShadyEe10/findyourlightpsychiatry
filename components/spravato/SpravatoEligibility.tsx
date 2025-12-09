import Link from "next/link";

const headingId = "spravato-eligibility-heading";

const checklist = [
  "Tried two or more antidepressants without enough relief",
  "Still experience significant depressive symptoms",
  "Have active or recent suicidal thoughts",
  "Prefer a fast-acting, insurance-supported option",
  "Value structured follow-up with medication + therapy",
];

/**
 * Highlights the baseline requirements before starting SPRAVATO®.
 */
export default function SpravatoEligibility() {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-slate-100 bg-slate-50/70 p-8 text-center shadow-[0_15px_45px_rgba(15,23,42,0.08)]">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700/80">
            Eligibility
          </p>
          <h2
            id={headingId}
            className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl"
          >
            Who Qualifies?
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            You may be a good candidate if you resonate with the following.
            Every patient receives a comprehensive psychiatric evaluation before
            beginning treatment.
          </p>
          <ul className="mt-8 grid gap-4 text-left text-gray-800 sm:grid-cols-2">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-white p-4 text-base"
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
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact?service=spravato"
              className="rounded-2xl bg-[#059669] px-8 py-3 text-base font-semibold text-white shadow-[0_15px_35px_rgba(5,150,105,0.3)] transition hover:bg-[#047857]"
            >
              Schedule Evaluation
            </Link>
            <Link
              href="/contact?service=spravato&question=eligibility"
              className="rounded-2xl border-2 border-[#059669] px-8 py-3 text-base font-semibold text-[#059669] transition hover:bg-[#059669] hover:text-white"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

