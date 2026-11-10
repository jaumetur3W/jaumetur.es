// Client script for HTML Creator Tool
export function initHtmlCreator() {
  const form = document.getElementById("html-creator-form") as HTMLFormElement | null;
  const previewIframe = document.getElementById("preview-iframe") as HTMLIFrameElement | null;
  const codeOutput = document.getElementById("code-output");
  const charCounter = document.getElementById("char-counter");
  const iframeWrapper = document.getElementById("iframe-wrapper");
  const viewportLabel = document.getElementById("preview-viewport-label");

  // Tabs
  const tabPreview = document.getElementById("tab-btn-preview");
  const tabCode = document.getElementById("tab-btn-code");
  const panelPreview = document.getElementById("panel-preview");
  const panelCode = document.getElementById("panel-code");

  // Actions
  const btnDownload = document.getElementById("btn-download-html");
  const btnCopy = document.getElementById("btn-copy-code");
  const btnReset = document.getElementById("btn-reset-template");
  const copyLabel = document.getElementById("copy-label");
  const downloadLabel = document.getElementById("download-label");

  if (!form) return;

  const getVal = (id: string): string => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
    return el ? el.value : "";
  };
  const getCheck = (id: string): boolean => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    return el ? el.checked : false;
  };

  function escapeHtml(str: string): string {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function generateHTML(): string {
    const title = getVal("cfg-title") || "My Page";
    const desc = getVal("cfg-desc") || "";
    const lang = getVal("cfg-lang") || "es";
    const author = getVal("cfg-author") || "";
    const theme = getVal("cfg-theme") || "dark";
    const withTailwind = getCheck("cfg-tailwind");
    const withFonts = getCheck("cfg-fonts");

    const brand = getVal("cfg-brand") || "Brand";
    const h1 = getVal("cfg-h1") || "Headline";
    const sub = getVal("cfg-sub") || "";
    const ctaText = getVal("cfg-cta-text") || "Get Started";
    const ctaUrl = getVal("cfg-cta-url") || "#";

    const f1t = getVal("cfg-f1-t") || "Feature 1";
    const f1d = getVal("cfg-f1-d") || "Feature description";
    const f2t = getVal("cfg-f2-t") || "Feature 2";
    const f2d = getVal("cfg-f2-d") || "Feature description";
    const f3t = getVal("cfg-f3-t") || "Feature 3";
    const f3d = getVal("cfg-f3-d") || "Feature description";

    // Theme colors
    let bodyBg = "#0a0a0c";
    let bodyText = "#f4f4f6";
    let cardBg = "#121216";
    let cardBorder = "rgba(255, 255, 255, 0.1)";
    let brandColor = "#FFFF00";
    let brandTextColor = "#000000";
    let subTextColor = "#a1a1aa";

    if (theme === "light") {
      bodyBg = "#f8fafc";
      bodyText = "#0f172a";
      cardBg = "#ffffff";
      cardBorder = "#e2e8f0";
      brandColor = "#0f172a";
      brandTextColor = "#ffffff";
      subTextColor = "#64748b";
    } else if (theme === "midnight") {
      bodyBg = "#0b1329";
      bodyText = "#e2e8f0";
      cardBg = "#131f3d";
      cardBorder = "rgba(16, 185, 129, 0.2)";
      brandColor = "#10b981";
      brandTextColor = "#000000";
      subTextColor = "#94a3b8";
    }

    const fontsTag = withFonts
      ? `  <!-- Google Fonts: Space Grotesk & Inter -->\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">\n`
      : "";

    const tailwindTag = withTailwind
      ? `  <!-- Tailwind CSS CDN -->\n  <script src="https://cdn.tailwindcss.com"></script>\n`
      : "";

    const fontFamCss = withFonts
      ? `    body { font-family: 'Inter', sans-serif; }\n    h1, h2, h3, .brand { font-family: 'Space Grotesk', sans-serif; }\n`
      : `    body { font-family: system-ui, -apple-system, sans-serif; }\n`;

    const featuresLabel = lang === "en" ? "Features" : "Características";
    const rightsLabel = lang === "en" ? "All rights reserved." : "Todos los derechos reservados.";

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(desc)}">
  <meta name="author" content="${escapeHtml(author)}">
  <meta name="robots" content="index, follow">
${fontsTag}${tailwindTag}  <style>
${fontFamCss}    body {
      background-color: ${bodyBg};
      color: ${bodyText};
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }
    .btn-brand {
      background-color: ${brandColor};
      color: ${brandTextColor} !important;
      font-weight: 700;
      border-radius: 9999px;
      padding: 0.75rem 1.75rem;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: opacity 0.2s, transform 0.2s;
    }
    .btn-brand:hover {
      opacity: 0.92;
      transform: translateY(-2px);
    }
    .card-item {
      background: ${cardBg};
      border: 1px solid ${cardBorder};
      border-radius: 1.25rem;
      padding: 1.75rem;
      transition: transform 0.2s, border-color 0.2s;
    }
    .card-item:hover {
      transform: translateY(-3px);
    }
  </style>
</head>
<body class="antialiased min-h-screen flex flex-col justify-between">
  <!-- Header / Navigation -->
  <header style="border-bottom: 1px solid ${cardBorder}; padding: 1.25rem 2rem;">
    <div style="max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
      <a href="#" class="brand" style="font-size: 1.35rem; font-weight: 700; color: ${bodyText}; text-decoration: none;">
        ${escapeHtml(brand)}
      </a>
      <nav style="display: flex; gap: 1.5rem; align-items: center;">
        <a href="#features" style="color: ${subTextColor}; text-decoration: none; font-size: 0.9rem;">${featuresLabel}</a>
        <a href="${escapeHtml(ctaUrl)}" class="btn-brand" style="font-size: 0.85rem; padding: 0.5rem 1.25rem;">
          ${escapeHtml(ctaText)}
        </a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <main>
    <section style="padding: 5rem 1.5rem 4rem; text-align: center; max-width: 900px; margin: 0 auto;">
      <h1 style="font-size: clamp(2rem, 5vw, 3.75rem); line-height: 1.15; font-weight: 700; margin-bottom: 1.25rem;">
        ${escapeHtml(h1)}
      </h1>
      <p style="color: ${subTextColor}; font-size: 1.15rem; max-width: 650px; margin: 0 auto 2.5rem; line-height: 1.6;">
        ${escapeHtml(sub)}
      </p>
      <div>
        <a href="${escapeHtml(ctaUrl)}" class="btn-brand" style="font-size: 1rem;">
          <span>${escapeHtml(ctaText)}</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" style="padding: 3rem 1.5rem 6rem; max-width: 1100px; margin: 0 auto;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        <article class="card-item">
          <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: ${brandColor}; color: ${brandTextColor}; display: flex; align-items: center; justify-content: center; font-weight: 900; margin-bottom: 1rem;">01</div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 0; margin-bottom: 0.5rem;">${escapeHtml(f1t)}</h3>
          <p style="color: ${subTextColor}; font-size: 0.95rem; margin: 0; line-height: 1.5;">${escapeHtml(f1d)}</p>
        </article>

        <article class="card-item">
          <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: ${brandColor}; color: ${brandTextColor}; display: flex; align-items: center; justify-content: center; font-weight: 900; margin-bottom: 1rem;">02</div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 0; margin-bottom: 0.5rem;">${escapeHtml(f2t)}</h3>
          <p style="color: ${subTextColor}; font-size: 0.95rem; margin: 0; line-height: 1.5;">${escapeHtml(f2d)}</p>
        </article>

        <article class="card-item">
          <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: ${brandColor}; color: ${brandTextColor}; display: flex; align-items: center; justify-content: center; font-weight: 900; margin-bottom: 1rem;">03</div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 0; margin-bottom: 0.5rem;">${escapeHtml(f3t)}</h3>
          <p style="color: ${subTextColor}; font-size: 0.95rem; margin: 0; line-height: 1.5;">${escapeHtml(f3d)}</p>
        </article>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer style="border-top: 1px solid ${cardBorder}; padding: 2.5rem 1.5rem; text-align: center; color: ${subTextColor}; font-size: 0.85rem;">
    <p>© ${new Date().getFullYear()} ${escapeHtml(brand)}. ${rightsLabel}</p>
  </footer>
</body>
</html>`;
  }

  function updatePreviewAndCode() {
    const html = generateHTML();

    if (previewIframe) {
      previewIframe.srcdoc = html;
    }

    if (codeOutput) {
      codeOutput.textContent = html;
    }

    if (charCounter) {
      const bytes = new Blob([html]).size;
      charCounter.textContent = `${bytes.toLocaleString()} bytes`;
    }
  }

  // Inputs
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.addEventListener("input", updatePreviewAndCode);
    input.addEventListener("change", updatePreviewAndCode);
  });

  // Tab switching
  if (tabPreview && tabCode && panelPreview && panelCode) {
    tabPreview.addEventListener("click", () => {
      tabPreview.className = "px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer bg-brand text-black shadow-xs";
      tabPreview.setAttribute("aria-selected", "true");
      tabCode.className = "px-4 py-2 rounded-lg text-xs font-mono font-medium text-zinc-400 hover:text-white transition-all cursor-pointer";
      tabCode.setAttribute("aria-selected", "false");
      panelPreview.classList.remove("hidden");
      panelCode.classList.add("hidden");
    });

    tabCode.addEventListener("click", () => {
      tabCode.className = "px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer bg-brand text-black shadow-xs";
      tabCode.setAttribute("aria-selected", "true");
      tabPreview.className = "px-4 py-2 rounded-lg text-xs font-mono font-medium text-zinc-400 hover:text-white transition-all cursor-pointer";
      tabPreview.setAttribute("aria-selected", "false");
      panelCode.classList.remove("hidden");
      panelPreview.classList.add("hidden");
    });
  }

  // Viewport resize simulation
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".view-btn").forEach((b) => {
        b.className = "view-btn px-2.5 py-1 rounded-lg hover:bg-white/5 cursor-pointer text-zinc-400";
      });
      btn.className = "view-btn active px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold cursor-pointer";
      const width = btn.getAttribute("data-view") || "100%";
      if (iframeWrapper) {
        iframeWrapper.style.maxWidth = width;
      }
      if (viewportLabel) {
        viewportLabel.textContent = `${width} viewport`;
      }
    });
  });

  // Copy to clipboard
  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      const html = generateHTML();
      navigator.clipboard.writeText(html).then(() => {
        const original = copyLabel ? copyLabel.textContent : "Copiar";
        if (copyLabel) copyLabel.textContent = "✓ ¡Copiado!";
        btnCopy.classList.add("text-brand");
        setTimeout(() => {
          if (copyLabel) copyLabel.textContent = original;
          btnCopy.classList.remove("text-brand");
        }, 2200);
      });
    });
  }

  // Download .html file
  if (btnDownload) {
    btnDownload.addEventListener("click", () => {
      const html = generateHTML();
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "index.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      const original = downloadLabel ? downloadLabel.textContent : "Descargar";
      if (downloadLabel) downloadLabel.textContent = "✓ ¡Descargado!";
      setTimeout(() => {
        if (downloadLabel) downloadLabel.textContent = original;
      }, 2200);
    });
  }

  // Reset / Presets
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      form.reset();
      updatePreviewAndCode();
    });
  }

  // Initial render
  updatePreviewAndCode();
}

// Auto-run if DOM loaded
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHtmlCreator);
  } else {
    initHtmlCreator();
  }
}
