const partners = Array.from({ length: 7 }, (_, index) => index + 1);

const PartnersMarquee = () => (
  <section className="overflow-hidden border-y border-border bg-secondary/35 py-10" aria-labelledby="partners-heading">
    <div className="container mb-7 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Our network</p>
      <h2 id="partners-heading" className="mt-2 text-2xl font-bold text-foreground md:text-3xl">Brands & Partners</h2>
    </div>
    <div className="partners-marquee" role="presentation">
      <div className="partners-marquee__track">
        {[...partners, ...partners].map((partner, index) => (
          <div key={`${partner}-${index}`} className="flex h-24 w-52 shrink-0 items-center justify-center rounded-xl border border-border bg-card p-4 shadow-sm">
            <img src="/placeholder.svg" alt={`Partner logo placeholder ${partner}`} className="h-full w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersMarquee;
