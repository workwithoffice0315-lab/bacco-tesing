import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Send, Building2, User, Mail, Globe2, Users2, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { SERVICES_LIST } from '../data/companyData';
import { ConsultationFormData, CallbackFormData } from '../types';
import { submitLead } from '../services/leadService';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'consultation' | 'callback';
  preselectedService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'consultation',
  preselectedService,
}) => {
  const [activeTab, setActiveTab] = useState<'consultation' | 'callback'>(defaultTab);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State for Consultation
  const [consultForm, setConsultForm] = useState<ConsultationFormData>({
    fullName: '',
    companyName: '',
    workEmail: '',
    phoneNumber: '',
    country: 'India',
    serviceRequired: preselectedService || 'Customer Support',
    estimatedTeamSize: '5 – 15 agents',
    message: '',
  });

  // Form State for Callback
  const [callbackForm, setCallbackForm] = useState<CallbackFormData>({
    fullName: '',
    phoneNumber: '',
    companyName: '',
    preferredTime: '10:00 AM – 1:00 PM IST',
    topic: 'Customer Support / Contact Center Evaluation',
  });

  if (!isOpen) return null;

  const validateConsultation = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!consultForm.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!consultForm.companyName.trim()) newErrors.companyName = 'Company Name is required';
    if (!consultForm.workEmail.trim()) {
      newErrors.workEmail = 'Work Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consultForm.workEmail)) {
      newErrors.workEmail = 'Please provide a valid email address';
    }
    if (!consultForm.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (consultForm.phoneNumber.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phoneNumber = 'Please enter a valid phone number with area/country code';
    }
    if (!consultForm.message.trim()) newErrors.message = 'Please provide brief details of your operational requirement';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCallback = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!callbackForm.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!callbackForm.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (callbackForm.phoneNumber.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phoneNumber = 'Please enter a valid contact number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateConsultation()) return;

    setIsSubmitting(true);
    try {
      const res = await submitLead({
        type: 'consultation',
        fullName: consultForm.fullName,
        email: consultForm.workEmail,
        phone: consultForm.phoneNumber,
        companyName: consultForm.companyName,
        serviceOrRole: consultForm.serviceRequired,
        message: consultForm.message,
        additionalData: {
          country: consultForm.country,
          estimatedTeamSize: consultForm.estimatedTeamSize,
        },
      });

      setGeneratedWhatsAppUrl(res.whatsappUrl);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCallback()) return;

    setIsSubmitting(true);
    try {
      const res = await submitLead({
        type: 'callback',
        fullName: callbackForm.fullName,
        email: '',
        phone: callbackForm.phoneNumber,
        companyName: callbackForm.companyName,
        serviceOrRole: callbackForm.topic,
        message: `Preferred Callback Window: ${callbackForm.preferredTime}`,
        additionalData: {
          preferredTime: callbackForm.preferredTime,
          topic: callbackForm.topic,
        },
      });

      setGeneratedWhatsAppUrl(res.whatsappUrl);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <div
      id="consultation-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div
        id="consultation-modal-dialog"
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 sm:px-8 flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
              <span>Basco Group B2B Solutions</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {activeTab === 'consultation'
                ? 'Get a Free Consultation'
                : 'Request an Immediate Callback'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Connect directly with our operational architects to evaluate scope, seating models, and timelines.
            </p>
          </div>
          <button
            onClick={resetModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        {!isSubmitted && (
          <div className="flex border-b border-slate-200 bg-slate-50 px-6 sm:px-8">
            <button
              onClick={() => {
                setActiveTab('consultation');
                setErrors({});
              }}
              className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'consultation'
                  ? 'border-blue-600 text-blue-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Full Consultation Request
            </button>
            <button
              onClick={() => {
                setActiveTab('callback');
                setErrors({});
              }}
              className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'callback'
                  ? 'border-blue-600 text-blue-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Quick Callback (2 mins)</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-slate-900">
                  Requirement Logged Successfully!
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you for contacting Basco Group. Our operations team has received your submission and will review it immediately.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Email Notice Dispatched: workwithoffice0315@gmail.com</span>
                </div>
                <div className="flex justify-between border-t border-slate-200/80 pt-2 text-slate-600">
                  <span className="text-slate-400">Target Domain:</span>
                  <span className="font-semibold text-slate-800">www.bascogroup.co.in</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-400">Request Type:</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {activeTab} Request
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-400">Contact:</span>
                  <span className="font-semibold text-slate-800">
                    {activeTab === 'consultation'
                      ? consultForm.workEmail
                      : callbackForm.phoneNumber}
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              {generatedWhatsAppUrl && (
                <div className="pt-2 max-w-md mx-auto">
                  <a
                    href={generatedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Send Inquiry to WhatsApp Directly</span>
                    <ExternalLink className="w-4 h-4 opacity-75" />
                  </a>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Connect instantly with our lead manager on WhatsApp.
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={resetModal}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-6 py-2 rounded-lg"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : activeTab === 'consultation' ? (
            /* Form: Consultation */
            <form onSubmit={handleConsultSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={consultForm.fullName}
                      onChange={(e) =>
                        setConsultForm({ ...consultForm, fullName: e.target.value })
                      }
                      placeholder="e.g. Vikram Sharma"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                        errors.fullName
                          ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                          : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={consultForm.companyName}
                      onChange={(e) =>
                        setConsultForm({ ...consultForm, companyName: e.target.value })
                      }
                      placeholder="e.g. Apex Global Logistics"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                        errors.companyName
                          ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                          : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.companyName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.companyName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={consultForm.workEmail}
                      onChange={(e) =>
                        setConsultForm({ ...consultForm, workEmail: e.target.value })
                      }
                      placeholder="name@company.com"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                        errors.workEmail
                          ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                          : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.workEmail && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.workEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={consultForm.phoneNumber}
                      onChange={(e) =>
                        setConsultForm({ ...consultForm, phoneNumber: e.target.value })
                      }
                      placeholder="+91 98765 43210"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                        errors.phoneNumber
                          ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                          : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Country / Market
                  </label>
                  <div className="relative">
                    <Globe2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={consultForm.country}
                      onChange={(e) =>
                        setConsultForm({ ...consultForm, country: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none bg-white"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United Arab Emirates">UAE / Middle East</option>
                      <option value="Singapore / APAC">Singapore / APAC</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="Other International">Other International</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service Required
                  </label>
                  <select
                    value={consultForm.serviceRequired}
                    onChange={(e) =>
                      setConsultForm({ ...consultForm, serviceRequired: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none bg-white"
                  >
                    {SERVICES_LIST.map((svc) => (
                      <option key={svc.id} value={svc.title}>
                        {svc.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estimated Team Size
                  </label>
                  <div className="relative">
                    <Users2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={consultForm.estimatedTeamSize}
                      onChange={(e) =>
                        setConsultForm({ ...consultForm, estimatedTeamSize: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none bg-white"
                    >
                      <option value="1 – 4 agents">1 – 4 agents (Starter)</option>
                      <option value="5 – 15 agents">5 – 15 agents (Standard)</option>
                      <option value="16 – 50 agents">16 – 50 agents (Scaling)</option>
                      <option value="50+ agents">50+ agents (Enterprise)</option>
                      <option value="Pilot / Exploring">Pilot / Undetermined</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Operational Requirement & Scope <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={consultForm.message}
                  onChange={(e) =>
                    setConsultForm({ ...consultForm, message: e.target.value })
                  }
                  placeholder="Tell us about your current support volume, operating hours required, systems used, or specific challenges..."
                  className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                    errors.message
                      ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                      : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <p className="text-[11px] text-slate-500">
                  Strict NDA & confidentiality guaranteed. No obligation.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Request a Consultation</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Form: Quick Callback */
            <form onSubmit={handleCallbackSubmit} className="space-y-4 text-left">
              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-900 leading-relaxed">
                Short on time? Leave your number and preferred time window. A Basco Group solutions specialist will call you directly.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={callbackForm.fullName}
                    onChange={(e) =>
                      setCallbackForm({ ...callbackForm, fullName: e.target.value })
                    }
                    placeholder="e.g. Ramesh Iyer"
                    className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                      errors.fullName
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={callbackForm.phoneNumber}
                    onChange={(e) =>
                      setCallbackForm({ ...callbackForm, phoneNumber: e.target.value })
                    }
                    placeholder="+91 98765 00000"
                    className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                      errors.phoneNumber
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={callbackForm.companyName}
                    onChange={(e) =>
                      setCallbackForm({ ...callbackForm, companyName: e.target.value })
                    }
                    placeholder="e.g. Acme Tech Corp"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={callbackForm.preferredTime}
                      onChange={(e) =>
                        setCallbackForm({ ...callbackForm, preferredTime: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none bg-white"
                    >
                      <option value="10:00 AM – 1:00 PM IST">Morning (10:00 AM – 1:00 PM IST)</option>
                      <option value="1:00 PM – 4:00 PM IST">Afternoon (1:00 PM – 4:00 PM IST)</option>
                      <option value="4:00 PM – 7:00 PM IST">Evening (4:00 PM – 7:00 PM IST)</option>
                      <option value="Urgent / Within 2 hours">Urgent (Within 2 hours)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Discussion Topic
                </label>
                <select
                  value={callbackForm.topic}
                  onChange={(e) =>
                    setCallbackForm({ ...callbackForm, topic: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none bg-white"
                >
                  <option value="Customer Support / Contact Center Evaluation">
                    Customer Support / Contact Center Evaluation
                  </option>
                  <option value="Inbound & Outbound Calling Programs">
                    Inbound & Outbound Calling Programs
                  </option>
                  <option value="Technical Support (L1/L2) Outsourcing">
                    Technical Support (L1/L2) Outsourcing
                  </option>
                  <option value="Back Office & Data Operations">
                    Back Office & Data Operations
                  </option>
                  <option value="Lead Generation & Appointment Setting">
                    Lead Generation & Appointment Setting
                  </option>
                  <option value="Custom BPO Architecture & Pricing">
                    Custom BPO Architecture & Pricing
                  </option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Calls conducted by senior business managers only.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Phone className="w-4 h-4" />
                      <span>Request a Callback</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
