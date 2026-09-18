import React from 'react';
import { ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';

interface CTABannerProps {
  onOpenConsultation: () => void;
  onOpenCallback?: () => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  onOpenConsultation,
  onOpenCallback,
}) => {
  return (
    <section id="cta-banner" className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-700/60 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Strategic Outsourcing Partnership</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Ready to Build a Smarter Support Operation?
        </h2>

        <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
          Tell us about your business requirements and our team will help you explore the right outsourcing solution.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="cta-banner-get-started-btn"
            onClick={onOpenConsultation}
            className="w-full sm:w-auto bg-white hover:bg-blue-50 text-blue-900 font-bold px-8 py-4 rounded-xl shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-base"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 text-blue-700" />
          </button>

          {onOpenCallback && (
            <button
              onClick={onOpenCallback}
              className="w-full sm:w-auto bg-blue-800/80 hover:bg-blue-700/80 border border-blue-400/40 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-base"
            >
              <PhoneCall className="w-4 h-4 text-blue-300" />
              <span>Request a Callback</span>
            </button>
          )}
        </div>

        <div className="pt-4 text-xs text-blue-200/80 flex items-center justify-center gap-6">
          <span>✓ Custom pilot evaluation</span>
          <span>✓ Standard NDA confidentiality</span>
          <span>✓ Rapid onboarding timeline</span>
        </div>
      </div>
    </section>
  );
};
