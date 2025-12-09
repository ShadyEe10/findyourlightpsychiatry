import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Request an Appointment - Find Your Light Psychiatry",
  description: "Request an appointment with Find Your Light Psychiatry. Located in Seattle, Washington, serving patients throughout Washington State via in-person and telehealth appointments.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




