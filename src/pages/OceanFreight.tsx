import ServicePageLayout from "@/components/ServicePageLayout";
import { oceanFreightContent } from "@/data/servicePages";

import { Helmet } from 'react-helmet-async';

const OceanFreightSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Ocean Freight Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Reliable ocean freight services ensuring the efficient and secure transportation of your goods via sea routes."
      })}
    </script>
  </Helmet>
);
const OceanFreight = () => (
  <>
    <OceanFreightSchema />
    <ServicePageLayout content={oceanFreightContent} />
  </>
);

export default OceanFreight;