import { Resend } from 'resend';

// Initialize Resend client
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface ContactFormData {
  name: string;
  dob: string;
  email: string;
  phone: string;
  contactMethod: string;
  locationPreference: string;
  hasInsurance: "Yes" | "No";
  insuranceProvider: string;
  insuranceMemberId: string;
  insuranceInOwnName: "Yes" | "No" | "";
  subscriberName: string;
  subscriberDob: string;
  treatmentTypes: string[];
  selfPayOption: string;
  hasMentalHealthDiagnosis: "Yes" | "No" | "Not sure";
  diagnosisList: string;
  takingMedications: "Yes" | "No";
  medicationsList: string;
  hasBeenHospitalized: "Yes" | "No";
  hospitalizationDetails: string;
  reasonForCare: string;
  harmThoughts: "Yes" | "No";
  triedAntidepressants: string;
  hasTransportation: string;
  preferredDays: string[];
  preferredTimes: string[];
  inTherapy: string;
  substanceUse: string;
  referralSource: string;
  consent1: boolean;
  consent2: boolean;
  submittedAt: string;
}

/**
 * Format email template for practice notification
 */
function formatPracticeEmail(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; background: #f3f4f6; margin: 0; padding: 0; }
          .container { max-width: 720px; margin: 0 auto; padding: 0 16px 32px; }
          .header { background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #fff; padding: 24px; border-radius: 12px 12px 0 0; }
          .header h2 { margin: 0; font-size: 24px; }
          .content { background: #ffffff; padding: 24px; border-radius: 0 0 12px 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
          .section { margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid #e5e7eb; }
          .section:last-child { border-bottom: 0; margin-bottom: 0; padding-bottom: 0; }
          .section h3 { margin: 0 0 8px; font-size: 17px; color: #0f172a; }
          .field { margin: 6px 0; }
          .label { font-weight: 600; color: #374151; }
          .value { margin-left: 4px; color: #111827; }
          .list { margin: 6px 0 6px 16px; padding: 0; }
          .pill { display: inline-block; background: #ecfdf3; color: #065f46; padding: 6px 10px; border-radius: 999px; margin: 4px 4px 0 0; font-size: 13px; }
          .alert { background: #fef2f2; border: 1px solid #ef4444; color: #991b1b; padding: 12px; border-radius: 10px; margin-top: 8px; }
          .footer { margin-top: 20px; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Patient Intake Submission</h2>
            <p style="margin: 6px 0 0; font-size: 14px; opacity: .9;">Find Your Light Psychiatry</p>
          </div>
          <div class="content">
            <div class="section">
              <h3>Patient Information</h3>
              <div class="field"><span class="label">Name:</span><span class="value">${escapeHtml(data.name)}</span></div>
              <div class="field"><span class="label">DOB:</span><span class="value">${escapeHtml(data.dob)}</span></div>
              <div class="field"><span class="label">Phone:</span><span class="value">${escapeHtml(data.phone)}</span></div>
              <div class="field"><span class="label">Email:</span><span class="value">${escapeHtml(data.email)}</span></div>
              <div class="field"><span class="label">Preferred Contact:</span><span class="value">${escapeHtml(data.contactMethod)}</span></div>
              <div class="field"><span class="label">Location Preference:</span><span class="value">${escapeHtml(data.locationPreference)}</span></div>
            </div>

            <div class="section">
              <h3>Insurance</h3>
              <div class="field"><span class="label">Has Insurance:</span><span class="value">${escapeHtml(data.hasInsurance)}</span></div>
              ${data.hasInsurance === "Yes" ? `
                <div class="field"><span class="label">Provider:</span><span class="value">${escapeHtml(data.insuranceProvider || "Not provided")}</span></div>
                ${data.insuranceMemberId ? `<div class="field"><span class="label">Member ID:</span><span class="value">${escapeHtml(data.insuranceMemberId)}</span></div>` : ""}
                <div class="field"><span class="label">In Own Name:</span><span class="value">${escapeHtml(data.insuranceInOwnName || "Unknown")}</span></div>
                ${data.insuranceInOwnName === "No" ? `
                  <div class="field"><span class="label">Subscriber:</span><span class="value">${escapeHtml(data.subscriberName || "Not provided")}</span></div>
                  <div class="field"><span class="label">Subscriber DOB:</span><span class="value">${escapeHtml(data.subscriberDob || "Not provided")}</span></div>
                ` : ""}
              ` : `
                <div class="field"><span class="label">Self-Pay Option:</span><span class="value">${escapeHtml(data.selfPayOption || "Not provided")}</span></div>
              `}
            </div>

            <div class="section">
              <h3>Requested Treatment</h3>
              <div class="field">
                <span class="label">Types:</span>
                <div>
                  ${(data.treatmentTypes || []).map((t) => `<span class="pill">${escapeHtml(t)}</span>`).join('') || '<span class="value">Not provided</span>'}
                </div>
              </div>
              ${data.treatmentTypes.includes("Spravato (Esketamine) Treatment") ? `
                <div class="field"><span class="label">Tried 2+ Antidepressants:</span><span class="value">${escapeHtml(data.triedAntidepressants || "Not provided")}</span></div>
                <div class="field"><span class="label">Transportation Available:</span><span class="value">${escapeHtml(data.hasTransportation || "Not provided")}</span></div>
              ` : ""}
            </div>

            <div class="section">
              <h3>Mental Health History</h3>
              <div class="field"><span class="label">Diagnosed:</span><span class="value">${escapeHtml(data.hasMentalHealthDiagnosis)}</span></div>
              ${data.diagnosisList ? `<div class="field"><span class="label">Diagnoses:</span><span class="value">${escapeHtml(data.diagnosisList)}</span></div>` : ""}
              <div class="field"><span class="label">Currently on Medications:</span><span class="value">${escapeHtml(data.takingMedications)}</span></div>
              ${data.medicationsList ? `<div class="field"><span class="label">Medications:</span><span class="value">${escapeHtml(data.medicationsList)}</span></div>` : ""}
              <div class="field"><span class="label">Hospitalized Before:</span><span class="value">${escapeHtml(data.hasBeenHospitalized)}</span></div>
              ${data.hospitalizationDetails ? `<div class="field"><span class="label">Hospitalization Details:</span><span class="value">${escapeHtml(data.hospitalizationDetails)}</span></div>` : ""}
            </div>

            <div class="section">
              <h3>Reason for Seeking Care</h3>
              <div class="field"><span class="value">${escapeHtml(data.reasonForCare)}</span></div>
            </div>

            <div class="section">
              <h3>Safety Screening</h3>
              <div class="field"><span class="label">Thoughts of Harm:</span><span class="value">${escapeHtml(data.harmThoughts)}</span></div>
              ${data.harmThoughts === "Yes" ? `<div class="alert"><strong>Immediate Attention:</strong> Patient reported thoughts of self-harm or harm to others. Follow crisis protocol.</div>` : ""}
            </div>

            <div class="section">
              <h3>Availability</h3>
              <div class="field"><span class="label">Preferred Days:</span><span class="value">${data.preferredDays?.length ? escapeHtml(data.preferredDays.join(", ")) : "Not provided"}</span></div>
              <div class="field"><span class="label">Preferred Times:</span><span class="value">${data.preferredTimes?.length ? escapeHtml(data.preferredTimes.join(", ")) : "Not provided"}</span></div>
            </div>

            <div class="section">
              <h3>Additional Information</h3>
              <div class="field"><span class="label">Currently in Therapy:</span><span class="value">${escapeHtml(data.inTherapy || "Not provided")}</span></div>
              <div class="field"><span class="label">Recent Substance Use:</span><span class="value">${escapeHtml(data.substanceUse || "Not provided")}</span></div>
              <div class="field"><span class="label">Referral Source:</span><span class="value">${escapeHtml(data.referralSource || "Not provided")}</span></div>
            </div>

            <div class="footer">
              <p>Submitted at: ${new Date(data.submittedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Format confirmation email for patient
 */
function formatConfirmationEmail(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Georgia', 'Times New Roman', serif; line-height: 1.8; color: #1f2937; margin: 0; padding: 0; background-color: #f9fafb; }
          .container { max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff; }
          .header { background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 32px 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 400; letter-spacing: 0.5px; }
          .header p { margin: 8px 0 0 0; font-size: 14px; opacity: 0.95; font-style: italic; }
          .content { padding: 32px 24px; background-color: #ffffff; }
          .content p { margin: 0 0 20px 0; font-size: 16px; color: #374151; }
          .content p:last-of-type { margin-bottom: 0; }
          .greeting { font-size: 18px; color: #111827; margin-bottom: 24px !important; }
          .highlight-box { background-color: #f0fdf4; border-left: 4px solid #059669; padding: 16px 20px; margin: 24px 0; border-radius: 4px; }
          .highlight-box p { margin: 8px 0; font-size: 15px; }
          .highlight-box p:first-child { margin-top: 0; font-weight: 600; color: #065f46; }
          .highlight-box p:last-child { margin-bottom: 0; }
          .info-section { margin: 28px 0; padding: 20px; background-color: #f9fafb; border-radius: 8px; }
          .info-section p { margin: 0 0 12px 0; font-size: 15px; }
          .info-section p:last-child { margin-bottom: 0; }
          .signature { margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; }
          .signature p { margin: 8px 0; font-size: 16px; }
          .signature-name { font-weight: 600; color: #059669; }
          .signature-title { font-size: 14px; color: #6b7280; font-style: italic; }
          .footer { background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb; }
          .footer p { margin: 4px 0; font-size: 12px; color: #6b7280; line-height: 1.6; }
          .urgent-notice { background-color: #fef3c7; border: 1px solid #fbbf24; padding: 16px; margin: 24px 0; border-radius: 6px; }
          .urgent-notice p { margin: 0; font-size: 14px; color: #92400e; }
          .urgent-notice strong { display: block; margin-bottom: 8px; font-size: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Find Your Light Psychiatry PLLC</h1>
            <p>Compassionate, Evidence-Based Care for Mind, Body, and Soul</p>
          </div>
          <div class="content">
            <p class="greeting">Dear ${escapeHtml(data.name)},</p>
            <p>Thank you for submitting your intake form. We appreciate you taking this step toward your mental wellness.</p>

            <div class="highlight-box">
              <p>What Happens Next</p>
              <p>Our team will review your information and contact you via ${escapeHtml(data.contactMethod)} within 1-2 business days to discuss next steps for your preferred location (${escapeHtml(data.locationPreference)}).</p>
            </div>

            <div class="info-section">
              <p><strong>Your Request Details:</strong></p>
              <p>• Location Preference: ${escapeHtml(data.locationPreference)}</p>
              <p>• Preferred Contact Method: ${escapeHtml(data.contactMethod)}</p>
              <p>• Requested Treatments: ${(data.treatmentTypes || []).map((t) => escapeHtml(t)).join(", ") || "Not specified"}</p>
              <p>• Insurance: ${escapeHtml(data.hasInsurance)}${data.hasInsurance === "Yes" && data.insuranceProvider ? ` (${escapeHtml(data.insuranceProvider)})` : ""}</p>
            </div>

            ${data.treatmentTypes.includes("Spravato (Esketamine) Treatment") ? `
              <div class="info-section">
                <p><strong>Spravato Information</strong></p>
                <p>You indicated interest in Spravato (esketamine) treatment. Please review our patient information packet here:</p>
                <p><a href="https://www.findyourlightpsychiatry.org/documents/spravato/Spravato_Patient_Information.pdf" style="color: #059669; text-decoration: underline;">Spravato Patient Information (PDF)</a></p>
              </div>
            ` : ""}

            ${data.harmThoughts === "Yes" ? `
              <div class="urgent-notice">
                <strong>⚠️ Important Safety Notice</strong>
                <p>You indicated experiencing thoughts of harming yourself or others. Please call <strong>988</strong> (Suicide & Crisis Lifeline), go to the nearest emergency room, or call 911 if you are in immediate danger. This inbox is not monitored for emergencies.</p>
              </div>
            ` : `
              <div class="urgent-notice">
                <strong>Need Help Sooner?</strong>
                <p>If you experience a mental health emergency, call <strong>988</strong> (Suicide & Crisis Lifeline) or go to the nearest emergency room.</p>
              </div>
            `}

            <p>We look forward to supporting you on your path to wellness and helping you find your light.</p>

            <p style="margin-top: 24px; font-size: 15px; color: #4b5563;">If you have any questions before we contact you, please visit <a href="https://www.findyourlightpsychiatry.org" style="color: #059669; text-decoration: underline;">www.findyourlightpsychiatry.org</a> or call our office directly.</p>

            <div class="signature">
              <p class="signature-name">Find Your Light Psychiatry Team</p>
              <p class="signature-title">Compassionate, evidence-based care</p>
            </div>
          </div>
          <div class="footer">
            <p><strong>Find Your Light Psychiatry PLLC</strong></p>
            <p>HIPAA-Compliant In-Person & Telepsychiatry Services</p>
            <p>Seattle, Washington | Telehealth Statewide</p>
            <p style="margin-top: 16px; font-size: 11px; color: #9ca3af;">This is an automated confirmation email. Please do not reply directly to this message. For questions or to update your appointment request, please contact us through our website or call our office directly.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Get the from email address from environment variables
 * Supports both RESEND_FROM (combined format: "Name <email>") and separate RESEND_FROM_EMAIL/RESEND_FROM_NAME
 */
function getFromEmail(): string {
  // First try RESEND_FROM (combined format)
  if (process.env.RESEND_FROM) {
    return process.env.RESEND_FROM;
  }
  
  // Fall back to separate variables
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@findyourlightpsychiatry.org';
  const fromName = process.env.RESEND_FROM_NAME || 'Find Your Light Psychiatry';
  return `${fromName} <${fromEmail}>`;
}

/**
 * Get the contact email address where practice notifications should be sent
 */
function getContactEmail(): string {
  const contactEmail =
    process.env.CONTACT_EMAIL ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    'contact@findyourlightpsychiatry.org';

  if (!contactEmail) {
    throw new Error('CONTACT_EMAIL environment variable is required. Please set it in your environment configuration.');
  }

  return contactEmail.trim();
}

/**
 * Send email to practice about new contact form submission
 */
export async function sendPracticeEmail(data: ContactFormData): Promise<boolean> {
  if (!resend) {
    throw new Error('Resend API key not configured. Please set RESEND_API_KEY environment variable.');
  }

  const practiceEmail = getContactEmail();
  const fromEmail = getFromEmail();

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: practiceEmail,
      replyTo: data.email,
      subject: `New Patient Intake - ${escapeHtml(data.name)}`,
      html: formatPracticeEmail(data),
    });

    if (result.error) {
      throw new Error(result.error.message || 'Failed to send email');
    }

    return true;
  } catch (error) {
    throw error;
  }
}

/**
 * Send confirmation email to patient
 */
export async function sendConfirmationEmail(data: ContactFormData): Promise<boolean> {
  if (!resend) {
    // Don't throw error for confirmation email - it's optional
    return false;
  }

  const fromEmail = getFromEmail();

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: data.email,
      subject: 'Appointment Request Confirmed - Find Your Light Psychiatry PLLC',
      html: formatConfirmationEmail(data),
    });

    if (result.error) {
      // Log but don't throw - confirmation email is optional
      return false;
    }

    return true;
  } catch {
    // Log but don't throw - confirmation email is optional
    return false;
  }
}

