import React, { useState } from 'react';
import { CAREER_OPENINGS, COMPANY_DETAILS } from '../data/companyData';
import { JobOpening, JobApplicationFormData } from '../types';
import { Briefcase, MapPin, Clock, Upload, CheckCircle2, Send, AlertCircle, FileText, X, ChevronRight, User, Mail, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { submitLead } from '../services/leadService';

export const CareersPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Application Form State
  const [formData, setFormData] = useState<JobApplicationFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    positionApplyingFor: 'Customer Support Specialist (Voice & Digital)',
    totalExperience: '1 – 3 Years',
    location: 'India',
    resumeFileName: '',
    message: '',
  });

  const departments = ['All', 'Customer Experience', 'Technical Support', 'Outbound & Growth', 'Quality & Compliance', 'Operations'];

  const filteredJobs = CAREER_OPENINGS.filter((job) => {
    if (departmentFilter === 'All') return true;
    return job.department.toLowerCase().includes(departmentFilter.toLowerCase());
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, resumeFileName: file.name });
      if (errors.resumeFileName) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.resumeFileName;
          return next;
        });
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData({ ...formData, resumeFileName: file.name });
      if (errors.resumeFileName) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.resumeFileName;
          return next;
        });
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.resumeFileName) {
      newErrors.resumeFileName = 'Please attach your resume file (PDF/DOCX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await submitLead({
        type: 'career',
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        companyName: `Applicant: ${formData.location}`,
        serviceOrRole: formData.positionApplyingFor,
        message: `${formData.message || 'Job Application'}\n\n[Experience: ${formData.totalExperience}, Resume Attached: ${formData.resumeFileName || 'Yes'}]`,
        additionalData: {
          experience: formData.totalExperience,
          location: formData.location,
          resumeFile: formData.resumeFileName,
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

  const applyForJob = (job: JobOpening) => {
    setFormData((prev) => ({ ...prev, positionApplyingFor: job.title }));
    setSelectedJob(job);
    const formElement = document.getElementById('career-application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="careers-page" className="py-12 lg:py-16 bg-white text-slate-900 text-left">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <span>Join Our Growing Team</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Build Your Career With Basco Group
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Basco Group values motivated, articulate, and dedicated professionals who want to build lasting careers in customer service, operations, sales, technology, and business support. We provide structured training, supportive team environments, and merit-based advancement opportunities.
          </p>
        </div>
      </div>

      {/* Why Work at Basco */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-base font-bold text-slate-900">Comprehensive Training</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Every associate undergoes extensive orientation covering communication fluency, software mastery, and customer empathy before taking live customer interactions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-base font-bold text-slate-900">Career Progression</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Clear promotion tracks from Frontline Executive to Quality Analyst, Team Lead, Operations Manager, and Domain Account Director.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-base font-bold text-slate-900">Supportive Workplace</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              A respectful, professional environment that emphasizes mental well-being, shift predictability, and open communication with supervisory leadership.
            </p>
          </div>
        </div>
      </div>

      {/* Current Vacancies Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Open Positions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Current Vacancies
            </h2>
            <p className="text-sm text-slate-600 mt-1 font-normal">
              Explore open opportunities across our operations, technology, and support divisions.
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setDepartmentFilter(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  departmentFilter === dept
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {job.department}
                  </span>
                  <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    {job.type}
                  </span>
                  <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    Exp: {job.experience}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {job.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {job.overview}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3 w-full lg:w-auto">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="w-full lg:w-auto px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => applyForJob(job)}
                  className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors whitespace-nowrap"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-slate-900 text-white p-6 flex items-start justify-between border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  {selectedJob.department}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                  {selectedJob.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
                  <span>{selectedJob.type}</span>
                  <span>•</span>
                  <span>{selectedJob.experience}</span>
                  <span>•</span>
                  <span>{selectedJob.location}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto text-left">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Role Overview
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {selectedJob.overview}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {selectedJob.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Requirements & Qualifications
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {selectedJob.requirements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 sm:px-8 sm:py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const job = selectedJob;
                  setSelectedJob(null);
                  applyForJob(job);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2 rounded-lg"
              >
                Apply for this Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Section */}
      <div id="career-application-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Candidate Application
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Submit Your Job Application
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Complete the details below and attach your CV. Our talent acquisition team reviews every verified candidate submission.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900">
                  Application Submitted Successfully!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for applying to Basco Group for the role of{' '}
                  <strong>{formData.positionApplyingFor}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 max-w-md mx-auto text-left text-xs space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Applicant Record Dispatched to: workwithoffice0315@gmail.com</span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Our HR operations team will review your profile and follow up via email at <strong className="text-slate-700">{formData.email}</strong>.
                </p>
              </div>

              {generatedWhatsAppUrl && (
                <div className="pt-2 max-w-md mx-auto">
                  <a
                    href={generatedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Follow Up on WhatsApp with HR</span>
                    <ExternalLink className="w-4 h-4 opacity-75" />
                  </a>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Directly message recruitment desk on WhatsApp.
                  </p>
                </div>
              )}

              <div className="pt-3">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phoneNumber: '',
                      positionApplyingFor: 'Customer Support Specialist (Voice & Digital)',
                      totalExperience: '1 – 3 Years',
                      location: 'India',
                      resumeFileName: '',
                      message: '',
                    });
                  }}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold px-6 py-2.5 rounded-lg"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="e.g. Ananya Patel"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
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
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="ananya@example.com"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                        errors.email
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      placeholder="+91 98765 43210"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
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

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Position Applying For <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.positionApplyingFor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        positionApplyingFor: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none bg-white"
                  >
                    {CAREER_OPENINGS.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                    <option value="General Frontline Inquiries">
                      General Operations Pool / Other
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Experience
                  </label>
                  <select
                    value={formData.totalExperience}
                    onChange={(e) =>
                      setFormData({ ...formData, totalExperience: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none bg-white"
                  >
                    <option value="Fresher / <1 Year">Fresher / Under 1 Year</option>
                    <option value="1 – 3 Years">1 – 3 Years</option>
                    <option value="3 – 5 Years">3 – 5 Years</option>
                    <option value="5+ Years (Leadership)">5+ Years (Senior / Lead)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Location / City <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="e.g. Mumbai, Gurugram, Bengaluru, Pune"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                        errors.location
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.location && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.location}</p>
                  )}
                </div>
              </div>

              {/* Resume Upload - Supports both Drag-and-Drop & Click File Upload as required */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resume Upload (PDF or DOCX) <span className="text-red-500">*</span>
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
                    errors.resumeFileName
                      ? 'border-red-400 bg-red-50/20'
                      : formData.resumeFileName
                      ? 'border-emerald-400 bg-emerald-50/30'
                      : 'border-slate-300 hover:border-blue-400 bg-white'
                  }`}
                  onClick={() => document.getElementById('resume-file-input')?.click()}
                >
                  <input
                    id="resume-file-input"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {formData.resumeFileName ? (
                    <div className="flex items-center justify-center gap-2 text-emerald-700 text-sm font-semibold">
                      <FileText className="w-5 h-5" />
                      <span>{formData.resumeFileName}</span>
                      <span className="text-xs text-slate-500 font-normal">
                        (Click to change)
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                      <div className="text-xs text-slate-700 font-medium">
                        <span className="text-blue-600 font-bold">Click to upload</span> or drag and drop your CV file here
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Supported formats: PDF, DOC, DOCX (Max 5MB)
                      </div>
                    </div>
                  )}
                </div>
                {errors.resumeFileName && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.resumeFileName}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brief Cover Message / Note (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us briefly about your communication background, shift availability, and key achievements..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:outline-none bg-white"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Direct questions to{' '}
                  <span className="text-slate-700 font-medium">
                    {COMPANY_DETAILS.careersEmailPlaceholder}
                  </span>
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold px-8 py-3 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-4 h-4" />
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
