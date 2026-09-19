import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenConsultation: () => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'cookie') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenLegal,
}) => {
  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                B
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                BASCO <span className="text-blue-400 font-semibold">GROUP</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Professional outsourcing solutions designed to help businesses improve customer experience, streamline operations and scale efficiently.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Official Web:
              </span>
              <a
                href={`https://${COMPANY_DETAILS.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
              >
                <span>{COMPANY_DETAILS.domain}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Connect With Us
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={COMPANY_DETAILS.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                  aria-label="Basco Group LinkedIn"
                >
                  in
                </a>
                <a
                  href={COMPANY_DETAILS.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                  aria-label="Basco Group Facebook"
                >
                  fb
                </a>
                <a
                  href={COMPANY_DETAILS.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                  aria-label="Basco Group Instagram"
                >
                  ig
                </a>
                <a
                  href={COMPANY_DETAILS.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                  aria-label="Basco Group YouTube"
                >
                  yt
                </a>
              </div>
            </div>
          </div>

          {/* Col 1: Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/about-us')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/why-basco')}
                  className="hover:text-white transition-colors text-left"
                >
                  Why Basco
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/careers')}
                  className="hover:text-white transition-colors text-left"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/contact-us')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenConsultation}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors text-left"
                >
                  Get Free Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Customer Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Inbound Calling
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Outbound Calling
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Back Office Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="hover:text-white transition-colors text-left"
                >
                  All Outsourcing Services →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Industries
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/industries')}
                  className="hover:text-white transition-colors text-left"
                >
                  Banking & Financial Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/industries')}
                  className="hover:text-white transition-colors text-left"
                >
                  Automotive & Mobility
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/industries')}
                  className="hover:text-white transition-colors text-left"
                >
                  Education & EdTech
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/industries')}
                  className="hover:text-white transition-colors text-left"
                >
                  Retail & Consumer Goods
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/industries')}
                  className="hover:text-white transition-colors text-left"
                >
                  Technology & SaaS
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/industries')}
                  className="hover:text-white transition-colors text-left"
                >
                  Logistics & Supply Chain
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact info placeholders bar (transparent & editable as specified) */}
        <div className="py-8 border-b border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-400">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-300 mb-0.5">Corporate Address</div>
              <p className="leading-normal">{COMPANY_DETAILS.addressPlaceholder}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-300 mb-0.5">Telephone Inquiries</div>
              <a
                href={`tel:+91${COMPANY_DETAILS.phoneRaw}`}
                className="text-blue-400 hover:underline leading-normal block"
              >
                {COMPANY_DETAILS.phonePlaceholder}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-300 mb-0.5">Direct Email</div>
              <a
                href={`mailto:${COMPANY_DETAILS.emailPlaceholder}`}
                className="text-blue-400 hover:underline"
              >
                {COMPANY_DETAILS.emailPlaceholder}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-300 mb-0.5">Operating Hours</div>
              <p className="leading-normal">{COMPANY_DETAILS.businessHoursPlaceholder}</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Basco Group. All Rights Reserved.</p>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-slate-200 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => onOpenLegal('cookie')}
              className="hover:text-slate-200 transition-colors"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
