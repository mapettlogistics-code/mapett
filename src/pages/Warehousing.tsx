import ServicePageLayout from "@/components/ServicePageLayout";
import { warehousingContent } from "@/data/servicePages";
import { Helmet } from 'react-helmet-async';

const WarehousingSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Warehousing Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Reliable warehousing services providing secure storage solutions for your goods in Kenya and East Africa."
      })}
    </script>
  </Helmet>
);
const Warehousing = () => (
  <>
    <WarehousingSchema />
    <ServicePageLayout content={warehousingContent} />
  </>
);

export default Warehousing;