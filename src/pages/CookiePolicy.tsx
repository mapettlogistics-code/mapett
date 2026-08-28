import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-16 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">COOKIE POLICY</h1>
          <p className="text-muted-foreground"><strong>Mapett Travel & Logistics Ltd</strong></p>
          <p className="text-sm text-muted-foreground">Effective Date: 22 August 2026</p>
        </div>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">1. What Are Cookies?</h2>
            <p>Cookies are small text files or similar technologies stored on or accessed through your browser or device when you visit a website. They can help a website function, remember preferences, improve performance and understand how visitors use the website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">2. How We Use Cookies</h2>
            <p>Mapett Travel & Logistics Ltd may use cookies and similar technologies across its websites for:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Essential website functions and security</li>
              <li>Remembering preferences and settings</li>
              <li>Measuring website performance and usage</li>
              <li>Understanding how visitors interact with our websites</li>
              <li>Marketing or advertising, where such technologies are used and lawfully permitted</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">3. Types of Cookies</h2>
            <p><strong>Essential cookies</strong> are necessary for core website functionality or security and may not require consent where permitted by law.</p>
            <p><strong>Preference cookies</strong> remember choices or settings that improve your experience.</p>
            <p><strong>Analytics cookies</strong> help us understand website traffic, performance and usage.</p>
            <p><strong>Marketing cookies</strong> or similar technologies may be used to measure campaigns or deliver relevant advertising. Where consent is required, they will not be activated until the appropriate consent is obtained.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">4. Your Choices</h2>
            <p>Where our websites use non-essential cookies that require consent, you will be given the option to accept, reject or manage those cookies through the cookie banner or preference controls.</p>
            <p>You may also manage cookies through your browser or device settings. Blocking some cookies may affect certain website functions.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">5. Third-Party Cookies</h2>
            <p>Some cookies or similar technologies may be placed by third-party service providers such as analytics, hosting, payment, embedded-content or advertising providers. Those providers may process information according to their own privacy notices and applicable law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">6. Changes to This Policy</h2>
            <p>We may update this Cookie Policy when our websites, technologies or legal requirements change. The latest version will be published on the relevant website with an updated effective date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">7. Related Privacy Information</h2>
            <p>For more information about how we collect, use, share and protect personal data and how you may exercise your rights, please read our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">8. Contact Us</h2>
            <ul className="list-none space-y-1 mt-2">
              <li><strong>Mapett Travel & Logistics Ltd</strong></li>
              <li><strong>Email:</strong> sales@mapettlogistics.com</li>
              <li><strong>Telephone:</strong> +254 799 390 133</li>
              <li><strong>Address:</strong> Shree Plaza, Nyali Road, Mombasa, Kenya</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePolicy;