import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-16 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">1. Introduction</h2>
            <p>Mapett Travel & Logistics Limited ("we", "our", or "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, physical address, and identification documents when you register or request our services.</li>
              <li><strong>Shipment Information:</strong> Details about your cargo, origin, destination, and shipment preferences.</li>
              <li><strong>Payment Information:</strong> M-Pesa phone numbers, bank details, and transaction records for processing payments.</li>
              <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on our website.</li>
              <li><strong>Insurance Application Data:</strong> Business details, cargo values, and risk-related information for insurance processing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>To process and manage your shipments and logistics services</li>
              <li>To process insurance applications and claims</li>
              <li>To process payments and send transaction confirmations</li>
              <li>To communicate with you about your orders and services</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations and regulatory requirements</li>
              <li>To send promotional communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">4. Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Service Partners:</strong> Shipping lines, airlines, customs authorities, and insurance providers necessary to fulfill our services.</li>
              <li><strong>Payment Processors:</strong> M-Pesa (Safaricom), banks, and card networks to process your payments securely.</li>
              <li><strong>Government Authorities:</strong> Kenya Revenue Authority (KRA), customs agencies, and regulatory bodies as required by law.</li>
              <li><strong>Vendors:</strong> Third-party sellers on our marketplace platform for order fulfillment.</li>
            </ul>
            <p className="mt-2">We do not sell your personal information to third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">5. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data, including encryption, secure servers, and access controls. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">6. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, or as required by Kenyan law and regulations. Shipment records may be retained for up to 7 years for regulatory compliance.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">7. Your Rights</h2>
            <p>Under the Kenya Data Protection Act, 2019, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access your personal data held by us</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Object to processing of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">8. Cookies</h2>
            <p>Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser preferences. Essential cookies are required for the website to function properly.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">9. Contact Us</h2>
            <p>For any questions about this Privacy Policy or to exercise your data rights, contact us:</p>
            <ul className="list-none space-y-1 mt-2">
              <li><strong>Email:</strong> sales@mapettlogistics.com</li>
              <li><strong>Phone:</strong> +254 799 390 133</li>
              <li><strong>Address:</strong> Shree Plaza, Ground Floor, Nyali, P.O. Box 2039-80100, Mombasa, Kenya</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
