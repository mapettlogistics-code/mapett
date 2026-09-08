import ServicePageLayout from "@/components/ServicePageLayout";
import { roadRailTransportContent } from "@/data/servicePages";

import { Helmet } from 'react-helmet-async';

const RoadRailTransportSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Road and Rail Transport Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Reliable road and rail transport services ensuring the efficient and secure movement of your goods across Kenya and East Africa."
      })}
    </script>
  </Helmet>
);
const RoadRailTransport = () => (
  <>
    <RoadRailTransportSchema />
    <ServicePageLayout content={roadRailTransportContent} />
  </>
);

export default RoadRailTransport;
