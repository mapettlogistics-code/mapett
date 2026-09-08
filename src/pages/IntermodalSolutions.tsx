import ServicePageLayout from "@/components/ServicePageLayout";
import { intermodalSolutionsContent } from "@/data/servicePages";

import { Helmet } from 'react-helmet-async';

const IntermodalSolutionsSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Intermodal Solutions Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mapett Travel & Logistics"
        },
        "areaServed": ["Kenya", "East Africa"],
        "description": "Efficient intermodal solutions integrating multiple modes of transportation to optimize the movement of goods."
      })}
    </script>
  </Helmet>
);
const IntermodalSolutions = () => (
  <>
    <IntermodalSolutionsSchema />
    <ServicePageLayout content={intermodalSolutionsContent} />
  </>
);

export default IntermodalSolutions;