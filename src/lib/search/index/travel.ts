import type { SearchItem } from "../types";

interface TravelDefinition {
  id: string;
  title: string;
  description: string;
  path: string;
  keywords: string[];
}

const travelDefinitions: TravelDefinition[] = [
  {
    id: "travel:overview",
    title: "Travel Solutions",
    description: "Flights, hotels, visas, tours and travel cover planned end to end.",
    path: "/travel-solutions",
    keywords: ["travel", "mapett travel", "holiday", "trip planning", "travel agency", "book a trip", "business travel"],
  },
  {
    id: "travel:flights",
    title: "Air Tickets & Flight Booking",
    description: "Compare and book domestic and international flights with our travel team.",
    path: "/flight-booking",
    keywords: [
      "flight",
      "flights",
      "air ticket",
      "air tickets",
      "airline ticket",
      "plane ticket",
      "book a flight",
      "flight booking",
      "return ticket",
      "international flight",
      "domestic flight",
      "travel booking",
      "airtravel",
    ],
  },
  {
    id: "travel:visa",
    title: "Visa Processing",
    description: "Guidance on visa requirements, documents, appointments and applications.",
    path: "/visa-processing",
    keywords: [
      "visa",
      "visas",
      "visa application",
      "schengen",
      "uk visa",
      "us visa",
      "embassy appointment",
      "passport",
      "travel documents",
      "immigration",
      "evisa",
    ],
  },
  {
    id: "travel:hotels",
    title: "Hotel Booking",
    description: "Accommodation arranged to suit your destination, budget and itinerary.",
    path: "/hotel-booking",
    keywords: [
      "hotel",
      "hotels",
      "accommodation",
      "lodging",
      "guest house",
      "lodge",
      "booking stay",
      "resort",
      "airbnb",
      "where to stay",
    ],
  },
  {
    id: "travel:insurance",
    title: "Travel Insurance",
    description: "Travel cover for medical emergencies, baggage and trip disruption.",
    path: "/travel-insurance",
    keywords: [
      "travel insurance",
      "travel cover",
      "trip insurance",
      "medical cover abroad",
      "baggage cover",
      "travel policy",
    ],
  },
  {
    id: "travel:tours",
    title: "Tours & Safaris",
    description: "Custom tours and safari packages for individuals, families and groups.",
    path: "/tours-safaris",
    keywords: [
      "safari",
      "tours",
      "tour package",
      "maasai mara",
      "tsavo",
      "amboseli",
      "diani",
      "wildlife",
      "game drive",
      "excursion",
      "holiday package",
      "vacation",
    ],
  },
];

export const travelSearchItems: SearchItem[] = travelDefinitions.map((definition) => ({
  id: definition.id,
  title: definition.title,
  description: definition.description,
  categoryId: "travel",
  path: definition.path,
  keywords: definition.keywords,
}));
