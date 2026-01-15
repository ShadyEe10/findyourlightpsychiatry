"use client";

import { useState, FormEvent } from "react";
import { config } from "@/lib/config";

const TREATMENT_TYPES = [
  "Medication Management",
  "Spravato (Esketamine) Treatment",
  "ADHD Evaluation",
  "Anxiety / Depression Treatment",
  "Bipolar Disorder",
  "PTSD / Trauma",
  "General Psychiatric Evaluation",
  "Consultation Only",
  "Not Sure (Need Guidance)",
] as const;

const APPOINTMENT_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
const APPOINTMENT_TIMES = ["Morning", "Afternoon", "Evening"] as const;
const LOCATION_PREFERENCES = ["Queen Anne", "Bellevue", "Telepsychiatry (if available)"] as const;
const CONTACT_METHODS = ["Phone", "Text", "Email"] as const;
const YES_NO = ["Yes", "No"] as const;
const YES_NO_NOT_SURE = ["Yes", "No", "Not sure"] as const;
const SELF_PAY_OPTIONS = ["Yes, I am interested in self-pay.", "No.", "I would like more information."] as const;
const REFERRAL_SOURCES = [
  "Google",
  "Social Media",
  "Friend/Family",
  "Healthcare Provider",
  "Insurance Provider",
  "Psychology Today",
  "Other",
] as const;

interface FormData {
  name: string;
  dob: string;
  phone: string;
  email: string;
  contactMethod: (typeof CONTACT_METHODS)[number];
  locationPreference: (typeof LOCATION_PREFERENCES)[number] | "";
  hasInsurance: "Yes" | "No" | "";
  insuranceProvider: string;
  insuranceMemberId: string;
  insuranceInOwnName: "Yes" | "No" | "";
  subscriberName: string;
  subscriberDob: string;
  treatmentTypes: string[];
  selfPayOption: (typeof SELF_PAY_OPTIONS)[number] | "";
  hasMentalHealthDiagnosis: "Yes" | "No" | "Not sure" | "";
  diagnosisList: string;
  takingMedications: "Yes" | "No" | "";
  medicationsList: string;
  hasBeenHospitalized: "Yes" | "No" | "";
  hospitalizationDetails: string;
  reasonForCare: string;
  harmThoughts: "Yes" | "No" | "";
  triedAntidepressants: "Yes" | "No" | "Not sure" | "";
  hasTransportation: "Yes" | "No" | "";
  preferredDays: string[];
  preferredTimes: string[];
  inTherapy: "Yes" | "No" | "";
  substanceUse: "Yes" | "No" | "";
  referralSource: string;
  consent1: boolean;
  consent2: boolean;
  website: string; // Honeypot field
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  name: "",
  dob: "",
  phone: "",
  email: "",
  contactMethod: "Email",
  locationPreference: "",
  hasInsurance: "",
  insuranceProvider: "",
  insuranceMemberId: "",
  insuranceInOwnName: "",
  subscriberName: "",
  subscriberDob: "",
  treatmentTypes: [],
  selfPayOption: "",
  hasMentalHealthDiagnosis: "",
  diagnosisList: "",
  takingMedications: "",
  medicationsList: "",
  hasBeenHospitalized: "",
  hospitalizationDetails: "",
  reasonForCare: "",
  harmThoughts: "",
  triedAntidepressants: "",
  hasTransportation: "",
  preferredDays: [],
  preferredTimes: [],
  inTherapy: "",
  substanceUse: "",
  referralSource: "",
  consent1: false,
  consent2: false,
  website: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const spravatoSelected = formData.treatmentTypes.includes("Spravato (Esketamine) Treatment");

  const validateDate = (value: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) return false;
    const dateObj = new Date(`${value}T00:00:00`);
    if (Number.isNaN(dateObj.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateObj <= today;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Basic info
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "Date of birth is required";
    } else if (!validateDate(formData.dob)) {
      newErrors.dob = "Enter a valid date (YYYY-MM-DD) that is not in the future";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      const phoneRegex = /^[\d\s\-\(\)\+\.]+$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      } else if (phoneDigits.length < 10) {
        newErrors.phone = "Phone number must be at least 10 digits";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Invalid email format";
      } else if (formData.email.length > 254) {
        newErrors.email = "Email address is too long";
      }
    }

    if (!formData.contactMethod) {
      newErrors.contactMethod = "Preferred contact method is required";
    }

    // Location
    if (!formData.locationPreference) {
      newErrors.locationPreference = "Location preference is required";
    }

    // Insurance
    if (!formData.hasInsurance) {
      newErrors.hasInsurance = "Please select if you have insurance";
    } else if (formData.hasInsurance === "Yes") {
      if (!formData.insuranceProvider.trim()) {
        newErrors.insuranceProvider = "Insurance provider is required";
      }
      if (!formData.insuranceInOwnName) {
        newErrors.insuranceInOwnName = "Please indicate whose name is on the insurance";
      } else if (formData.insuranceInOwnName === "No") {
        if (!formData.subscriberName.trim()) {
          newErrors.subscriberName = "Subscriber name is required";
        }
        if (!formData.subscriberDob.trim()) {
          newErrors.subscriberDob = "Subscriber date of birth is required";
        } else if (!validateDate(formData.subscriberDob)) {
          newErrors.subscriberDob = "Enter a valid subscriber date of birth";
        }
      }
    }

    // Treatment types
    if (!formData.treatmentTypes || formData.treatmentTypes.length === 0) {
      newErrors.treatmentTypes = "Select at least one treatment option";
    }

    // Mental health history
    if (!formData.hasMentalHealthDiagnosis) {
      newErrors.hasMentalHealthDiagnosis = "Please answer about mental health diagnosis";
    } else if (formData.hasMentalHealthDiagnosis === "Yes" && !formData.diagnosisList.trim()) {
      newErrors.diagnosisList = "Please list diagnoses";
    }

    if (!formData.takingMedications) {
      newErrors.takingMedications = "Please answer about medications";
    } else if (formData.takingMedications === "Yes" && !formData.medicationsList.trim()) {
      newErrors.medicationsList = "Please list medications";
    }

    if (!formData.hasBeenHospitalized) {
      newErrors.hasBeenHospitalized = "Please answer hospitalization history";
    }

    // Reason for care
    if (!formData.reasonForCare.trim()) {
      newErrors.reasonForCare = "Reason for seeking care is required";
    } else if (formData.reasonForCare.trim().length < 10) {
      newErrors.reasonForCare = "Please provide a brief description (10+ characters)";
    }

    // Safety
    if (!formData.harmThoughts) {
      newErrors.harmThoughts = "Please answer the safety screening question";
    }

    // Spravato specific
    if (spravatoSelected) {
      if (!formData.triedAntidepressants) {
        newErrors.triedAntidepressants = "Please answer about prior antidepressants";
      }
      if (!formData.hasTransportation) {
        newErrors.hasTransportation = "Transportation answer is required";
      }
    }

    // Consent
    if (!formData.consent1) {
      newErrors.consent1 = "Please acknowledge this consent";
    }
    if (!formData.consent2) {
      newErrors.consent2 = "Please acknowledge this consent";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.currentTarget;
    const { name, value } = target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      if (name === "consent1" || name === "consent2") {
        setFormData((prev) => ({ ...prev, [name]: target.checked }));
        clearFieldError(name);
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name);
  };

  const handleRadioChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => {
      const updated: FormData = { ...prev, [name]: value };

      // Reset dependent insurance fields
      if (name === "hasInsurance") {
        updated.selfPayOption = "";
        if (value === "No") {
          updated.insuranceProvider = "";
          updated.insuranceMemberId = "";
          updated.insuranceInOwnName = "";
          updated.subscriberName = "";
          updated.subscriberDob = "";
        }
      }
      if (name === "insuranceInOwnName" && value === "Yes") {
        updated.subscriberName = "";
        updated.subscriberDob = "";
      }

      return updated;
    });
    clearFieldError(name as string);
  };

  const toggleArrayValue = (field: "treatmentTypes" | "preferredDays" | "preferredTimes", value: string) => {
    setFormData((prev) => {
      const exists = prev[field].includes(value);
      const nextValues = exists ? prev[field].filter((item) => item !== value) : [...prev[field], value];
      const updated: FormData = { ...prev, [field]: nextValues };

      if (field === "treatmentTypes" && value === "Spravato (Esketamine) Treatment" && !nextValues.includes(value)) {
        updated.triedAntidepressants = "";
        updated.hasTransportation = "";
      }

      return updated;
    });
    clearFieldError(field);
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

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format");
      }

      const data = await response.json();

      if (response.ok && data && data.success) {
        setSubmitStatus("success");
        setSubmitMessage(data.message || "Thank you for your request. We will contact you soon.");
        setFormData(initialFormData);
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data?.error || "An error occurred. Please try again later.");
      }
    } catch (error) {
      setSubmitStatus("error");
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

  const renderError = (field: keyof FormErrors) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1 text-sm text-red-600" role="alert">
        {errors[field]}
      </p>
    ) : null;

  const renderRadioGroup = (
    field: keyof FormData,
    options: string[],
    { label, required }: { label: string; required?: boolean }
  ) => (
    <fieldset className="flex flex-col space-y-3" aria-label={label}>
      <legend className="font-medium text-gray-800 text-base sm:text-lg mb-2">
        {label} {required && <span className="text-red-500" aria-label="required">*</span>}
      </legend>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center cursor-pointer min-h-[44px] px-3 py-3 rounded-xl border border-gray-200 hover:border-[#059669] hover:bg-gray-50 transition-colors"
          >
            <input
              type="radio"
              name={field}
              value={option}
              checked={formData[field] === option}
              onChange={(e) => handleRadioChange(field, e.target.value)}
              className="mr-3 cursor-pointer accent-[#059669] w-5 h-5 flex-shrink-0"
              disabled={isSubmitting}
            />
            <span className="text-gray-800 text-sm sm:text-base">{option}</span>
          </label>
        ))}
      </div>
      {renderError(field)}
    </fieldset>
  );

  const renderCheckboxGroup = (
    field: "treatmentTypes" | "preferredDays" | "preferredTimes",
    options: readonly string[],
    label: string,
    required?: boolean
  ) => (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-800 text-base sm:text-lg">
          {label} {required && <span className="text-red-500" aria-label="required">*</span>}
        </h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center cursor-pointer min-h-[44px] px-3 py-3 rounded-xl border border-gray-200 hover:border-[#059669] hover:bg-gray-50 transition-colors"
          >
            <input
              type="checkbox"
              value={option}
              checked={formData[field].includes(option)}
              onChange={() => toggleArrayValue(field, option)}
              className="mr-3 cursor-pointer accent-[#059669] w-5 h-5 flex-shrink-0"
              disabled={isSubmitting}
            />
            <span className="text-gray-800 text-sm sm:text-base">{option}</span>
          </label>
        ))}
      </div>
      {renderError(field)}
    </div>
  );

  return (
    <div
      className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-white/80 space-y-8"
      data-testid="contact-form"
    >
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-900 font-light tracking-wide">
          Request an Appointment
        </h2>
        <p className="text-gray-700 text-sm sm:text-base">
          Please complete this secure intake form. Items with <span className="text-red-500">*</span> are required.
        </p>
      </div>

      {submitStatus === "success" && (
        <div
          className="mb-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800"
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

      {submitStatus === "error" && (
        <div
          className="mb-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800"
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

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        {/* Honeypot Field */}
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

        {/* Basic Information */}
        <section className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Patient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-medium mb-2 text-gray-800 text-sm sm:text-base">
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
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[48px] ${
                  errors.name ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Your full name"
                disabled={isSubmitting}
                autoComplete="name"
              />
              {renderError("name")}
            </div>

            <div className="flex flex-col">
              <label htmlFor="dob" className="font-medium mb-2 text-gray-800 text-sm sm:text-base">
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
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[48px] ${
                  errors.dob ? "border-red-300" : "border-gray-300"
                }`}
                disabled={isSubmitting}
                autoComplete="bday"
              />
              {renderError("dob")}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="phone" className="font-medium mb-2 text-gray-800 text-sm sm:text-base">
                Phone Number <span className="text-red-500" aria-label="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[48px] ${
                  errors.phone ? "border-red-300" : "border-gray-300"
                }`}
                placeholder={config.phone}
                disabled={isSubmitting}
                autoComplete="tel"
              />
              {renderError("phone")}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium mb-2 text-gray-800 text-sm sm:text-base">
                Email Address <span className="text-red-500" aria-label="required">*</span>
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
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[48px] ${
                  errors.email ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="you@example.com"
                disabled={isSubmitting}
                autoComplete="email"
              />
              {renderError("email")}
            </div>
          </div>

          {renderRadioGroup("contactMethod", CONTACT_METHODS as unknown as string[], {
            label: "Preferred Method of Contact",
            required: true,
          })}
          <p className="text-sm text-gray-600">
            If you select text, you consent to being contacted via SMS for scheduling and follow-up.
          </p>
        </section>

        {/* Location Preference */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Location Preference</h3>
          {renderRadioGroup("locationPreference", LOCATION_PREFERENCES as unknown as string[], {
            label: "Where would you like to be seen?",
            required: true,
          })}
        </section>

        {/* Insurance Information */}
        <section className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Insurance Information</h3>
          {renderRadioGroup("hasInsurance", YES_NO as unknown as string[], {
            label: "Do you have insurance?",
            required: true,
          })}

          {formData.hasInsurance === "Yes" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="insuranceProvider" className="font-medium mb-2 text-gray-800 text-sm sm:text-base">
                    Insurance Provider <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="insuranceProvider"
                    name="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={handleChange}
                    className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[48px] ${
                      errors.insuranceProvider ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Insurance company name"
                    disabled={isSubmitting}
                  />
                  {renderError("insuranceProvider")}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="insuranceMemberId" className="font-medium mb-2 text-gray-800 text-sm sm:text-base">
                    Insurance Member ID (optional)
                  </label>
                  <input
                    type="text"
                    id="insuranceMemberId"
                    name="insuranceMemberId"
                    value={formData.insuranceMemberId}
                    onChange={handleChange}
                    className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[48px] border-gray-300"
                    placeholder="Member ID from your card"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {renderRadioGroup("insuranceInOwnName", YES_NO as unknown as string[], {
                label: "Is the insurance under your name?",
                required: true,
              })}

              {formData.insuranceInOwnName === "No" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="subscriberName" className="font-medium mb-2 text-gray-800 text-sm sm:text-base">
                      Subscriber Name <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="subscriberName"
                      name="subscriberName"
                      value={formData.subscriberName}
                      onChange={handleChange}
                      className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[48px] ${
                        errors.subscriberName ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Subscriber's full name"
                      disabled={isSubmitting}
                    />
                    {renderError("subscriberName")}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="subscriberDob" className="font-medium mb-2 text-gray-800 text-sm sm:text-base">
                      Subscriber Date of Birth <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="date"
                      id="subscriberDob"
                      name="subscriberDob"
                      value={formData.subscriberDob}
                      onChange={handleChange}
                      className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[48px] ${
                        errors.subscriberDob ? "border-red-300" : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                    />
                    {renderError("subscriberDob")}
                  </div>
                </div>
              )}
            </div>
          )}

          {formData.hasInsurance === "No" && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800 text-base sm:text-lg">Self-Pay Option</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SELF_PAY_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="flex items-center cursor-pointer min-h-[44px] px-3 py-3 rounded-xl border border-gray-200 hover:border-[#059669] hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="selfPayOption"
                      value={option}
                      checked={formData.selfPayOption === option}
                      onChange={(e) => handleRadioChange("selfPayOption", e.target.value)}
                      className="mr-3 cursor-pointer accent-[#059669] w-5 h-5 flex-shrink-0"
                      disabled={isSubmitting}
                    />
                    <span className="text-gray-800 text-sm sm:text-base">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Treatment Types */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Type of Treatment You Are Seeking</h3>
          <p className="text-sm text-gray-600">Select all that apply.</p>
          {renderCheckboxGroup("treatmentTypes", TREATMENT_TYPES, "Treatment options", true)}
        </section>

        {/* Mental Health History */}
        <section className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Mental Health History</h3>
          {renderRadioGroup("hasMentalHealthDiagnosis", YES_NO_NOT_SURE as unknown as string[], {
            label: "Have you been diagnosed with a mental health condition?",
            required: true,
          })}
          {formData.hasMentalHealthDiagnosis === "Yes" && (
            <div className="flex flex-col">
              <label htmlFor="diagnosisList" className="font-medium mb-2 text-gray-800 text-sm sm:text-base">
                If yes, please list your diagnoses <span className="text-red-500" aria-label="required">*</span>
              </label>
              <textarea
                id="diagnosisList"
                name="diagnosisList"
                value={formData.diagnosisList}
                onChange={handleChange}
                rows={3}
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[110px] ${
                  errors.diagnosisList ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="List any relevant diagnoses"
                disabled={isSubmitting}
              />
              {renderError("diagnosisList")}
            </div>
          )}

          {renderRadioGroup("takingMedications", YES_NO as unknown as string[], {
            label: "Are you currently taking psychiatric medications?",
            required: true,
          })}
          {formData.takingMedications === "Yes" && (
            <div className="flex flex-col">
              <label htmlFor="medicationsList" className="font-medium mb-2 text-gray-800 text-sm sm:text-base">
                List medications <span className="text-red-500" aria-label="required">*</span>
              </label>
              <textarea
                id="medicationsList"
                name="medicationsList"
                value={formData.medicationsList}
                onChange={handleChange}
                rows={3}
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[110px] ${
                  errors.medicationsList ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="List current psychiatric medications"
                disabled={isSubmitting}
              />
              {renderError("medicationsList")}
            </div>
          )}

          {renderRadioGroup("hasBeenHospitalized", YES_NO as unknown as string[], {
            label: "Have you ever been hospitalized for mental health reasons?",
            required: true,
          })}
          {formData.hasBeenHospitalized === "Yes" && (
            <div className="flex flex-col">
              <label
                htmlFor="hospitalizationDetails"
                className="font-medium mb-2 text-gray-800 text-sm sm:text-base"
              >
                Optional details
              </label>
              <textarea
                id="hospitalizationDetails"
                name="hospitalizationDetails"
                value={formData.hospitalizationDetails}
                onChange={handleChange}
                rows={2}
                className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[90px] border-gray-300"
                placeholder="Share any details you would like us to know"
                disabled={isSubmitting}
              />
            </div>
          )}
        </section>

        {/* Reason for Care */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Reason for Seeking Care</h3>
          <div className="flex flex-col">
            <label htmlFor="reasonForCare" className="font-medium mb-2 text-gray-800 text-sm sm:text-base">
              Brief description <span className="text-red-500" aria-label="required">*</span>
            </label>
            <textarea
              id="reasonForCare"
              name="reasonForCare"
              value={formData.reasonForCare}
              onChange={handleChange}
              rows={5}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[140px] ${
                errors.reasonForCare ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Tell us what brings you in today..."
              disabled={isSubmitting}
            />
            {renderError("reasonForCare")}
          </div>
        </section>

        {/* Safety Screening */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Safety Screening</h3>
          {renderRadioGroup("harmThoughts", YES_NO as unknown as string[], {
            label: "Are you experiencing any thoughts of harming yourself or others?",
            required: true,
          })}

          {formData.harmThoughts === "Yes" && (
            <div
              className="border-2 border-red-300 bg-red-50 text-red-900 rounded-xl p-4 space-y-2"
              role="alert"
              aria-live="assertive"
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl" aria-hidden="true">
                  ⚠️
                </span>
                <p className="font-semibold">If you are in crisis or having thoughts of harming yourself:</p>
              </div>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li>
                  Call <strong>988</strong> (Suicide &amp; Crisis Lifeline)
                </li>
                <li>Go to the nearest emergency room</li>
                <li>Call 911 if you are in immediate danger</li>
              </ul>
              <p className="italic text-sm">This form is not for emergencies.</p>
            </div>
          )}
        </section>

        {/* Spravato Specific */}
        {spravatoSelected && (
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Spravato (Esketamine) Questions</h3>
            {renderRadioGroup("triedAntidepressants", YES_NO_NOT_SURE as unknown as string[], {
              label: "Have you tried at least two antidepressants?",
              required: true,
            })}
            {renderRadioGroup("hasTransportation", YES_NO as unknown as string[], {
              label: "Do you have someone who can drive you to and from treatments?",
              required: true,
            })}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-800">
              <p className="font-medium mb-2">Spravato Patient Information</p>
              <a
                href="/documents/spravato/Spravato_Patient_Information.pdf"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                aria-label="View or download Spravato patient information (PDF)"
                aria-describedby="spravato-form-pdf-note"
                className="text-[#059669] hover:text-[#047857] underline underline-offset-4 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2"
              >
                View or download the Spravato Patient Information (PDF)
              </a>
              <p id="spravato-form-pdf-note" className="mt-2 text-xs text-gray-600">
                On iPhone or iPad, tap the link to open the PDF, then save or print from the browser.
              </p>
            </div>
          </section>
        )}

        {/* Appointment Availability */}
        <section className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Appointment Availability</h3>
          {renderCheckboxGroup("preferredDays", APPOINTMENT_DAYS, "Best days for appointments")}
          {renderCheckboxGroup("preferredTimes", APPOINTMENT_TIMES, "Best times")}
        </section>

        {/* Additional Optional Questions */}
        <section className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Additional Information (Optional)</h3>
          {renderRadioGroup("inTherapy", YES_NO as unknown as string[], {
            label: "Are you currently in therapy?",
          })}
          {renderRadioGroup("substanceUse", YES_NO as unknown as string[], {
            label: "Recent alcohol or substance use?",
          })}
          <div className="flex flex-col">
            <label htmlFor="referralSource" className="font-medium mb-2 text-gray-800 text-sm sm:text-base">
              How did you hear about us?
            </label>
            <select
              id="referralSource"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 bg-white text-base min-h-[48px] border-gray-300"
              disabled={isSubmitting}
            >
              <option value="">Please select...</option>
              {REFERRAL_SOURCES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Consents */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Consent & Acknowledgment</h3>
          <div className="space-y-3">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="consent1"
                checked={formData.consent1}
                onChange={handleChange}
                className="mt-1.5 cursor-pointer accent-[#059669] w-5 h-5 flex-shrink-0"
                disabled={isSubmitting}
                aria-required="true"
              />
              <span className="text-sm sm:text-base text-gray-800">
                I understand this form does not guarantee an appointment or establish a patient-provider relationship.
                <span className="text-red-500" aria-label="required">*</span>
              </span>
            </label>
            {renderError("consent1")}

            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="consent2"
                checked={formData.consent2}
                onChange={handleChange}
                className="mt-1.5 cursor-pointer accent-[#059669] w-5 h-5 flex-shrink-0"
                disabled={isSubmitting}
                aria-required="true"
              />
              <span className="text-sm sm:text-base text-gray-800">
                I understand this form is not for emergencies. If I need immediate help, I will call 988 or go to the
                nearest emergency room. <span className="text-red-500" aria-label="required">*</span>
              </span>
            </label>
            {renderError("consent2")}
          </div>
        </section>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#059669] text-white font-semibold py-4 px-8 rounded-2xl hover:bg-[#047857] transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2 shadow-[0_4px_16px_rgba(5,150,105,0.3)] hover:shadow-[0_8px_24px_rgba(5,150,105,0.4)] transform hover:-translate-y-1 text-base sm:text-lg min-h-[52px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Intake Form"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

