import ServicePageLayout from "@/components/ServicePageLayout";
import { freightForwarderLiabilityContent } from "@/data/servicePages";

import { Helmet } from 'react-helmet-async';

const FreightForwarderLiabilitySchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Freight Forwarder Liability Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Reliable freight forwarder liability services protecting your shipments and ensuring accountability throughout the logistics process."
      })}
    </script>
  </Helmet>
);
const FreightForwarderLiability = () => (
  <>
    <FreightForwarderLiabilitySchema />
    <ServicePageLayout content={freightForwarderLiabilityContent} />
  </>
);

export default FreightForwarderLiability;