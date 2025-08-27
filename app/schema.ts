import { siteConfig } from "@/config/site";

export const generateAudioSchema = (audio: {
  title: string;
  description: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "AudioObject",
    "name": audio.title,
    "description": audio.description,
    "encodingFormat": "audio/mpeg",
    "url": `${siteConfig.url}${audio.url}`,
    "inLanguage": "en",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteConfig.name,
  "description": siteConfig.description,
  "url": siteConfig.url,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export const generateRatingSchema = (rating: number, votes: number) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": siteConfig.name,
    "applicationCategory": "AudioApplication",
    "operatingSystem": "Any",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "ratingCount": votes,
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
};



