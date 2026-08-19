import { motion } from "framer-motion";
import { ArrowRight, Backpack, BedDouble, CheckCircle2, FileCheck2, Globe2, Plane, ShieldCheck, Ticket, Umbrella } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";

type TravelService = "flight-booking" | "visa-processing" | "hotel-booking" | "travel-insurance" | "travel-essentials" | "tours-safaris";

interface PageContent {
  title: string;
  intro: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
  cta: string;
  heroImage: string;
  heroImageAlt: string;
}

const pages: Record<TravelService, PageContent> = {
  "flight-booking": {
    title: "Air Travel & Flight Booking",
    intro: "Find the right flight for your journey with support from planning to departure.",
    description: "Our travel team helps you compare flight options and arrange bookings that fit your schedule, destination, and travel needs.",
    icon: Plane,
    highlights: ["Domestic and international flight options", "Flexible itinerary planning", "Support with booking changes", "Clear travel information before departure"],
    cta: "Request a Flight Booking",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2200&q=85",
    heroImageAlt: "Airplane flying above clouds",
  },
  "visa-processing": {
    title: "Visa Processing",
    intro: "Practical support to help make your visa application journey clearer and easier.",
    description: "We guide you through visa requirements, document preparation, appointment planning, and application steps for your intended destination.",
    icon: FileCheck2,
    highlights: ["Guidance on visa requirements", "Document checklist support", "Application and appointment assistance", "Updates throughout the process"],
    cta: "Start Visa Processing",
    heroImage: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=2200&q=85",
    heroImageAlt: "Passport and travel documents",
  },
  "hotel-booking": {
    title: "Hotel Booking",
    intro: "Comfortable stays selected to suit your destination, budget, and itinerary.",
    description: "Whether you are travelling for work, a holiday, or a group event, we help arrange accommodation that puts you in the right place.",
    icon: BedDouble,
    highlights: ["Hotel options for every budget", "Business and leisure accommodation", "Individual and group stays", "Booking support before your trip"],
    cta: "Find a Hotel",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=85",
    heroImageAlt: "Comfortable hotel accommodation",
  },
  "travel-insurance": {
    title: "Travel Insurance",
    intro: "Travel with added confidence through cover suited to your trip.",
    description: "Our team can help you explore travel insurance options for international and regional journeys, so you can choose appropriate cover before you leave.",
    icon: ShieldCheck,
    highlights: ["Trip-specific cover options", "Medical emergency protection", "Baggage and travel disruption cover", "Guidance on policy choices"],
    cta: "Ask About Travel Insurance",
    heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2200&q=85",
    heroImageAlt: "Travel planning and insurance documents",
  },
  "travel-essentials": {
    title: "Travel Essentials",
    intro: "Prepare for your journey with the details that make travelling smoother.",
    description: "From travel planning advice to practical requirements for your destination, Mapett Travel helps you prepare before departure.",
    icon: Backpack,
    highlights: ["Destination preparation guidance", "Travel document reminders", "Packing and pre-departure advice", "Coordinated travel arrangements"],
    cta: "Plan Your Journey",
    heroImage: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=2200&q=85",
    heroImageAlt: "Suitcase packed for travel",
  },
  "tours-safaris": {
    title: "Tours & Safari Packages",
    intro: "Discover memorable experiences with travel plans made around you.",
    description: "We help arrange tours and safari packages for individuals, families, groups, and corporate travellers across Kenya and beyond.",
    icon: Umbrella,
    highlights: ["Custom holiday and safari itineraries", "Family, group, and corporate packages", "Accommodation and transport coordination", "Local destination expertise"],
    cta: "Explore Tour Packages",
    heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2200&q=85",
    heroImageAlt: "African safari wildlife at sunset",
  },
};

const TravelServicePage = ({ service }: { service: TravelService }) => {
  const content = pages[service];
  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0"><img src={content.heroImage} alt={content.heroImageAlt} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/45" /></div>
          <div className="container relative z-10"><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-semibold text-primary-foreground"><Globe2 className="h-4 w-4" /> Mapett Travel</span>
            <h1 className="mb-5 text-4xl font-bold text-background md:text-6xl">{content.title}</h1>
            <p className="mb-8 text-lg leading-relaxed text-background/85 md:text-xl">{content.intro}</p>
            <ContactDialog trigger={<Button className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">{content.cta} <ArrowRight className="ml-2 h-4 w-4" /></Button>} />
          </motion.div></div>
        </section>

        <section className="py-16 md:py-20"><div className="container max-w-5xl">
          <div className="grid items-center gap-12 lg:grid-cols-2"><motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl hero-gradient"><Icon className="h-7 w-7 text-primary-foreground" /></div>
            <h2 className="text-3xl font-bold text-foreground">Travel support made simple</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{content.description}</p>
          </motion.div>
          <div className="space-y-3">{content.highlights.map((highlight, index) => <motion.div key={highlight} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-card"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-muted-foreground">{highlight}</span></motion.div>)}</div>
          </div>
        </div></section>

        <section className="bg-secondary/30 py-16"><div className="container max-w-3xl text-center"><Ticket className="mx-auto mb-4 h-8 w-8 text-primary" /><h2 className="text-3xl font-bold text-foreground">Ready to plan?</h2><p className="mt-4 text-lg text-muted-foreground">Tell us where and when you would like to travel, and our team will get in touch to help arrange the details.</p><div className="mt-7"><ContactDialog trigger={<Button className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">{content.cta} <ArrowRight className="ml-2 h-4 w-4" /></Button>} /></div></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default TravelServicePage;
