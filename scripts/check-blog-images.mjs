import fs from 'node:fs';
import path from 'node:path';

const blogDir = path.resolve('src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

console.log(`Checking ${files.length} blog posts...`);

const results = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const srcMatch = content.match(/src:\s*["']?([^"'\r\n]+)["']?/);
  const altMatch = content.match(/alt:\s*["']?([^"'\r\n]+)["']?/);
  const titleMatch = content.match(/title:\s*["']?([^"'\r\n]+)["']?/);
  const catMatch = content.match(/category:\s*["']?([^"'\r\n]+)["']?/);

  const src = srcMatch ? srcMatch[1].trim() : null;
  const alt = altMatch ? altMatch[1].trim() : null;
  const title = titleMatch ? titleMatch[1].trim() : null;
  const category = catMatch ? catMatch[1].trim() : null;

  let exists = false;
  if (src) {
    const fullPath = path.resolve('public', src.replace(/^\//, ''));
    exists = fs.existsSync(fullPath);
  }

  results.push({
    file,
    slug: file.replace(/\.md$/, ''),
    title,
    category,
    src,
    alt,
    exists
  });
}

console.table(results);

