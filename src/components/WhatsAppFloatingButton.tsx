import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, PhoneCall, Check, ExternalLink } from 'lucide-react';
import { SiteSettings } from '../types';
import { DEFAULT_SITE_SETTINGS } from '../data/defaultSettings';

interface WhatsAppFloatingButtonProps {
  settings?: SiteSettings;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  settings = DEFAULT_SITE_SETTINGS,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState('');
  const [hasNewBadge, setHasNewBadge] = useState(true);

  if (!settings.whatsappFloatingEnabled) {
    return null;
  }

  const rawPhone = settings.adminWhatsApp || '919876543210';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const positionClass =
    settings.whatsappButtonPosition === 'right' ? 'right-6 items-end' : 'left-6 items-start';

  const defaultMsg =
    settings.whatsappDefaultMessage ||
    'Hello Basco Group, I would like to inquire about your BPO & customer support outsourcing services.';

  const handleStartChat = (overrideMsg?: string) => {
    const messageToSend = overrideMsg || customText.trim() || defaultMsg;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const quickPrompts = [
    'Need customer support outsourcing quote',
    'Inquire about contact center setup',
    'Speak with Basco operations team',
  ];

  return (
    <div
      id="basco-floating-whatsapp"
      className={`fixed bottom-6 ${positionClass} z-50 flex flex-col pointer-events-auto font-sans`}
    >
      {/* Expanded Quick Chat Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 text-left">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-white text-lg">
                    B
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-emerald-700 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-bold text-base leading-tight">Basco Group Support</h4>
                  <p className="text-xs text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                    Typically replies in 5 minutes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            {/* Auto Message Bubble */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-slate-200/80 shadow-sm text-xs sm:text-sm text-slate-700 space-y-1">
              <p className="font-medium text-slate-900">
                👋 Welcome to <span className="font-bold text-blue-900">Basco Group</span>!
              </p>
              <p className="text-slate-600 leading-relaxed">
                Need reliable customer support, call center agents, or BPO solutions? Send us a message on WhatsApp for instant assistance.
              </p>
              <span className="block text-[10px] text-slate-400 text-right">Just now</span>
            </div>

            {/* Quick Chips */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Quick questions:
              </p>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleStartChat(prompt)}
                    className="text-left text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 py-1.5 px-3 rounded-lg transition-all flex items-center justify-between group"
                  >
                    <span>{prompt}</span>
                    <Send className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            {/* Input & Send */}
            <div className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleStartChat();
                }}
                className="flex-1 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => handleStartChat()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0"
                title="Send to WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Footer note */}
          <div className="py-2 px-4 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Direct WhatsApp: +{cleanPhone}</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" /> Verified
            </span>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasNewBadge(false);
          }}
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-emerald-500/30 transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
          aria-label="Contact Basco Group on WhatsApp"
        >
          {/* Pulsing ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none group-hover:opacity-0"></span>

          {isOpen ? (
            <X className="w-7 h-7 relative z-10" />
          ) : (
            <svg
              className="w-7 h-7 fill-current relative z-10"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.122.553 4.188 1.603 6.009L.07 24l6.113-1.603c1.763.96 3.753 1.468 5.848 1.468 6.637 0 12.031-5.394 12.031-12.034C24.062 5.394 18.668 0 12.031 0zm0 21.906c-1.85 0-3.666-.497-5.253-1.438l-.377-.224-3.906 1.025 1.043-3.809-.247-.393c-1.031-1.642-1.575-3.535-1.575-5.484 0-5.462 4.444-9.906 9.906-9.906 5.462 0 9.906 4.444 9.906 9.906 0 5.462-4.444 9.906-9.906 9.906zm5.434-7.425c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.198.297-.768.967-.942 1.165-.174.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.058-.174-.297-.019-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.208-.242-.579-.487-.501-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.521.074-.794.372s-1.042 1.016-1.042 2.479 1.066 2.876 1.215 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
            </svg>
          )}

          {/* Online green indicator */}
          <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-300 border-2 border-white rounded-full"></span>
        </button>

        {/* Small floating badge when closed */}
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              setHasNewBadge(false);
            }}
            className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-sm text-slate-800 hover:text-emerald-700 px-3.5 py-2 rounded-full shadow-lg border border-slate-200 text-xs font-semibold hover:border-emerald-300 transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>WhatsApp Us</span>
            <span className="text-[10px] text-slate-400 group-hover:text-emerald-600">
              Online
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
