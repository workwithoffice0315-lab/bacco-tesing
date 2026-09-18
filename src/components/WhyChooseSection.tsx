import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { WHY_CHOOSE_BENEFITS } from '../data/companyData';
import { DynamicIcon } from './DynamicIcon';

interface WhyChooseSectionProps {
  onOpenConsultation: () => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({
  onOpenConsultation,
}) => {
  return (
    <section id="why-choose-section" className="py-20 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <span>Competitive Advantages</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Businesses Choose Basco Group
          </h2>

          <p className="text-base text-slate-600 font-normal leading-relaxed">
            We bridge talent, infrastructure, and standardized execution into dependable outsourcing solutions that elevate customer experience and optimize operating expense.
          </p>
        </div>

        {/* Six Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 text-left flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 flex items-center justify-center">
                  <DynamicIcon name={benefit.icon} className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm font-semibold text-blue-800 mt-1">
                    {benefit.description}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                    {benefit.detail}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Standard SLA Commitment</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="mt-14 text-center">
          <button
            id="why-choose-discuss-btn"
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg shadow-blue-600/20 transition-all duration-150"
          >
            <span>Let&apos;s Discuss Your Requirements</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
