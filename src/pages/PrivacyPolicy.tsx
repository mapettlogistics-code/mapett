import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-16 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">PRIVACY POLICY</h1>
          <p className="text-muted-foreground"><strong>Mapett Travel & Logistics Ltd</strong></p>
          <p className="text-sm text-muted-foreground">Effective Date: 22 August 2026</p>
        </div>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">1. Introduction</h2>
            <p>Mapett Travel & Logistics Ltd ("Mapett", "we", "us" or "our") respects your privacy and is committed to protecting personal data. This Privacy Policy explains how we collect, use, store, share and protect personal data when you visit our websites, contact us, request our services, purchase products, make a booking, submit documents, make a payment or otherwise interact with us.</p>
            <p>This policy applies to mapettlogistics.com, mapett.com, mapettstore.com and mapett.vercel.app while it is used as a temporary development or hosting address. It covers our logistics, freight, transport, lubricant, seals and tags, travel, visa-support, insurance-support, e-commerce and marketplace-related activities.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">2. Legal Framework</h2>
            <p>We process personal data in accordance with applicable Kenyan law, including the Constitution of Kenya, the Data Protection Act, 2019, applicable data-protection regulations, the Consumer Protection Act, the Kenya Information and Communications Act and other applicable legal or regulatory requirements.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">3. Personal Data We Collect</h2>
            <p>Depending on the service or interaction, we may collect:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Identity and contact information,</strong> including name, telephone number, email address, address and company details.</li>
              <li><strong>Business and transaction information,</strong> including quotations, orders, invoices, account details, delivery details and service or purchase history.</li>
              <li><strong>Logistics and shipment information,</strong> including shipper and consignee details, cargo information, origin, destination, transport requirements and customs documentation.</li>
              <li><strong>Travel and visa information,</strong> including passenger details, passport information, nationality, itinerary, accommodation, flight details and supporting documents required for travel or visa services.</li>
              <li><strong>Insurance-related information</strong> where necessary to obtain quotations, arrange cover or support a claim.</li>
              <li><strong>Payment and transaction information,</strong> including payment references and confirmations. Payment credentials may be handled directly by the relevant payment provider.</li>
              <li><strong>Website and technical information,</strong> including IP address, browser or device information, pages visited, cookie identifiers and similar usage information.</li>
              <li><strong>Communications,</strong> enquiries, feedback, complaints and other information you provide to us.</li>
              <li><strong>Marketing preferences</strong> and records of consent or objection.</li>
              <li><strong>Buyer or seller information</strong> required to operate Mapett Store or related digital commerce services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">4. How We Use Personal Data</h2>
            <p>We use personal data only where we have a lawful basis to do so, including to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Respond to enquiries, prepare quotations and provide requested information.</li>
              <li>Provide logistics, freight, clearing, forwarding, transport, warehousing and related services.</li>
              <li>Arrange flights, accommodation, tours, transfers, visa-support services and travel-related insurance arrangements.</li>
              <li>Supply lubricants, seals and tags, batteries, tyres, accessories and other products.</li>
              <li>Process orders, bookings, deliveries, payments, refunds and customer accounts.</li>
              <li>Coordinate services with airlines, shipping lines, transport providers, hotels, insurers, visa authorities and other suppliers.</li>
              <li>Maintain accounting, tax, customs, regulatory and business records.</li>
              <li>Protect our systems, prevent fraud and misuse and manage legal or operational risks.</li>
              <li>Improve our websites, services and customer experience.</li>
              <li>Send service-related communications and, where lawful, marketing communications.</li>
              <li>Comply with legal obligations and respond to lawful requests from regulators, courts or government authorities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">5. Lawful Basis and Consent</h2>
            <p>Depending on the circumstances, we may process personal data on the basis of consent, performance of a contract, taking steps at your request before entering into a contract, compliance with a legal obligation, protection of vital interests, public-interest grounds or legitimate interests where permitted by law.</p>
            <p>Where consent is required, we will seek it in an appropriate manner. You may withdraw consent at any time. Withdrawal will not affect processing already carried out lawfully or processing that we are entitled or required to continue on another lawful basis.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">6. Sensitive Data and Children's Data</h2>
            <p>Some services, particularly travel, visa or insurance services, may require information treated as sensitive personal data under Kenyan law. We will process such information only where legally permitted and with the safeguards required by law.</p>
            <p>Where we process a child's personal data, for example for family travel, we will apply the requirements of Kenyan law, including parental or guardian consent where required.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">7. Sharing Personal Data</h2>
            <p>We do not sell personal data as a standalone commodity. We may share personal data where necessary and lawful to provide a requested service or meet our legal obligations. Recipients may include airlines, shipping lines, freight and transport providers, customs and government authorities, warehouses, hotels, tour operators, insurers, embassies, consulates, visa application centres, payment providers, technology and hosting providers, professional advisers and other service providers.</p>
            <p>When Mapett Store operates as a marketplace, relevant information may be shared with sellers, delivery providers, payment providers or other participants only as necessary to fulfil orders, process payments, handle returns or provide customer support.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">8. International Transfers</h2>
            <p>Some services, especially travel and visa services, may require personal data to be transferred outside Kenya to international suppliers or authorities. We will make such transfers only where permitted by law and subject to the safeguards required under applicable Kenyan data-protection law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">9. Marketing</h2>
            <p>We may send information about our products and services where we have a lawful basis to do so. Where consent is required for direct marketing, we will obtain it. You may opt out of marketing communications at any time, and valid objections to direct marketing will be respected.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">10. Cookies</h2>
            <p>Our websites may use cookies and similar technologies for website functionality, security, preferences, analytics and, where lawful, marketing. Where required, non-essential cookies or tracking technologies will be subject to appropriate consent controls. Further information is provided in our Cookie Policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">11. Data Security and Breaches</h2>
            <p>We use reasonable and appropriate technical and organisational measures to protect personal data against unauthorised access, loss, misuse, alteration, disclosure or destruction. Where a personal-data breach is legally notifiable, we will take the notification and response steps required by applicable Kenyan law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">12. Data Retention</h2>
            <p>We retain personal data only for as long as reasonably necessary for the purpose for which it was collected, unless a longer period is required or permitted by law. When information is no longer required, we will securely delete, anonymise or otherwise dispose of it in accordance with applicable requirements.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">13. Your Rights</h2>
            <p>Subject to applicable law, you may have the right to be informed about how your personal data is used, access it, request correction or deletion where applicable, object to certain processing including direct marketing, request restriction of processing, withdraw consent, request data portability where applicable and exercise rights relating to automated decision-making.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">14. Requests and Complaints</h2>
            <p>To make a privacy request or raise a concern, contact us using the details below. We may request reasonable information to verify your identity or authority. If you are not satisfied with our response, you may lodge a complaint with the Office of the Data Protection Commissioner (ODPC) in Kenya.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">15. Third-Party Links</h2>
            <p>Our websites may link to third-party websites, booking platforms, payment services, social-media platforms or supplier websites. Those third parties operate under their own privacy policies and terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">16. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. The current version will be published on the relevant website with an updated effective date. Where required by law, we will provide additional notice or obtain consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">17. Contact Us</h2>
            <ul className="list-none space-y-1 mt-2">
              <li><strong>Mapett Travel & Logistics Ltd</strong></li>
              <li><strong>Address:</strong> Shree Plaza, Nyali Road, Mombasa, Kenya</li>
              <li><strong>Email:</strong> sales@mapettlogistics.com</li>
              <li><strong>Telephone:</strong> +254 799 390 133</li>
              <li><strong>Websites:</strong> mapettlogistics.com | mapett.com | mapettstore.com</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;