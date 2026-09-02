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
        {/* Company Profile Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Company Profile</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Read our company profile to learn more about Mapett Travel & Logistics Limited
              </p>
            </motion.div>
            
            <div className="max-w-5xl mx-auto">
              <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
                {/* Document Header */}
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold text-foreground">
                      MAPETT LOGISTICS LIMITED PROFILE
                    </h3>
                  </div>
                </div>
                
                {/* PDF Viewer - View Only Mode */}
                <div className="relative h-[600px] w-full">
                  <iframe
                    src="/documents/MAPETT%20LOGISTICS%20LIMITED%20PROFILE.pdf#toolbar=0&navpanes=0&scrollbar=0&download=0&print=0&view=FitH"
                    title="Mapett Company Profile"
                    className="w-full h-full border-none"
                    frameBorder="0"
                    style={{ 
                      pointerEvents: "none", 
                      userSelect: "none",
                      WebkitUserSelect: "none" 
                    }}
                  />
                  {/* Overlay to prevent interaction */}
                  <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;