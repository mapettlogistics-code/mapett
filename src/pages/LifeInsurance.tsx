import ServicePageLayout from "@/components/ServicePageLayout";
import { lifeInsuranceContent } from "@/data/servicePages";

import { Helmet } from 'react-helmet-async';

const LifeInsuranceSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Life Insurance Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Comprehensive life insurance solutions providing financial security and peace of mind for you and your loved ones."
      })}
    </script>
  </Helmet>
);
const LifeInsurance = () => (
  <>
    <LifeInsuranceSchema />
    <ServicePageLayout content={lifeInsuranceContent} />
  </>
);

export default LifeInsurance;
