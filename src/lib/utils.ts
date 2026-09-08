import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Sitemap Generator
export const routes = [
  "/",
  "/about",
  "/products-services",
  "/air-freight",
  "/customs-clearing-forwarding",
  "/ocean-freight",
  "/road-rail-transport",
  "/refrigerated-cargo",
  "/special-cargo",
  "/warehousing",
  "/insurance",
  "/marine-cargo-insurance",
  "/air-cargo-insurance",
  "/inland-transit-insurance",
  "/freight-forwarder-liability",
  "/wiba-employees-coverage",
  "/life-insurance",
  "/warehouse-insurance",
  "/airport-transfers",
  "/flight-booking",
  "/visa-processing",
  "/hotel-booking",
  "/travel-insurance",
  "/travel-essentials",
  "/tours-safaris",
  "/track",
  "/team",
  "/privacy-policy",
  "/cookie-policy",
  "/shipping-returns-policy",
  "/terms-conditions",
  "/intermodal-solutions",
];

export const generateSitemap = () => {
  const baseUrl = "https://www.mapettlogistics.com";
  const today = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`).join('\n')}
</urlset>`;
};