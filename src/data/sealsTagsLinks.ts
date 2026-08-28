export const SEALS_TAGS_HOME = "https://mapett.com/collections/seals-tags";

export const sealsTagsCollectionLinks: Record<string, string> = {
  "Bolt Security Seals": "https://mapett.com/collections/bolt-security-seals",
  "Cable & Specialized Security Seals": "https://mapett.com/collections/cable-specialized-security-seals",
  "Pull-Tight Plastic Security Seals": "https://mapett.com/collections/pull-tight-plastic-security-seals",
  "Metal Security Seals": "https://mapett.com/collections/metal-security-seals",
  "Metre Security Seals": "https://mapett.com/collections/metre-security-seals",
};

export const sealsTagsMenuItems = [
  { name: "Bolt Security Seals", href: sealsTagsCollectionLinks["Bolt Security Seals"] },
  { name: "Cable & Specialized Security Seals", href: sealsTagsCollectionLinks["Cable & Specialized Security Seals"] },
  { name: "Pull-Tight Plastic Security Seals", href: sealsTagsCollectionLinks["Pull-Tight Plastic Security Seals"] },
  { name: "Metal Security Seals", href: sealsTagsCollectionLinks["Metal Security Seals"] },
  { name: "Metre Security Seals", href: sealsTagsCollectionLinks["Metre Security Seals"] },
];

export const getAutostoreLink = (name: string) =>
  sealsTagsCollectionLinks[name] ?? SEALS_TAGS_HOME;
