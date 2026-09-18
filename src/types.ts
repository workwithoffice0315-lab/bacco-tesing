export type PageRoute =
  | '/'
  | '/about-us'
  | '/services'
  | '/industries'
  | '/why-basco'
  | '/careers'
  | '/contact-us'
  | '/admin';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  whatItIs: string;
  howBascoHelps: string;
  keyBenefits: string[];
  suitableBusinessTypes: string[];
  icon: string;
  category: 'Voice' | 'Digital' | 'Operations' | 'Growth';
}

export interface IndustryItem {
  id: string;
  slug: string;
  name: string;
  icon: string;
  shortDesc: string;
  challenges: string;
  supportSolutions: string;
  sampleWorkflows: string[];
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  details: string[];
}

export interface TechnologyCategory {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
}

export interface ConsultationFormData {
  fullName: string;
  companyName: string;
  workEmail: string;
  phoneNumber: string;
  country: string;
  serviceRequired: string;
  estimatedTeamSize: string;
  message: string;
}

export interface CallbackFormData {
  fullName: string;
  phoneNumber: string;
  companyName?: string;
  preferredTime: string;
  topic: string;
}

export interface JobApplicationFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  positionApplyingFor: string;
  totalExperience: string;
  location: string;
  resumeFileName?: string;
  message: string;
}

export interface SiteSettings {
  // SEO Configuration
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  robotsIndexing: boolean;
  googleSiteVerification: string;

  // Tracking & Pixels
  metaPixelId: string;
  metaPixelSnippet: string;
  googleAnalyticsId: string;
  customHeadCode: string;
  customBodyCode: string;

  // Contact & Notifications
  adminEmail: string;
  adminWhatsApp: string; // e.g. "919876543210"
  enableEmailAlerts: boolean;
  whatsappFloatingEnabled: boolean;
  whatsappButtonPosition: 'left' | 'right';
  whatsappDefaultMessage: string;
}

export interface LeadRecord {
  id: string;
  type: 'consultation' | 'callback' | 'contact' | 'career';
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  serviceOrRole?: string;
  message: string;
  additionalData?: Record<string, any>;
  createdAt: string;
  status: 'new' | 'contacted' | 'in_progress' | 'closed';
  notes?: string;
}
