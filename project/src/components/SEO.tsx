import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

export default function SEO({
  title = "Flownetics - Flow Chemistry Solutions | Continuous Flow Processing | Factory-as-a-Service",
  description = "Flownetics Engineering provides continuous flow chemistry solutions, Factory-as-a-Service (FaaS), and process optimization services. Transform batch chemistry to flow chemistry with 27% cost reduction and zero upfront risk.",
  keywords = "flow chemistry, continuous flow chemistry, batch chemistry, flow chemistry solutions, chemical manufacturing, process optimization, Factory-as-a-Service, FaaS, flow reactors, continuous flow processing, chemical process development, sustainable chemistry, green chemistry, flow synthesis, microreactors, flow chemistry technology, chemical engineering, process chemistry, API manufacturing, pharmaceutical chemistry, fine chemicals, flow chemistry equipment, flow chemistry services, Flownetics, flownetics engineering",
  image = "/media/flownetics.png",
  url,
  type = "website",
  structuredData,
}: SEOProps) {
  const location = useLocation();
  const currentUrl = url || `https://flownetics.com${location.pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `https://flownetics.com${image}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Primary meta tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullImageUrl, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', type, true);

    // Twitter tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullImageUrl);
    updateMetaTag('twitter:card', 'summary_large_image');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Structured Data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, image, currentUrl, type, structuredData, fullImageUrl]);

  return null;
}

