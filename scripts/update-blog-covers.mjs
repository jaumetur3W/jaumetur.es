import fs from 'node:fs';
import path from 'node:path';

const blogDir = path.resolve('src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(blogDir, file);
  const slug = path.parse(file).name;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace unsplash url with local webp cover
  const unsplashRegex = /src:\s*["']https:\/\/images\.unsplash\.com\/[^"']+["']/g;
  if (unsplashRegex.test(content)) {
    content = content.replace(unsplashRegex, `src: "/img/blog/${slug}.webp"`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated cover image in ${file} to /img/blog/${slug}.webp`);
  }
}

