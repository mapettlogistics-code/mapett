/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { CheckCircle, Award, Users, Clock, MapPin, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import * as LucideIcons from "lucide-react";

const iconMap: Record<string, any> = { Award, Users, Clock, MapPin, CheckCircle };

const getIcon = (name: string | null) => {
  if (!name) return Award;
  return (LucideIcons as any)[name] || iconMap[name] || Award;
};

const defaultValues = [
  { title: "Integrity", icon: "ShieldCheck", description: "We conduct business honestly, ethically and transparently, and we value trust in every relationship." },
  { title: "Professionalism", icon: "BriefcaseBusiness", description: "We maintain high standards of competence, communication, accountability and customer service." },
  { title: "Value for Money", icon: "Wallet", description: "We focus on solutions that deliver practical value, competitive commercial outcomes and responsible use of customer resources." },
  { title: "Operational Efficiency", icon: "Gauge", description: "We continuously seek better ways to coordinate people, processes, technology and partners so that work is completed effectively." },
  { title: "Innovation", icon: "Lightbulb", description: "We embrace technology, E-Commerce and new approaches that improve convenience, access and performance." },
  { title: "Customer Focus", icon: "Heart", description: "We listen to customers, understand their requirements and design practical solutions around their needs." },
];

const defaultMilestones = [
  { subtitle: "2020", title: "Founded", description: "Started with a vision to transform Kenya's logistics" },
  { subtitle: "2022", title: "Expansion", description: "Opened offices in Mombasa and Nairobi" },
  { subtitle: "2025", title: "Digital Shift", description: "Launched online websites" },
  { subtitle: "2026", title: "5 Years", description: "Celebrating a decade of excellence" },
];

const About = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";
  const { items: aboutItems } = useSiteContent("about_main");
  const { items: milestoneItems } = useSiteContent("about_milestone", defaultMilestones as any);
  const { items: valueItems } = useSiteContent("about_value", defaultValues as any);

  const about = aboutItems[0];
  const badge = about?.subtitle || "About Mapett Travel & Logistics";
  const heading = about?.title || "Your Trusted Partner in Kenya's Logistics";
  const mainDesc = about?.description || "Since 2020, Mapett Travel & Logistics has been at the forefront of providing comprehensive logistics solutions across Kenya and East Africa. From our strategic locations in Nairobi and Mombasa, we serve businesses of all sizes with dedication and expertise.";
  const secondaryDesc = (about?.extra_data as any)?.secondary_description || "Our business has four divisions ; Mapett Logistics Solutions, Mapett Autostore & Lubricants Solutions, Travel Solutions & E-commerce Marketplace. ";
  const bulletsRaw = (about?.extra_data as any)?.bullets || "End-to-end supply chain solutions\nReal-time shipment tracking\nCompetitive pricing\n24/7 customer support";
  const bullets = bulletsRaw.split("\n").filter(Boolean);
  const buttonText = (about?.extra_data as any)?.button_text || "Learn More About Us";
  const valuesHeading = (about?.extra_data as any)?.values_heading || "Our Core Values";
  const valuesSubtitle = (about?.extra_data as any)?.values_subtitle || "The principles that guide everything we do at Mapett Logistics";

  const milestones = milestoneItems.map(m => ({
    year: m.subtitle || "",
    title: m.title || "",
    description: m.description || "",
  }));

  const values = valueItems.map(v => ({
    icon: getIcon(v.icon),
    title: v.title || "",
    description: v.description || "",
  }));

  if (!values.some(value => value.title === "Customer Focus")) {
    values.push({
      icon: getIcon("Heart"),
      title: "Customer Focus",
      description: "We listen to customers, understand their requirements and design practical solutions around their needs.",
    });
  }

  return (
    <section id="about" className={isAboutPage ? "pt-8 pb-24 bg-secondary/30" : "py-24 bg-secondary/30"}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              {badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {heading.includes("Kenya's Logistics") ? (
                <>
                  {heading.split("Kenya's Logistics")[0]}
                  <span className="text-primary">Kenya's Logistics</span>
                  {heading.split("Kenya's Logistics")[1]}
                </>
              ) : heading}
            </h2>
            <p className="text-muted-foreground text-lg mb-6">{mainDesc}</p>
            <p className="text-muted-foreground mb-8">{secondaryDesc}</p>

            <div className="space-y-4 mb-8">
              {bullets.map((item: string) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {isAboutPage ? (
              <Button asChild className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">
                <a
                  href="/documents/MAPETT%20LOGISTICS%20LIMITED%20PROFILE.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Company Profile
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ) : (
              <Button asChild className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">
                <Link to="/about">{buttonText}</Link>
              </Button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center shadow-glow">
                      <span className="text-primary-foreground font-bold">{milestone.year}</span>
                    </div>
                    {index !== milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-4" />
                    )}
                  </div>
                  <div className="pt-3">
                    <h4 className="text-lg font-bold text-foreground mb-1">{milestone.title}</h4>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">{valuesHeading}</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">{valuesSubtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-card rounded-2xl shadow-card border border-border"
            >
              <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mx-auto mb-4">
                <value.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">{value.title}</h4>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
