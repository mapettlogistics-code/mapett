import ServicePageLayout from "@/components/ServicePageLayout";
import { wibaEmployeesCoverageContent } from "@/data/servicePages";
import { Helmet } from 'react-helmet-async';

const WIBAEmployeesCoverageSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "WIBA Employees Coverage Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Comprehensive WIBA employees coverage ensuring the safety and security of your employees in the workplace."
      })}
    </script>
  </Helmet>
);
const WIBAEmployeesCoverage = () => (
  <>
    <WIBAEmployeesCoverageSchema />
    <ServicePageLayout content={wibaEmployeesCoverageContent} />
  </>
);

export default WIBAEmployeesCoverage;
