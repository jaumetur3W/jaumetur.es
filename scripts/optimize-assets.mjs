import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const imgDir = path.resolve('public/img');
const blogImgDir = path.resolve('public/img/blog');
if (!fs.existsSync(blogImgDir)) {
  fs.mkdirSync(blogImgDir, { recursive: true });
}

// 1. Optimize logos
console.log('Optimizing logos...');
const logoFiles = fs.readdirSync(imgDir).filter(f => f.startsWith('jt.LOGO-') && f.endsWith('.png'));

for (const logoFile of logoFiles) {
  const filePath = path.join(imgDir, logoFile);
  const baseName = path.parse(logoFile).name;
  
  // Create 64, 128, 256 WebP versions
  await sharp(filePath)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85 })
    .toFile(path.join(imgDir, `${baseName}-64.webp`));

  await sharp(filePath)
    .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85 })
    .toFile(path.join(imgDir, `${baseName}-128.webp`));

  await sharp(filePath)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85 })
    .toFile(path.join(imgDir, `${baseName}-256.webp`));

  // Overwrite the original 8334x8334 PNG with a crisp 256x256 PNG fallback (< 25 KB)
  const tempPng = path.join(imgDir, `${baseName}-temp.png`);
  await sharp(filePath)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(tempPng);
  
  fs.copyFileSync(tempPng, filePath);
  fs.unlinkSync(tempPng);
  console.log(`Optimized ${logoFile} to 256x256`);
}

// 2. Optimize Memojis (1.png to 7.png, 404, etc.)
console.log('Optimizing memojis...');
const memojiFiles = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '404.png', 'blog.png', 'error.png', 'loading.png', 'newsletter.png', 'success.png'];

for (const m of memojiFiles) {
  const mPath = path.join(imgDir, m);
  if (!fs.existsSync(mPath)) continue;
  const baseName = path.parse(m).name;

  await sharp(mPath)
    .resize(320, 320, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 82 })
    .toFile(path.join(imgDir, `${baseName}.webp`));

  // Also compress the .png in place
  const tempM = path.join(imgDir, `${baseName}-temp.png`);
  await sharp(mPath)
    .resize(320, 320, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(tempM);
  fs.copyFileSync(tempM, mPath);
  fs.unlinkSync(tempM);
  console.log(`Optimized memoji ${m} & generated ${baseName}.webp`);
}

// 3. Generate high-performance brand covers for blog articles (1200x630 WebP)
console.log('Generating local brand covers for blog articles...');
const blogPosts = [
  { slug: 'accessibilitat-web-wcag-aa-guia-practica', title: 'Accessibilitat Web (WCAG AA)', category: 'ACCESSIBILITAT', tag: 'WCAG 2.2 AA' },
  { slug: 'arquitectura-modular-angular-standalone-signals', title: 'Arquitectura Modular Angular', category: 'ANGULAR', tag: 'Signals & Standalone' },
  { slug: 'avisa-gestio-incidencies-arquitectura-frontend', title: 'AVISA — Gestió d\'Incidències', category: 'CAS D\'ESTUDI', tag: 'Realtime UI' },
  { slug: 'com-crear-un-portfolio-denginyeria-frontend', title: 'Com Crear un Portfolio d\'Enginyeria', category: 'CARRERA', tag: 'Astro & Tailwind' },
  { slug: 'es-arquitectura-modular-angular-standalone-signals', title: 'Arquitectura Modular Angular', category: 'ANGULAR', tag: 'Señales & Standalone' },
  { slug: 'es-optimitzacio-core-web-vitals-60fps', title: 'Optimización Core Web Vitals a 60 FPS', category: 'RENDIMIENTO', tag: 'INP, LCP & 60 FPS' },
  { slug: 'es-pipeline-cicd-github-actions-desplegament-continu', title: 'Pipeline CI/CD con GitHub Actions', category: 'DEVOPS', tag: 'GitHub Actions' },
  { slug: 'guia-definitiva-typescript-estricte-frontend', title: 'Guia Definitiva de TypeScript Estricte', category: 'TYPESCRIPT', tag: 'Tipat Estricte' },
  { slug: 'optimitzacio-core-web-vitals-60fps', title: 'Optimització de Core Web Vitals a 60 FPS', category: 'RENDIMENT', tag: 'INP, LCP & 60 FPS' },
  { slug: 'pipeline-cicd-github-actions-desplegament-continu', title: 'Pipeline CI/CD amb GitHub Actions', category: 'CI/CD', tag: 'Desplegament Continu' },
  { slug: 'seo-local-i-rendiment-pizzeria-xativa', title: 'SEO Local & Rendiment: Pizzeria a Xàtiva', category: 'CAS D\'ESTUDI', tag: 'Lighthouse 100' },
];

for (const post of blogPosts) {
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
  <text x="210" y="137" font-family="system-ui, sans-serif" font-weight="900" font-size="14" fill="#FFE600" text-anchor="middle" letter-spacing="2">${post.category}</text>
  
  <!-- Post Title -->
  <text x="100" y="240" font-family="system-ui, sans-serif" font-weight="900" font-size="48" fill="#FFFFFF" letter-spacing="-1">${post.title.length > 38 ? post.title.substring(0, 36) + '...' : post.title}</text>
  
  <!-- Subtitle Tag -->
  <text x="100" y="310" font-family="system-ui, monospace" font-weight="700" font-size="22" fill="#94A3B8">// ${post.tag} · jaumetur.es</text>
  
  <!-- Divider -->
  <line x1="100" y1="420" x2="1100" y2="420" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
  
  <!-- Author & Brand -->
  <text x="100" y="475" font-family="system-ui, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF">Jaume Tur</text>
  <text x="100" y="505" font-family="system-ui, sans-serif" font-weight="600" font-size="16" fill="#64748B">Desenvolupador Backend &amp; Web Apps · CFGS DAW · GM SMX</text>
  
  <!-- Monogram Logo Mark -->
  <rect x="1000" y="445" width="60" height="60" rx="16" fill="#0F172A" stroke="#FFE600" stroke-width="2" />
  <text x="1030" y="484" font-family="system-ui, sans-serif" font-weight="900" font-size="24" fill="#FFE600" text-anchor="middle">JT</text>
</svg>`;

  await sharp(Buffer.from(svg))
    .webp({ quality: 85 })
    .toFile(path.join(blogImgDir, `${post.slug}.webp`));
  
  console.log(`Generated cover for ${post.slug}.webp`);
}

console.log('All image assets successfully optimized!');

