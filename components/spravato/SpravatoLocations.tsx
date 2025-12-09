const headingId = "spravato-locations-heading";

const locations = [
  {
    name: "Bellevue Office",
    address: ["14535 Bel-Red Road, Suite 200", "Bellevue, WA 98007"],
    phone: "425-780-7460",
    secondary: "425-429-3077",
  },
  {
    name: "Seattle – Queen Anne Office",
    address: ["200 First Ave West, #400", "Seattle, WA 98119"],
    phone: "425-780-7460",
  },
];

/**
 * Lists clinic locations with tap-to-call links.
 */
export default function SpravatoLocations() {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700/80">
            Where We Treat
          </p>
          <h2
            id={headingId}
            className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl md:text-5xl"
          >
            Our Locations
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Calm, private suites in Bellevue and Seattle with on-site
            monitoring, complimentary refreshments, and easy parking.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {locations.map((location, index) => {
            const cardId = `${headingId}-${index}`;
            return (
              <article
                key={location.name}
                role="region"
                aria-labelledby={cardId}
                className="rounded-3xl border border-white bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)]"
              >
                <h3
                  id={cardId}
                  className="font-serif text-2xl text-slate-900 sm:text-3xl"
                >
                  {location.name}
                </h3>
                <address className="mt-4 not-italic text-gray-700">
                  {location.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <div className="mt-4 space-y-2">
                  <p className="text-sm uppercase tracking-wide text-gray-500">
                    Phone
                  </p>
                  <a
                    href={`tel:${location.phone.replace(/[^\d]/g, "")}`}
                    className="text-lg font-semibold text-[#059669]"
                  >
                    {location.phone}
                  </a>
                  {location.secondary && (
                    <p className="text-sm text-gray-600">
                      Office Line:{" "}
                      <a
                        href={`tel:${location.secondary.replace(/[^\d]/g, "")}`}
                        className="font-semibold text-[#059669]"
                      >
                        {location.secondary}
                      </a>
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

