import { motion } from "framer-motion";
import { ArrowRight, Car, CheckCircle2, Clock3, Luggage, MapPin, Plane, ShieldCheck, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";
const heroImage = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2200&q=85";

const benefits = [
  { icon: Clock3, title: "Always on time", description: "Pre-arranged pickups aligned with your flight schedule." },
  { icon: ShieldCheck, title: "Trusted drivers", description: "Professional, dependable drivers focused on a safe journey." },
  { icon: Luggage, title: "Luggage assistance", description: "Comfortable travel with help for your bags from door to terminal." },
  { icon: MapPin, title: "Door-to-door service", description: "Transfers between the airport, hotels, homes, offices, and destinations." },
];

const transferOptions = [
  "Airport arrival pickups and departures",
  "Hotel, home, and office transfers",
  "Private transfers for individuals and families",
  "Corporate and executive travel arrangements",
  "Group transfers for events and tours",
  "Custom routes across Mombasa, Nairobi, and beyond",
];

const AirportTransfers = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Car ready for an airport transfer" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/45" />
        </div>
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-semibold text-primary-foreground">
              <Plane className="h-4 w-4" /> Mapett Travel
            </span>
            <h1 className="mb-5 text-4xl font-bold text-background md:text-6xl">Reliable Airport Transfers</h1>
            <p className="mb-8 text-lg leading-relaxed text-background/85 md:text-xl">
              Start or finish your journey in comfort. Mapett Travel provides dependable, pre-booked airport transfers tailored to your schedule.
            </p>
            <ContactDialog trigger={<Button className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">Book a Transfer <ArrowRight className="ml-2 h-4 w-4" /></Button>} />
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Travel with confidence</span>
            <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">A smooth connection from runway to destination</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Whether you are arriving for business, heading home, or beginning a holiday, our team coordinates a seamless transfer so you can travel with less to worry about.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, description }, index) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl hero-gradient"><Icon className="h-5 w-5 text-primary-foreground" /></div>
                <h3 className="mb-2 font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-16 md:py-20">
        <div className="container max-w-5xl">
          <div className="mb-10 text-center">
            <Car className="mx-auto mb-3 h-7 w-7 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Transfer options for every journey</h2>
            <p className="mt-3 text-muted-foreground">Tell us your arrival or departure details, and we will arrange the right transfer for you.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {transferOptions.map((option) => <div key={option} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-muted-foreground">{option}</span></div>)}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container max-w-3xl text-center">
          <Users className="mx-auto mb-4 h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Ready to arrange your transfer?</h2>
          <p className="mt-4 text-lg text-muted-foreground">Share your travel date, flight details, pickup location, and number of passengers. Our team will confirm your transfer.</p>
          <div className="mt-7 flex justify-center"><ContactDialog trigger={<Button className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">Request Airport Transfer <ArrowRight className="ml-2 h-4 w-4" /></Button>} /></div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default AirportTransfers;
