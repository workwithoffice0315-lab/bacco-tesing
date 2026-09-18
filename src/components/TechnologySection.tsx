import React, { useState } from 'react';
import { TECH_CATEGORIES } from '../data/companyData';
import { DynamicIcon } from './DynamicIcon';
import { Check, ShieldCheck, Cpu } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState(TECH_CATEGORIES[0]);

  return (
    <section id="technology-section" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative dark background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Infrastructure & Tooling</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Technology + People. Better Business Outcomes.
          </h2>

          <p className="text-base text-slate-300 font-normal leading-relaxed">
            Technology alone cannot replace genuine human empathy, while people without modern tools cannot scale. We integrate modern communication platforms with highly trained support specialists to deliver rapid, consistent, and tracked customer experiences.
          </p>
        </div>

        {/* Interactive Categories & Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Category Selector Pills */}
          <div className="lg:col-span-5 space-y-2 text-left">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-3">
              Core Technology Categories
            </div>
            {TECH_CATEGORIES.map((tech) => {
              const isSelected = selectedTech.id === tech.id;
              return (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-slate-800/70 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-white text-blue-700' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      <DynamicIcon name={tech.icon} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{tech.title}</div>
                      <div className="text-[11px] opacity-80 line-clamp-1">
                        {tech.features[0]}
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Detailed Feature Showcase */}
          <div className="lg:col-span-7 bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl text-left space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-700">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Technology Capability
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {selectedTech.title}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                <DynamicIcon name={selectedTech.icon} className="w-6 h-6" />
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {selectedTech.description}
            </p>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Operational Highlights
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedTech.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-900/80 border border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-200"
                  >
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Integration Notice */}
            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center justify-between text-xs text-blue-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Compatible with standard enterprise APIs, webhooks & telephony stacks</span>
              </div>
              <span className="font-semibold text-white">Agnostic Integration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
