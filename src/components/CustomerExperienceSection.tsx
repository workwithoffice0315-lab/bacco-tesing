import React from 'react';
import { HeartHandshake, CheckCircle2, MessageSquareText, Shield, ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

interface CustomerExperienceSectionProps {
  onOpenConsultation: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const CustomerExperienceSection: React.FC<CustomerExperienceSectionProps> = ({
  onOpenConsultation,
  onNavigate,
}) => {
  return (
    <section id="customer-experience-section" className="py-20 bg-white border-b border-slate-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual on the Left */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
                alt="Customer Service Excellence at Basco Group"
                className="w-full h-80 sm:h-96 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-slate-900/20 to-transparent" />
              
              {/* Floating CX Quote Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-5 border border-slate-200 shadow-xl text-left">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-1">
                  <HeartHandshake className="w-4 h-4" />
                  <span>The Basco CX Philosophy</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  &ldquo;A customer never forgets how you made them feel during a moment of product difficulty or operational delay.&rdquo;
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Quality Assurance Standard</span>
                  <span className="font-semibold text-emerald-600">Empathetic Resolution</span>
                </div>
              </div>
            </div>

            {/* Subtle floating badge */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-blue-600 text-white p-3.5 rounded-xl shadow-lg items-center gap-2 text-xs font-bold z-20">
              <Shield className="w-4 h-4" />
              <span>100% Brand Safeguarded</span>
            </div>
          </div>

          {/* Text Content on the Right */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
              <span>Customer Experience (CX) Focus</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Every Conversation Is an Opportunity to Build Trust
            </h2>

            <p className="text-base text-slate-600 font-normal leading-relaxed">
              In a crowded market, products can be replicated, but customer service remains your most defensible differentiator. Basco Group trains frontline professionals not merely to close tickets quickly, but to actively listen, defuse customer frustration, and reinforce confidence in your brand.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquareText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Empathetic First Contact</div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Acknowledging customer context with politeness and urgency before diving into scripted questions.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Systematic Root-Cause Resolution</div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Preventing repeat calls through comprehensive first-touch guidance and clear next-step communication.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-purple-600/10 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Consistent Brand Voice</div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Rigid adherence to your organization&apos;s lexicon, values, and customer care principles.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-sm transition-colors"
              >
                Discuss CX Architecture
              </button>
              <button
                onClick={() => onNavigate('/about-us')}
                className="text-xs font-bold text-slate-700 hover:text-blue-700 inline-flex items-center gap-1"
              >
                <span>Learn About Our Approach</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
