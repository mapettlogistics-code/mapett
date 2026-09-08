// src/components/SEO.tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  structuredData?: object;
}

const SEO = ({ title, description, structuredData }: SEOProps) => (
  <Helmet>
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
    {structuredData && (
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    )}
  </Helmet>
);

export default SEO;