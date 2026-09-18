import React from 'react';
import { X, ShieldCheck, FileText, Cookie } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'cookie' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const content = {
    privacy: {
      title: 'Privacy Policy',
      icon: ShieldCheck,
      updated: 'September 2026',
      body: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Basco Group (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy and security of information collected from enterprise clients, website visitors, and prospective partners accessing <strong>{COMPANY_DETAILS.domain}</strong>.
          </p>
          <h4 className="font-semibold text-slate-800 text-base">1. Information Collection</h4>
          <p>
            We collect contact and business information provided voluntarily through consultation requests, callback forms, career applications, and direct email inquiries. This includes full names, corporate email addresses, phone numbers, organization names, and operational scope details.
          </p>
          <h4 className="font-semibold text-slate-800 text-base">2. Use of Information</h4>
          <p>
            Submitted information is used exclusively to evaluate prospective business partnerships, deliver requested service proposals, coordinate callbacks, and recruit prospective personnel. We do not sell, license, or barter corporate contact information to third parties.
          </p>
          <h4 className="font-semibold text-slate-800 text-base">3. Confidentiality & Non-Disclosure</h4>
          <p>
            Basco Group operates under strict confidentiality parameters. All client project discussions, operational workflows, and proprietary materials are protected by Non-Disclosure Agreements (NDAs).
          </p>
          <h4 className="font-semibold text-slate-800 text-base">4. Contact Information</h4>
          <p>
            For privacy inquiries or data update requests, please contact our compliance desk at <strong>{COMPANY_DETAILS.emailPlaceholder}</strong>.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      updated: 'September 2026',
      body: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Welcome to <strong>{COMPANY_DETAILS.domain}</strong>. By accessing this website and utilizing our contact instruments, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <h4 className="font-semibold text-slate-800 text-base">1. Informational Purpose</h4>
          <p>
            The content on this website is for general informational and commercial proposal purposes relating to BPO, call center, customer support, and outsourcing capabilities. Formal contractual engagements are governed by separate Master Services Agreements (MSAs) and Statements of Work (SOWs).
          </p>
          <h4 className="font-semibold text-slate-800 text-base">2. Intellectual Property</h4>
          <p>
            All text, branding, interface designs, structural graphics, and service workflows on this website are the intellectual property of Basco Group. Unauthorized duplication is prohibited.
          </p>
          <h4 className="font-semibold text-slate-800 text-base">3. Service Commitments</h4>
          <p>
            Specific service level commitments (such as SLA response times, seating allocations, and resolution rates) are defined exclusively within client-specific contracts signed by authorized signatories.
          </p>
        </div>
      ),
    },
    cookie: {
      title: 'Cookie Policy',
      icon: Cookie,
      updated: 'September 2026',
      body: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            This Cookie Policy explains how Basco Group uses cookies and similar session management technologies when you visit <strong>{COMPANY_DETAILS.domain}</strong>.
          </p>
          <h4 className="font-semibold text-slate-800 text-base">1. Essential Cookies</h4>
          <p>
            We use essential session indicators to manage form interactions, navigation state, and security tokens. These are required for standard website functionality.
          </p>
          <h4 className="font-semibold text-slate-800 text-base">2. Performance & Analytics</h4>
          <p>
            Anonymized performance metrics allow us to measure page load speeds, high-traffic service categories, and visitor flow to continuously refine our user experience.
          </p>
          <h4 className="font-semibold text-slate-800 text-base">3. Managing Preferences</h4>
          <p>
            Visitors can manage or disable cookies via their browser settings at any time. Disabling essential cookies may impact interactive form features.
          </p>
        </div>
      ),
    },
  }[type];

  const IconComponent = content.icon;

  return (
    <div
      id="legal-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">{content.title}</h3>
              <p className="text-xs text-slate-400">Last updated: {content.updated}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto">
          {content.body}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-5 py-2 rounded-lg"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
