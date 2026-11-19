import type { SearchItem } from "../types";

interface PageDefinition {
  id: string;
  title: string;
  description: string;
  path: string;
  keywords: string[];
}

const pageDefinitions: PageDefinition[] = [
  {
    id: "page:home",
    title: "Home",
    description: "Mapett Logistics & Travel — freight, customs, warehousing, insurance and travel services.",
    path: "/",
    keywords: ["home", "homepage", "mapett", "mapett logistics", "main page", "start"],
  },
  {
    id: "page:about",
    title: "About Us",
    description: "Who we are, our milestones and the values behind Mapett Logistics & Travel.",
    path: "/about",
    keywords: ["about", "company", "who we are", "our story", "mission", "vision", "values", "milestones", "profile", "since 2020"],
  },
  {
    id: "page:team",
    title: "Our Team",
    description: "Meet the people behind Mapett Logistics & Travel.",
    path: "/team",
    keywords: ["team", "staff", "management", "leadership", "directors", "contact person"],
  },
  {
    id: "page:products-services",
    title: "Products & Services",
    description: "The complete list of logistics, insurance, travel and shop offerings.",
    path: "/products-services",
    keywords: ["products and services", "all services", "what we do", "solutions", "overview"],
  },
  {
    id: "page:track",
    title: "Track Shipment",
    description: "Follow your cargo and shipments in real time.",
    path: "/track",
    keywords: ["track", "tracking", "track shipment", "track cargo", "shipment status", "container tracking", "where is my cargo", "consignment", "tracking number", "bill of lading"],
  },
  {
    id: "page:cart",
    title: "Shopping Cart",
    description: "Review the items you have added before checking out.",
    path: "/cart",
    keywords: ["cart", "basket", "checkout", "my order", "buy", "purchase"],
  },
  {
    id: "page:blog",
    title: "Blog & Insights",
    description: "Logistics, customs and travel articles from the Mapett team.",
    path: "/blog",
    keywords: ["blog", "news", "articles", "insights", "guides", "updates", "resources"],
  },
  {
    id: "page:login",
    title: "Log In",
    description: "Sign in to your Mapett account.",
    path: "/login",
    keywords: ["login", "log in", "sign in", "account", "my account"],
  },
  {
    id: "page:signup",
    title: "Create an Account",
    description: "Register for a Mapett Logistics & Travel account.",
    path: "/signup",
    keywords: ["signup", "sign up", "register", "create account", "new account", "join"],
  },
  {
    id: "page:privacy-policy",
    title: "Privacy Policy",
    description: "How we collect, use and protect your personal data.",
    path: "/privacy-policy",
    keywords: ["privacy", "privacy policy", "data protection", "gdpr", "personal data", "legal"],
  },
  {
    id: "page:cookie-policy",
    title: "Cookie Policy",
    description: "How cookies are used on this website.",
    path: "/cookie-policy",
    keywords: ["cookies", "cookie policy", "tracking cookies", "consent", "legal"],
  },
  {
    id: "page:shipping-returns",
    title: "Shipping & Returns Policy",
    description: "Delivery timelines, delivery charges and how to return an order.",
    path: "/shipping-returns-policy",
    keywords: ["shipping policy", "returns", "refund", "exchange", "delivery policy", "free delivery", "delivery charges", "return an order", "warranty"],
  },
  {
    id: "page:terms",
    title: "Terms & Conditions",
    description: "The terms governing the use of our website and services.",
    path: "/terms-conditions",
    keywords: ["terms", "conditions", "terms and conditions", "legal", "agreement", "contract"],
  },
];

/** Sections of the home page that are deep linked with a hash. */
const sectionDefinitions: PageDefinition[] = [
  {
    id: "section:services",
    title: "Our Services (Home Section)",
    description: "The services grid on the home page.",
    path: "/#services",
    keywords: ["services section", "home services", "logistics solutions"],
  },
  {
    id: "section:autoshop",
    title: "Autostore & Lubricants (Home Section)",
    description: "The Autostore product categories and product sliders on the home page.",
    path: "/#autoshop",
    keywords: ["autoshop", "autostore section", "shop section", "lubricants section"],
  },
  {
    id: "section:blog",
    title: "Latest News (Home Section)",
    description: "The latest blog articles shown on the home page.",
    path: "/#blog",
    keywords: ["latest news", "insights section", "home blog"],
  },
  {
    id: "section:about",
    title: "About (Home Section)",
    description: "The company summary and milestones on the home page.",
    path: "/#about",
    keywords: ["about section", "home about", "company summary"],
  },
  {
    id: "section:contact",
    title: "Contact (Home Section)",
    description: "The contact form, phone, email and location details on the home page.",
    path: "/#contact",
    keywords: ["contact section", "send message", "enquiry", "inquiry", "talk to us"],
  },
];

const toItem = (definition: PageDefinition, categoryId: SearchItem["categoryId"]): SearchItem => ({
  id: definition.id,
  title: definition.title,
  description: definition.description,
  categoryId,
  path: definition.path,
  keywords: definition.keywords,
});

export const pageSearchItems: SearchItem[] = [
  ...pageDefinitions.map((definition) => toItem(definition, "pages")),
  ...sectionDefinitions.map((definition) => toItem(definition, "pages")),
];
