import ServicePageLayout from "@/components/ServicePageLayout";
import { airCargoInsuranceContent } from "@/data/servicePages";
import { Helmet } from 'react-helmet-async';

const AirCargoInsuranceSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Air Cargo Insurance Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Comprehensive air cargo insurance solutions ensuring the safety and security of your shipments through JKIA and international airports."
      })}
    </script>
  </Helmet>
);
const AirCargoInsurance = () => (
  <>
    <AirCargoInsuranceSchema />
    <ServicePageLayout content={airCargoInsuranceContent} />
  </>
);

export default AirCargoInsurance;
