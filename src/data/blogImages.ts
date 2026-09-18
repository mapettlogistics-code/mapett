import customsImage from "@/assets/service-customs.jpg";
import intermodalImage from "@/assets/service-intermodal.jpg";
import cargoInsuranceImage from "@/assets/insurance-freight.jpg";
import oceanFreightImage from "@/assets/service-ocean-freight.jpg";

const articleImages: Record<string, string> = {
  "customs-clearance-mombasa-2026": customsImage,
  "intermodal-freight-east-africa": intermodalImage,
  "cargo-insurance-essentials": cargoInsuranceImage,
};

const categoryImages: Record<string, string> = {
  customs: customsImage,
  logistics: intermodalImage,
  insurance: cargoInsuranceImage,
};

export const getBlogFallbackImage = (slug: string, category: string | null) =>
  articleImages[slug] ?? categoryImages[category?.toLowerCase() ?? ""] ?? oceanFreightImage;
