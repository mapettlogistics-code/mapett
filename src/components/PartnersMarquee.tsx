const partners = [
  { src: "/logos/nixgold.png", alt: "Nixgold" },
  { src: "/logos/visa.png", alt: "Visa" },
  { src: "/logos/safaricom.png", alt: "Safaricom" },
  { src: "/logos/pil.png", alt: "PIL" },
  { src: "/logos/ncba.png", alt: "NCBA" },
  { src: "/logos/mastercard.jpg", alt: "Mastercard" },
  { src: "/logos/maersk.png", alt: "Maersk" },
  { src: "/logos/kra.png", alt: "KRA" },
  { src: "/logos/cosco.png", alt: "COSCO" },
];

const PartnersMarquee = () => (
  <section className="overflow-hidden border-y border-border bg-secondary/35 py-10" aria-labelledby="partners-heading">
    <div className="container mb-7 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Our network</p>
      <h2 id="partners-heading" className="mt-2 text-2xl font-bold text-foreground md:text-3xl">Brands & Partners</h2>
    </div>
    <div className="partners-marquee" role="presentation">
      <div className="partners-marquee__track">
        {[...partners, ...partners].map((partner, index) => (
          <div key={`${partner.alt}-${index}`} className="flex h-24 w-40 shrink-0 items-center justify-center rounded-xl border border-border bg-card p-4 shadow-sm">
            <img src={partner.src} alt={partner.alt} className="h-full w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersMarquee;
