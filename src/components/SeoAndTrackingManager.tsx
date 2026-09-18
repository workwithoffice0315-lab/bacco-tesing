import React, { useEffect } from 'react';
import { SiteSettings, PageRoute } from '../types';

interface SeoAndTrackingManagerProps {
  settings: SiteSettings;
  currentRoute: PageRoute;
}

export const SeoAndTrackingManager: React.FC<SeoAndTrackingManagerProps> = ({
  settings,
  currentRoute,
}) => {
  // 1. Update Document Title & Standard SEO Metas
  useEffect(() => {
    // Dynamic page title based on current route
    let routeSuffix = '';
    switch (currentRoute) {
      case '/about-us':
        routeSuffix = 'About Us | ';
        break;
      case '/services':
        routeSuffix = 'BPO & Call Center Services | ';
        break;
      case '/industries':
        routeSuffix = 'Industries Served | ';
        break;
      case '/why-basco':
        routeSuffix = 'Why Choose Basco Group | ';
        break;
      case '/careers':
        routeSuffix = 'Careers & Job Openings | ';
        break;
      case '/contact-us':
        routeSuffix = 'Contact Us & Free Consultation | ';
        break;
      case '/admin':
        routeSuffix = 'Admin Control Panel | ';
        break;
      default:
        routeSuffix = '';
    }

    const pageTitle = routeSuffix ? `${routeSuffix}Basco Group` : settings.metaTitle;
    document.title = pageTitle;

    // Helper to create or update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      if (!content) return;
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) {
          el.setAttribute('property', name);
        } else {
          el.setAttribute('name', name);
        }
        document.head.appendChild(el);
      }
      el.content = content;
    };

    updateMeta('description', settings.metaDescription);
    updateMeta('keywords', settings.metaKeywords);
    updateMeta('robots', settings.robotsIndexing ? 'index, follow' : 'noindex, nofollow');

    if (settings.googleSiteVerification) {
      updateMeta('google-site-verification', settings.googleSiteVerification);
    }

    // Open Graph
    updateMeta('og:title', pageTitle, true);
    updateMeta('og:description', settings.ogDescription || settings.metaDescription, true);
    updateMeta('og:url', `${settings.canonicalUrl || 'https://www.bascogroup.co.in'}${currentRoute}`, true);
    if (settings.ogImageUrl) {
      updateMeta('og:image', settings.ogImageUrl, true);
    }

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${settings.canonicalUrl || 'https://www.bascogroup.co.in'}${currentRoute}`;
  }, [settings, currentRoute]);

  // 2. Initialize and manage Meta (Facebook) Pixel
  useEffect(() => {
    const pixelId = settings.metaPixelId?.trim();
    if (!pixelId) return;

    const existingScript = document.getElementById('meta-pixel-script');
    if (!existingScript) {
      // Official Meta Pixel Base Script
      const script = document.createElement('script');
      script.id = 'meta-pixel-script';
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      // NoScript fallback
      const noscript = document.createElement('noscript');
      noscript.id = 'meta-pixel-noscript';
      noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`;
      document.body.appendChild(noscript);
    } else if (window.fbq) {
      // Re-init if pixel changed
      window.fbq('init', pixelId);
    }
  }, [settings.metaPixelId]);

  // 3. Trigger Meta Pixel PageView on client-side route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView', {
        page_path: currentRoute,
        page_title: document.title,
      });
    }
  }, [currentRoute]);

  // 4. Custom Raw Pixel Snippet / Head Code injection
  useEffect(() => {
    if (settings.customHeadCode?.trim()) {
      const containerId = 'basco-custom-head-code';
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.style.display = 'none';
        document.head.appendChild(container);
      }
      container.innerHTML = settings.customHeadCode;
    }
  }, [settings.customHeadCode]);

  // 5. Google Analytics initialization if provided
  useEffect(() => {
    const gaId = settings.googleAnalyticsId?.trim();
    if (!gaId) return;

    if (!document.getElementById('google-analytics-script')) {
      const script = document.createElement('script');
      script.id = 'google-analytics-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      const initScript = document.createElement('script');
      initScript.id = 'google-analytics-init';
      initScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', { page_path: '${currentRoute}' });
      `;
      document.head.appendChild(initScript);
    } else if (window.gtag) {
      window.gtag('config', gaId, { page_path: currentRoute });
    }
  }, [settings.googleAnalyticsId, currentRoute]);

  return null;
};
