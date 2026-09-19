import React, { useState, useEffect } from 'react';
import { PageRoute, ServiceItem, IndustryItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutUsPage } from './components/AboutUsPage';
import { ServicesPage } from './components/ServicesPage';
import { IndustriesPage } from './components/IndustriesPage';
import { WhyBascoPage } from './components/WhyBascoPage';
import { CareersPage } from './components/CareersPage';
import { ContactUsPage } from './components/ContactUsPage';
import { ConsultationModal } from './components/ConsultationModal';
import { LegalModal } from './components/LegalModal';
import { QuickContactFloating } from './components/QuickContactFloating';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('/');
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationInitialTab, setConsultationInitialTab] = useState<'consultation' | 'callback'>('consultation');
  const [consultationPreselectedService, setConsultationPreselectedService] = useState<string | undefined>(undefined);

  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'cookies' | null>(null);

  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [selectedIndustryDetail, setSelectedIndustryDetail] = useState<IndustryItem | null>(null);

  // Sync hash routing if user uses back/forward or deep links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validRoutes: PageRoute[] = [
        '/',
        '/about-us',
        '/services',
        '/industries',
        '/why-basco',
        '/careers',
        '/contact-us',
      ];
      if (validRoutes.includes(hash as PageRoute)) {
        setCurrentRoute(hash as PageRoute);
      } else if (!hash) {
        setCurrentRoute('/');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.location.hash = route === '/' ? '' : route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (serviceName?: string) => {
    setConsultationInitialTab('consultation');
    setConsultationPreselectedService(serviceName);
    setIsConsultationModalOpen(true);
  };

  const handleOpenCallback = () => {
    setConsultationInitialTab('callback');
    setConsultationPreselectedService(undefined);
    setIsConsultationModalOpen(true);
  };

  const handleSelectServiceFromHome = (service: ServiceItem) => {
    setSelectedServiceDetail(service);
    handleNavigate('/services');
  };

  const handleSelectIndustryFromHome = (industry: IndustryItem) => {
    setSelectedIndustryDetail(industry);
    handleNavigate('/industries');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Global Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenCallback={handleOpenCallback}
      />

      {/* Main Routed Content */}
      <main className="flex-grow">
        {currentRoute === '/' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenConsultation={() => handleOpenConsultation()}
            onOpenCallback={handleOpenCallback}
            onSelectService={handleSelectServiceFromHome}
            onSelectIndustry={handleSelectIndustryFromHome}
          />
        )}

        {currentRoute === '/about-us' && (
          <AboutUsPage
            onOpenConsultation={() => handleOpenConsultation()}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === '/services' && (
          <ServicesPage
            onOpenConsultation={handleOpenConsultation}
            initialSelectedService={selectedServiceDetail}
          />
        )}

        {currentRoute === '/industries' && (
          <IndustriesPage
            onOpenConsultation={handleOpenConsultation}
            initialIndustry={selectedIndustryDetail}
          />
        )}

        {currentRoute === '/why-basco' && (
          <WhyBascoPage
            onOpenConsultation={() => handleOpenConsultation()}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === '/careers' && <CareersPage />}

        {currentRoute === '/contact-us' && <ContactUsPage />}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Free Consultation & Callback Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        initialTab={consultationInitialTab}
        preselectedService={consultationPreselectedService}
        onClose={() => {
          setIsConsultationModalOpen(false);
          setConsultationPreselectedService(undefined);
        }}
      />

      {/* Legal & Policy Modals (Privacy, Terms, Cookies) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Floating Quick Action Contact Buttons (WhatsApp & Call) */}
      <QuickContactFloating />
    </div>
  );
}
