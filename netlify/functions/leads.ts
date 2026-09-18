import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import nodemailer from 'nodemailer';

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'workwithoffice0315@gmail.com';
const DEFAULT_WHATSAPP = process.env.ADMIN_WHATSAPP || '919876543210';

interface LeadPayload {
  id?: string;
  type: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  serviceOrRole?: string;
  message?: string;
  additionalData?: any;
  createdAt?: string;
  status?: string;
  notes?: string;
}

// In-memory cache across warm function invocations
const leadsCache: LeadPayload[] = [];

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  // GET: Return leads list
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, leads: leadsCache }),
    };
  }

  // POST: Receive new lead
  if (event.httpMethod === 'POST') {
    try {
      const data: LeadPayload = JSON.parse(event.body || '{}');

      if (!data.fullName && !data.phone && !data.email) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Please provide at least Name and Phone or Email' }),
        };
      }

      const newLead: LeadPayload = {
        id: data.id || `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: data.type || 'consultation',
        fullName: data.fullName || 'Anonymous Visitor',
        email: data.email || '',
        phone: data.phone || '',
        companyName: data.companyName || '',
        serviceOrRole: data.serviceOrRole || 'General Inquiry',
        message: data.message || '',
        additionalData: data.additionalData || {},
        createdAt: new Date().toISOString(),
        status: 'new',
        notes: '',
      };

      leadsCache.unshift(newLead);
      if (leadsCache.length > 200) leadsCache.pop();

      // Build WhatsApp URL
      const cleanPhone = (DEFAULT_WHATSAPP || '').replace(/[^0-9]/g, '');
      const waText = `*New Inquiry from Basco Group Website*%0A%0A` +
        `*Name:* ${encodeURIComponent(newLead.fullName)}%0A` +
        `*Phone:* ${encodeURIComponent(newLead.phone || 'N/A')}%0A` +
        `*Email:* ${encodeURIComponent(newLead.email || 'N/A')}%0A` +
        (newLead.companyName ? `*Company:* ${encodeURIComponent(newLead.companyName)}%0A` : '') +
        (newLead.serviceOrRole ? `*Service:* ${encodeURIComponent(newLead.serviceOrRole)}%0A` : '') +
        (newLead.message ? `*Message:* ${encodeURIComponent(newLead.message)}%0A` : '') +
        `%0A_Source: www.bascogroup.co.in_`;

      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

      // Email dispatch if SMTP environment variables are set in Netlify
      const smtpHost = process.env.SMTP_HOST;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (smtpHost && smtpUser && smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: parseInt(process.env.SMTP_PORT || '587', 10),
            secure: process.env.SMTP_SECURE === 'true',
            auth: { user: smtpUser, pass: smtpPass },
          });

          await transporter.sendMail({
            from: `"Basco Group Portal" <${smtpUser}>`,
            to: process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL,
            subject: `[Basco Group Lead] New ${newLead.type.toUpperCase()}: ${newLead.fullName}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #1e3a8a;">New Inquiry Received - Basco Group</h2>
                <p><strong>Name:</strong> ${newLead.fullName}</p>
                <p><strong>Phone:</strong> <a href="tel:${newLead.phone}">${newLead.phone}</a></p>
                <p><strong>Email:</strong> <a href="mailto:${newLead.email}">${newLead.email}</a></p>
                ${newLead.companyName ? `<p><strong>Company:</strong> ${newLead.companyName}</p>` : ''}
                ${newLead.serviceOrRole ? `<p><strong>Service:</strong> ${newLead.serviceOrRole}</p>` : ''}
                <p><strong>Message:</strong></p>
                <div style="background: #f8fafc; padding: 12px; border-radius: 6px;">${newLead.message || 'None'}</div>
              </div>
            `,
          });
        } catch (emailErr) {
          console.warn('Netlify Function SMTP dispatch error:', emailErr);
        }
      } else {
        console.log(`[Netlify Lead Logged] New Lead for ${DEFAULT_ADMIN_EMAIL}: ${newLead.fullName} (${newLead.phone})`);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          lead: newLead,
          whatsappUrl,
          message: `Inquiry recorded successfully. Dispatched to ${DEFAULT_ADMIN_EMAIL}.`,
        }),
      };
    } catch (err: any) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to process lead', details: err?.message }),
      };
    }
  }

  // PUT: Update lead status
  if (event.httpMethod === 'PUT') {
    try {
      const { id, status, notes } = JSON.parse(event.body || '{}');
      const lead = leadsCache.find((l) => l.id === id);
      if (lead) {
        if (status) lead.status = status;
        if (notes !== undefined) lead.notes = notes;
      }
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, lead }),
      };
    } catch (err: any) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: err?.message }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method Not Allowed' }),
  };
};
