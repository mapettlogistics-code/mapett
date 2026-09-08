import ServicePageLayout from "@/components/ServicePageLayout";
import { specialCargoContent } from "@/data/servicePages";

import { Helmet } from 'react-helmet-async';

const SpecialCargoSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Special Cargo Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Specialized cargo services ensuring the safe and efficient handling and transportation of unique and high-value shipments."
      })}
    </script>
  </Helmet>
);
const SpecialCargo = () => (
  <>
    <SpecialCargoSchema />
    <ServicePageLayout content={specialCargoContent} />
  </>
);

export default SpecialCargo;