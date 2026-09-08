import ServicePageLayout from "@/components/ServicePageLayout";
import { warehouseInsuranceContent } from "@/data/servicePages";
import { Helmet } from 'react-helmet-async';

const WarehouseInsuranceSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Warehouse Insurance Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Comprehensive warehouse insurance solutions ensuring the safety and security of your goods in storage."
      })}
    </script>
  </Helmet>
);
const WarehouseInsurance = () => (
  <>
    <WarehouseInsuranceSchema />
    <ServicePageLayout content={warehouseInsuranceContent} />
  </>
);

export default WarehouseInsurance;
