import AnnouncementBanner from "@/components/AnnouncementBanner";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import QuoteSection from "@/components/QuoteSection";
import Services from "@/components/Services";
import Autoshop from "@/components/Marketplace";
import BlogSection from "@/components/BlogSection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrackShipmentButton from "@/components/TrackShipmentButton"
import SocialSidebar from "@/components/SocialSidebar";
import BackToTop from "@/components/BackToTop";
import FloatingSearchButton from "@/components/FloatingSearchButton";
import FeatureBanner from "@/components/FeatureBanner";
import PromoCircleSection from "@/components/PromoCircleSection";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBanner />
      <Navbar />
      <HeroSlider />
      <FeatureBanner />
      <PromoCircleSection />
      <Services />
      <QuoteSection />
      <Autoshop />
      <BlogSection />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <SocialSidebar />
      <BackToTop />
      <FloatingSearchButton />
      <TrackShipmentButton />
    </div>
  );
};

export default Index;
