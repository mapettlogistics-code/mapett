import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Package, LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";
import { getServicePageLink } from "@/data/serviceRoutes";

export interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServicePageContent {
  badge: string;
  icon: LucideIcon;
  heroImage: string;
  heroImageAlt: string;
  title: string;
  heroDescription: string;
  overviewTitle: string;
  overviewDescription: string;
  featuresTitle: string;
  featuresSubtitle: string;
  features: ServiceFeature[];
  cargoTypes: string[];
  highlightsTitle: string;
  highlights: string[];
  processSteps: ServiceProcessStep[];
  relatedServices: { icon: LucideIcon; label: string }[];
  relatedDescription: string;
  ctaLabel: string;
}

interface ServicePageLayoutProps {
  content: ServicePageContent;
}

const ServicePageLayout = ({ content }: ServicePageLayoutProps) => {
  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="relative pt-8 pb-16 md:pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={content.heroImage}
              alt={content.heroImageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/40" />
          </div>

          <div className="container relative z-10 py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-semibold mb-4">
                <Icon className="h-4 w-4" />
                {content.badge}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-background mb-4">{content.title}</h1>
              <p className="text-lg text-background/85 mb-8">{content.heroDescription}</p>
              <div className="flex flex-wrap gap-3">
                <ContactDialog
                  trigger={
                    <Button className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">
                      Get a Quote
                    </Button>
                  }
                />
                <Button
                  asChild
                  variant="outline"
                  className="border-background/60 bg-transparent text-background hover:bg-background/15 hover:text-background hover:border-background"
                >
                  <Link to="/products-services">All Products & Services</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{content.overviewTitle}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{content.overviewDescription}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{content.featuresTitle}</h2>
              <p className="text-muted-foreground">{content.featuresSubtitle}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="p-6 bg-card rounded-2xl border border-border shadow-card"
                >
                  <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">What We Handle</h2>
                </div>
                <ul className="space-y-3">
                  {content.cargoTypes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-card border border-border shadow-card"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">{content.highlightsTitle}</h2>
                </div>
                <ul className="space-y-3">
                  {content.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">How It Works</h2>
              <p className="text-muted-foreground">A streamlined process from first inquiry to final delivery.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative p-6 bg-card rounded-2xl border border-border"
                >
                  <span className="text-3xl font-bold text-primary/20">{step.step}</span>
                  <h3 className="text-lg font-bold text-foreground mt-2 mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container max-w-4xl text-center">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {content.relatedServices.map(({ icon: RelatedIcon, label }) => (
                <Link
                  key={label}
                  to={getServicePageLink(label)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <RelatedIcon className="h-4 w-4 text-primary" />
                  {label}
                </Link>
              ))}
            </div>
            <p className="text-muted-foreground mb-6">{content.relatedDescription}</p>
            <ContactDialog
              trigger={
                <Button className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">
                  {content.ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              }
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePageLayout;
