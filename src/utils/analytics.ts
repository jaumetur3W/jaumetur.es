/**
 * Utilitat d'analítica respectuosa amb la privacitat (sense galetes ni rastreig invasiu)
 * Compatible amb Plausible Analytics, Umami o dispatch d'esdeveniments personalitzats.
 */

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export function trackConversionEvent(
  eventName: "cta_click" | "form_submit" | "cv_download" | "whatsapp_click" | "email_click" | "service_inquiry",
  props?: Record<string, string | number | boolean>
) {
  try {
    if (typeof window !== "undefined") {
      // 1. Plausible Analytics integration
      if (typeof window.plausible === "function") {
        window.plausible(eventName, { props });
      }

      // 2. Custom DOM Event for internal components/debuggers
      window.dispatchEvent(
        new CustomEvent("analytics:event", {
          detail: { eventName, props, timestamp: Date.now() },
        })
      );

      // 3. Development trace
      if (import.meta.env.DEV) {
        console.debug(`[Analytics Tracked] ${eventName}:`, props);
      }
    }
  } catch (err) {
    // Fail silently to never interrupt user interaction
  }
}
