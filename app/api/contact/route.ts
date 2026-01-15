import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import { sendPracticeEmail, sendConfirmationEmail } from "@/lib/email";
import { logger } from "@/lib/logger";

// Constants
const HONEYPOT_FIELD = "website";
const MAX_BODY_SIZE = 1024 * 1024; // 1MB
const ALLOWED_CONTACT_METHODS = ["Email", "Phone", "Text"] as const;
const ALLOWED_LOCATIONS = ["Queen Anne", "Bellevue", "Telepsychiatry (if available)"] as const;
const ALLOWED_TREATMENT_TYPES = [
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
const ALLOWED_SELF_PAY_OPTIONS = ["Yes, I am interested in self-pay.", "No.", "I would like more information."] as const;
const ALLOWED_YES_NO = ["Yes", "No"] as const;
const ALLOWED_YES_NO_NOT_SURE = ["Yes", "No", "Not sure"] as const;
const ALLOWED_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
const ALLOWED_TIMES = ["Morning", "Afternoon", "Evening"] as const;
const ALLOWED_REFERRAL_SOURCES = [
  "Google",
  "Social Media",
  "Friend/Family",
  "Healthcare Provider",
  "Insurance Provider",
  "Psychology Today",
  "Other",
] as const;
const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_FIELD_LENGTH = 5000;

function getClientIP(request: NextRequest): string {
  // Try various headers for IP (considering proxies)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  return "unknown";
}

/**
 * Enhanced sanitize function to prevent XSS and injection attacks
 * Moved outside handler for better performance (not recreated on each request)
 */
function sanitize(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script tags and event handlers
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    // Remove potentially dangerous characters
    .replace(/[<>"`]/g, '')
    // Limit length to prevent DoS
    .slice(0, MAX_FIELD_LENGTH);
}

export async function POST(request: NextRequest) {
  try {
    // Validate Content-Type header
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type. Expected application/json." },
        { status: 400 }
      );
    }

    // Origin/Referer validation for CSRF protection
    // In production, validate against allowed origins
    if (process.env.NODE_ENV === 'production') {
      const origin = request.headers.get("origin");
      const referer = request.headers.get("referer");
      const allowedOrigin = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.findyourlightpsychiatry.org';
      
      // Extract hostname for comparison
      try {
        const allowedUrl = new URL(allowedOrigin);
        const allowedHost = allowedUrl.hostname;
        const baseHost = allowedHost.replace(/^www\./, '');
        const wwwHost = `www.${baseHost}`;
        
        // Check both origin and referer headers
        let isAllowed = false;
        
        // Check origin header
        if (origin) {
          try {
            const originUrl = new URL(origin);
            const originHost = originUrl.hostname;
            isAllowed = originHost === allowedHost || 
                       originHost === baseHost ||
                       originHost === wwwHost ||
                       originHost === allowedHost.replace('www.', '');
          } catch {
            // Invalid origin URL format - check referer instead
          }
        }
        
        // If origin check didn't pass, check referer header
        if (!isAllowed && referer) {
          try {
            const refererUrl = new URL(referer);
            const refererHost = refererUrl.hostname;
            isAllowed = refererHost === allowedHost || 
                       refererHost === baseHost ||
                       refererHost === wwwHost ||
                       refererHost === allowedHost.replace('www.', '');
          } catch {
            // Invalid referer URL format
          }
        }
        
        // If neither origin nor referer match, reject the request
        if (!isAllowed && (origin || referer)) {
          logger.warn("CSRF: Invalid origin/referer", { origin, referer, allowedOrigin });
          return NextResponse.json(
            { error: "Invalid request origin" },
            { status: 403 }
          );
        }
      } catch {
        // Invalid allowedOrigin format - skip validation (shouldn't happen)
        logger.error("Invalid NEXT_PUBLIC_BASE_URL format", { allowedOrigin });
      }
    }

    // Rate limiting - validate IP first
    const ip = getClientIP(request);
    if (ip && ip !== 'unknown') {
      if (!checkRateLimit(ip)) {
        logger.warn("Rate limit exceeded", { ip });
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    }

    // Check content length header if available
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: "Request body too large" },
        { status: 413 }
      );
    }

    // Parse and validate JSON body with timeout protection
    let body;
    try {
      const bodyText = await request.text();
      
      // Check if body text is empty
      if (!bodyText || bodyText.trim().length === 0) {
        return NextResponse.json(
          { error: "Request body is empty" },
          { status: 400 }
        );
      }
      
      if (bodyText.length > MAX_BODY_SIZE) {
        return NextResponse.json(
          { error: "Request body too large" },
          { status: 413 }
        );
      }
      
      body = JSON.parse(bodyText);
    } catch (parseError) {
      logger.error("JSON parse error", parseError);
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }
    
    // Validate body is an object
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    // Honeypot check - if this field is filled, it's likely a bot
    if (body[HONEYPOT_FIELD] && body[HONEYPOT_FIELD].trim() !== "") {
      // Silently reject - don't let bots know the honeypot worked
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate required fields with safe destructuring
    const name = typeof body.name === 'string' ? body.name : '';
    const dob = typeof body.dob === 'string' ? body.dob : '';
    const email = typeof body.email === 'string' ? body.email : '';
    const phone = typeof body.phone === 'string' ? body.phone : '';
    const contactMethod = typeof body.contactMethod === 'string' ? body.contactMethod : '';
    const locationPreference = typeof body.locationPreference === 'string' ? body.locationPreference : '';
    const hasInsurance = typeof body.hasInsurance === 'string' ? body.hasInsurance : '';
    const insuranceProvider = typeof body.insuranceProvider === 'string' ? body.insuranceProvider : '';
    const insuranceMemberId = typeof body.insuranceMemberId === 'string' ? body.insuranceMemberId : '';
    const insuranceInOwnName = typeof body.insuranceInOwnName === 'string' ? body.insuranceInOwnName : '';
    const subscriberName = typeof body.subscriberName === 'string' ? body.subscriberName : '';
    const subscriberDob = typeof body.subscriberDob === 'string' ? body.subscriberDob : '';
    const treatmentTypes: string[] = Array.isArray(body.treatmentTypes)
      ? body.treatmentTypes.filter((t: unknown): t is string => typeof t === 'string')
      : [];
    const selfPayOption = typeof body.selfPayOption === 'string' ? body.selfPayOption : '';
    const hasMentalHealthDiagnosis = typeof body.hasMentalHealthDiagnosis === 'string' ? body.hasMentalHealthDiagnosis : '';
    const diagnosisList = typeof body.diagnosisList === 'string' ? body.diagnosisList : '';
    const takingMedications = typeof body.takingMedications === 'string' ? body.takingMedications : '';
    const medicationsList = typeof body.medicationsList === 'string' ? body.medicationsList : '';
    const hasBeenHospitalized = typeof body.hasBeenHospitalized === 'string' ? body.hasBeenHospitalized : '';
    const hospitalizationDetails = typeof body.hospitalizationDetails === 'string' ? body.hospitalizationDetails : '';
    const reasonForCare = typeof body.reasonForCare === 'string' ? body.reasonForCare : '';
    const harmThoughts = typeof body.harmThoughts === 'string' ? body.harmThoughts : '';
    const triedAntidepressants = typeof body.triedAntidepressants === 'string' ? body.triedAntidepressants : '';
    const hasTransportation = typeof body.hasTransportation === 'string' ? body.hasTransportation : '';
    const preferredDays: string[] = Array.isArray(body.preferredDays)
      ? body.preferredDays.filter((d: unknown): d is string => typeof d === 'string')
      : [];
    const preferredTimes: string[] = Array.isArray(body.preferredTimes)
      ? body.preferredTimes.filter((t: unknown): t is string => typeof t === 'string')
      : [];
    const inTherapy = typeof body.inTherapy === 'string' ? body.inTherapy : '';
    const substanceUse = typeof body.substanceUse === 'string' ? body.substanceUse : '';
    const referralSource = typeof body.referralSource === 'string' ? body.referralSource : '';
    const consent1 = Boolean(body.consent1);
    const consent2 = Boolean(body.consent2);

    if (!name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!dob.trim()) {
      return NextResponse.json({ error: "Date of birth is required" }, { status: 400 });
    }

    if (!DATE_FORMAT_REGEX.test(dob)) {
      return NextResponse.json({ error: "Invalid date format. Please use YYYY-MM-DD format." }, { status: 400 });
    }

    const dateObj = new Date(dob + 'T00:00:00');
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateObj > today) {
      return NextResponse.json({ error: "Date of birth cannot be in the future" }, { status: 400 });
    }

    if (!phone.trim()) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const sanitizedPhoneDigits = phone.replace(/\D/g, '');
    if (sanitizedPhoneDigits.length < 10) {
      return NextResponse.json({ error: "Phone number must be at least 10 digits" }, { status: 400 });
    }

    if (!email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const sanitizedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(sanitizedEmail) || sanitizedEmail.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (!ALLOWED_CONTACT_METHODS.includes(contactMethod as typeof ALLOWED_CONTACT_METHODS[number])) {
      return NextResponse.json({ error: "Invalid contact method" }, { status: 400 });
    }

    if (!ALLOWED_LOCATIONS.includes(locationPreference as typeof ALLOWED_LOCATIONS[number])) {
      return NextResponse.json({ error: "Invalid location preference" }, { status: 400 });
    }

    if (!ALLOWED_YES_NO.includes(hasInsurance as typeof ALLOWED_YES_NO[number])) {
      return NextResponse.json({ error: "Insurance selection is required" }, { status: 400 });
    }

    if (hasInsurance === "Yes") {
      if (!insuranceProvider.trim()) {
        return NextResponse.json({ error: "Insurance provider is required" }, { status: 400 });
      }
      if (!ALLOWED_YES_NO.includes(insuranceInOwnName as typeof ALLOWED_YES_NO[number])) {
        return NextResponse.json({ error: "Please indicate whose name is on the insurance" }, { status: 400 });
      }
      if (insuranceInOwnName === "No") {
        if (!subscriberName.trim() || !subscriberDob.trim()) {
          return NextResponse.json({ error: "Subscriber name and date of birth are required" }, { status: 400 });
        }
        if (!DATE_FORMAT_REGEX.test(subscriberDob)) {
          return NextResponse.json({ error: "Invalid subscriber date format (YYYY-MM-DD)" }, { status: 400 });
        }
        const subDate = new Date(subscriberDob + 'T00:00:00');
        if (isNaN(subDate.getTime()) || subDate > today) {
          return NextResponse.json({ error: "Invalid subscriber date of birth" }, { status: 400 });
        }
      }
    }

    const sanitizedTreatments = treatmentTypes
      .filter((t) => ALLOWED_TREATMENT_TYPES.includes(t as typeof ALLOWED_TREATMENT_TYPES[number]))
      .map((t) => sanitize(t));

    if (!sanitizedTreatments.length) {
      return NextResponse.json({ error: "Please select at least one treatment type" }, { status: 400 });
    }

    if (!ALLOWED_YES_NO_NOT_SURE.includes(hasMentalHealthDiagnosis as typeof ALLOWED_YES_NO_NOT_SURE[number])) {
      return NextResponse.json({ error: "Mental health diagnosis answer is required" }, { status: 400 });
    }
    if (hasMentalHealthDiagnosis === "Yes" && !diagnosisList.trim()) {
      return NextResponse.json({ error: "Please list your diagnoses" }, { status: 400 });
    }

    if (!ALLOWED_YES_NO.includes(takingMedications as typeof ALLOWED_YES_NO[number])) {
      return NextResponse.json({ error: "Medication question is required" }, { status: 400 });
    }
    if (takingMedications === "Yes" && !medicationsList.trim()) {
      return NextResponse.json({ error: "Please list your medications" }, { status: 400 });
    }

    if (!ALLOWED_YES_NO.includes(hasBeenHospitalized as typeof ALLOWED_YES_NO[number])) {
      return NextResponse.json({ error: "Hospitalization question is required" }, { status: 400 });
    }

    if (!reasonForCare.trim()) {
      return NextResponse.json({ error: "Reason for seeking care is required" }, { status: 400 });
    }

    if (!ALLOWED_YES_NO.includes(harmThoughts as typeof ALLOWED_YES_NO[number])) {
      return NextResponse.json({ error: "Safety screening question is required" }, { status: 400 });
    }

    const spravatoSelected = sanitizedTreatments.includes("Spravato (Esketamine) Treatment");
    if (spravatoSelected) {
      if (!ALLOWED_YES_NO_NOT_SURE.includes(triedAntidepressants as typeof ALLOWED_YES_NO_NOT_SURE[number])) {
        return NextResponse.json({ error: "Please answer Spravato antidepressant question" }, { status: 400 });
      }
      if (!ALLOWED_YES_NO.includes(hasTransportation as typeof ALLOWED_YES_NO[number])) {
        return NextResponse.json({ error: "Please answer Spravato transportation question" }, { status: 400 });
      }
    }

    if (!consent1 || !consent2) {
      return NextResponse.json({ error: "All required consents must be accepted" }, { status: 400 });
    }

    // Safety guardrail: do not accept submissions indicating active harm thoughts
    if (harmThoughts === "Yes") {
      logger.warn("Safety screening flagged harm thoughts", { email: sanitizedEmail, name: sanitize(name) });
      return NextResponse.json(
        {
          error:
            "If you are in crisis or having thoughts of harming yourself or others, please call 988 or go to the nearest emergency room. This form is not for emergencies.",
        },
        { status: 400 }
      );
    }

    const normalizedInsuranceInOwnName: "" | "Yes" | "No" =
      hasInsurance === "Yes" ? (insuranceInOwnName as "Yes" | "No") : "";

    const sanitizedData = {
      name: sanitize(name),
      dob: sanitize(dob),
      email: sanitizedEmail,
      phone: sanitize(phone).replace(/[^\d+\-() ]/g, ''),
      contactMethod: contactMethod as typeof ALLOWED_CONTACT_METHODS[number],
      locationPreference: locationPreference as typeof ALLOWED_LOCATIONS[number],
      hasInsurance: hasInsurance as typeof ALLOWED_YES_NO[number],
      insuranceProvider: insuranceProvider ? sanitize(insuranceProvider) : "",
      insuranceMemberId: insuranceMemberId ? sanitize(insuranceMemberId) : "",
      insuranceInOwnName: normalizedInsuranceInOwnName,
      subscriberName: subscriberName ? sanitize(subscriberName) : "",
      subscriberDob: subscriberDob ? sanitize(subscriberDob) : "",
      treatmentTypes: sanitizedTreatments,
      selfPayOption: selfPayOption && ALLOWED_SELF_PAY_OPTIONS.includes(selfPayOption as typeof ALLOWED_SELF_PAY_OPTIONS[number])
        ? (selfPayOption as typeof ALLOWED_SELF_PAY_OPTIONS[number])
        : "",
      hasMentalHealthDiagnosis: hasMentalHealthDiagnosis as typeof ALLOWED_YES_NO_NOT_SURE[number],
      diagnosisList: diagnosisList ? sanitize(diagnosisList) : "",
      takingMedications: takingMedications as typeof ALLOWED_YES_NO[number],
      medicationsList: medicationsList ? sanitize(medicationsList) : "",
      hasBeenHospitalized: hasBeenHospitalized as typeof ALLOWED_YES_NO[number],
      hospitalizationDetails: hospitalizationDetails ? sanitize(hospitalizationDetails) : "",
      reasonForCare: sanitize(reasonForCare),
      harmThoughts: harmThoughts as typeof ALLOWED_YES_NO[number],
      triedAntidepressants: spravatoSelected ? (triedAntidepressants as typeof ALLOWED_YES_NO_NOT_SURE[number]) : "",
      hasTransportation: spravatoSelected ? (hasTransportation as typeof ALLOWED_YES_NO[number]) : "",
      preferredDays: preferredDays
        .filter((d) => ALLOWED_DAYS.includes(d as typeof ALLOWED_DAYS[number]))
        .map((d) => sanitize(d)),
      preferredTimes: preferredTimes
        .filter((t) => ALLOWED_TIMES.includes(t as typeof ALLOWED_TIMES[number]))
        .map((t) => sanitize(t)),
      inTherapy: inTherapy && ALLOWED_YES_NO.includes(inTherapy as typeof ALLOWED_YES_NO[number]) ? (inTherapy as typeof ALLOWED_YES_NO[number]) : "",
      substanceUse: substanceUse && ALLOWED_YES_NO.includes(substanceUse as typeof ALLOWED_YES_NO[number]) ? (substanceUse as typeof ALLOWED_YES_NO[number]) : "",
      referralSource: referralSource && ALLOWED_REFERRAL_SOURCES.includes(referralSource as typeof ALLOWED_REFERRAL_SOURCES[number])
        ? (referralSource as typeof ALLOWED_REFERRAL_SOURCES[number])
        : "",
      consent1: Boolean(consent1),
      consent2: Boolean(consent2),
      submittedAt: new Date().toISOString(),
    };

    // Log the submission
    logger.info("Contact form submission received", { email: sanitizedData.email, name: sanitizedData.name });

    // Send email to practice (critical - this must succeed)
    let practiceEmailSent = false;
    try {
      await sendPracticeEmail(sanitizedData);
      practiceEmailSent = true;
      logger.info("Practice notification email sent successfully", { email: sanitizedData.email });
    } catch (emailError) {
      logger.error("Failed to send practice notification email", emailError);
      // Return error if practice email fails - this is critical functionality
      return NextResponse.json(
        { 
          error: "Failed to send your message. Please try again later or contact us directly.",
          details: process.env.NODE_ENV === 'development' ? String(emailError) : undefined
        },
        { status: 500 }
      );
    }

    // Send confirmation email to patient (optional, don't fail if this fails)
    if (practiceEmailSent) {
      try {
        await sendConfirmationEmail(sanitizedData);
        logger.info("Confirmation email sent successfully", { email: sanitizedData.email });
      } catch (emailError) {
        // Silently fail for confirmation email - it's optional
        logger.warn("Failed to send confirmation email (non-critical)", emailError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your request. We will contact you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Contact form error", error);
    // Provide more helpful error messages in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `An error occurred: ${error instanceof Error ? error.message : String(error)}`
      : "An error occurred. Please try again later.";
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}




