// Genera las variantes de la foto de la entrada setup. Ver SETUP_SCENE.md.
// Uso: node scripts/build-setup-scene.mjs ruta/a/la-foto [--avif=N] [--webp=N]
import { mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const quality = (name, fallback) => {
  const flag = args.find((arg) => arg.startsWith(`--${name}=`));
  return flag ? Number(flag.split("=")[1]) : fallback;
};
const source = args.find((arg) => !arg.startsWith("--"));
if (!source) throw new Error("Indica la ruta de la foto.");
const output = join(root, "public/img/setup");
mkdirSync(output, { recursive: true });

const { width, height } = await sharp(source).metadata();
if (Math.abs(width / height - 16 / 9) > 0.01) {
  throw new Error(`La imagen debe ser 16:9 y mide ${width}×${height}.`);
}

// Nunca se amplía: los anchos estándar que quepan, más el del original si es menor de 2560.
const sizes = [1280, 1920, 2560].filter((size) => size < width);
if (width <= 2560) sizes.push(width);

const encoders = {
  avif: (image) => image.avif({ quality: quality("avif", 50), effort: 6, chromaSubsampling: "4:4:4" }),
  webp: (image) => image.webp({ quality: quality("webp", 72), effort: 6, smartSubsample: true }),
};

for (const size of sizes) {
  for (const [format, encode] of Object.entries(encoders)) {
    const file = join(output, `setup-scene-${size}.${format}`);
    await encode(sharp(source).removeAlpha().resize({ width: size })).toFile(file);
    console.log(`${`setup-scene-${size}.${format}`.padEnd(26)} ${(statSync(file).size / 1024).toFixed(1).padStart(8)} KB`);
  }
}
console.log(`\nEn src/config/setup-scene.ts: widths: [${sizes.join(", ")}], width: ${width}, height: ${height}`);
