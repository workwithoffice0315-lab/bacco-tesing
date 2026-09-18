import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/companyData';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works-section" className="py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
            <span>Structured Onboarding</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>

          <p className="text-base text-slate-600 font-normal leading-relaxed">
            Our disciplined onboarding framework guarantees a friction-free transition from your existing workflows to dedicated Basco Group operations.
          </p>
        </div>

        {/* 4-Step Process Timeline with Connecting Line */}
        <div className="relative">
          {/* Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200 -translate-y-16 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className="bg-slate-50/80 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 text-left flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Step Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-blue-700/80 group-hover:text-blue-700 tracking-tight">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 space-y-2">
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>Sign-off Gate</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
