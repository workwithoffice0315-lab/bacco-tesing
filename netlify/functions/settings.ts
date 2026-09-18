import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

let settingsCache = {
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
  adminWhatsApp: process.env.ADMIN_WHATSAPP || '919876543210',
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

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, settings: settingsCache }),
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const updates = JSON.parse(event.body || '{}');
      settingsCache = { ...settingsCache, ...updates };
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, settings: settingsCache, message: 'Settings updated' }),
      };
    } catch (err: any) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: err?.message }),
      };
    }
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
};
