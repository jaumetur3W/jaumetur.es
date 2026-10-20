import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const targetDir = process.argv[2] || 'reports/antes';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const pages = [
  { name: 'home', url: 'http://localhost:4321/' },
  { name: 'blog', url: 'http://localhost:4321/blog' },
  { name: 'article', url: 'http://localhost:4321/blog/accessibilitat-web-wcag-aa-guia-practica' },
  { name: 'pricing', url: 'http://localhost:4321/pricing' },
  { name: 'contact', url: 'http://localhost:4321/contact' },
  { name: 'about', url: 'http://localhost:4321/about' },
  { name: 'qualitat', url: 'http://localhost:4321/qualitat' },
];

const chromePath = process.platform === 'win32'
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : (process.env.CHROME_PATH || '/usr/bin/google-chrome');
process.env.CHROME_PATH = chromePath;

const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const results = [];

for (const page of pages) {
  for (const mode of ['mobile', 'desktop']) {
    console.log(`\n=== Auditant ${page.name} (${mode}) a ${page.url} ===`);
    const outputPath = path.join(targetDir, `${page.name}-${mode}.json`);
    const args = [
      '--yes',
      'lighthouse',
      page.url,
      '--chrome-flags=--headless=new --no-sandbox --disable-gpu',
      '--output=json',
      `--output-path=${outputPath}`,
      '--quiet'
    ];

    if (mode === 'desktop') {
      args.push('--preset=desktop');
    }

    const res = spawnSync(npxCmd, args, {
      shell: true,
      stdio: 'inherit',
      env: { ...process.env, CHROME_PATH: chromePath }
    });

    if (fs.existsSync(outputPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
        const cats = data.categories || {};
        const audits = data.audits || {};

        const perf = Math.round((cats.performance?.score || 0) * 100);
        const a11y = Math.round((cats.accessibility?.score || 0) * 100);
        const bp = Math.round((cats['best-practices']?.score || 0) * 100);
        const seo = Math.round((cats.seo?.score || 0) * 100);

        const lcp = audits['largest-contentful-paint']?.displayValue || audits['largest-contentful-paint']?.numericValue?.toFixed(0) + ' ms' || 'N/A';
        const tbt = audits['total-blocking-time']?.displayValue || audits['total-blocking-time']?.numericValue?.toFixed(0) + ' ms' || '0 ms';
        const cls = audits['cumulative-layout-shift']?.displayValue || audits['cumulative-layout-shift']?.numericValue?.toFixed(3) || '0';
        const inp = audits['interaction-to-next-paint']?.displayValue || 'N/A';

        const totalBytes = audits['total-byte-weight']?.numericValue 
          ? (audits['total-byte-weight'].numericValue / 1024).toFixed(1) + ' KB' 
          : audits['total-byte-weight']?.displayValue || 'N/A';
        const numRequests = audits['network-requests']?.numericValue || audits['network-requests']?.details?.items?.length || 'N/A';

        const row = {
          page: page.name,
          url: page.url,
          mode,
          perf,
          a11y,
          bp,
          seo,
          lcp,
          tbt,
          cls,
          inp,
          totalBytes,
          numRequests
        };
        results.push(row);
        console.log(`Resultat ${page.name} (${mode}): Perf=${perf}, A11y=${a11y}, BP=${bp}, SEO=${seo}, LCP=${lcp}, TBT=${tbt}, CLS=${cls}, Pes=${totalBytes}`);
      } catch (err) {
        console.error(`Error parsing ${outputPath}:`, err.message);
      }
    } else {
      console.error(`No s'ha generat ${outputPath}`);
    }
  }
}

fs.writeFileSync(path.join(targetDir, 'summary.json'), JSON.stringify(results, null, 2));

let md = `# Resum Lighthouse (${targetDir})\n\n`;
md += '| Pàgina | Mode | Perf | A11y | BP | SEO | LCP | TBT | CLS | Pes Total | Peticions |\n';
md += '|---|---|---|---|---|---|---|---|---|---|---|\n';
for (const r of results) {
  md += `| ${r.page} | ${r.mode} | **${r.perf}** | ${r.a11y} | ${r.bp} | ${r.seo} | ${r.lcp} | ${r.tbt} | ${r.cls} | ${r.totalBytes} | ${r.numRequests} |\n`;
}
fs.writeFileSync(path.join(targetDir, 'SUMMARY.md'), md);
console.log(`\nCompletat! Taula desada a ${path.join(targetDir, 'SUMMARY.md')}`);

