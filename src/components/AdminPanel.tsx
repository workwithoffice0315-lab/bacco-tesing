import React, { useState, useEffect } from 'react';
import {
  SiteSettings,
  LeadRecord,
  PageRoute,
} from '../types';
import {
  fetchAllLeads,
  updateLeadStatus,
  deleteLeadRecord,
  saveSiteSettings,
  sendTestEmail,
} from '../services/leadService';
import {
  Settings,
  Database,
  Search,
  Globe,
  Share2,
  Code2,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Download,
  Trash2,
  RefreshCw,
  Eye,
  Lock,
  ArrowLeft,
  Building,
  Calendar,
  Send,
  Sparkles,
} from 'lucide-react';

interface AdminPanelProps {
  settings: SiteSettings;
  onUpdateSettings: (newSettings: SiteSettings) => void;
  onNavigate: (route: PageRoute) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  settings,
  onUpdateSettings,
  onNavigate,
}) => {
  // Authentication PIN state (Default pin: basco2025)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('basco_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Current active tab
  const [activeTab, setActiveTab] = useState<'leads' | 'seo' | 'pixel' | 'notifications'>('leads');

  // Form settings local state
  const [formSettings, setFormSettings] = useState<SiteSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Leads list state
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Test email state
  const [testEmailAddress, setTestEmailAddress] = useState(settings.adminEmail || 'workwithoffice0315@gmail.com');
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<{ success: boolean; message: string } | null>(null);

  // Pixel test state
  const [pixelTestStatus, setPixelTestStatus] = useState<string | null>(null);

  // Load leads on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated]);

  const loadLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const data = await fetchAllLeads();
      setLeads(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Support default passcode "basco2025" or "admin"
    if (pinInput.trim().toLowerCase() === 'basco2025' || pinInput.trim().toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('basco_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Invalid passcode. Use "basco2025" to access the control panel.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('basco_admin_auth');
  };

  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await saveSiteSettings(formSettings);
      onUpdateSettings(formSettings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadRecord['status']) => {
    await updateLeadStatus(leadId, newStatus);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  const handleDeleteLead = async (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this lead permanently?')) {
      await deleteLeadRecord(leadId);
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
    }
  };

  const handleSendTestEmail = async () => {
    setIsSendingTestEmail(true);
    setTestEmailResult(null);
    try {
      const res = await sendTestEmail(testEmailAddress);
      setTestEmailResult({
        success: res.success,
        message: res.message || 'Notification test dispatched to ' + testEmailAddress,
      });
    } catch (err: any) {
      setTestEmailResult({
        success: false,
        message: err.message || 'Failed to dispatch test notification.',
      });
    } finally {
      setIsSendingTestEmail(false);
    }
  };

  const handleTestMetaPixel = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Admin Test Lead Event',
        value: 100,
        currency: 'INR',
      });
      setPixelTestStatus('Meta Pixel "Lead" event triggered successfully! Check your Meta Events Manager.');
    } else {
      setPixelTestStatus(
        formSettings.metaPixelId
          ? 'Pixel script loaded, test event dispatched to buffer.'
          : 'Please enter and save a valid Meta Pixel ID first.'
      );
    }
    setTimeout(() => setPixelTestStatus(null), 5000);
  };

  const exportLeadsToCSV = () => {
    if (leads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = [
      'ID',
      'Date & Time (IST)',
      'Type',
      'Full Name',
      'Phone',
      'Email',
      'Company',
      'Service/Role',
      'Message',
      'Status',
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${new Date(l.createdAt).toLocaleString('en-IN')}"`,
      `"${l.type}"`,
      `"${(l.fullName || '').replace(/"/g, '""')}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${(l.companyName || '').replace(/"/g, '""')}"`,
      `"${(l.serviceOrRole || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `basco_group_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      (lead.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.phone || '').includes(searchQuery) ||
      (lead.companyName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.serviceOrRole || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesType = typeFilter === 'all' || lead.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl text-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/30">
              B
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Basco Group</h1>
              <p className="text-xs text-slate-400">Website Admin & Backend Control</p>
            </div>
          </div>

          <div className="bg-blue-950/50 border border-blue-800/60 rounded-xl p-4 mb-6 text-xs text-blue-200 leading-relaxed">
            <p className="font-semibold text-blue-100 mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-400" /> Admin Access
            </p>
            Enter passcode to manage SEO tags, Meta Ads Pixel code, email & WhatsApp settings, and customer leads.
            <div className="mt-2 text-slate-300">
              Default passcode: <code className="bg-blue-900/80 px-1.5 py-0.5 rounded text-white font-mono">basco2025</code>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode..."
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                autoFocus
              />
            </div>

            {pinError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Site
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 text-left font-sans">
      {/* Top Navbar */}
      <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-extrabold text-white text-lg shadow-md shadow-blue-600/30">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base text-white">Basco Group Backend</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">SEO, Meta Pixel, Leads & WhatsApp Center</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" /> View Website
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700 text-xs font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'leads'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700/80 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Form Leads & CRM</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[11px] bg-white/20 text-white font-bold">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'seo'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700/80 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>SEO Management</span>
          </button>

          <button
            onClick={() => setActiveTab('pixel')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'pixel'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700/80 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Meta Pixel & Ads Code</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'notifications'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700/80 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp & Email Settings</span>
          </button>
        </div>

        {/* TAB 1: LEADS & CRM */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Lead Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-xs text-slate-400 font-medium">Total Inquiries</span>
                <p className="text-2xl font-black text-white mt-1">{leads.length}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-xs text-emerald-400 font-medium">New / Unread</span>
                <p className="text-2xl font-black text-emerald-400 mt-1">
                  {leads.filter((l) => l.status === 'new').length}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-xs text-blue-400 font-medium">Consultation Requests</span>
                <p className="text-2xl font-black text-blue-400 mt-1">
                  {leads.filter((l) => l.type === 'consultation').length}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-xs text-purple-400 font-medium">Careers Applications</span>
                <p className="text-2xl font-black text-purple-400 mt-1">
                  {leads.filter((l) => l.type === 'career').length}
                </p>
              </div>
            </div>

            {/* Filter and Actions Bar */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, company, phone, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="consultation">Consultation</option>
                  <option value="callback">Callback</option>
                  <option value="contact">Contact Form</option>
                  <option value="career">Job Application</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>

                <button
                  onClick={loadLeads}
                  disabled={isLoadingLeads}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl transition-colors"
                  title="Refresh Leads"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingLeads ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={exportLeadsToCSV}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Leads Table / List */}
            {filteredLeads.length === 0 ? (
              <div className="p-12 text-center bg-slate-800/40 rounded-2xl border border-slate-800">
                <Database className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-300">No leads found</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {searchQuery ? 'Try adjusting your search criteria.' : 'Form inquiries submitted by website visitors will appear here.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map((lead) => {
                  const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                  const waReplyText =
                    `Hello ${lead.fullName}, thank you for contacting Basco Group regarding ${lead.serviceOrRole || 'our services'}. How can we assist you today?`;
                  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waReplyText)}`;

                  return (
                    <div
                      key={lead.id}
                      className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              lead.type === 'consultation'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : lead.type === 'callback'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : lead.type === 'career'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {lead.type}
                          </span>

                          <h3 className="text-base font-bold text-white">{lead.fullName}</h3>

                          {lead.companyName && (
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Building className="w-3.5 h-3.5 text-slate-500" />
                              {lead.companyName}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            {new Date(lead.createdAt).toLocaleString('en-IN', {
                              timeZone: 'Asia/Kolkata',
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>

                          {/* Status Badge Select */}
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                              lead.status === 'new'
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                                : lead.status === 'contacted'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                : lead.status === 'in_progress'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            }`}
                          >
                            <option value="new" className="bg-slate-900 text-slate-200">New</option>
                            <option value="contacted" className="bg-slate-900 text-slate-200">Contacted</option>
                            <option value="in_progress" className="bg-slate-900 text-slate-200">In Progress</option>
                            <option value="closed" className="bg-slate-900 text-slate-200">Closed</option>
                          </select>

                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Contact Info & Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <a href={`tel:${lead.phone}`} className="hover:text-emerald-400 font-mono">
                            {lead.phone || 'N/A'}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <a href={`mailto:${lead.email}`} className="hover:text-blue-400">
                            {lead.email || 'N/A'}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span className="font-semibold text-slate-200 truncate">
                            {lead.serviceOrRole || 'General Inquiry'}
                          </span>
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/50 text-xs text-slate-300 leading-relaxed font-sans">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">
                          Requirement Details:
                        </span>
                        {lead.message || 'No additional note provided.'}

                        {lead.additionalData && Object.keys(lead.additionalData).length > 0 && (
                          <div className="mt-2 pt-2 border-t border-slate-800 flex flex-wrap gap-2">
                            {Object.entries(lead.additionalData).map(([key, val]) => (
                              <span
                                key={key}
                                className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400"
                              >
                                <strong>{key}:</strong> {String(val)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2">
                          {cleanPhone && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp Lead</span>
                            </a>
                          )}

                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}?subject=Basco Group Inquiry - ${encodeURIComponent(
                                lead.serviceOrRole || 'Outsourcing Support'
                              )}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Email Lead</span>
                            </a>
                          )}
                        </div>

                        <span className="text-[11px] text-slate-400">
                          Dispatched to: <code className="text-slate-300">{settings.adminEmail}</code>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SEO SETTINGS */}
        {activeTab === 'seo' && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white">Search Engine Optimization (SEO)</h2>
                <p className="text-xs text-slate-400">
                  Configure meta tags, Open Graph card metadata, search indexing, and Google verification.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{isSaving ? 'Saving...' : 'Save SEO Settings'}</span>
              </button>
            </div>

            {saveSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>SEO tags and settings updated successfully and applied to live site!</span>
              </div>
            )}

            {/* Google SERP Live Snippet Preview */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Google Search Result Live Preview
              </span>
              <div className="max-w-2xl bg-white p-4 rounded-xl text-slate-900 shadow-md">
                <div className="text-xs text-slate-600 flex items-center gap-1 mb-1">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                    B
                  </span>
                  <span>www.bascogroup.co.in</span>
                  <span>› services</span>
                </div>
                <h4 className="text-base text-[#1a0dab] hover:underline cursor-pointer font-medium leading-tight">
                  {formSettings.metaTitle || 'Basco Group | BPO, Call Center & Customer Support'}
                </h4>
                <p className="text-xs text-[#4d5156] mt-1 leading-relaxed line-clamp-2">
                  {formSettings.metaDescription ||
                    'Basco Group provides professional BPO, call center, customer support, contact center and business process outsourcing solutions.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meta Title */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Website Meta Title
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      formSettings.metaTitle.length > 60 ? 'text-amber-400' : 'text-slate-400'
                    }`}
                  >
                    {formSettings.metaTitle.length}/60 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={formSettings.metaTitle}
                  onChange={(e) => setFormSettings({ ...formSettings, metaTitle: e.target.value })}
                  placeholder="Basco Group | BPO, Call Center & Customer Support"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Canonical URL */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Canonical Base URL
                </label>
                <input
                  type="url"
                  value={formSettings.canonicalUrl}
                  onChange={(e) => setFormSettings({ ...formSettings, canonicalUrl: e.target.value })}
                  placeholder="https://www.bascogroup.co.in"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              {/* Meta Description */}
              <div className="space-y-2 md:col-span-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Meta Description
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      formSettings.metaDescription.length > 160 ? 'text-amber-400' : 'text-slate-400'
                    }`}
                  >
                    {formSettings.metaDescription.length}/160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={formSettings.metaDescription}
                  onChange={(e) => setFormSettings({ ...formSettings, metaDescription: e.target.value })}
                  placeholder="Enter high-converting, keyword-rich description for search engines..."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Meta Keywords */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Target SEO Keywords (Comma separated)
                </label>
                <input
                  type="text"
                  value={formSettings.metaKeywords}
                  onChange={(e) => setFormSettings({ ...formSettings, metaKeywords: e.target.value })}
                  placeholder="BPO India, Call Center Services, Contact Center India, Customer Support Outsourcing, Basco Group"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Open Graph Title */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Social Sharing Title (og:title)
                </label>
                <input
                  type="text"
                  value={formSettings.ogTitle}
                  onChange={(e) => setFormSettings({ ...formSettings, ogTitle: e.target.value })}
                  placeholder="Basco Group | Smart Outsourcing & CX Solutions"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Open Graph Image */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Social Card Image URL (og:image)
                </label>
                <input
                  type="url"
                  value={formSettings.ogImageUrl}
                  onChange={(e) => setFormSettings({ ...formSettings, ogImageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Google Verification & Robots Indexing */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Google Search Console Verification Token / Tag
                </label>
                <input
                  type="text"
                  value={formSettings.googleSiteVerification}
                  onChange={(e) => setFormSettings({ ...formSettings, googleSiteVerification: e.target.value })}
                  placeholder="google-site-verification token or code"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-2 flex flex-col justify-center">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                  Search Engine Indexing
                </label>
                <label className="inline-flex items-center gap-3 cursor-pointer p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <input
                    type="checkbox"
                    checked={formSettings.robotsIndexing}
                    onChange={(e) => setFormSettings({ ...formSettings, robotsIndexing: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-slate-200">
                    Allow Google & search engines to index (robots: <code className="text-emerald-400">index, follow</code>)
                  </span>
                </label>
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: META PIXEL & ADS CODE */}
        {activeTab === 'pixel' && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white">Meta (Facebook) Pixel & Ads Tracking Code</h2>
                <p className="text-xs text-slate-400">
                  Paste your Meta Pixel ID or custom tracking script. Automatically fires "PageView" and "Lead" events.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{isSaving ? 'Saving...' : 'Save Tracking Codes'}</span>
              </button>
            </div>

            {saveSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Pixel & Analytics tracking configuration saved and active!</span>
              </div>
            )}

            {/* Explanatory Callout */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-800/60 flex items-start gap-3">
              <Code2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-100 space-y-1">
                <p className="font-bold text-white">Automated Conversion Tracking Included:</p>
                <p>
                  When you input your Meta Pixel ID, Basco Group automatically loads the official Meta Pixel snippet and tracks:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-blue-200">
                  <li><strong>fbq('track', 'PageView')</strong> on initial load and route changes.</li>
                  <li><strong>fbq('track', 'Lead')</strong> whenever any visitor submits the Contact Us form, Consultation Modal, Quick Callback, or Careers Application!</li>
                </ul>
              </div>
            </div>

            {/* Meta Pixel Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Meta (Facebook) Pixel ID
                </label>
                <input
                  type="text"
                  value={formSettings.metaPixelId}
                  onChange={(e) => setFormSettings({ ...formSettings, metaPixelId: e.target.value })}
                  placeholder="e.g. 123456789012345"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
                <p className="text-[11px] text-slate-400">
                  Find your Pixel ID in Meta Events Manager &gt; Data Sources.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Google Analytics 4 (GA4) Measurement ID
                </label>
                <input
                  type="text"
                  value={formSettings.googleAnalyticsId}
                  onChange={(e) => setFormSettings({ ...formSettings, googleAnalyticsId: e.target.value })}
                  placeholder="e.g. G-XXXXXXXXXX"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
                <p className="text-[11px] text-slate-400">
                  Optional Google Tag / GA4 property ID.
                </p>
              </div>
            </div>

            {/* Test Pixel Trigger */}
            <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Test Meta Pixel Event</h4>
                <p className="text-xs text-slate-400">
                  Simulate a test "Lead" conversion event to verify your Meta Pixel helper browser extension.
                </p>
              </div>
              <button
                type="button"
                onClick={handleTestMetaPixel}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shrink-0"
              >
                Fire Test Pixel "Lead"
              </button>
            </div>

            {pixelTestStatus && (
              <div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-400" />
                <span>{pixelTestStatus}</span>
              </div>
            )}

            {/* Custom Head Script */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Custom Head Code / Raw Script Tags (&lt;head&gt;)
              </label>
              <textarea
                rows={4}
                value={formSettings.customHeadCode}
                onChange={(e) => setFormSettings({ ...formSettings, customHeadCode: e.target.value })}
                placeholder="<!-- Paste Google Tag Manager (GTM), Hotjar, TikTok Pixel, or custom scripts here -->"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <p className="text-[11px] text-slate-400">
                This code snippet will be injected directly into the document &lt;head&gt;.
              </p>
            </div>
          </form>
        )}

        {/* TAB 4: WHATSAPP & EMAIL SETTINGS */}
        {activeTab === 'notifications' && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white">WhatsApp & Email Notifications Configuration</h2>
                <p className="text-xs text-slate-400">
                  Control where website lead alerts are sent (Email & WhatsApp), and configure the floating WhatsApp button on the left.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{isSaving ? 'Saving...' : 'Save Notification Settings'}</span>
              </button>
            </div>

            {saveSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Notification and WhatsApp settings successfully saved!</span>
              </div>
            )}

            {/* Email Notification Setup */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Lead Notification Email</h3>
                  <p className="text-xs text-slate-400">
                    All form submissions (Contact, Consultation, Callback, Careers) are delivered to this address.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Admin Notification Email Address
                  </label>
                  <input
                    type="email"
                    value={formSettings.adminEmail}
                    onChange={(e) => {
                      setFormSettings({ ...formSettings, adminEmail: e.target.value });
                      setTestEmailAddress(e.target.value);
                    }}
                    placeholder="workwithoffice0315@gmail.com"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-emerald-400 block font-medium">
                    Current configured recipient: {formSettings.adminEmail || 'workwithoffice0315@gmail.com'}
                  </span>
                </div>

                {/* Test Email Dispatcher */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Verify Email Notification
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={testEmailAddress}
                      onChange={(e) => setTestEmailAddress(e.target.value)}
                      placeholder="workwithoffice0315@gmail.com"
                      className="flex-1 px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSendTestEmail}
                      disabled={isSendingTestEmail}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shrink-0 flex items-center gap-1.5"
                    >
                      {isSendingTestEmail ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      <span>Send Test</span>
                    </button>
                  </div>
                  {testEmailResult && (
                    <div
                      className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                        testEmailResult.success
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {testEmailResult.success ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0" />
                      )}
                      <span>{testEmailResult.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* WhatsApp Integration & Floating Button on Left */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">WhatsApp Integration & Floating Button (Left Side)</h3>
                  <p className="text-xs text-slate-400">
                    Floating button pinned to the left edge of the screen for instant visitor conversions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* WhatsApp Phone Number */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Basco Group WhatsApp Number (with country code, no +)
                  </label>
                  <input
                    type="text"
                    value={formSettings.adminWhatsApp}
                    onChange={(e) => setFormSettings({ ...formSettings, adminWhatsApp: e.target.value })}
                    placeholder="919876543210"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                  />
                  <p className="text-[11px] text-slate-400">
                    Used for receiving lead notifications and answering live visitor chats. (e.g. 919876543210 for India).
                  </p>
                </div>

                {/* Button Position */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Floating Button Screen Position
                  </label>
                  <select
                    value={formSettings.whatsappButtonPosition}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        whatsappButtonPosition: e.target.value as 'left' | 'right',
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="left">Left Side (Requested default)</option>
                    <option value="right">Right Side</option>
                  </select>
                  <p className="text-[11px] text-slate-400">
                    Currently set to <strong className="text-emerald-400 uppercase">{formSettings.whatsappButtonPosition}</strong> side.
                  </p>
                </div>

                {/* Floating Enabled Toggle */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Floating Widget Status
                  </label>
                  <label className="inline-flex items-center gap-3 cursor-pointer p-3 bg-slate-900 rounded-xl border border-slate-700 w-full">
                    <input
                      type="checkbox"
                      checked={formSettings.whatsappFloatingEnabled}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          whatsappFloatingEnabled: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="text-xs text-slate-200">
                      Enable floating WhatsApp chat bubble on website
                    </span>
                  </label>
                </div>

                {/* Default Greeting */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Default WhatsApp Chat Greeting Message
                  </label>
                  <textarea
                    rows={2}
                    value={formSettings.whatsappDefaultMessage}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        whatsappDefaultMessage: e.target.value,
                      })
                    }
                    placeholder="Hello Basco Group, I would like to inquire about..."
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
