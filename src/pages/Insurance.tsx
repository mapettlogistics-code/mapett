import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Car, Package, Plane, Shield, Ship, Truck, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getServicePageLink } from "@/data/serviceRoutes";

import insuranceMarineImg from "@/assets/insurance-marine.jpg";
import insuranceAirImg from "@/assets/insurance-air.jpg";
import insuranceInlandImg from "@/assets/insurance-inland.jpg";
import insuranceFreightImg from "@/assets/insurance-freight.jpg";
import insuranceMotorImg from "@/assets/insurance-motor.jpg";
import insuranceWarehouseImg from "@/assets/insurance-warehouse.jpg";
import insuranceLifeImg from "@/assets/insurance-life.jpg";
import insuranceAccidentImg from "@/assets/insurance-accident.jpg";

const insuranceOptions = [
  {
    icon: Ship,
    title: "Marine Cargo Insurance",
    description: "Comprehensive protection for goods in transit by sea, covering loss or damage during shipping.",
    features: ["All Risk Cover", "War & Strikes", "General Average"],
    image: insuranceMarineImg,
  },
  {
    icon: Plane,
    title: "Air Cargo Insurance",
    description: "Coverage for goods transported by air, protecting against damage, loss, and delays.",
    features: ["Transit Coverage", "Loading/Unloading", "Door to Door"],
    image: insuranceAirImg,
  },
  {
    icon: Truck,
    title: "Inland Transit Insurance",
    description: "Protection for goods transported by road or rail within the country.",
    features: ["Road Accidents", "Theft Protection", "Natural Disasters"],
    image: insuranceInlandImg,
  },
  {
    icon: Package,
    title: "Freight Forwarder Liability",
    description: "Coverage for freight forwarders against claims from cargo owners.",
    features: ["Errors & Omissions", "Vicarious Liability", "Professional Indemnity"],
    image: insuranceFreightImg,
  },
  {
    icon: Car,
    title: "Motor Vehicle Insurance",
    description: "Comprehensive and third-party coverage for commercial fleet vehicles.",
    features: ["Third Party Liability", "Comprehensive Cover", "Passenger Liability"],
    image: insuranceMotorImg,
  },
  {
    icon: Building2,
    title: "Warehouse Insurance",
    description: "Coverage for goods stored in warehouses against various risks.",
    features: ["Stock Coverage", "Equipment Protection", "Water Damage"],
    image: insuranceWarehouseImg,
  },
  {
    icon: Users,
    title: "Life Insurance",
    description: "Life insurance coverage for employees and their dependents.",
    features: ["Death Benefit", "Disability Cover", "Critical Illness"],
    image: insuranceLifeImg,
  },
  {
    icon: Shield,
    title: "WIBA & Employees Liability",
    description: "Work Injury Benefits Act coverage and employer liability protection for workplace injuries and occupational diseases.",
    features: ["Work Injury Benefits", "Employer Liability", "Compensation Cover"],
    image: insuranceAccidentImg,
  },
];

const Insurance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-8 pb-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Insurance Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Insurance Solutions
            </h2>
            <p className="text-muted-foreground text-lg">
              Protect your cargo, assets, and business with our wide range of insurance products tailored for the logistics industry.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {insuranceOptions.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    <div className="absolute bottom-2 left-3 w-10 h-10 rounded-lg hero-gradient flex items-center justify-center shadow-lg">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto text-sm group/btn"
                    >
                      <Link to={getServicePageLink(item.title)}>
                        Apply Now
                        <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Insurance;
