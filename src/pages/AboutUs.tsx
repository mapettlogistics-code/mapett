import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;