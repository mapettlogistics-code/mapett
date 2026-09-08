import ServicePageLayout from "@/components/ServicePageLayout";
import { marineCargoInsuranceContent } from "@/data/servicePages";

// const MarineCargoInsurance = () => <ServicePageLayout content={marineCargoInsuranceContent} />;

// export default MarineCargoInsurance;
import { Helmet } from 'react-helmet-async';

const MarineCargoInsuranceSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Marine Cargo Insurance Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Comprehensive marine cargo insurance solutions ensuring the safety and security of your shipments during sea transportation."
      })}
    </script>
  </Helmet>
);
const MarineCargoInsurance = () => (
  <>
    <MarineCargoInsuranceSchema />
    <ServicePageLayout content={marineCargoInsuranceContent} />
  </>
);

export default MarineCargoInsurance;