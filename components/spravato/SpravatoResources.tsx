export default function SpravatoResources() {
  const pdfPath = "/documents/spravato/Spravato_Patient_Information.pdf";

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-[#059669] mb-3">Resources</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 font-light leading-tight">
            Spravato Patient Information
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mt-4">
            Download a printable packet to review eligibility, what to expect, and preparation steps for Spravato
            (esketamine) treatment.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          <div className="flex-shrink-0">
            <div className="w-16 h-20 sm:w-20 sm:h-24 bg-red-50 border border-red-100 rounded-xl flex flex-col items-center justify-center text-red-600">
              <span className="text-xl font-semibold">PDF</span>
              <span className="text-[10px] tracking-wide uppercase">Spravato</span>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Spravato Patient Packet</h3>
            <p className="text-gray-700 leading-relaxed">
              Everything you need to know about Spravato: eligibility, treatment day details, side effects, safety
              requirements, and post-visit instructions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={pdfPath}
                download="Spravato_Patient_Information.pdf"
                role="button"
                aria-label="Download Spravato patient packet (PDF)"
                aria-describedby="spravato-pdf-tip spravato-pdf-mobile-note"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#059669] text-white font-semibold shadow-md hover:bg-[#047857] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4-4 4m0 0-4-4m4 4V4"
                  />
                </svg>
                Download PDF
              </a>
              <a
                href={pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                aria-label="View Spravato patient packet in browser (PDF)"
                aria-describedby="spravato-pdf-tip spravato-pdf-mobile-note"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl border-2 border-[#059669] text-[#059669] font-semibold hover:bg-gray-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                  />
                </svg>
                View in Browser
              </a>
            </div>
            <p id="spravato-pdf-tip" className="text-sm text-gray-600">
              Tip: Save the PDF to your phone so you have it on treatment day.
            </p>
            <p id="spravato-pdf-mobile-note" className="text-sm text-gray-600">
              On iPhone or iPad, tap "View in Browser" to save or print.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


