import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/companyData';
import { ServiceItem } from '../types';
import { DynamicIcon } from './DynamicIcon';
import { Search, ArrowRight, Check, CheckCircle2, ChevronRight, X, PhoneCall, ShieldCheck } from 'lucide-react';

interface ServicesPageProps {
  onOpenConsultation: (serviceName?: string) => void;
  initialSelectedService?: ServiceItem | null;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenConsultation,
  initialSelectedService = null,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(
    initialSelectedService
  );

  const categories = ['All', 'Voice', 'Digital', 'Operations', 'Growth'];

  const filteredServices = SERVICES_LIST.filter((svc) => {
    const matchesCat = selectedCategory === 'All' || svc.category === selectedCategory;
    const matchesSearch =
      svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.whatItIs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="services-page" className="py-12 lg:py-16 bg-white text-slate-900 text-left">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <span>Enterprise Outsourcing Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Our Outsourcing Solutions
          </h1>
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            Explore our comprehensive outsourcing services designed to reduce operational burden, elevate customer satisfaction, and provide reliable, scalable support for your business.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat} {cat !== 'All' && 'Services'}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search solutions..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 12 Detailed Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              id={`service-card-${service.slug}`}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-7 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-5">
                {/* Card Top */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center">
                    <DynamicIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {service.category}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">
                    {service.shortDesc}
                  </p>
                </div>

                {/* What it is snippet */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    What It Is
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {service.whatItIs}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-2 pt-2 border-t border-slate-200/70">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Key Benefits
                  </div>
                  <ul className="space-y-1.5">
                    {service.keyBenefits.slice(0, 3).map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-slate-200/70 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalService(service)}
                  className="text-xs font-bold text-slate-700 hover:text-blue-700 inline-flex items-center gap-1"
                >
                  <span>Full Specifications</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenConsultation(service.title)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
                >
                  Request Solution
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div
          id="service-detail-modal"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-start justify-between border-b border-slate-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <DynamicIcon name={activeModalService.icon} className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                    {activeModalService.category} Solutions
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activeModalService.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {activeModalService.shortDesc}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-left">
              {/* 1. What It Is */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  What It Is
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeModalService.whatItIs}
                </p>
              </div>

              {/* 2. How Basco Group Can Help */}
              <div className="space-y-2 p-4 bg-blue-50/70 rounded-xl border border-blue-100">
                <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>How Basco Group Can Help</span>
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeModalService.howBascoHelps}
                </p>
              </div>

              {/* 3. Key Benefits */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Key Benefits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalService.keyBenefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Suitable Business Types */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Suitable Business Types
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalService.suitableBusinessTypes.map((type, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-slate-100 text-slate-800 px-3 py-1.5 rounded-full border border-slate-200"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 sm:px-8 sm:py-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Customized SLAs & dedicated team staffing available.
              </span>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = activeModalService.title;
                    setActiveModalService(null);
                    onOpenConsultation(title);
                  }}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Request a Customized Solution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
