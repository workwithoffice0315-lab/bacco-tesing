import React from 'react';
import { ShieldCheck, Target, Eye, Compass, Users, CheckCircle2, ArrowRight, Building, Award, HeartHandshake, Sparkles } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { PageRoute } from '../types';

interface AboutUsPageProps {
  onOpenConsultation: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onOpenConsultation,
  onNavigate,
}) => {
  return (
    <div id="about-us-page" className="py-12 lg:py-16 bg-white text-slate-900 text-left">
      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <span>Corporate Overview</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            About Basco Group
          </h1>
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            A dedicated BPO, Call Center, and Customer Experience outsourcing provider delivering disciplined operations, skilled talent, and reliable technology solutions to Indian and global businesses.
          </p>
        </div>
      </div>

      {/* 1. Who We Are & 2. What We Do */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Our Identity
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Who We Are
              </h2>
            </div>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Basco Group is a professional business process outsourcing organization established to solve one of the most critical challenges facing modern enterprises: maintaining responsive, empathetic, and cost-effective customer support operations as business volume scales.
            </p>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              We position ourselves as a dependable extension of our clients’ internal teams. By blending rigorously trained human communicators, standardized process blueprints, and modern communication infrastructure, we help organizations manage customer contacts and administrative backlogs with unwavering consistency.
            </p>

            {/* Editable Corporate Placeholders as requested */}
            <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <Building className="w-4 h-4 text-blue-600" />
                <span>Corporate Operational Details [Editable Information]</span>
              </div>
              <p className="text-slate-500">
                • <strong>Operational Footprint:</strong> {COMPANY_DETAILS.addressPlaceholder}
              </p>
              <p className="text-slate-500">
                • <strong>Corporate Inquiries:</strong> {COMPANY_DETAILS.emailPlaceholder}
              </p>
              <p className="text-slate-500">
                • <strong>Official Domain:</strong> {COMPANY_DETAILS.domain}
              </p>
              <p className="text-[11px] text-slate-400 italic">
                (Note: Specific founding year, employee headcount benchmarks, and facility locations remain editable placeholders configured per administrative discretion.)
              </p>
            </div>
          </div>

          {/* What We Do Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Operational Scope
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                What We Do
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              We assume end-to-end responsibility for non-core and customer-facing business workflows so that client leadership can dedicate attention to core innovation and market expansion:
            </p>

            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Omnichannel Customer Support:</strong> Managing inbound phone, email, and live chat queues under strict SLA parameters.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Outbound & Growth Services:</strong> Lead verification, telephone outreach, and executive appointment setting.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Technical & Helpdesk Support:</strong> Level 1 and Level 2 diagnostic assistance for digital tools and hardware.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Back Office Processing:</strong> High-accuracy data entry, catalog maintenance, and administrative reconciliation.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Our Approach */}
      <div className="bg-slate-50 py-16 border-y border-slate-200/70 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Our Operational Approach
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Rather than providing generic bodies in seats, Basco Group adheres to a systems-first methodology that aligns human performance with business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">SOP & Scripting Alignment</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We codify your product nuances, escalation trees, and brand guidelines into clear, comprehensive Standard Operating Procedures prior to handling live interactions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">Daily QA & Performance Calibration</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Continuous auditing of recorded calls, chat logs, and ticket resolutions against objective scorecards ensures quality remains consistent across all shifts.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">Transparent Governance & Metrics</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Regular reporting on Average Speed to Answer (ASA), First Contact Resolution (FCR), Customer Satisfaction (CSAT), and backlog volumes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Our Mission & 5. Our Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-2xl p-8 sm:p-10 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Our Mission</h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              To empower businesses of all sizes to scale confidently by delivering reliable, technology-enabled, and customer-centric outsourcing services that consistently exceed expectations and protect brand integrity.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-8 sm:p-10 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Our Vision</h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              To become a globally recognized, premier outsourcing partner known for operational transparency, exceptional workforce quality, and the strategic application of modern customer experience technology.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Our Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Ethos
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Our Core Values
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            The guiding principles that dictate how we recruit, how we interact with customers, and how we collaborate with partner organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Accountability</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              We take full responsibility for SLA compliance, operational quality, and confidentiality on every assignment.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Customer Empathy</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Understanding that behind every ticket or phone call is a human being seeking clarity and respectful support.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Continuous Learning</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Refining agent skills, updating scripts, and analyzing root causes to systematically eliminate recurring customer friction.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">People Respect</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Creating an empowering, growth-focused workplace for our frontline specialists, because fulfilled teams deliver superior customer care.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Why Businesses Work With Us & CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Partnership Advantage
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Why Businesses Work With Us
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              We combine enterprise operational rigor with agile, transparent communication. Whether you need a 5-seat customer care pod or a 50-seat omnichannel contact center, Basco Group tailors the infrastructure to fit your exact business goals.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenConsultation}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/services')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm px-6 py-3.5 rounded-xl border border-slate-700 transition-colors text-center"
            >
              Explore Solutions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
