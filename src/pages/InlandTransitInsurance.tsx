import ServicePageLayout from "@/components/ServicePageLayout";
import { inlandTransitInsuranceContent } from "@/data/servicePages";

import { Helmet } from 'react-helmet-async';

const InlandTransitInsuranceSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Inland Transit Insurance Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Comprehensive inland transit insurance solutions ensuring the safety and security of your shipments during land transportation."
      })}
    </script>
  </Helmet>
);
const InlandTransitInsurance = () => (
  <>
    <InlandTransitInsuranceSchema />
    <ServicePageLayout content={inlandTransitInsuranceContent} />
  </>
);

export default InlandTransitInsurance;