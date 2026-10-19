/**
 * Image optimization script using sharp.
 * Generates responsive WebP variants for logos and memojis.
 */
import sharp from 'sharp';
import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';

const IMG_DIR = 'public/img';
const OUT_DIR = 'public/img/opt';
const WEBP_QUALITY = 85;

// Logo files: 64, 128, 256px widths
const LOGO_WIDTHS = [64, 128, 256];
// Memoji files: 128, 256, 512px widths
const MEMOJI_WIDTHS = [128, 256, 512];

await mkdir(OUT_DIR, { recursive: true });

const files = await readdir(IMG_DIR);
const pngFiles = files.filter(f => f.endsWith('.png'));

let totalOriginal = 0;
let totalOptimized = 0;
let generated = 0;

const tasks = [];

for (const file of pngFiles) {
  const srcPath = join(IMG_DIR, file);
  const srcStat = await stat(srcPath);
  const isLogo = file.startsWith('jt.LOGO-');

  if (isLogo) {
    // jt.LOGO-01.png -> jt-logo-01
    const num = file.match(/LOGO-(\d+)/)?.[1];
    if (!num) continue;
    const baseName = `jt-logo-${num}`;

    for (const w of LOGO_WIDTHS) {
      totalOriginal += srcStat.size;
      const outName = `${baseName}-${w}.webp`;
      const outPath = join(OUT_DIR, outName);
      tasks.push(
        sharp(srcPath)
          .resize(w)
          .webp({ quality: WEBP_QUALITY })
          .toFile(outPath)
          .then(info => {
            totalOptimized += info.size;
            generated++;
            console.log(`  ✓ ${outName} (${info.size} bytes)`);
          })
      );
    }
  } else {
    // Memoji / named files
    const name = basename(file, extname(file)); // "1", "404", "blog", etc.
    const isNumbered = /^\d+$/.test(name);
    const baseName = isNumbered ? `memoji-${name}` : name;

    for (const w of MEMOJI_WIDTHS) {
      totalOriginal += srcStat.size;
      const outName = `${baseName}-${w}.webp`;
      const outPath = join(OUT_DIR, outName);
      tasks.push(
        sharp(srcPath)
          .resize(w)
          .webp({ quality: WEBP_QUALITY })
          .toFile(outPath)
          .then(info => {
            totalOptimized += info.size;
            generated++;
            console.log(`  ✓ ${outName} (${info.size} bytes)`);
          })
      );
    }
  }
}

await Promise.all(tasks);

const savedBytes = totalOriginal - totalOptimized;
const savedPct = ((savedBytes / totalOriginal) * 100).toFixed(1);
const toKB = b => (b / 1024).toFixed(1);

console.log(`\n--- Summary ---`);
console.log(`Files generated: ${generated}`);
console.log(`Original total:  ${toKB(totalOriginal)} KB`);
console.log(`Optimized total: ${toKB(totalOptimized)} KB`);
console.log(`Saved:           ${toKB(savedBytes)} KB (${savedPct}%)`);
