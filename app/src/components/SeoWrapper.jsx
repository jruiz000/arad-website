import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ROUTE_SEO } from '../routes/seo';

export function SeoWrapper({ pathname, children }) {
  const seoData = ROUTE_SEO[pathname] || ROUTE_SEO['/'];
  
  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://aradsystems.com${pathname}`} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content="https://aradsystems.com/images/ARAD_Cover.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://aradsystems.com${pathname}`} />
        <meta property="twitter:title" content={seoData.title} />
        <meta property="twitter:description" content={seoData.description} />
        <meta property="twitter:image" content="https://aradsystems.com/images/ARAD_Cover.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://aradsystems.com${pathname}`} />
        
        {/* Additional meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ARAD System" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      {children}
    </>
  );
}
