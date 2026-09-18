import React from 'react';
import { WHY_CHOOSE_BENEFITS } from '../data/companyData';
import { DynamicIcon } from './DynamicIcon';
import { ShieldCheck, CheckCircle2, Award, Lock, FileCheck, ArrowRight, BarChart2 } from 'lucide-react';
import { PageRoute } from '../types';

interface WhyBascoPageProps {
  onOpenConsultation: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const WhyBascoPage: React.FC<WhyBascoPageProps> = ({
  onOpenConsultation,
  onNavigate,
}) => {
  return (
    <div id="why-basco-page" className="py-12 lg:py-16 bg-white text-slate-900 text-left">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <span>The Basco Group Advantage</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Why Businesses Choose Basco Group
          </h1>
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            Discover the operational rigor, disciplined training curricula, and transparent SLA governance that distinguish our BPO and customer experience outsourcing solutions.
          </p>
        </div>
      </div>

      {/* 6 Core Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_BENEFITS.map((item, idx) => (
            <div
              key={item.id}
              className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200 hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center">
                    <DynamicIcon name={item.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    Pillar 0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-blue-800 mt-1">
                    {item.description}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">
                    {item.detail}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-200/70 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Standardized Operating Protocol</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Dive Section: Quality & Security Governance */}
      <div className="bg-slate-50 py-16 border-y border-slate-200/70 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Governance & Security
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Built on Quality Control & Confidentiality
            </h2>
            <p className="text-base text-slate-600 font-normal">
              How we protect your brand reputation, customer data privacy, and operational consistency every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Weekly Calibration Audits</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Our Quality Assurance (QA) team regularly audits randomly sampled calls, chat records, and tickets against client-approved rubrics, ensuring voice tone, adherence to SOPs, and prompt resolutions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Information Privacy & NDAs</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                All client workflows operate under rigorous Non-Disclosure Agreements (NDAs), strict role-based data permissions, clean-desk policies, and encrypted communication channels.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Objective SLA Transparency</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We believe in full operational transparency. Weekly and monthly executive reports track Average Handle Time (AHT), First Contact Resolution (FCR), and Customer Satisfaction (CSAT).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold">
              Ready to evaluate an outsourcing model for your business?
            </h3>
            <p className="text-sm text-slate-300">
              Our solutions architects will review your current ticket volume, channel distribution, and provide a transparent scoping blueprint.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-sm transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Discuss Your Requirements</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
