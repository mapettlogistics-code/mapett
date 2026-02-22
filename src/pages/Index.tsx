import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import QuoteSection from "@/components/QuoteSection";
import Services from "@/components/Services";
import Insurance from "@/components/Insurance";
import Autoshop from "@/components/Marketplace";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";
import SocialSidebar from "@/components/SocialSidebar";
import BackToTop from "@/components/BackToTop";
import FloatingContactButton from "@/components/FloatingContactButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSlider />
      <QuoteSection />
      <Services />
      <Insurance />
      <Autoshop />
      <About />
      <Contact />
      <Footer />
      <ChatBot />
      <WhatsAppButton />
      <SocialSidebar />
      <BackToTop />
      <FloatingContactButton />
    </div>
  );
};

export default Index;
