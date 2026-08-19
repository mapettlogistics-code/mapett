import { motion } from "framer-motion";
import { BriefcaseBusiness, Headphones, Plane, ShieldCheck, Truck, UsersRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";

const teams = [
  { icon: BriefcaseBusiness, title: "Leadership & Operations", description: "Guiding Mapett with practical experience, accountability, and a commitment to dependable service." },
  { icon: Truck, title: "Logistics Specialists", description: "Coordinating freight, customs, transport, and warehousing solutions from planning through delivery." },
  { icon: Plane, title: "Travel Consultants", description: "Supporting flights, visas, stays, transfers, and memorable journeys with personalised attention." },
  { icon: ShieldCheck, title: "Insurance Advisors", description: "Helping customers identify suitable cover for cargo, business, travel, and people." },
  { icon: Headphones, title: "Customer Support", description: "Here to answer questions, provide updates, and make every interaction clear and responsive." },
  { icon: UsersRound, title: "Our Partners", description: "Working alongside trusted carriers, suppliers, and service providers across East Africa and beyond." },
];

const Team = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <section className="relative overflow-hidden bg-foreground py-20 text-background md:py-28">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, hsl(var(--primary)), transparent 35%), radial-gradient(circle at 80% 70%, hsl(var(--primary)), transparent 30%)" }} />
        <div className="container relative z-10 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/25 px-4 py-2 text-sm font-semibold"><UsersRound className="h-4 w-4" /> The people behind Mapett</span>
          <h1 className="mt-5 text-4xl font-bold md:text-6xl">Meet Our Team</h1>
          <p className="mt-5 text-lg leading-relaxed text-background/80 md:text-xl">A collaborative team dedicated to moving businesses, journeys, and opportunities forward across Kenya and beyond.</p>
        </div>
      </section>

      <section className="py-16 md:py-20"><div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center"><h2 className="text-3xl font-bold text-foreground">One team, many ways to help</h2><p className="mt-4 text-muted-foreground">Our departments work together to provide a connected experience across logistics, travel, insurance, and automotive services.</p></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{teams.map(({ icon: Icon, title, description }, index) => <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-2xl border border-border bg-card p-7 shadow-card"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl hero-gradient"><Icon className="h-6 w-6 text-primary-foreground" /></div><h2 className="text-xl font-bold text-foreground">{title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{description}</p></motion.article>)}</div>
      </div></section>

      <section className="bg-secondary/30 py-16"><div className="container max-w-3xl text-center"><h2 className="text-3xl font-bold text-foreground">Talk to the Mapett team</h2><p className="mt-4 text-lg text-muted-foreground">Tell us what you need and the right specialist will be glad to help.</p><div className="mt-7"><ContactDialog trigger={<Button className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">Contact Our Team</Button>} /></div></div></section>
    </main>
    <Footer />
  </div>
);

export default Team;
