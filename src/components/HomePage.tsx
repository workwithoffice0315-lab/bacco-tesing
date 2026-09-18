import React from 'react';
import { HeroSection } from './HeroSection';
import { TrustIntroSection } from './TrustIntroSection';
import { ServicesOverviewSection } from './ServicesOverviewSection';
import { IndustriesPreviewSection } from './IndustriesPreviewSection';
import { WhyChooseSection } from './WhyChooseSection';
import { HowItWorksSection } from './HowItWorksSection';
import { TechnologySection } from './TechnologySection';
import { CustomerExperienceSection } from './CustomerExperienceSection';
import { CTABanner } from './CTABanner';
import { PageRoute, ServiceItem, IndustryItem } from '../types';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenConsultation: () => void;
  onOpenCallback: () => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectIndustry: (industry: IndustryItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenCallback,
  onSelectService,
  onSelectIndustry,
}) => {
  return (
    <div id="home-page-container">
      <HeroSection
        onOpenConsultation={onOpenConsultation}
        onNavigate={onNavigate}
      />
      <TrustIntroSection />
      <ServicesOverviewSection
        onNavigate={onNavigate}
        onSelectService={onSelectService}
        onOpenConsultation={onOpenConsultation}
      />
      <IndustriesPreviewSection
        onNavigate={onNavigate}
        onSelectIndustry={onSelectIndustry}
      />
      <WhyChooseSection onOpenConsultation={onOpenConsultation} />
      <HowItWorksSection />
      <TechnologySection />
      <CustomerExperienceSection
        onOpenConsultation={onOpenConsultation}
        onNavigate={onNavigate}
      />
      <CTABanner
        onOpenConsultation={onOpenConsultation}
        onOpenCallback={onOpenCallback}
      />
    </div>
  );
};
