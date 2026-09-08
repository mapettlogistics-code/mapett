import ServicePageLayout from "@/components/ServicePageLayout";
import { airFreightContent } from "@/data/servicePages";
import { Helmet } from 'react-helmet-async';

const AirFreightSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Air Freight Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Fast global air cargo solutions with real-time tracking through JKIA and international airports."
      })}
    </script>
  </Helmet>
);


const AirFreight = () => (
  <>
    <AirFreightSchema />
    <ServicePageLayout content={airFreightContent} />
  </>
);

export default AirFreight;
