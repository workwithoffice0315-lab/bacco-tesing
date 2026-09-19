import React, { useState } from 'react';
import { INDUSTRIES_LIST } from '../data/companyData';
import { IndustryItem } from '../types';
import { DynamicIcon } from './DynamicIcon';
import { CheckCircle2, ArrowRight, ShieldCheck, Search, HelpCircle } from 'lucide-react';

interface IndustriesPageProps {
  onOpenConsultation: (topic?: string) => void;
  initialIndustry?: IndustryItem | null;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onOpenConsultation,
  initialIndustry = null,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIndustries = INDUSTRIES_LIST.filter(
    (ind) =>
      ind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.challenges.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="industries-page" className="py-12 lg:py-16 bg-white text-slate-900 text-left">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <span>Domain-Specific Outsourcing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Industry-Focused Outsourcing Solutions
          </h1>
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            Every vertical presents unique operational workflows, customer expectations, and compliance standards. Below is an overview of the <strong>industries we can support</strong> with dedicated talent, tailored SOPs, and scalable infrastructure.
          </p>
        </div>

        {/* Search */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Displaying {filteredIndustries.length} of {INDUSTRIES_LIST.length} Supported Industry Domains
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search industries or workflows..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Detailed Industry Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredIndustries.map((ind) => (
            <div
              key={ind.id}
              id={`industry-card-${ind.slug}`}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-7 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                      <DynamicIcon name={ind.icon} className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {ind.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-blue-800">
                        Operational Support Model
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-500">
                    Adaptable SOP
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {ind.shortDesc}
                </p>

                {/* Pain Points & Support */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                    <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-amber-600" />
                      <span>Operational Challenges</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ind.challenges}
                    </p>
                  </div>

                  <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1">
                    <div className="text-[11px] font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      <span>Basco Group Solution</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {ind.supportSolutions}
                    </p>
                  </div>
                </div>

                {/* Ready Workflows */}
                <div className="pt-2 border-t border-slate-200/70 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Ready Workflow Integrations
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {ind.sampleWorkflows.map((flow, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{flow}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-6 mt-6 border-t border-slate-200/70 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  Configurable SLA benchmarks
                </span>
                <button
                  onClick={() => onOpenConsultation(`${ind.name} Support Model`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <span>Discuss {ind.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Extensibility Note */}
        <div className="mt-12 p-8 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-lg font-bold">
              Operating in a niche industry or emerging vertical?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our process engineers rapidly study specialized business models, author custom SOP manuals, and configure compliant agent pods for your domain.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation('Custom Industry Solution')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shrink-0"
          >
            Request Custom Scope Review
          </button>
        </div>
      </div>
    </div>
  );
};
