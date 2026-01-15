import SpravatoHero from "./SpravatoHero";
import SpravatoOverview from "./SpravatoOverview";
import SpravatoHowItWorks from "./SpravatoHowItWorks";
import SpravatoBenefits from "./SpravatoBenefits";
import SpravatoSchedule from "./SpravatoSchedule";
import SpravatoInsurance from "./SpravatoInsurance";
import SpravatoLocations from "./SpravatoLocations";
import SpravatoEligibility from "./SpravatoEligibility";
import SpravatoResources from "./SpravatoResources";
import SpravatoCTA from "./SpravatoCTA";
import SpravatoFAQ from "./SpravatoFAQ";

/**
 * Composes the SPRAVATO® treatment page sections.
 */
export default function SpravatoPage() {
  return (
    <main className="min-h-screen bg-white">
      <SpravatoHero />
      <SpravatoOverview />
      <SpravatoHowItWorks />
      <SpravatoBenefits />
      <SpravatoSchedule />
      <SpravatoInsurance />
      <SpravatoLocations />
      <SpravatoEligibility />
      <SpravatoFAQ />
      <SpravatoResources />
      <SpravatoCTA />
    </main>
  );
}

