import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { SERVICES_LIST } from '../data/companyData';
import { DynamicIcon } from './DynamicIcon';
import { PageRoute, ServiceItem } from '../types';

interface ServicesOverviewSectionProps {
  onNavigate: (route: PageRoute) => void;
  onSelectService: (service: ServiceItem) => void;
  onOpenConsultation: () => void;
}

export const ServicesOverviewSection: React.FC<ServicesOverviewSectionProps> = ({
  onNavigate,
  onSelectService,
  onOpenConsultation,
}) => {
  // Take core highlighted services from the master 12 services
  const coreServices = SERVICES_LIST.slice(0, 8);

  return (
    <section id="services-overview-section" className="py-20 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
              <span>Tailored BPO Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Outsourcing Solutions
            </h2>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              From front-line voice helplines to complex administrative back-office workflows, Basco Group delivers end-to-end outsourcing architectures customized to your operating specifications.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="view-all-services-top-btn"
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 bg-white hover:bg-slate-100 px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-colors"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400/60 transition-all duration-200 flex flex-col justify-between text-left group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 flex items-center justify-center">
                    <DynamicIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded">
                    {service.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed font-normal">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-2 space-y-1.5">
                  {service.keyBenefits.slice(0, 2).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectService(service)}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenConsultation}
                  className="text-[11px] font-medium text-slate-500 hover:text-blue-700 transition-colors"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              Need a specialized or hybrid outsourcing workflow?
            </h3>
            <p className="text-sm text-slate-600 font-normal">
              We design custom processes, agent seating matrices, and blended voice-plus-data pods for your specific tools.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="services-overview-explore-btn"
              onClick={() => onNavigate('/services')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-sm transition-colors"
            >
              Explore All Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
