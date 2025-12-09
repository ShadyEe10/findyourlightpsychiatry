import { config } from "@/lib/config";

const Footer = () => {
  return (
    <div className="relative w-full bg-gray-50 text-gray-600 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side: Fingerprint icon */}
          <div className="flex-shrink-0">
            <svg 
              className="w-12 h-12 text-[#059669]" 
              viewBox="0 0 100 100" 
              fill="currentColor"
            >
              {/* Simplified fingerprint icon */}
              <path d="M50 10 C30 10, 20 25, 20 45 C20 55, 25 60, 30 60 C35 60, 40 55, 40 50 C40 40, 45 35, 50 35 C55 35, 60 40, 60 50 C60 60, 65 65, 70 65 C75 65, 80 60, 80 50 C80 30, 70 10, 50 10 Z" />
              <path d="M30 70 C25 70, 20 75, 20 80 C20 85, 25 90, 30 90 C35 90, 40 85, 40 80 C40 75, 35 70, 30 70 Z" />
              <path d="M70 70 C65 70, 60 75, 60 80 C60 85, 65 90, 70 90 C75 90, 80 85, 80 80 C80 75, 75 70, 70 70 Z" />
            </svg>
          </div>

          {/* Right side: Footer content */}
          <div className="text-center md:text-right space-y-2 text-sm">
            <p className="font-semibold text-gray-700">{config.businessName}</p>
            <p>HIPAA-Compliant In-Person &amp; Telepsychiatry &nbsp;|&nbsp; Copyright &copy; {config.copyrightYear}</p>
            <p>{(config.location && typeof config.location === 'string' ? config.location.split(',')[0] : config.location) || 'Seattle'}, WA &nbsp;|&nbsp; Telehealth Statewide</p>
            <p className="italic text-gray-600">
              <em>Compassionate, Evidence-Based Care for Mind, Body, and Soul.</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

