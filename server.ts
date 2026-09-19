import express from 'express';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Storage directory
const DATA_DIR = path.join(process.cwd(), 'server_data');
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create server_data directory:', err);
  }
}

const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Default initial settings
const DEFAULT_SETTINGS = {
  metaTitle: 'Basco Group | BPO, Call Center & Customer Support Services India',
  metaDescription:
    'Basco Group provides professional BPO, call center, customer support, contact center and business process outsourcing solutions for businesses in India and global markets.',
  metaKeywords:
    'BPO India, Call Center Services, Customer Support Outsourcing, Contact Center India, Business Process Outsourcing, Basco Group, Voice Support, CX Outsourcing',
  canonicalUrl: 'https://www.bascogroup.co.in',
  ogTitle: 'Basco Group | Smart Outsourcing. Better Customer Experiences.',
  ogDescription:
    'Enterprise-grade BPO, multichannel customer support, and contact center operations helping businesses scale efficiently.',
  ogImageUrl:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
  robotsIndexing: true,
  googleSiteVerification: '',

  metaPixelId: '',
  metaPixelSnippet: '',
  googleAnalyticsId: '',
  customHeadCode: '',
  customBodyCode: '',

  adminEmail: process.env.ADMIN_EMAIL || 'workwithoffice0315@gmail.com',
  adminWhatsApp: process.env.ADMIN_WHATSAPP || '918368481506',
  enableEmailAlerts: true,
  whatsappFloatingEnabled: true,
  whatsappButtonPosition: 'left',
  whatsappDefaultMessage:
    'Hello Basco Group team, I visited www.bascogroup.co.in and would like to discuss outsourcing services for my business.',
  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: process.env.SMTP_PORT || '587',
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
  smtpSecure: process.env.SMTP_SECURE === 'true',
};

// In-memory caching
let currentSettings = { ...DEFAULT_SETTINGS };
let leadsCache: any[] = [];

// Load initial settings
try {
  if (fs.existsSync(SETTINGS_FILE)) {
    const raw = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    currentSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } else {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
  }
} catch (e) {
  console.warn('Using default settings fallback:', e);
}

// Load initial leads
try {
  if (fs.existsSync(LEADS_FILE)) {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    leadsCache = JSON.parse(raw);
  } else {
    // Seed with a sample inquiry so admin dashboard is instantly demonstrative
    leadsCache = [
      {
        id: 'lead-sample-1',
        type: 'consultation',
        fullName: 'Vikram Mehta',
        email: 'vikram.m@zenithfin.in',
        phone: '+91 98200 45678',
        companyName: 'Zenith FinTech Solutions',
        serviceOrRole: 'Customer Support',
        message: 'Looking for 10 dedicated voice & chat agents for 24/7 financial support.',
        additionalData: { estimatedTeamSize: '5 – 15 agents', country: 'India' },
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: 'new',
        notes: 'Requested urgent quotation for tier-1 support.',
      },
      {
        id: 'lead-sample-2',
        type: 'callback',
        fullName: 'Sarah Jenkins',
        email: 'sjenkins@apexcommerce.co',
        phone: '+1 415 890 1234',
        companyName: 'Apex Commerce Inc',
        serviceOrRole: 'Contact Center Services',
        message: 'Requesting callback regarding holiday season inbound queue overflow.',
        additionalData: { preferredTime: '2:00 PM – 5:00 PM IST' },
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        status: 'contacted',
        notes: 'Call scheduled for tomorrow afternoon.',
      },
    ];
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leadsCache, null, 2));
  }
} catch (e) {
  console.warn('Leads storage load fallback:', e);
}

// Helper to save settings
function saveSettings(newSettings: any) {
  currentSettings = { ...currentSettings, ...newSettings };
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(currentSettings, null, 2));
  } catch (err) {
    console.error('Error saving settings to disk:', err);
  }
  return currentSettings;
}

// Helper to save leads
function saveLeads() {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leadsCache, null, 2));
  } catch (err) {
    console.error('Error saving leads to disk:', err);
  }
}

// Helper to send email notification
async function dispatchEmailNotification(lead: any) {
  const recipient = currentSettings.adminEmail || 'workwithoffice0315@gmail.com';
  const subject = `[Basco Group Lead] New ${lead.type.toUpperCase()}: ${lead.fullName} (${lead.companyName || 'Individual'})`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; }
          .card { background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 600px; margin: 0 auto; overflow: hidden; }
          .header { background-color: #1e3a8a; color: #ffffff; padding: 20px 24px; }
          .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
          .badge { display: inline-block; background-color: #3b82f6; color: white; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-top: 8px; }
          .content { padding: 24px; color: #334155; }
          .row { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
          .label { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
          .value { font-size: 15px; font-weight: 500; color: #0f172a; }
          .msg-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-top: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.5; color: #1e293b; }
          .actions { padding: 20px 24px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; }
          .btn { display: inline-block; padding: 10px 20px; background-color: #25d366; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; margin: 4px; }
          .btn-email { background-color: #2563eb; }
          .footer { text-align: center; padding: 16px; font-size: 12px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h2>New Inquiry Received - Basco Group</h2>
            <div class="badge">${lead.type}</div>
          </div>
          <div class="content">
            <div class="row">
              <div class="label">Lead Name</div>
              <div class="value">${lead.fullName || 'N/A'}</div>
            </div>
            <div class="row">
              <div class="label">Phone Number</div>
              <div class="value"><a href="tel:${lead.phone}">${lead.phone || 'N/A'}</a></div>
            </div>
            <div class="row">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${lead.email}">${lead.email || 'N/A'}</a></div>
            </div>
            ${
              lead.companyName
                ? `
            <div class="row">
              <div class="label">Company / Organization</div>
              <div class="value">${lead.companyName}</div>
            </div>`
                : ''
            }
            ${
              lead.serviceOrRole
                ? `
            <div class="row">
              <div class="label">Service / Role Requested</div>
              <div class="value">${lead.serviceOrRole}</div>
            </div>`
                : ''
            }
            <div class="row">
              <div class="label">Message / Requirements</div>
              <div class="msg-box">${lead.message || 'No additional message provided.'}</div>
            </div>
            <div class="row" style="border-bottom: none;">
              <div class="label">Timestamp</div>
              <div class="value">${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</div>
            </div>
          </div>
          <div class="actions">
            <a href="https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}" class="btn">Chat on WhatsApp</a>
            <a href="mailto:${lead.email}?subject=Re: Basco Group Inquiry - ${encodeURIComponent(lead.serviceOrRole || 'Consultation')}" class="btn btn-email">Reply by Email</a>
          </div>
          <div class="footer">
            Delivered automatically by Basco Group Website Engine for www.bascogroup.co.in
          </div>
        </div>
      </body>
    </html>
  `;

  let emailDispatched = false;
  let dispatchMethod = 'none';
  let dispatchDetails: any = null;

  // 1. Check if direct SMTP is configured
  const smtpHost = currentSettings.smtpHost || process.env.SMTP_HOST;
  const smtpUser = currentSettings.smtpUser || process.env.SMTP_USER;
  const smtpPass = currentSettings.smtpPass || process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(currentSettings.smtpPort || process.env.SMTP_PORT || '587', 10),
        secure: currentSettings.smtpSecure || process.env.SMTP_SECURE === 'true',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"Basco Group Portal" <${smtpUser}>`,
        to: recipient,
        subject,
        html,
      });
      console.log(`[EMAIL DISPATCHED VIA SMTP] To: ${recipient}, MessageId: ${info.messageId}`);
      emailDispatched = true;
      dispatchMethod = 'smtp';
      dispatchDetails = { messageId: info.messageId };
    } catch (err: any) {
      console.error('[EMAIL ERROR] Failed to send via SMTP:', err.message);
    }
  }

  // 2. Direct HTTP Gateway Dispatch via FormSubmit directly to recipient (works out-of-the-box)
  try {
    const gatewayPayload = {
      _subject: `New Lead: ${lead.fullName} (${lead.phone}) - Basco Group`,
      'Lead ID': lead.id,
      'Lead Category': (lead.type || 'consultation').toUpperCase(),
      'Full Name': lead.fullName,
      'Phone Number': lead.phone,
      'Work Email': lead.email || 'Not Provided',
      'Company Name': lead.companyName || 'Not Provided',
      'Service Required': lead.serviceOrRole || 'General Consultation',
      'Estimated Team Size': lead.additionalData?.estimatedTeamSize || 'Standard',
      'Country / Market': lead.additionalData?.country || 'India',
      'Operational Scope / Message': lead.message || 'Customer requested consultation review.',
      'Submitted At (IST)': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      _template: 'table',
      _captcha: 'false',
    };

    const gatewayRes = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Referer: 'https://www.bascogroup.co.in',
      },
      body: JSON.stringify(gatewayPayload),
    });

    const gatewayData: any = await gatewayRes.json().catch(() => ({}));
    console.log(`[EMAIL GATEWAY DISPATCH] Status: ${gatewayRes.status}, Response:`, gatewayData);
    if (gatewayRes.ok || gatewayData.success === 'true' || gatewayData.message) {
      emailDispatched = true;
      dispatchMethod = dispatchMethod === 'smtp' ? 'smtp+gateway' : 'gateway';
      dispatchDetails = { ...dispatchDetails, gateway: gatewayData };
    }
  } catch (gatewayErr: any) {
    console.error('[EMAIL GATEWAY ERROR]', gatewayErr.message);
  }

  return {
    sent: emailDispatched,
    recipient,
    method: dispatchMethod,
    details: dispatchDetails,
    timestamp: new Date().toISOString(),
  };
}

// ---------------- API ROUTES ----------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    domain: 'www.bascogroup.co.in',
    timestamp: new Date().toISOString(),
    adminEmail: currentSettings.adminEmail,
    whatsapp: currentSettings.adminWhatsApp,
  });
});

// GET site settings
app.get('/api/settings', (req, res) => {
  res.json(currentSettings);
});

// POST site settings
app.post('/api/settings', (req, res) => {
  try {
    const updated = saveSettings(req.body);
    res.json({ success: true, settings: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to save settings' });
  }
});

// GET all leads
app.get('/api/leads', (req, res) => {
  res.json(leadsCache);
});

// POST submit lead (Handles contact form, consultation modal, callback, careers)
app.post('/api/leads', async (req, res) => {
  try {
    const {
      type = 'contact',
      fullName,
      email,
      phone,
      companyName,
      serviceOrRole,
      message,
      additionalData,
    } = req.body;

    if (!fullName || (!phone && !email)) {
      return res.status(400).json({
        error: 'Full name and at least one contact channel (phone or email) are required.',
      });
    }

    const newLead = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type,
      fullName: String(fullName).trim(),
      email: String(email || '').trim(),
      phone: String(phone || '').trim(),
      companyName: String(companyName || '').trim(),
      serviceOrRole: String(serviceOrRole || '').trim(),
      message: String(message || '').trim(),
      additionalData: additionalData || {},
      createdAt: new Date().toISOString(),
      status: 'new',
      notes: '',
    };

    // Prepend new lead
    leadsCache.unshift(newLead);
    saveLeads();

    // 1. Dispatch Email Notification
    const emailResult = await dispatchEmailNotification(newLead);

    // 2. Build WhatsApp Click-to-Send URL for Admin
    const cleanWhatsApp = (currentSettings.adminWhatsApp || '919876543210').replace(/[^0-9]/g, '');
    const leadSummary =
      `*New Lead on Basco Group Website*\n` +
      `--------------------------------\n` +
      `*Type:* ${newLead.type.toUpperCase()}\n` +
      `*Name:* ${newLead.fullName}\n` +
      `*Phone:* ${newLead.phone}\n` +
      `*Email:* ${newLead.email || 'N/A'}\n` +
      (newLead.companyName ? `*Company:* ${newLead.companyName}\n` : '') +
      (newLead.serviceOrRole ? `*Service/Role:* ${newLead.serviceOrRole}\n` : '') +
      `*Details:* ${newLead.message || 'N/A'}\n` +
      `--------------------------------\n` +
      `_Submitted via www.bascogroup.co.in_`;

    const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(leadSummary)}`;

    res.status(201).json({
      success: true,
      lead: newLead,
      emailResult,
      whatsappUrl,
      message: `Inquiry successfully logged and dispatched to ${currentSettings.adminEmail}.`,
    });
  } catch (err: any) {
    console.error('Error handling lead submission:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// PATCH lead status or notes
app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const leadIndex = leadsCache.findIndex((l) => l.id === id);
  if (leadIndex === -1) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  if (status) leadsCache[leadIndex].status = status;
  if (notes !== undefined) leadsCache[leadIndex].notes = notes;

  saveLeads();
  res.json({ success: true, lead: leadsCache[leadIndex] });
});

// DELETE lead
app.delete('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const leadIndex = leadsCache.findIndex((l) => l.id === id);
  if (leadIndex === -1) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  leadsCache.splice(leadIndex, 1);
  saveLeads();
  res.json({ success: true, message: 'Lead deleted successfully' });
});

// POST test email delivery
app.post('/api/test-email', async (req, res) => {
  const targetEmail = req.body.email || currentSettings.adminEmail || 'workwithoffice0315@gmail.com';
  const testLead = {
    type: 'test_alert',
    fullName: 'Test System Administrator',
    email: targetEmail,
    phone: '+91 98765 43210',
    companyName: 'Basco Group Operations',
    serviceOrRole: 'Mailbox & WhatsApp Lead Notification Test',
    message: 'This is a test notification confirming that lead delivery to your email is active and configured correctly.',
    createdAt: new Date().toISOString(),
  };

  const result = await dispatchEmailNotification(testLead);
  res.json({ success: true, result, targetEmail });
});

// ---------------- VITE / STATIC SERVING ----------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Basco Group Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
