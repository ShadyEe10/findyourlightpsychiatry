"use client";

import { useState, FormEvent } from "react";
import { config } from "@/lib/config";

interface FormData {
  name: string;
  dob: string;
  email: string;
  phone: string;
  insurance: string;
  appointmentType: string;
  contactMethod: string;
  message: string;
  website: string; // Honeypot field
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dob: "",
    email: "",
    phone: "",
    insurance: "",
    appointmentType: "In-Person",
    contactMethod: "Email",
    message: "",
    website: "", // Honeypot - should remain empty
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "Date of birth is required";
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.dob)) {
        newErrors.dob = "Invalid date format (YYYY-MM-DD)";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
      } else if (formData.email.length > 254) {
        newErrors.email = "Email address is too long";
      }
    }

    // Optional phone validation if provided
    if (formData.phone.trim() && formData.phone.trim().length > 0) {
      const phoneRegex = /^[\d\s\-\(\)\+\.]+$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      } else if (formData.phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = "Phone number must be at least 10 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setSubmitMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format");
      }

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Failed to parse server response");
      }

      if (response.ok && data && data.success) {
        setSubmitStatus("success");
        setSubmitMessage(data.message || "Thank you for your request. We will contact you soon.");
        // Reset form
        setFormData({
          name: "",
          dob: "",
          email: "",
          phone: "",
          insurance: "",
          appointmentType: "In-Person",
          contactMethod: "Email",
          message: "",
          website: "",
        });
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data?.error || "An error occurred. Please try again later.");
      }
    } catch (error) {
      setSubmitStatus("error");
      // Provide more helpful error messages
      if (error instanceof Error) {
        if (error.message === "Failed to fetch" || error.message.includes("NetworkError")) {
          setSubmitMessage("Network error. Please check your connection and try again.");
        } else {
          setSubmitMessage("An error occurred. Please try again later.");
        }
      } else {
        setSubmitMessage("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-white/80"
      data-testid="contact-form"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-900 font-light mb-6 sm:mb-8 tracking-wide">
        Request an Appointment
      </h2>

      {/* Success Message */}
      {submitStatus === "success" && (
        <div
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-medium">{submitMessage}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-medium">{submitMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
        {/* Honeypot Field - Hidden from users */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium mb-2 text-gray-700 text-sm sm:text-base">
            Name <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`border rounded-xl px-4 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[44px] ${
              errors.name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Your full name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col">
          <label htmlFor="dob" className="font-medium mb-2 text-gray-700 text-sm sm:text-base">
            Date of Birth <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={errors.dob ? "true" : "false"}
            aria-describedby={errors.dob ? "dob-error" : undefined}
            className={`border rounded-xl px-4 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[44px] ${
              errors.dob ? "border-red-300" : "border-gray-300"
            }`}
            disabled={isSubmitting}
          />
          {errors.dob && (
            <p id="dob-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.dob}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="font-medium mb-2 text-gray-700 text-sm sm:text-base">
            Email <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`border rounded-xl px-4 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[44px] ${
              errors.email ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="you@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="font-medium mb-2 text-gray-700 text-sm sm:text-base">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`border rounded-xl px-4 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[44px] ${
              errors.phone ? "border-red-300" : "border-gray-300"
            }`}
            placeholder={config.phone}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Insurance */}
        <div className="flex flex-col">
          <label htmlFor="insurance" className="font-medium mb-2 text-gray-700 text-sm sm:text-base">
            Insurance Provider (if applicable)
          </label>
          <input
            type="text"
            id="insurance"
            name="insurance"
            value={formData.insurance}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[44px]"
            placeholder="Insurance company name"
            disabled={isSubmitting}
          />
        </div>

        {/* Preferred Appointment Type */}
        <fieldset className="flex flex-col" aria-label="Preferred Appointment Type">
          <legend className="font-medium mb-2 text-gray-700 text-sm sm:text-base">
            Preferred Appointment Type
          </legend>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0">
            <label className="flex items-center cursor-pointer min-h-[44px] px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="appointmentType"
                value="In-Person"
                checked={formData.appointmentType === "In-Person"}
                onChange={(e) => handleRadioChange("appointmentType", e.target.value)}
                className="mr-3 cursor-pointer accent-[#059669] w-5 h-5"
                disabled={isSubmitting}
              />
              <span className="text-gray-700 text-sm sm:text-base">In-Person</span>
            </label>
            <label className="flex items-center cursor-pointer min-h-[44px] px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="appointmentType"
                value="Telehealth"
                checked={formData.appointmentType === "Telehealth"}
                onChange={(e) => handleRadioChange("appointmentType", e.target.value)}
                className="mr-3 cursor-pointer accent-[#059669] w-5 h-5"
                disabled={isSubmitting}
              />
              <span className="text-gray-700 text-sm sm:text-base">Telehealth</span>
            </label>
          </div>
        </fieldset>

        {/* Brief Message or Concern */}
        <div className="flex flex-col">
          <label htmlFor="message" className="font-medium mb-2 text-gray-700 text-sm sm:text-base">
            Brief Message or Concern
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white resize-none text-base min-h-[120px]"
            placeholder="How can we help you?"
            disabled={isSubmitting}
          />
        </div>

        {/* Preferred Contact Method */}
        <fieldset className="flex flex-col" aria-label="Preferred Contact Method">
          <legend className="font-medium mb-2 text-gray-700 text-sm sm:text-base">
            Preferred Contact Method
          </legend>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0">
            <label className="flex items-center cursor-pointer min-h-[44px] px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="contactMethod"
                value="Email"
                checked={formData.contactMethod === "Email"}
                onChange={(e) => handleRadioChange("contactMethod", e.target.value)}
                className="mr-3 cursor-pointer accent-[#059669] w-5 h-5"
                disabled={isSubmitting}
              />
              <span className="text-gray-700 text-sm sm:text-base">Email</span>
            </label>
            <label className="flex items-center cursor-pointer min-h-[44px] px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="contactMethod"
                value="Phone"
                checked={formData.contactMethod === "Phone"}
                onChange={(e) => handleRadioChange("contactMethod", e.target.value)}
                className="mr-3 cursor-pointer accent-[#059669] w-5 h-5"
                disabled={isSubmitting}
              />
              <span className="text-gray-700 text-sm sm:text-base">Phone</span>
            </label>
          </div>
        </fieldset>

        {/* Disclaimer Checkbox */}
        <div className="flex items-start pt-2">
          <input
            type="checkbox"
            id="disclaimer"
            required
            aria-required="true"
            className="mr-3 mt-1.5 cursor-pointer accent-[#059669] w-5 h-5 flex-shrink-0"
            disabled={isSubmitting}
          />
          <label htmlFor="disclaimer" className="text-sm sm:text-base text-gray-700 cursor-pointer leading-relaxed">
            I understand this form is for general inquiries only and not for emergencies. For urgent mental health concerns, please call 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#059669] text-white font-semibold py-4 sm:py-4 px-8 rounded-2xl hover:bg-[#047857] transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2 shadow-[0_4px_16px_rgba(5,150,105,0.3)] hover:shadow-[0_8px_24px_rgba(5,150,105,0.4)] transform hover:-translate-y-1 text-base sm:text-lg min-h-[52px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            "Request Appointment"
          )}
        </button>
      </form>
    </div>
  );
}

