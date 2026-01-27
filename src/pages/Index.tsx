import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import QuoteSection from "@/components/QuoteSection";
import Services from "@/components/Services";
import Marketplace from "@/components/Marketplace";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSlider />
      <QuoteSection />
      <Services />
      <Marketplace />
      <About />
      <Contact />
      <Footer />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
