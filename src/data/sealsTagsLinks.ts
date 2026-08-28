export const SEALS_TAGS_HOME = "https://mapett.com/collections/seals-tags";

export const sealsTagsCollectionLinks: Record<string, string> = {
  "Container & Cargo Seals": "https://mapett.com/collections/container-cargo-seals",
  "Bolt Security Seals": "https://mapett.com/collections/bolt-security-seals",
  "Cable Security Seals": "https://mapett.com/collections/cable-security-seals",
  "Plastic Security Seals": "https://mapett.com/collections/plastic-security-seals",
  "Metal Security Seals": "https://mapett.com/collections/metal-security-seals",
  "Strap Security Seals": "https://mapett.com/collections/strap-security-seals",
  "Metre Security Seals": "https://mapett.com/collections/metre-security-seals",
  "Padlock Security Seals": "https://mapett.com/collections/padlock-security-seals",
  "Clip Security Seals": "https://mapett.com/collections/clip-security-seals",
  "Tamper-Evident Papers": "https://mapett.com/collections/tamper-evident-papers",
  "Tamper-Evident Tapes": "https://mapett.com/collections/tamper-evident-tapes",
};

export const sealsTagsMenuItems = [
  { name: "Container & Cargo Seals", href: sealsTagsCollectionLinks["Container & Cargo Seals"] },
  { name: "Bolt Security Seals", href: sealsTagsCollectionLinks["Bolt Security Seals"] },
  { name: "Cable Security Seals", href: sealsTagsCollectionLinks["Cable Security Seals"] },
  { name: "Plastic Security Seals", href: sealsTagsCollectionLinks["Plastic Security Seals"] },
  { name: "Metal Security Seals", href: sealsTagsCollectionLinks["Metal Security Seals"] },
  { name: "Strap Security Seals", href: sealsTagsCollectionLinks["Strap Security Seals"] },
  { name: "Metre Security Seals", href: sealsTagsCollectionLinks["Metre Security Seals"] },
  { name: "Padlock Security Seals", href: sealsTagsCollectionLinks["Padlock Security Seals"] },
  { name: "Clip Security Seals", href: sealsTagsCollectionLinks["Clip Security Seals"] },
  { name: "Tamper-Evident Papers", href: sealsTagsCollectionLinks["Tamper-Evident Papers"] },
  { name: "Tamper-Evident Tapes", href: sealsTagsCollectionLinks["Tamper-Evident Tapes"] },
];

export const getAutostoreLink = (name: string) =>
  sealsTagsCollectionLinks[name] ?? SEALS_TAGS_HOME;
