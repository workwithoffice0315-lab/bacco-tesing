import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import { INDUSTRIES_LIST } from '../data/companyData';
import { DynamicIcon } from './DynamicIcon';
import { PageRoute, IndustryItem } from '../types';

interface IndustriesPreviewSectionProps {
  onNavigate: (route: PageRoute) => void;
  onSelectIndustry?: (industry: IndustryItem) => void;
}

export const IndustriesPreviewSection: React.FC<IndustriesPreviewSectionProps> = ({
  onNavigate,
  onSelectIndustry,
}) => {
  const [activeIndustry, setActiveIndustry] = useState<IndustryItem>(INDUSTRIES_LIST[0]);

  return (
    <section id="industries-section" className="py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
            <span>Domain Adaptation</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Industry-Focused Outsourcing Solutions
          </h2>

          <p className="text-base text-slate-600 font-normal leading-relaxed">
            Every sector possesses distinct compliance guidelines, customer conversation styles, and operational cycles. Below are the key <strong>industries we can support</strong> with customized workflows, trained teams, and domain-specific SOPs.
          </p>
        </div>

        {/* 12 Industry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {INDUSTRIES_LIST.map((ind) => {
            const isSelected = activeIndustry.id === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => {
                  setActiveIndustry(ind);
                  if (onSelectIndustry) onSelectIndustry(ind);
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-1 ring-blue-500'
                    : 'bg-slate-50/60 hover:bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 group-hover:text-blue-600'
                    }`}
                  >
                    <DynamicIcon name={ind.icon} className="w-5 h-5" />
                  </div>
                  <h3
                    className={`text-sm font-bold transition-colors ${
                      isSelected ? 'text-blue-900' : 'text-slate-900 group-hover:text-blue-700'
                    }`}
                  >
                    {ind.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-normal">
                    {ind.shortDesc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-medium text-blue-700">
                  <span>Explore Support Model</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Industry Deep Dive Spotlight Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-3 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                <span>Sector Spotlight</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>{activeIndustry.name}</span>
              </h3>
              <p className="text-sm text-slate-300 font-normal leading-relaxed">
                {activeIndustry.shortDesc}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/industries')}
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5 underline"
                >
                  <span>View All Industry Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/80 rounded-xl p-5 border border-slate-700/80 text-left space-y-2">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Common Industry Pain Points
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {activeIndustry.challenges}
              </p>
              <div className="pt-2">
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  How Basco Group Supports
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed font-normal">
                  {activeIndustry.supportSolutions}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/80 rounded-xl p-5 border border-slate-700/80 text-left space-y-3">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Ready Support Workflows
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                {activeIndustry.sampleWorkflows.map((workflow, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{workflow}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
