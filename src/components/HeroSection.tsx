import React from 'react';
import { ArrowRight, Headphones, ShieldCheck, CheckCircle2, Phone, MessageSquare, Clock, Users } from 'lucide-react';
import { PageRoute } from '../types';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onNavigate,
}) => {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-slate-100/70 via-white to-slate-50 pt-12 pb-20 lg:pt-18 lg:pb-28 border-b border-slate-200/70">
      {/* Subtle geometric background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-blue-800 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>BPO • Contact Center • Business Outsourcing Partner</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              Smart Outsourcing. <br className="hidden sm:inline" />
              Better Customer Experiences. <br className="hidden sm:inline" />
              <span className="text-blue-700">Stronger Business Growth.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Basco Group helps businesses streamline customer support, contact center operations and business processes through skilled professionals, technology and reliable outsourcing solutions.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                id="hero-primary-cta"
                onClick={onOpenConsultation}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg shadow-blue-600/20 transition-all duration-200 flex items-center justify-center gap-2.5 text-base"
              >
                <span>Talk to Our Experts</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={() => onNavigate('/services')}
                className="bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3.5 rounded-xl border border-slate-300 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 text-base hover:border-slate-400"
              >
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Value Highlights */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg text-left">
              <div>
                <div className="text-xs text-slate-500 font-medium">Coverage Model</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">Flexible 24/7</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Delivery Mode</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">Voice & Digital</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Operational Focus</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">SLA & CSAT Driven</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Contact Center & Operations Console Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Card */}
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-5 sm:p-6 space-y-4">
                {/* Console Top Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <Headphones className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Basco CX Operations Hub
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active Operational Queue
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-1 rounded">
                    SOP Calibrated
                  </span>
                </div>

                {/* Agent Showcase Visual with Professional Imagery */}
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                    alt="Professional Customer Support Representative at Basco Group Contact Center"
                    className="w-full h-44 sm:h-48 object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>Dedicated Support Specialist</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <div className="text-[11px] text-slate-300">
                        English & Regional Multilingual Support
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/90 text-white font-semibold px-2 py-0.5 rounded-full">
                      Available
                    </span>
                  </div>
                </div>

                {/* Live Channels Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-left">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <Phone className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-[10px] font-semibold text-emerald-600">Active</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">Inbound Calls</div>
                    <div className="text-xs font-bold text-slate-900">100% Monitored</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-left">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-[10px] font-semibold text-emerald-600">&lt;45s</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">Digital Chat</div>
                    <div className="text-xs font-bold text-slate-900">Multi-Channel</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-left">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-[10px] font-semibold text-blue-600">Strict</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">SLA Resolution</div>
                    <div className="text-xs font-bold text-slate-900">Tier 1 & 2</div>
                  </div>
                </div>

                {/* Bottom Assurance Bar */}
                <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-between text-left">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                    <span className="text-xs font-medium text-slate-700">
                      Standard Operating Procedures (SOP) Aligned
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-blue-800">
                    ISO & QA Benchmarks
                  </span>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white border border-slate-200 rounded-xl shadow-lg p-3 items-center gap-3 max-w-xs z-20">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">
                    Custom Seating Capacity
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Scale from 2 to 100+ dedicated agents
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
