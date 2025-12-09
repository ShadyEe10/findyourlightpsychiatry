import React from "react";
import type { Metadata } from "next";
import { CRISIS_RESOURCES, EDUCATION_RESOURCES, SELFCARE_RESOURCES, type Resource } from "@/data/resources";

export const metadata: Metadata = {
  title: "Mental Health Resources - Crisis Hotlines & Self-Care Tools",
  description: "Access crisis hotlines, trusted mental health education resources, and self-care tools to support your mental wellness journey.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Mental Health Resources - Find Your Light Psychiatry",
    description: "Curated list of crisis hotlines, education hubs, and mindfulness tools.",
    url: "/resources",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mental Health Resources",
    description: "Crisis contacts, education, and self-care links vetted by Find Your Light Psychiatry.",
  },
};

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ResourceCard Component
const ResourceCard = React.memo(({ resource }: { resource: Resource }) => {
  const { title, description, icon: Icon, href } = resource;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100 hover:border-teal-200 min-h-[280px] sm:min-h-[300px] flex flex-col"
    >
      <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-teal-100 text-teal-600 mb-4 sm:mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300 flex-shrink-0">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-teal-700 transition-colors duration-300 mb-2 sm:mb-3 line-clamp-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-slate-600 flex-grow line-clamp-3 sm:line-clamp-none">{description}</p>
      <div className="mt-4 sm:mt-6 flex items-center text-teal-600 font-semibold text-sm sm:text-base">
        Visit Website
        <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </a>
  );
});

ResourceCard.displayName = "ResourceCard";

// ResourceSection Component
const ResourceSection = React.memo(({ 
  title, 
  description, 
  resources 
}: { 
  title: string; 
  description: string; 
  resources: Resource[] 
}) => {
  return (
    <section>
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 px-4">
          {title}
        </h2>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
          {description}
        </p>
      </div>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {resources && resources.length > 0 ? (
          resources.map((resource) => (
            <ResourceCard key={resource.title} resource={resource} />
          ))
        ) : (
          <p className="col-span-full text-center text-slate-600">No resources available at this time.</p>
        )}
      </div>
    </section>
  );
});

ResourceSection.displayName = "ResourceSection";

// Main Page Component
export default function ResourcesPage() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="space-y-12 sm:space-y-14 md:space-y-16">
            <ResourceSection
              title="Crisis & Support Hotlines"
              description="Immediate support and crisis resources available 24/7 for those in need of urgent mental health assistance."
              resources={CRISIS_RESOURCES}
            />
            <ResourceSection
              title="Trusted Mental Health Education"
              description="Authoritative resources and information to help you understand mental health conditions and treatment options."
              resources={EDUCATION_RESOURCES}
            />
            <ResourceSection
              title="Self-Care & Mindfulness Tools"
              description="Apps and resources to support your daily mental wellness journey through meditation, mindfulness, and self-care practices."
              resources={SELFCARE_RESOURCES}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
