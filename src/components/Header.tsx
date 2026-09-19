import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { Phone, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenConsultation: () => void;
  onOpenCallback: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenConsultation,
  onOpenCallback,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; route: PageRoute; hasDropdown?: boolean }[] = [
    { label: 'Home', route: '/' },
    { label: 'About Us', route: '/about-us' },
    { label: 'Services', route: '/services', hasDropdown: true },
    { label: 'Industries', route: '/industries' },
    { label: 'Why Basco', route: '/why-basco' },
    { label: 'Careers', route: '/careers' },
    { label: 'Contact Us', route: '/contact-us' },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="header-nav"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform duration-200">
              <span className="font-extrabold text-xl tracking-tight">B</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  BASCO
                </span>
                <span className="text-xl font-semibold tracking-tight text-blue-700">
                  GROUP
                </span>
              </div>
              <p className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">
                BPO & Contact Center
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <div key={item.route} className="relative group">
                  <button
                    id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleNavClick(item.route)}
                    className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive
                        ? 'text-blue-700 bg-blue-50/80 font-semibold'
                        : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700 transition-transform group-hover:rotate-180" />
                    )}
                  </button>

                  {/* Services Quick Mega Dropdown */}
                  {item.hasDropdown && (
                    <div className="absolute left-0 top-full pt-2 w-72 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-3">
                        <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase px-2.5 py-1">
                          Core Solutions
                        </div>
                        <div className="space-y-1">
                          <button
                            onClick={() => handleNavClick('/services')}
                            className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between"
                          >
                            <span>Customer Support</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                          </button>
                          <button
                            onClick={() => handleNavClick('/services')}
                            className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between"
                          >
                            <span>Contact Center Services</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                          </button>
                          <button
                            onClick={() => handleNavClick('/services')}
                            className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between"
                          >
                            <span>Outbound Calling</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                          </button>
                          <button
                            onClick={() => handleNavClick('/services')}
                            className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between"
                          >
                            <span>Back Office Support</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                          </button>
                          <button
                            onClick={() => handleNavClick('/services')}
                            className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between"
                          >
                            <span>Business Process Outsourcing</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                          </button>
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => handleNavClick('/services')}
                            className="w-full text-center text-xs font-medium text-blue-700 hover:underline py-1"
                          >
                            View All Outsourcing Services →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="header-callback-btn"
              onClick={onOpenCallback}
              className="text-xs font-medium text-slate-600 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Request Callback</span>
            </button>

            <button
              id="header-consultation-btn"
              onClick={onOpenConsultation}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-150 flex items-center gap-2"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-callback-trigger"
              onClick={onOpenCallback}
              aria-label="Request Callback"
              className="p-2 text-slate-700 hover:text-blue-700 rounded-lg hover:bg-slate-100"
            >
              <Phone className="w-5 h-5 text-blue-600" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-700 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-700 bg-blue-50 font-semibold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCallback();
              }}
              className="w-full py-2.5 px-4 text-center rounded-lg border border-slate-200 text-slate-800 text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Request a Callback</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 px-4 text-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm flex items-center justify-center gap-2"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
