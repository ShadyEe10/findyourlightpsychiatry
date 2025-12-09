import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Mental Health Insights - Find Your Light Psychiatry",
  description: "Read articles and insights about mental health, therapy, ADHD, adjustment disorders, relationships, seasonal affective disorder, sleep, and mindfulness from Find Your Light Psychiatry.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


