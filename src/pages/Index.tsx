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
import SocialSidebar from "@/components/SocialSidebar";
import BackToTop from "@/components/BackToTop";
import FeatureBanner from "@/components/FeatureBanner";
import PromoCircleSection from "@/components/PromoCircleSection";
import MobileQuickActions from "@/components/MobileQuickActions";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBanner />
      <Navbar />
      <HeroSlider />
      <FeatureBanner />
      <PromoCircleSection />
      <Services />
      <MobileQuickActions />
      <div className="hidden md:block">
        <QuoteSection />
      </div>
      <Autoshop />
      <BlogSection />
      <About />
      <div className="hidden md:block">
        <Contact />
      </div>
      <Footer />
      <WhatsAppButton />
      <SocialSidebar />
      <BackToTop />
    </div>
  );
};

export default Index;
