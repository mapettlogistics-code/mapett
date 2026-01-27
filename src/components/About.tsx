import { motion } from "framer-motion";
import { CheckCircle, Award, Users, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest standards in every delivery and service.",
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Building lasting relationships with our clients across Kenya.",
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "On-time delivery and consistent service you can count on.",
    },
    {
      icon: MapPin,
      title: "Local Expertise",
      description: "Deep understanding of Kenya's logistics landscape and needs.",
    },
  ];

  const milestones = [
    { year: "2015", title: "Founded", description: "Started with a vision to transform Kenya's logistics" },
    { year: "2018", title: "Expansion", description: "Opened warehouses in Mombasa and Nairobi" },
    { year: "2021", title: "Digital Shift", description: "Launched online marketplace and tracking" },
    { year: "2025", title: "10 Years", description: "Celebrating a decade of excellence" },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              About Mapett Logistics
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Your Trusted Partner in{" "}
              <span className="text-primary">Kenya's Logistics</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Since 2015, Mapett Logistics has been at the forefront of providing comprehensive 
              logistics solutions across Kenya and East Africa. From our strategic locations in 
              Nairobi and Mombasa, we serve businesses of all sizes with dedication and expertise.
            </p>
            <p className="text-muted-foreground mb-8">
              We combine traditional logistics excellence with modern e-commerce through our 
              integrated marketplace, offering automotive lubricants, batteries, and accessories 
              alongside our freight and warehousing services.
            </p>

            <div className="space-y-4 mb-8">
              {["End-to-end supply chain solutions", "Real-time shipment tracking", "Competitive pricing", "24/7 customer support"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">
              Learn More About Us
            </Button>
          </motion.div>

          {/* Right - Timeline */}
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

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">Our Core Values</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do at Mapett Logistics
          </p>
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
