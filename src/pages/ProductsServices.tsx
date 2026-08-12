import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";

const ProductsServices = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Services showAll />
      </main>
      <Footer />
    </div>
  );
};

export default ProductsServices;
