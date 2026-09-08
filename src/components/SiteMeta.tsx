import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";

const defaultDescription =
  "Mapett Travel & Logistics provides comprehensive logistics solutions across Kenya and East Africa. Air freight, ocean freight, customs clearance, warehousing, and more.";
const defaultKeywords =
  "logistics Kenya, freight services, air freight, ocean freight, customs clearance, warehousing Kenya";

type MetaContent = {
  title: string;
  description: string;
  keywords: string;
};

const pageMeta: Record<string, MetaContent> = {
  "/": {
    title: "Mapett Travel & Logistics - Kenya Freight Services",
    description: defaultDescription,
    keywords: defaultKeywords,
  },
  "/about": {
    title: "About Mapett Travel & Logistics - Kenya",
    description: "Learn about Mapett Travel & Logistics, your trusted partner for freight, travel, insurance, and supply chain solutions across Kenya and East Africa.",
    keywords: "about Mapett Logistics, logistics company Kenya, freight company Mombasa, travel services Kenya",
  },
  "/products-services": {
    title: "Products & Services - Mapett Travel & Logistics",
    description: "Explore Mapett's logistics, insurance, travel, automotive, and e-commerce products and services across Kenya and East Africa.",
    keywords: "Mapett products, logistics services Kenya, insurance Kenya, travel services, automotive products",
  },
  "/air-freight": {
    title: "Air Freight Services in Kenya - Mapett Logistics",
    description: "Fast, reliable air freight and cargo delivery from Kenya to destinations worldwide with tracking and door-to-door support.",
    keywords: "air freight Kenya, air cargo Mombasa, international air shipping, cargo delivery Kenya",
  },
  "/customs-clearance": {
    title: "Customs Clearing & Forwarding in Kenya - Mapett Logistics",
    description: "Expert customs clearance and forwarding services at Mombasa Port, JKIA, and Kenya's border points.",
    keywords: "customs clearance Kenya, customs agent Mombasa, freight forwarding Kenya, port clearance",
  },
  "/ocean-freight": {
    title: "Ocean Freight Services in Kenya - Mapett Logistics",
    description: "Cost-effective FCL and LCL ocean freight connecting Mombasa to major ports worldwide.",
    keywords: "ocean freight Kenya, sea freight Mombasa, FCL LCL shipping, container shipping Kenya",
  },
  "/road-rail-transport": {
    title: "Road & Rail Transport in East Africa - Mapett Logistics",
    description: "Reliable road and rail transport across Kenya, Uganda, Tanzania, and East Africa with shipment visibility.",
    keywords: "road transport Kenya, rail freight East Africa, cargo transport Mombasa, logistics East Africa",
  },
  "/refrigerated-cargo": {
    title: "Refrigerated Cargo & Cold Chain Kenya - Mapett Logistics",
    description: "Temperature-controlled refrigerated cargo transport for perishables and sensitive goods across East Africa.",
    keywords: "refrigerated cargo Kenya, cold chain logistics, temperature controlled transport, perishables shipping",
  },
  "/special-cargo": {
    title: "Special Cargo & Project Logistics - Mapett Logistics",
    description: "Specialized handling and transport for oversized, heavy-lift, and project cargo in Kenya and East Africa.",
    keywords: "special cargo Kenya, project cargo logistics, heavy lift transport, oversized cargo shipping",
  },
  "/warehousing": {
    title: "Warehousing & Distribution in Kenya - Mapett Logistics",
    description: "Secure warehousing, inventory management, pick and pack, and distribution solutions across Kenya.",
    keywords: "warehousing Kenya, storage Mombasa, inventory management, distribution Kenya",
  },
  "/insurance": {
    title: "Cargo & Logistics Insurance in Kenya - Mapett",
    description: "Protect your cargo and business with comprehensive marine, air, inland transit, and warehouse insurance in Kenya.",
    keywords: "cargo insurance Kenya, marine insurance Mombasa, transit insurance, logistics insurance",
  },
  "/marine-cargo-insurance": {
    title: "Marine Cargo Insurance in Kenya - Mapett",
    description: "Comprehensive marine cargo insurance for goods transported by sea, with protection from warehouse to warehouse.",
    keywords: "marine cargo insurance Kenya, shipping insurance Mombasa, goods in transit insurance",
  },
  "/air-cargo-insurance": {
    title: "Air Cargo Insurance in Kenya - Mapett",
    description: "Protect goods transported by air against loss, damage, delays, and handling risks with Mapett insurance.",
    keywords: "air cargo insurance Kenya, air freight insurance, cargo protection Kenya",
  },
  "/inland-transit-insurance": {
    title: "Inland Transit Insurance in Kenya - Mapett",
    description: "Inland transit insurance for goods moved by road and rail across Kenya and East Africa.",
    keywords: "inland transit insurance Kenya, road cargo insurance, rail cargo insurance",
  },
  "/freight-forwarder-liability": {
    title: "Freight Forwarder Liability Insurance - Mapett",
    description: "Professional liability protection for freight forwarders against cargo, customs, and service claims.",
    keywords: "freight forwarder liability Kenya, freight insurance, logistics liability cover",
  },
  "/wiba-employees-coverage": {
    title: "WIBA & Employees Coverage in Kenya - Mapett",
    description: "Work injury benefits and employee protection solutions for businesses operating in Kenya.",
    keywords: "WIBA Kenya, work injury benefits, employee insurance Kenya, business insurance",
  },
  "/life-insurance": {
    title: "Life Insurance in Kenya - Mapett",
    description: "Life insurance solutions designed to protect you, your family, and your financial future in Kenya.",
    keywords: "life insurance Kenya, family insurance, personal insurance Kenya",
  },
  "/warehouse-insurance": {
    title: "Warehouse Insurance in Kenya - Mapett",
    description: "Protect your warehouse, stock, and inventory against key operational risks with Mapett insurance.",
    keywords: "warehouse insurance Kenya, inventory insurance, business property insurance",
  },
  "/airport-transfers": {
    title: "Airport Transfers in Kenya - Mapett Travel",
    description: "Reliable airport transfers and ground transportation in Kenya for business and leisure travelers.",
    keywords: "airport transfers Kenya, Mombasa airport transfer, Nairobi airport transport",
  },
  "/flight-booking": {
    title: "Flight Booking Services - Mapett Travel",
    description: "Book domestic and international flights with Mapett Travel and get support for your complete journey.",
    keywords: "flight booking Kenya, airline tickets Mombasa, international flights Kenya",
  },
  "/visa-processing": {
    title: "Visa Processing Services - Mapett Travel",
    description: "Get reliable assistance with visa applications and travel documentation from Mapett Travel.",
    keywords: "visa processing Kenya, visa application assistance, travel documentation",
  },
  "/hotel-booking": {
    title: "Hotel Booking Services - Mapett Travel",
    description: "Find and book comfortable accommodation for business and leisure travel with Mapett Travel.",
    keywords: "hotel booking Kenya, accommodation booking, travel services Mombasa",
  },
  "/travel-insurance": {
    title: "Travel Insurance Services - Mapett Travel",
    description: "Travel protection for medical emergencies, cancellations, baggage, and unexpected journey risks.",
    keywords: "travel insurance Kenya, holiday insurance, international travel cover",
  },
  "/travel-essentials": {
    title: "Travel Essentials - Mapett Travel",
    description: "Shop useful travel essentials and accessories for smoother journeys with Mapett Travel.",
    keywords: "travel essentials Kenya, travel accessories, travel products",
  },
  "/tours-safaris": {
    title: "Tours & Safaris in Kenya - Mapett Travel",
    description: "Plan memorable Kenya tours, safaris, and travel experiences with Mapett Travel.",
    keywords: "Kenya safaris, tours Kenya, Mombasa tours, safari booking",
  },
  "/track": {
    title: "Track Your Shipment - Mapett Logistics",
    description: "Track your Mapett Logistics cargo and shipment status online.",
    keywords: "track shipment Kenya, cargo tracking, Mapett shipment tracking",
  },
  "/team": {
    title: "Our Team - Mapett Travel & Logistics",
    description: "Meet the Mapett Travel & Logistics team supporting customers across Kenya and East Africa.",
    keywords: "Mapett Logistics team, logistics experts Kenya, travel team",
  },
  "/contact": {
    title: "Contact Mapett Travel & Logistics",
    description: "Contact Mapett Travel & Logistics for freight, insurance, travel, warehousing, and supply chain support.",
    keywords: "contact Mapett Logistics, logistics enquiry Kenya, freight quote Mombasa",
  },
  "/privacy-policy": {
    title: "Privacy Policy - Mapett Travel & Logistics",
    description: "Mapett Travel & Logistics respects your privacy. Learn how we collect, use, and protect your personal data.",
    keywords: "privacy policy Kenya, data protection, personal information",
  },
  "/cookie-policy": {
    title: "Cookie Policy - Mapett Travel & Logistics",
    description: "Learn how Mapett Travel & Logistics uses cookies and similar technologies on our website.",
    keywords: "cookie policy, cookies, website tracking",
  },
  "/shipping-returns-policy": {
    title: "Shipping & Returns Policy - Mapett Travel & Logistics",
    description: "Mapett Travel & Logistics shipping and returns policy for our products and services.",
    keywords: "shipping policy, returns policy, delivery terms",
  },
  "/terms-conditions": {
    title: "Terms & Conditions - Mapett Travel & Logistics",
    description: "Legal terms and conditions for using Mapett Travel & Logistics services and website.",
    keywords: "terms and conditions, legal terms, service agreement",
  },
  "/intermodal-solutions": {
    title: "Intermodal Solutions in Kenya - Mapett Logistics",
    description: "Integrated multi-modal transport solutions combining sea, rail, and road freight for efficient cargo delivery across East Africa and global markets.",
    keywords: "intermodal transport Kenya, multi-modal logistics, rail and road transport, sea transport Kenya",
  },
};

// Generate structured data based on page type
const generateStructuredData = (meta: MetaContent, pathname: string) => {
  const baseOrganizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mapett Travel & Logistics",
    "url": "https://www.mapettlogistics.com",
    "logo": "https://www.mapettlogistics.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/mapetttravelandlogistics/",
      "https://www.instagram.com/mapetttravelandlogistics/",
      "https://www.youtube.com/@MapetttravelandLogistics",
      "https://www.linkedin.com/in/mapett-travel-and-logistics-ltd-906116429/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254 799 390 133",
      "email": "sales@mapettlogistics.com",
      "contactType": "Customer Service",
      "areaServed": "KE",
      "availableLanguage": "en"
    }
  };

  // Local Business structured data (enhanced)
  const localBusinessData = {
    ...baseOrganizationData,
    "@type": "LocalBusiness",
    "image": "https://www.mapettlogistics.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shree Plaza, Ground Floor, Nyali",
      "addressLocality": "Mombasa",
      "postalCode": "2039-80100",
      "addressRegion": "Coast",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -4.05156209592218,
      "longitude": 39.68501027497541
    },
    "telephone": "+254 799 390 133",
    "email": "sales@mapettlogistics.com",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "areaServed": ["Kenya", "East Africa"]
  };

  // Service-specific structured data
  const servicePaths = [
    "/air-freight",
    "/customs-clearance",
    "/ocean-freight",
    "/road-rail-transport",
    "/refrigerated-cargo",
    "/special-cargo",
    "/warehousing",
    "/insurance",
    "/intermodal-solutions"
  ];

  if (servicePaths.some(path => pathname === path)) {
    return {
      ...localBusinessData,
      "makesOffer": {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": meta.title.split(" - ")[0],
          "description": meta.description
        }
      }
    };
  }

  // Article structured data for blog posts
  if (pathname.startsWith("/blog/")) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": meta.title,
      "description": meta.description,
      "author": {
        "@type": "Organization",
        "name": "Mapett Travel & Logistics"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Mapett Travel & Logistics",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.mapettlogistics.com/logo.png"
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString()
    };
  }

  // Default to LocalBusiness for all other pages
  return localBusinessData;
};

const SiteMeta = () => {
  const { pathname } = useLocation();
  
  // Wrap meta calculation in useMemo to prevent unnecessary recalculations
  const meta = useMemo(() => {
    return pageMeta[pathname] || (pathname.startsWith("/blog/")
      ? {
          title: "Mapett Logistics Blog & News",
          description: "Logistics, travel, insurance, and business insights from Mapett Travel & Logistics.",
          keywords: "Mapett Logistics blog, logistics news Kenya, freight insights",
        }
      : {
          title: "Mapett Travel & Logistics",
          description: defaultDescription,
          keywords: defaultKeywords,
      });
  }, [pathname]);

  // Add structured data script
  useEffect(() => {
    // Remove any existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(generateStructuredData(meta, pathname));
    document.head.appendChild(script);
    
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [pathname, meta]);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      {/* Open Graph */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://www.mapettlogistics.com${pathname}`} />
      <meta property="og:image" content="https://www.mapettlogistics.com/og-image.jpg" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content="https://www.mapettlogistics.com/og-image.jpg" />
      {/* Canonical */}
      <link rel="canonical" href={`https://www.mapettlogistics.com${pathname}`} />
    </Helmet>
  );
};

export default SiteMeta;