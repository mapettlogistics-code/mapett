import ServicePageLayout from "@/components/ServicePageLayout";
import { refrigeratedCargoContent } from "@/data/servicePages";

import { Helmet } from 'react-helmet-async';

const RefrigeratedCargoSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Refrigerated Cargo Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Specialized refrigerated cargo services ensuring the safe and efficient transportation of temperature-sensitive goods."
      })}
    </script>
  </Helmet>
);
const RefrigeratedCargo = () => (
  <>
    <RefrigeratedCargoSchema />
    <ServicePageLayout content={refrigeratedCargoContent} />
  </>
);

export default RefrigeratedCargo;
