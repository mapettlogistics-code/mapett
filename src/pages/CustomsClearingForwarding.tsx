import ServicePageLayout from "@/components/ServicePageLayout";
import { CustomsClearingForwardingContent } from "@/data/servicePages";
import { Helmet } from 'react-helmet-async';

const CustomsClearingForwardingSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Customs Clearing and Forwarding Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Efficient customs clearing and forwarding services ensuring smooth and compliant movement of goods through JKIA and international ports."
      })}
    </script>
  </Helmet>
);
const CustomsClearingForwarding = () => (
  <>
    <CustomsClearingForwardingSchema />
    <ServicePageLayout content={CustomsClearingForwardingContent} />
  </>
);

export default CustomsClearingForwarding;