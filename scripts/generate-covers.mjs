import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const blogImgDir = path.resolve('public/img/blog');
if (!fs.existsSync(blogImgDir)) {
  fs.mkdirSync(blogImgDir, { recursive: true });
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

const blogPosts = [
  { slug: 'accessibilitat-web-wcag-aa-guia-practica', title: 'Accessibilitat Web (WCAG AA)', category: 'ACCESSIBILITAT', tag: 'WCAG 2.2 AA' },
  { slug: 'arquitectura-modular-angular-standalone-signals', title: 'Arquitectura Modular Angular', category: 'ANGULAR', tag: 'Signals & Standalone' },
  { slug: 'avisa-gestio-incidencies-arquitectura-frontend', title: 'AVISA — Gestio d\'Incidencies', category: 'CAS D\'ESTUDI', tag: 'Realtime UI' },
  { slug: 'com-crear-un-portfolio-denginyeria-frontend', title: 'Com Crear un Portfolio d\'Enginyeria', category: 'CARRERA', tag: 'Astro & Tailwind' },
  { slug: 'es-arquitectura-modular-angular-standalone-signals', title: 'Arquitectura Modular Angular', category: 'ANGULAR', tag: 'Senales & Standalone' },
  { slug: 'es-optimitzacio-core-web-vitals-60fps', title: 'Optimizacion Core Web Vitals a 60 FPS', category: 'RENDIMIENTO', tag: 'INP, LCP & 60 FPS' },
  { slug: 'es-pipeline-cicd-github-actions-desplegament-continu', title: 'Pipeline CI/CD con GitHub Actions', category: 'DEVOPS', tag: 'GitHub Actions' },
  { slug: 'guia-definitiva-typescript-estricte-frontend', title: 'Guia Definitiva de TypeScript Estricte', category: 'TYPESCRIPT', tag: 'Tipat Estricte' },
  { slug: 'optimitzacio-core-web-vitals-60fps', title: 'Optimitzacio de Core Web Vitals a 60 FPS', category: 'RENDIMENT', tag: 'INP, LCP & 60 FPS' },
  { slug: 'pipeline-cicd-github-actions-desplegament-continu', title: 'Pipeline CI/CD amb GitHub Actions', category: 'CI/CD', tag: 'Desplegament Continu' },
  { slug: 'seo-local-i-rendiment-pizzeria-xativa', title: 'SEO Local & Rendiment: Pizzeria a Xativa', category: 'CAS D\'ESTUDI', tag: 'Lighthouse 100' },
  { slug: 'guia-seo-local-google-maps-comunitat-valenciana', customName: 'guia-seo-local-google-maps-valencia', title: 'SEO Local a la Comunitat Valenciana', category: 'SEO LOCAL', tag: 'Google Maps & Local Pack' },
  { slug: 'optimitzacio-imatges-web-avif-webp-pipeline', customName: 'pipeline-imatges-webp-avif-rendiment', title: 'Optimitzacio d\'Imatges: AVIF i WebP', category: 'RENDIMENT', tag: 'Pipeline d\'Imatges' },
  { slug: 'per-que-el-menu-en-pdf-mata-vendes-restaurant', customName: 'menu-pdf-vs-menu-web-interactiu', title: 'Per Que el Menu en PDF Mata Vendes', category: 'UI / UX', tag: 'Mobile-First & Conversio' },
  { slug: 'per-que-triar-astro-sobre-wordpress-negocis-locals', customName: 'astro-vs-wordpress-rendiment-negocis-locals', title: 'Astro sobre WordPress el 2026', category: 'ARQUITECTURA', tag: 'Illes & Jamstack' },
  { slug: 'targetes-fidelitzacio-wallet-negocis-locals', customName: 'wallet-fidelitzacio-negocis-locals', title: 'Fidelitzacio amb Apple & Google Wallet', category: 'ESTRATEGIA', tag: 'Geofencing & Passbook' },
];

for (const post of blogPosts) {
  const cat = escapeXml(post.category);
  const title = escapeXml(post.title.length > 38 ? post.title.substring(0, 36) + '...' : post.title);
  const tag = escapeXml(post.tag);

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090D16" />
      <stop offset="60%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#090D16" />
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#FFE600" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#FFE600" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow2" cx="20%" cy="80%" r="40%">
      <stop offset="0%" stop-color="#6366F1" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#6366F1" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>
  
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <rect width="1200" height="630" fill="url(#glow)" />
  <rect width="1200" height="630" fill="url(#glow2)" />
  
  <rect x="60" y="60" width="1080" height="510" rx="24" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
  
  <!-- Category Badge -->
  <rect x="100" y="110" width="220" height="42" rx="21" fill="#FFE600" fill-opacity="0.12" stroke="#FFE600" stroke-opacity="0.3" stroke-width="1.5" />
  <text x="210" y="137" font-family="system-ui, sans-serif" font-weight="900" font-size="14" fill="#FFE600" text-anchor="middle" letter-spacing="2">${cat}</text>
  
  <!-- Post Title -->
  <text x="100" y="240" font-family="system-ui, sans-serif" font-weight="900" font-size="46" fill="#FFFFFF" letter-spacing="-1">${title}</text>
  
  <!-- Subtitle Tag -->
  <text x="100" y="310" font-family="system-ui, monospace" font-weight="700" font-size="22" fill="#94A3B8">// ${tag} · jaumetur.es</text>
  
  <!-- Divider -->
  <line x1="100" y1="420" x2="1100" y2="420" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
  
  <!-- Author & Brand -->
  <text x="100" y="475" font-family="system-ui, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF">Jaume Tur</text>
  <text x="100" y="505" font-family="system-ui, sans-serif" font-weight="600" font-size="16" fill="#64748B">Desenvolupador Backend &amp; Web Apps · CFGS DAW · GM SMX</text>
  
  <!-- Monogram Logo Mark -->
  <rect x="1000" y="445" width="60" height="60" rx="16" fill="#0F172A" stroke="#FFE600" stroke-width="2" />
  <text x="1030" y="484" font-family="system-ui, sans-serif" font-weight="900" font-size="24" fill="#FFE600" text-anchor="middle">JT</text>
</svg>`;

  const webpBuffer = await sharp(Buffer.from(svg))
    .webp({ quality: 85 })
    .toBuffer();

  await fs.promises.writeFile(path.join(blogImgDir, `${post.slug}.webp`), webpBuffer);
  console.log(`Generated cover for ${post.slug}.webp`);

  if (post.customName) {
    await fs.promises.writeFile(path.join(blogImgDir, `${post.customName}.webp`), webpBuffer);
    console.log(`Generated alias cover for ${post.customName}.webp`);
  }
}

console.log('All blog covers successfully generated!');

