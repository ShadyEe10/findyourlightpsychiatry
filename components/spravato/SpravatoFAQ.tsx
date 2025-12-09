const headingId = "spravato-faq-heading";

const faqs = [
  {
    question: "How long is each SPRAVATO® visit?",
    answer:
      "Plan for about two hours in clinic. This covers self-administration, a restful recovery period, snack/refreshment time, and our final safety check before you leave with a support person.",
  },
  {
    question: "Is SPRAVATO® covered by insurance?",
    answer:
      "Many commercial plans and select public plans cover SPRAVATO®. We verify benefits, submit authorizations, and manage documentation so there are no surprises.",
  },
  {
    question: "What’s the difference between SPRAVATO® and IV ketamine?",
    answer:
      "SPRAVATO® is the only FDA-approved esketamine nasal spray. It’s administered in clinic with strict safety protocols and insurance support. IV ketamine is an off-label infusion that is typically self-pay.",
  },
  {
    question: "Can I drive after treatment?",
    answer:
      "No. You’ll need a trusted support person to drive you home and stay with you for the remainder of the day. Most patients feel back to baseline the following morning.",
  },
  {
    question: "How quickly will I feel results?",
    answer:
      "Some patients notice mood shifts within the first few sessions. Most experience significant improvement between weeks 4–6 when the full treatment schedule is followed.",
  },
  {
    question: "What are the common side effects?",
    answer:
      "Temporary dissociation, dizziness, or mild nausea can occur shortly after dosing. We monitor vitals, provide comfort measures, and symptoms typically resolve before discharge.",
  },
];

/**
 * FAQ accordion using native details/summary elements for accessibility.
 */
export default function SpravatoFAQ() {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700/80">
            FAQs
          </p>
          <h2
            id={headingId}
            className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Have more questions? Send us a note through the contact form and a
            clinician will respond within one business day.
          </p>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => {
            const summaryId = `${headingId}-summary-${index}`;
            return (
              <details
                key={faq.question}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_5px_20px_rgba(15,23,42,0.08)]"
              >
                <summary
                  id={summaryId}
                  className="list-none cursor-pointer text-lg font-semibold text-slate-900"
                >
                  {faq.question}
                </summary>
                <p className="mt-3 text-base text-gray-700">{faq.answer}</p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}

