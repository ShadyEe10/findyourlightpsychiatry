import { Resend } from 'resend';

// Initialize Resend client
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface ContactFormData {
  name: string;
  dob: string;
  email: string;
  phone?: string;
  insurance?: string;
  appointmentType: string;
  contactMethod: string;
  message?: string;
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
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #059669; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #059669; }
          .value { margin-top: 5px; padding: 8px; background-color: white; border-radius: 4px; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Appointment Request</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${escapeHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="label">Date of Birth:</div>
              <div class="value">${escapeHtml(data.dob)}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${escapeHtml(data.email)}</div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${escapeHtml(data.phone)}</div>
            </div>
            ` : ''}
            ${data.insurance ? `
            <div class="field">
              <div class="label">Insurance:</div>
              <div class="value">${escapeHtml(data.insurance)}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Appointment Type:</div>
              <div class="value">${escapeHtml(data.appointmentType)}</div>
            </div>
            <div class="field">
              <div class="label">Preferred Contact Method:</div>
              <div class="value">${escapeHtml(data.contactMethod)}</div>
            </div>
            ${data.message ? `
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${escapeHtml(data.message)}</div>
            </div>
            ` : ''}
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
            
            <p>Thank you for reaching out to Find Your Light Psychiatry. We have received your appointment request and appreciate you taking this important step toward your mental wellness journey.</p>
            
            <div class="highlight-box">
              <p>What Happens Next</p>
              <p>Our team will carefully review your request and contact you via ${escapeHtml(data.contactMethod)} within 1-2 business days to schedule your ${escapeHtml(data.appointmentType.toLowerCase())} appointment and discuss next steps.</p>
            </div>
            
            <div class="info-section">
              <p><strong>Your Request Details:</strong></p>
              <p>• Preferred Appointment Type: ${escapeHtml(data.appointmentType)}</p>
              <p>• Preferred Contact Method: ${escapeHtml(data.contactMethod)}</p>
              ${data.insurance ? `<p>• Insurance Provider: ${escapeHtml(data.insurance)}</p>` : ''}
            </div>
            
            <p>At Find Your Light Psychiatry, we believe that healing begins with understanding. Led by April Casselman, PMHNP-BC, our practice provides personalized, evidence-based mental health care designed to help you restore balance, peace, and purpose through compassionate connection and research-driven treatment.</p>
            
            <p>We offer comprehensive psychiatric services including medication management, TMS therapy, psychotherapy, Qb testing for ADHD, and specialized care for children and adolescents. Our services are available both in-person in Seattle and Bellevue, and via telehealth throughout Washington State.</p>
            
            <div class="urgent-notice">
              <strong>⚠️ Important Notice</strong>
              <p>If you are experiencing a mental health emergency or having thoughts of self-harm, please call <strong>988</strong> (Suicide & Crisis Lifeline) immediately or go to your nearest emergency room. This form is for non-urgent appointment requests only.</p>
            </div>
            
            <p>We look forward to supporting you on your path to wellness and helping you find your light.</p>
            
            <p style="margin-top: 24px; font-size: 15px; color: #4b5563;">If you have any questions before we contact you, please visit our website at <a href="https://www.findyourlightpsychiatry.org" style="color: #059669; text-decoration: underline;">www.findyourlightpsychiatry.org</a> or call our office directly.</p>
            
            <div class="signature">
              <p class="signature-name">April Casselman, PMHNP-BC</p>
              <p class="signature-title">Psychiatric Mental Health Nurse Practitioner</p>
              <p style="margin-top: 16px;">Find Your Light Psychiatry PLLC</p>
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
      subject: `New Appointment Request from ${escapeHtml(data.name)}`,
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

