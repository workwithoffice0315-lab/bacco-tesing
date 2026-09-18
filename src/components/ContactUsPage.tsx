import React, { useState } from 'react';
import { COMPANY_DETAILS, SERVICES_LIST } from '../data/companyData';
import { ConsultationFormData, CallbackFormData } from '../types';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck, Globe, Building2, User, PhoneCall, MessageCircle, ExternalLink } from 'lucide-react';
import { submitLead } from '../services/leadService';

export const ContactUsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'consultation' | 'callback'>('consultation');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState<string>('');
  const [submissionNotice, setSubmissionNotice] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [consultForm, setConsultForm] = useState<ConsultationFormData>({
    fullName: '',
    companyName: '',
    workEmail: '',
    phoneNumber: '',
    country: 'India',
    serviceRequired: 'Customer Support',
    estimatedTeamSize: '5 – 15 agents',
    message: '',
  });

  const [callbackForm, setCallbackForm] = useState<CallbackFormData>({
    fullName: '',
    phoneNumber: '',
    companyName: '',
    preferredTime: '10:00 AM – 1:00 PM IST',
    topic: 'Customer Support / Contact Center Evaluation',
  });

  const validateConsult = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!consultForm.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!consultForm.companyName.trim()) newErrors.companyName = 'Company Name is required';
    if (!consultForm.workEmail.trim()) {
      newErrors.workEmail = 'Work Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consultForm.workEmail)) {
      newErrors.workEmail = 'Please provide a valid business email';
    }
    if (!consultForm.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (consultForm.phoneNumber.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!consultForm.message.trim()) {
      newErrors.message = 'Please provide details about your requirements';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCallback = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!callbackForm.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!callbackForm.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (callbackForm.phoneNumber.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phoneNumber = 'Please enter a valid contact phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateConsult()) return;

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
      setSubmissionNotice(res.message);
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
      setSubmissionNotice(res.message);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-us-page" className="py-12 lg:py-16 bg-white text-slate-900 text-left">
      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <span>Direct Operations Channel</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Let&apos;s Talk About Your Business Requirements
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Whether you are exploring a dedicated 5-agent pilot or transitioning a multi-shift enterprise contact center, our solutions architects are ready to evaluate your scope and build a tailored operational proposal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form & Secondary Callback Option */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              {/* Option Selector Tabs */}
              <div className="flex border-b border-slate-200 pb-4 mb-6 gap-3">
                <button
                  onClick={() => {
                    setActiveTab('consultation');
                    setIsSubmitted(false);
                    setErrors({});
                  }}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
                    activeTab === 'consultation'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  Request a Consultation
                </button>

                <button
                  onClick={() => {
                    setActiveTab('callback');
                    setIsSubmitted(false);
                    setErrors({});
                  }}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === 'callback'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                  <span>Request a Callback</span>
                </button>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900">
                      Inquiry Received Successfully!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out to Basco Group. Your requirement has been safely recorded and dispatched to our operations desk.
                    </p>
                  </div>

                  {/* Dispatch Notice Badge */}
                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 max-w-md mx-auto text-left text-xs space-y-2 shadow-sm">
                    <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Notification Dispatched to: workwithoffice0315@gmail.com</span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-normal">
                      A team manager will review your submission and contact you via phone or email within standard business hours.
                    </p>
                  </div>

                  {/* Instant WhatsApp Connect Button */}
                  {generatedWhatsAppUrl && (
                    <div className="pt-1 max-w-md mx-auto">
                      <a
                        href={generatedWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                      >
                        <MessageCircle className="w-5 h-5 fill-current" />
                        <span>Chat With Us on WhatsApp Now</span>
                        <ExternalLink className="w-4 h-4 opacity-75" />
                      </a>
                      <p className="text-[11px] text-slate-500 mt-1.5">
                        Want instant answers? Click above to start an immediate WhatsApp chat with our team.
                      </p>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setConsultForm({
                          fullName: '',
                          companyName: '',
                          workEmail: '',
                          phoneNumber: '',
                          country: 'India',
                          serviceRequired: 'Customer Support',
                          estimatedTeamSize: '5 – 15 agents',
                          message: '',
                        });
                        setCallbackForm({
                          fullName: '',
                          phoneNumber: '',
                          companyName: '',
                          preferredTime: '10:00 AM – 1:00 PM IST',
                          topic: 'Customer Support / Contact Center Evaluation',
                        });
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold px-6 py-2.5 rounded-lg transition-colors"
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                </div>
              ) : activeTab === 'consultation' ? (
                /* Primary Consultation Form */
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
                          placeholder="e.g. Rahul Sen"
                          className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none bg-white ${
                            errors.fullName
                              ? 'border-red-400 focus:ring-red-200'
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
                          placeholder="e.g. Zenith Enterprises"
                          className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none bg-white ${
                            errors.companyName
                              ? 'border-red-400 focus:ring-red-200'
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
                          placeholder="rahul@zenith.com"
                          className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none bg-white ${
                            errors.workEmail
                              ? 'border-red-400 focus:ring-red-200'
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
                          className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none bg-white ${
                            errors.phoneNumber
                              ? 'border-red-400 focus:ring-red-200'
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
                        Country
                      </label>
                      <select
                        value={consultForm.country}
                        onChange={(e) =>
                          setConsultForm({ ...consultForm, country: e.target.value })
                        }
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none bg-white"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United Arab Emirates">UAE</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Australia">Australia</option>
                        <option value="Canada">Canada</option>
                        <option value="Other">Other International</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Service Required
                      </label>
                      <select
                        value={consultForm.serviceRequired}
                        onChange={(e) =>
                          setConsultForm({
                            ...consultForm,
                            serviceRequired: e.target.value,
                          })
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
                      <select
                        value={consultForm.estimatedTeamSize}
                        onChange={(e) =>
                          setConsultForm({
                            ...consultForm,
                            estimatedTeamSize: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none bg-white"
                      >
                        <option value="1 – 4 agents">1 – 4 agents</option>
                        <option value="5 – 15 agents">5 – 15 agents</option>
                        <option value="16 – 50 agents">16 – 50 agents</option>
                        <option value="50+ agents">50+ agents</option>
                        <option value="Pilot / Exploring">Pilot / TBD</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message & Requirements Scope <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={consultForm.message}
                      onChange={(e) =>
                        setConsultForm({ ...consultForm, message: e.target.value })
                      }
                      placeholder="Please share details regarding your volume, channels, desired operating hours, or timeline..."
                      className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none bg-white ${
                        errors.message
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Confidential NDA Guaranteed</span>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold px-8 py-3 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
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
                /* Secondary Callback Option */
                <form onSubmit={handleCallbackSubmit} className="space-y-4 text-left">
                  <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 leading-relaxed">
                    Leave your contact number and our operational solutions lead will call you back during your preferred time window.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={callbackForm.fullName}
                        onChange={(e) =>
                          setCallbackForm({ ...callbackForm, fullName: e.target.value })
                        }
                        placeholder="e.g. Vikram Sharma"
                        className={`w-full px-3 py-2 text-sm rounded-lg border bg-white focus:ring-2 focus:outline-none ${
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
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={callbackForm.phoneNumber}
                        onChange={(e) =>
                          setCallbackForm({ ...callbackForm, phoneNumber: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className={`w-full px-3 py-2 text-sm rounded-lg border bg-white focus:ring-2 focus:outline-none ${
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
                        placeholder="e.g. Orbit Tech"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Callback Slot
                      </label>
                      <select
                        value={callbackForm.preferredTime}
                        onChange={(e) =>
                          setCallbackForm({
                            ...callbackForm,
                            preferredTime: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none"
                      >
                        <option value="10:00 AM – 1:00 PM IST">Morning (10:00 AM – 1:00 PM IST)</option>
                        <option value="1:00 PM – 4:00 PM IST">Afternoon (1:00 PM – 4:00 PM IST)</option>
                        <option value="4:00 PM – 7:00 PM IST">Evening (4:00 PM – 7:00 PM IST)</option>
                        <option value="Urgent / Within 2 hours">Urgent (Within 2 Hours)</option>
                      </select>
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
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none"
                    >
                      <option value="Customer Support / Contact Center Evaluation">
                        Customer Support / Contact Center Evaluation
                      </option>
                      <option value="Technical Support (L1/L2) Outsourcing">
                        Technical Support (L1/L2) Outsourcing
                      </option>
                      <option value="Back Office & Data Operations">
                        Back Office & Data Operations
                      </option>
                      <option value="Lead Generation & Telemarketing">
                        Lead Generation & Telemarketing
                      </option>
                      <option value="BPO Seating Models & Pricing">
                        BPO Seating Models & Pricing
                      </option>
                    </select>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold px-8 py-3 rounded-xl shadow-sm transition-colors flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Processing...</span>
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

          {/* Right Column: Editable Contact Placeholders */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-7 border border-slate-800 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Direct Inquiries
                </span>
                <h3 className="text-xl font-bold tracking-tight text-white mt-1">
                  Contact Coordinates
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Verified communication desks for commercial partnerships and service delivery.
                </p>
              </div>

              {/* Clearly marked editable placeholders as specified in prompt */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">Company Address</div>
                    <p className="text-slate-400 mt-0.5 leading-relaxed">
                      {COMPANY_DETAILS.addressPlaceholder}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">Phone Number</div>
                    <p className="text-slate-400 mt-0.5 leading-relaxed">
                      {COMPANY_DETAILS.phonePlaceholder}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">Email Address</div>
                    <a
                      href={`mailto:${COMPANY_DETAILS.emailPlaceholder}`}
                      className="text-blue-400 hover:underline mt-0.5 block"
                    >
                      {COMPANY_DETAILS.emailPlaceholder}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                  <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">Business Hours</div>
                    <p className="text-slate-400 mt-0.5 leading-relaxed">
                      {COMPANY_DETAILS.businessHoursPlaceholder}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Official Web:</span>
                <span className="text-blue-400 font-semibold">{COMPANY_DETAILS.domain}</span>
              </div>
            </div>

            {/* SLA Benchmark Box */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900 text-sm">Response Time SLA</h4>
              <p className="leading-relaxed">
                All business consultation inquiries and callback requests submitted on <strong>{COMPANY_DETAILS.domain}</strong> are acknowledged within 4 business hours by an operational solutions consultant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
