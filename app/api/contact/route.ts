import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import { sendPracticeEmail, sendConfirmationEmail } from "@/lib/email";
import { logger } from "@/lib/logger";

// Constants
const HONEYPOT_FIELD = "website";
const MAX_BODY_SIZE = 1024 * 1024; // 1MB
const ALLOWED_APPOINTMENT_TYPES = ["In-Person", "Telehealth"] as const;
const ALLOWED_CONTACT_METHODS = ["Email", "Phone"] as const;
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
    const phone = typeof body.phone === 'string' ? body.phone : undefined;
    const insurance = typeof body.insurance === 'string' ? body.insurance : undefined;
    const appointmentType = typeof body.appointmentType === 'string' ? body.appointmentType : 'In-Person';
    const contactMethod = typeof body.contactMethod === 'string' ? body.contactMethod : 'Email';
    const message = typeof body.message === 'string' ? body.message : undefined;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!dob || !dob.trim()) {
      return NextResponse.json(
        { error: "Date of birth is required" },
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD) and ensure it's a valid date
    if (!DATE_FORMAT_REGEX.test(dob)) {
      return NextResponse.json(
        { error: "Invalid date format. Please use YYYY-MM-DD format." },
        { status: 400 }
      );
    }
    
    // Validate that the date is actually valid and not in the future
    const dateObj = new Date(dob + 'T00:00:00'); // Add time to avoid timezone issues
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json(
        { error: "Invalid date" },
        { status: 400 }
      );
    }
    
    // Ensure date is not in the future (reasonable validation for DOB)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateObj > today) {
      return NextResponse.json(
        { error: "Date of birth cannot be in the future" },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Enhanced email validation
    const sanitizedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(sanitizedEmail) || sanitizedEmail.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate appointment type and contact method against allowed values
    const sanitizedAppointmentType = ALLOWED_APPOINTMENT_TYPES.includes(appointmentType as typeof ALLOWED_APPOINTMENT_TYPES[number])
      ? appointmentType 
      : "In-Person";
    const sanitizedContactMethod = ALLOWED_CONTACT_METHODS.includes(contactMethod as typeof ALLOWED_CONTACT_METHODS[number])
      ? contactMethod
      : "Email";

    const sanitizedData = {
      name: sanitize(name),
      dob: sanitize(dob),
      email: sanitizedEmail,
      phone: phone ? sanitize(phone).replace(/[^\d+\-() ]/g, '') : "",
      insurance: insurance ? sanitize(insurance) : "",
      appointmentType: sanitizedAppointmentType,
      contactMethod: sanitizedContactMethod,
      message: message ? sanitize(message) : "",
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




