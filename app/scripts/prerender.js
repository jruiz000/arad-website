import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { ROUTE_SEO } from '../src/routes/seo.js';

const distPath = path.resolve(process.cwd(), 'dist');
const templatePath = path.resolve(distPath, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error(`Error: index.html not found at ${templatePath}. Please run 'vite build' first.`);
  process.exit(1);
}

const indexHtmlTemplate = fs.readFileSync(templatePath, 'utf-8');

// Ensure dist/pages directory exists for prerendered files
const pagesDir = path.resolve(distPath, 'pages');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

for (const route in ROUTE_SEO) {
  const seo = ROUTE_SEO[route];
  const dom = new JSDOM(indexHtmlTemplate);
  const { document } = dom.window;

  // Update title
  document.title = seo.title;

  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', seo.description);

  // Update meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', seo.keywords);

  // Update canonical link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', seo.ogUrl);

  // Update Open Graph tags
  const updateOgMeta = (property, content) => {
    let meta = document.querySelector(`meta[property="og:${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', `og:${property}`);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };
  updateOgMeta('type', seo.ogType);
  updateOgMeta('url', seo.ogUrl);
  updateOgMeta('title', seo.title);
  updateOgMeta('description', seo.description);
  updateOgMeta('image', seo.ogImage);

  // Update Twitter Card tags
  const updateTwitterMeta = (property, content) => {
    let meta = document.querySelector(`meta[name="twitter:${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', `twitter:${property}`);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };
  updateTwitterMeta('card', seo.twitterCard);
  updateTwitterMeta('url', seo.ogUrl);
  updateTwitterMeta('title', seo.title);
  updateTwitterMeta('description', seo.description);
  updateTwitterMeta('image', seo.twitterImage);

  // Set robots meta tag
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    document.head.appendChild(metaRobots);
  }
  metaRobots.setAttribute('content', 'index, follow');

  const outputFileName = route === '/' ? 'index.html' : `${route.substring(1)}.html`;
  const outputPath = path.join(distPath, outputFileName);

  fs.writeFileSync(outputPath, dom.serialize());
  console.log(`Prerendered: ${route} -> ${outputPath}`);
}

console.log('Prerendering completed successfully!');