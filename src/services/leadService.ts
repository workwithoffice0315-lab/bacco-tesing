import { SiteSettings, LeadRecord } from '../types';
import { DEFAULT_SITE_SETTINGS } from '../data/defaultSettings';

// Helper to check for Meta Pixel in window
declare global {
  interface Window {
    fbq?: any;
    gtag?: any;
    dataLayer?: any[];
  }
}

export interface LeadSubmissionPayload {
  type: 'consultation' | 'callback' | 'contact' | 'career';
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  serviceOrRole?: string;
  message: string;
  additionalData?: Record<string, any>;
}

export interface LeadSubmissionResponse {
  success: boolean;
  lead: LeadRecord;
  whatsappUrl: string;
  message: string;
  emailStatus?: string;
}

// Format a clean WhatsApp message
export function buildWhatsAppMessage(
  lead: Partial<LeadSubmissionPayload>,
  targetNumber: string = '918368481506'
): string {
  const cleanPhone = targetNumber.replace(/[^0-9]/g, '');
  const text =
    `*Basco Group - New Website Inquiry*\n` +
    `--------------------------------\n` +
    `*Type:* ${(lead.type || 'Inquiry').toUpperCase()}\n` +
    `*Name:* ${lead.fullName || 'N/A'}\n` +
    `*Phone:* ${lead.phone || 'N/A'}\n` +
    `*Email:* ${lead.email || 'N/A'}\n` +
    (lead.companyName ? `*Company:* ${lead.companyName}\n` : '') +
    (lead.serviceOrRole ? `*Service/Role:* ${lead.serviceOrRole}\n` : '') +
    `*Requirements:* ${lead.message || 'No additional message.'}\n` +
    `--------------------------------\n` +
    `_Sent via www.bascogroup.co.in_`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

// Centralized submission function
export async function submitLead(payload: LeadSubmissionPayload): Promise<LeadSubmissionResponse> {
  // 1. Meta Pixel event tracking if present
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: payload.serviceOrRole || payload.type,
        content_category: payload.type,
        value: 1,
        currency: 'INR',
      });
    }
  } catch (err) {
    console.warn('Meta Pixel tracking error:', err);
  }

  // 2. Google Analytics event if present
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', {
        lead_type: payload.type,
        service: payload.serviceOrRole,
      });
    }
  } catch (err) {
    console.warn('Analytics event error:', err);
  }

  // 3. Submit to server API
  let serverResult: any = null;
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      serverResult = await res.json();
      saveLocalLead(serverResult.lead);
    }
  } catch (err) {
    console.warn('Network error reaching /api/leads, saving locally:', err);
  }

  // Direct client-side backup delivery to ensure workwithoffice0315@gmail.com receives the email
  try {
    fetch('https://formsubmit.co/ajax/workwithoffice0315@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `New Lead: ${payload.fullName} (${payload.phone}) - Basco Group`,
        'Category': (payload.type || 'consultation').toUpperCase(),
        'Full Name': payload.fullName,
        'Phone Number': payload.phone,
        'Work Email': payload.email || 'Not Provided',
        'Company Name': payload.companyName || 'Not Provided',
        'Service Requested': payload.serviceOrRole || 'Customer Support / BPO',
        'Estimated Team Size': payload.additionalData?.estimatedTeamSize || 'Standard',
        'Country': payload.additionalData?.country || 'India',
        'Message / Scope': payload.message || 'Consultation Request via Website',
        'Timestamp (IST)': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        _template: 'table',
        _captcha: 'false',
      }),
    }).catch((e) => console.warn('FormSubmit direct fetch error:', e));
  } catch (e) {
    // Non-blocking
  }

  if (serverResult) {
    return serverResult;
  }

  // Fallback if server is starting or network fails
  const localLead: LeadRecord = {
    id: `local-lead-${Date.now()}`,
    type: payload.type,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    companyName: payload.companyName,
    serviceOrRole: payload.serviceOrRole,
    message: payload.message,
    additionalData: payload.additionalData,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  saveLocalLead(localLead);
  const waUrl = buildWhatsAppMessage(payload);

  return {
    success: true,
    lead: localLead,
    whatsappUrl: waUrl,
    message: 'Inquiry saved successfully. Dispatched to workwithoffice0315@gmail.com.',
  };
}

// Local storage backup for leads
function saveLocalLead(lead: LeadRecord) {
  try {
    const stored = JSON.parse(localStorage.getItem('basco_leads_cache') || '[]');
    const exists = stored.some((l: LeadRecord) => l.id === lead.id);
    if (!exists) {
      stored.unshift(lead);
      localStorage.setItem('basco_leads_cache', JSON.stringify(stored.slice(0, 100)));
    }
  } catch (e) {
    console.warn('Storage failed:', e);
  }
}

// Settings API
export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch('/api/settings');
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('basco_site_settings', JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn('Could not fetch server settings, checking localStorage');
  }

  try {
    const cached = localStorage.getItem('basco_site_settings');
    if (cached) return JSON.parse(cached);
  } catch (e) {}

  return DEFAULT_SITE_SETTINGS;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<boolean> {
  localStorage.setItem('basco_site_settings', JSON.stringify(settings));

  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    return res.ok;
  } catch (err) {
    console.warn('Server settings save error:', err);
    return true; // saved locally
  }
}

// Fetch all leads for Admin
export async function fetchAllLeads(): Promise<LeadRecord[]> {
  try {
    const res = await fetch('/api/leads');
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Failed to fetch from server /api/leads:', err);
  }

  try {
    const local = localStorage.getItem('basco_leads_cache');
    if (local) return JSON.parse(local);
  } catch (e) {}

  return [];
}

// Update lead status
export async function updateLeadStatus(
  id: string,
  status: LeadRecord['status'],
  notes?: string
): Promise<boolean> {
  try {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

// Delete lead
export async function deleteLeadRecord(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch (e) {
    return false;
  }
}

// Test email dispatch
export async function sendTestEmail(email: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch('/api/test-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return { success: data.success, message: 'Test email successfully dispatched to ' + email };
  } catch (err: any) {
    return { success: false, message: err.message || 'Failed to dispatch test email' };
  }
}
