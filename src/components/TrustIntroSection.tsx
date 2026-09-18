import React from 'react';
import { ShieldCheck, Users, Cpu, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const TrustIntroSection: React.FC = () => {
  const features = [
    {
      title: 'Reliable Operations',
      description: 'Structured workflows, disciplined shift management, and SLA-governed performance that guarantee continuous business continuity.',
      icon: ShieldCheck,
      badge: 'Operational Rigor',
    },
    {
      title: 'Skilled Professionals',
      description: 'Rigorously vetted and trained representatives who master your product specifications, brand voice, and customer empathy.',
      icon: Users,
      badge: 'Domain Trained',
    },
    {
      title: 'Technology Driven',
      description: 'Modern telephony, CRM synchronization, omnichannel consoles, and analytics that keep every customer interaction clear and tracked.',
      icon: Cpu,
      badge: 'Modern Stack',
    },
    {
      title: 'Customer Focused',
      description: 'Every interaction is treated as an opportunity to build trust, resolve friction, and create positive, long-term brand impressions.',
      icon: HeartHandshake,
      badge: 'CX Excellence',
    },
  ];

  return (
    <section id="trust-intro-section" className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wider uppercase">
            <span>Partnership & Governance</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Trusted Partner for Smarter Business Operations
          </h2>

          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Managing internal customer support and administrative backlogs requires extensive recruiting, supervision, and capital infrastructure. Basco Group takes full operational ownership of your contact center and business processes, allowing your leadership and core teams to dedicate 100% of their focus toward strategic product development, market growth, and customer value.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 text-left flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {feat.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                      {feat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-slate-500 group-hover:text-blue-700 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Enterprise Process Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
