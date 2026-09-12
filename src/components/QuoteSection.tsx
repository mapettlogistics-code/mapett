import { useState } from "react";
import { ArrowRight, MapPin, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type CategoryType = "services" | "insurance" | "travel";

const phoneToCountryCode: Record<string, string> = {
  "+1": "US", "+7": "RU", "+20": "EG", "+27": "ZA", "+30": "GR", "+31": "NL", "+32": "BE", "+33": "FR", "+34": "ES", "+39": "IT", "+41": "CH", "+43": "AT", "+44": "GB", "+48": "PL", "+49": "DE", "+52": "MX", "+55": "BR", "+60": "MY", "+61": "AU", "+62": "ID", "+63": "PH", "+64": "NZ", "+65": "SG", "+66": "TH", "+81": "JP", "+82": "KR", "+84": "VN", "+86": "CN", "+90": "TR", "+91": "IN", "+92": "PK", "+93": "AF", "+94": "LK", "+95": "MM", "+98": "IR", "+211": "SS", "+212": "MA", "+213": "DZ", "+216": "TN", "+218": "LY", "+220": "GM", "+221": "SN", "+223": "ML", "+224": "GN", "+225": "CI", "+226": "BF", "+227": "NE", "+228": "TG", "+229": "BJ", "+230": "MU", "+231": "LR", "+232": "SL", "+233": "GH", "+234": "NG", "+235": "TD", "+236": "CF", "+237": "CM", "+238": "CV", "+239": "ST", "+240": "GQ", "+241": "GA", "+242": "CG", "+244": "AO", "+245": "GW", "+248": "SC", "+249": "SD", "+250": "RW", "+251": "ET", "+252": "SO", "+253": "DJ", "+254": "KE", "+255": "TZ", "+256": "UG", "+257": "BI", "+258": "MZ", "+260": "ZM", "+261": "MG", "+262": "RE", "+263": "ZW", "+264": "NA", "+265": "MW", "+266": "LS", "+267": "BW", "+268": "SZ", "+269": "KM", "+290": "SH", "+291": "ER", "+297": "AW", "+298": "FO", "+299": "GL", "+351": "PT", "+352": "LU", "+353": "IE", "+354": "IS", "+356": "MT", "+371": "LV", "+372": "EE", "+380": "UA", "+420": "CZ", "+963": "SY", "+966": "SA", "+971": "AE", "+972": "IL", "+974": "QA", "+977": "NP", "+998": "UZ",
};

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const departureLocations = [
  "Nairobi, Kenya",
  "Mombasa, Kenya",
  "Kisumu, Kenya",
  "Nakuru, Kenya",
  "Eldoret, Kenya",
  "Malindi, Kenya",
  "Diani, Kenya",
  "Kampala, Uganda",
  "Entebbe, Uganda",
  "Jinja, Uganda",
  "Dar es Salaam, Tanzania",
  "Arusha, Tanzania",
  "Zanzibar, Tanzania",
  "Mwanza, Tanzania",
  "Dodoma, Tanzania",
  "Kigali, Rwanda",
  "Bujumbura, Burundi",
  "Addis Ababa, Ethiopia",
  "Johannesburg, South Africa",
  "Cape Town, South Africa",
  "London, United Kingdom",
  "Paris, France",
  "Amsterdam, Netherlands",
  "Brussels, Belgium",
  "Frankfurt, Germany",
  "Berlin, Germany",
  "Munich, Germany",
  "Rome, Italy",
  "Milan, Italy",
  "Madrid, Spain",
  "Barcelona, Spain",
  "Lisbon, Portugal",
  "Zurich, Switzerland",
  "Vienna, Austria",
  "Athens, Greece",
  "Istanbul, Turkey",
  "Dublin, Ireland",
  "Copenhagen, Denmark",
  "Stockholm, Sweden",
  "Oslo, Norway",
  "Helsinki, Finland",
  "Warsaw, Poland",
  "Prague, Czech Republic",
  "Budapest, Hungary",
  "Bucharest, Romania",
  "Dubai, United Arab Emirates",
  "Abu Dhabi, United Arab Emirates",
  "Doha, Qatar",
  "Riyadh, Saudi Arabia",
  "Jeddah, Saudi Arabia",
  "Muscat, Oman",
  "Kuwait City, Kuwait",
  "Manama, Bahrain",
  "Amman, Jordan",
  "Beirut, Lebanon",
  "Tel Aviv, Israel",
  "Mumbai, India",
  "Delhi, India",
  "Bangalore, India",
  "Chennai, India",
  "Hyderabad, India",
  "Kolkata, India",
  "Singapore, Singapore",
  "Kuala Lumpur, Malaysia",
  "Bangkok, Thailand",
  "Phuket, Thailand",
  "Jakarta, Indonesia",
  "Bali, Indonesia",
  "Manila, Philippines",
  "Hong Kong, Hong Kong",
  "Tokyo, Japan",
  "Osaka, Japan",
  "Seoul, South Korea",
  "Beijing, China",
  "Shanghai, China",
  "Guangzhou, China",
  "Shenzhen, China",
  "Taipei, Taiwan",
  "New York, United States",
  "Los Angeles, United States",
  "Chicago, United States",
  "Miami, United States",
  "Washington, United States",
  "Boston, United States",
  "Atlanta, United States",
  "Houston, United States",
  "Dallas, United States",
  "San Francisco, United States",
  "Toronto, Canada",
  "Vancouver, Canada",
  "Montreal, Canada",
  "Calgary, Canada",
  "Mexico City, Mexico",
  "Cancun, Mexico",
  "São Paulo, Brazil",
  "Rio de Janeiro, Brazil",
  "Buenos Aires, Argentina",
  "Santiago, Chile",
  "Lima, Peru",
  "Bogotá, Colombia",
  "Quito, Ecuador",
  "Caracas, Venezuela",
  "Montevideo, Uruguay",
  "Sydney, Australia",
  "Melbourne, Australia",
  "Brisbane, Australia",
  "Perth, Australia",
  "Adelaide, Australia",
  "Auckland, New Zealand",
  "Wellington, New Zealand",
  "Christchurch, New Zealand",
];

const destinationCountries = [
  "Kenya",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Burundi",
  "Ethiopia",
  "South Africa",
  "United Kingdom",
  "United Arab Emirates",
  "Qatar",
  "United States",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Netherlands",
  "Turkey",
  "India",
  "China",
  "Japan",
  "Australia",
  "Canada",
  "Brazil",
  "Egypt",

  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Cameroon",
  "Chad",
  "Ghana",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Sudan",
  "Sudan",
  "Togo",
  "Tunisia",
  "Zambia",
  "Zimbabwe",

  "Afghanistan",
  "Armenia",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Bhutan",
  "Brunei",
  "Cambodia",
  "Cyprus",
  "Georgia",
  "Indonesia",
  "Iran",
  "Iraq",
  "Israel",
  "Jordan",
  "Kazakhstan",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Lebanon",
  "Malaysia",
  "Maldives",
  "Mongolia",
  "Myanmar",
  "Nepal",
  "North Korea",
  "Oman",
  "Pakistan",
  "Palestine",
  "Philippines",
  "Saudi Arabia",
  "Singapore",
  "South Korea",
  "Sri Lanka",
  "Syria",
  "Tajikistan",
  "Thailand",
  "Timor-Leste",
  "Turkmenistan",
  "Uzbekistan",
  "Vietnam",
  "Yemen",

  "Albania",
  "Andorra",
  "Austria",
  "Belarus",
  "Belgium",
  "Bosnia and Herzegovina",
  "Bulgaria",
  "Croatia",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "Greece",
  "Hungary",
  "Iceland",
  "Ireland",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Moldova",
  "Monaco",
  "Montenegro",
  "North Macedonia",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "San Marino",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Sweden",
  "Switzerland",
  "Ukraine",
  "Vatican City",

  "Antigua and Barbuda",
  "Bahamas",
  "Barbados",
  "Belize",
  "Costa Rica",
  "Cuba",
  "Dominica",
  "Dominican Republic",
  "El Salvador",
  "Grenada",
  "Guatemala",
  "Haiti",
  "Honduras",
  "Jamaica",
  "Mexico",
  "Nicaragua",
  "Panama",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Trinidad and Tobago",

  "Argentina",
  "Bolivia",
  "Chile",
  "Colombia",
  "Ecuador",
  "Guyana",
  "Paraguay",
  "Peru",
  "Suriname",
  "Uruguay",
  "Venezuela",

  "Fiji",
  "Kiribati",
  "Marshall Islands",
  "Micronesia",
  "Nauru",
  "Palau",
  "Papua New Guinea",
  "Samoa",
  "Solomon Islands",
  "Tonga",
  "Tuvalu",
  "Vanuatu",
];

interface AutocompleteProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  icon?: React.ReactNode;
}

const AutocompleteField = ({
  label,
  placeholder,
  value,
  onChange,
  options,
  required = false,
  icon,
}: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
        onChange(filteredOptions[highlightedIndex]);
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className="relative">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative mt-1">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          className={`mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
            icon ? "pl-10 pr-10" : ""
          }`}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setHighlightedIndex(-1);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && value.trim() && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-lg border border-border bg-background shadow-card-hover"
          >
            {filteredOptions.map((option, index) => (
              <li key={option}>
                <button
                  type="button"
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(option);
                    setIsOpen(false);
                    setHighlightedIndex(-1);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                    index === highlightedIndex
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {icon && <span className="text-primary shrink-0">{icon}</span>}
                  <span>{option}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const QuoteSection = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("services");
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState<"select" | "quote">("select");

    const [travelDetails, setTravelDetails] = useState({
    dateOfDeparture: "",
    returnDate: "",
    departingFrom: "",
    destination: "",
    adults: "1",
    kids: "0",
    childrenAges: [] as string[],
});

  const [formData, setFormData] = useState({
    firstName: "", middleName: "", surname: "", countryCode: "+254", phone: "", email: "", service: "", details: "", subscribe: true
  });

  const { items: sectionItems } = useSiteContent("quote_section");

  const section = sectionItems[0];
  const badge = section?.subtitle || "Request a Quote";
  const heading = section?.title || "Get Instant Pricing for Your Shipment, Insurance & Travel Service";
  const description = section?.description || "Select from our Services, Insurance, or Travel Services categories and fill out the quick quote form. Our team will provide you with a competitive quote tailored to your needs within 24 hours.";

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleTravelDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTravelDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleChildAgeChange = (index: number, value: string) => {
  setTravelDetails(prev => {
    const newAges = [...prev.childrenAges];
    newAges[index] = value;
    return { ...prev, childrenAges: newAges };
  });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const kidsCount = parseInt(travelDetails.kids) || 0;
    const hasInvalidChildrenAges =
      kidsCount > 0 &&
      travelDetails.childrenAges.length < kidsCount ||
      travelDetails.childrenAges.slice(0, kidsCount).some((age) => !age);

    if (!formData.firstName || !formData.middleName || !formData.surname || !formData.countryCode || !formData.phone || !formData.email || !formData.service || !formData.details || hasInvalidChildrenAges) {
      toast.error(hasInvalidChildrenAges ? "Please select the age of each child." : "Please complete every field before requesting a quote.");
      return;
    }

    setLoading(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/send-inquiry-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
          body: JSON.stringify({
          type: "quote",
           category: activeCategory,
           name: [formData.firstName, formData.middleName, formData.surname].join(" "),
           email: formData.email,
           phone: `${formData.countryCode}${formData.phone}`,
           service: formData.service,
           message: formData.details,
           subscribe: formData.subscribe,
travelDetails: {
             ...travelDetails,
             childrenAges: travelDetails.childrenAges.join(","),
           },
         }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        const message = errorBody.includes("NOT_FOUND")
          ? "The email function is not deployed in Supabase yet. Please deploy send-inquiry-email first."
          : "Failed to send quote request";
        throw new Error(message);
      }

      toast.success("Quote request sent to sales@mapettlogistics.com!");
      setFormData({ firstName: "", middleName: "", surname: "", countryCode: "+254", phone: "", email: "", service: "", details: "", subscribe: true });
      setTravelDetails({ dateOfDeparture: "", returnDate: "", departingFrom: "", destination: "", adults: "1", kids: "0", childrenAges: [] });      
      setFormType("select");
    } catch (error) {
      console.error(error);
      const message = error instanceof Error && error.message
        ? error.message
        : "Failed to send. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const categories: { id: CategoryType; label: string }[] = [
    { id: "services", label: "Logistics Services" },
    { id: "insurance", label: "Insurance" },
    { id: "travel", label: "Travel Services" },
  ];

  const renderNameFields = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label className="text-sm font-medium text-foreground">First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleFormChange} placeholder="First name" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Middle Name</label>
        <input type="text" name="middleName" value={formData.middleName} onChange={handleFormChange} placeholder="Middle name" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Surname</label>
        <input type="text" name="surname" value={formData.surname} onChange={handleFormChange} placeholder="Surname" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required />
      </div>
    </div>
  );

  const renderPhoneField = () => {
    const countryCode = phoneToCountryCode[formData.countryCode] || "KE";
    return (
      <div>
        <label className="text-sm font-medium text-foreground">Phone Number</label>
        <div className="mt-1 flex h-12 items-center overflow-hidden rounded-lg border border-border bg-background">
          <img src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`} alt={countryCode} className="mx-3 h-4 w-[22px] rounded-sm object-cover" />
          <select name="countryCode" value={formData.countryCode} onChange={handleFormChange} required className="h-full w-36 shrink-0 border-0 border-l border-border bg-transparent px-2 text-sm focus:outline-none focus:ring-0">
            {Object.entries(phoneToCountryCode).map(([code, region]) => <option key={code} value={code}>{countryNames.of(region)} ({code})</option>)}
          </select>
          <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="700 000 000" required className="h-full min-w-0 flex-1 border-l border-border bg-transparent px-3 focus:outline-none" />
        </div>
      </div>
    );
  };

  const renderSubscribeCheckbox = () => (
    <label className="flex items-start gap-2 text-xs text-muted-foreground">
      <input type="checkbox" name="subscribe" checked={formData.subscribe} onChange={handleFormChange} className="mt-0.5" />
      Keep me updated with news, offers and promotions from Mapett Logistics.
    </label>
  );

     const renderTravelDetailsFields = () => {
    const service = formData.service;
    const hideDates = service === "Hotel Booking" || service === "Tours & Safari Packages";
    const hideDeparture = service === "Hotel Booking" || service === "Tours & Safari Packages";

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!hideDates && (
          <div>
            <label className="text-sm font-medium text-foreground">Date of Departure</label>
            <input
              type="date"
              name="dateOfDeparture"
              value={travelDetails.dateOfDeparture}
              onChange={handleTravelDetailChange}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>
        )}
        {!hideDates && (
          <div>
            <label className="text-sm font-medium text-foreground">Return Date</label>
            <input
              type="date"
              name="returnDate"
              value={travelDetails.returnDate}
              onChange={handleTravelDetailChange}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>
        )}
        {!hideDeparture && (
          <div className="w-full">
            <AutocompleteField
              label="Departing From"
              placeholder="Start typing a city or country..."
              value={travelDetails.departingFrom}
              onChange={(value) => setTravelDetails(prev => ({ ...prev, departingFrom: value }))}
              options={departureLocations}
              required
              icon={<MapPin className="h-4 w-4" />}
            />
          </div>
        )}
        <div className="w-full">
          <AutocompleteField
            label="Destination Country"
            placeholder="Start typing a country..."
            value={travelDetails.destination}
            onChange={(value) => setTravelDetails(prev => ({ ...prev, destination: value }))}
            options={destinationCountries}
            required
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Number of Adults</label>
          <input
            type="number"
            name="adults"
            value={travelDetails.adults}
            onChange={handleTravelDetailChange}
            min="1"
            className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Number of Kids</label>
          <input
            type="number"
            name="kids"
            value={travelDetails.kids}
            onChange={handleTravelDetailChange}
            min="0"
            className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
          {travelDetails.kids && parseInt(travelDetails.kids) > 0 && (
          <div className="md:col-span-2 space-y-3">
            <label className="text-sm font-medium text-foreground">Age of Children (1–18 years)</label>
            {Array.from({ length: parseInt(travelDetails.kids) }).map((_, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <label className="text-sm text-muted-foreground">Child {index + 1}</label>
                <select
                  value={travelDetails.childrenAges[index] || ""}
                  onChange={(e) => handleChildAgeChange(index, e.target.value)}
                  required
                  className="px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">Select age</option>
                  {Array.from({ length: 18 }).map((_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderServicesForm = () => (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {renderNameFields()}

      <div className="grid grid-cols-2 gap-4">
        {renderPhoneField()}
        <div>
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="your@email.com" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Service Type</label>
        <select name="service" value={formData.service} onChange={handleFormChange} required className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
          <option value="">Select a logistics service</option>
          <option>Air Freight</option>
          <option>Ocean Freight</option>
          <option>Road & Rail Transport</option>
          <option>Warehousing</option>
          <option>Customs Clearing & Forwarding</option>
          <option>Refrigerated Cargo</option>
          <option>Special Cargo</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Shipment Details</label>
        <textarea name="details" value={formData.details} onChange={handleFormChange} rows={2} placeholder="Describe cargo type, weight, dimensions, special handling requirements..." required className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
      </div>

      {renderSubscribeCheckbox()}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] transition-all duration-300 group"
      >
        <span className="flex items-center justify-center gap-2">
          {loading ? "Sending..." : "Get Logistics Quote"}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </Button>
    </form>
  );

  const renderInsuranceForm = () => (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {renderNameFields()}

      <div className="grid grid-cols-2 gap-4">
        {renderPhoneField()}
        <div>
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="your@email.com" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Insurance Type</label>
        <select name="service" value={formData.service} onChange={handleFormChange} required className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
          <option value="">Select an insurance type</option>
          <option>Marine Cargo Insurance</option>
          <option>Air Cargo Insurance</option>
          <option>Inland Transit Insurance</option>
          <option>Freight Forwarder Liability</option>
          <option>Warehouse Insurance</option>
          <option>Life Insurance</option>
          <option>WIBA & Employees Coverage</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Coverage Requirements</label>
        <textarea name="details" value={formData.details} onChange={handleFormChange} rows={2} placeholder="Coverage needs, special requirements, coverage period..." required className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
      </div>

      {renderSubscribeCheckbox()}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] transition-all duration-300 group"
      >
        <span className="flex items-center justify-center gap-2">
          {loading ? "Sending..." : "Get Insurance Quote"}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </Button>
    </form>
  );

  const renderTravelForm = () => (
    <div className="space-y-4">
      {/* Datalists for autocomplete */}
      <datalist id="departureLocations">
        <option value="Nairobi, Kenya" />
        <option value="Mombasa, Kenya" />
        <option value="Kisumu, Kenya" />
        <option value="Nakuru, Kenya" />
        <option value="Eldoret, Kenya" />
        <option value="Malindi, Kenya" />

        <option value="Kampala, Uganda" />
        <option value="Entebbe, Uganda" />
        <option value="Jinja, Uganda" />

        <option value="Dar es Salaam, Tanzania" />
        <option value="Arusha, Tanzania" />
        <option value="Zanzibar, Tanzania" />
        <option value="Mwanza, Tanzania" />
        <option value="Dodoma, Tanzania" />

        <option value="Kigali, Rwanda" />
        <option value="Bujumbura, Burundi" />
        <option value="Addis Ababa, Ethiopia" />
        <option value="Johannesburg, South Africa" />
        <option value="Cape Town, South Africa" />

        {/* Europe */}
        <option value="London, United Kingdom" />
        <option value="Paris, France" />
        <option value="Amsterdam, Netherlands" />
        <option value="Brussels, Belgium" />
        <option value="Frankfurt, Germany" />
        <option value="Berlin, Germany" />
        <option value="Munich, Germany" />
        <option value="Rome, Italy" />
        <option value="Milan, Italy" />
        <option value="Madrid, Spain" />
        <option value="Barcelona, Spain" />
        <option value="Lisbon, Portugal" />
        <option value="Zurich, Switzerland" />
        <option value="Vienna, Austria" />
        <option value="Athens, Greece" />
        <option value="Istanbul, Turkey" />
        <option value="Dublin, Ireland" />
        <option value="Copenhagen, Denmark" />
        <option value="Stockholm, Sweden" />
        <option value="Oslo, Norway" />
        <option value="Helsinki, Finland" />
        <option value="Warsaw, Poland" />
        <option value="Prague, Czech Republic" />
        <option value="Budapest, Hungary" />
        <option value="Bucharest, Romania" />

        {/* Middle East */}
        <option value="Dubai, United Arab Emirates" />
        <option value="Abu Dhabi, United Arab Emirates" />
        <option value="Doha, Qatar" />
        <option value="Riyadh, Saudi Arabia" />
        <option value="Jeddah, Saudi Arabia" />
        <option value="Muscat, Oman" />
        <option value="Kuwait City, Kuwait" />
        <option value="Manama, Bahrain" />
        <option value="Amman, Jordan" />
        <option value="Beirut, Lebanon" />
        <option value="Tel Aviv, Israel" />

        {/* Asia */}
        <option value="Mumbai, India" />
        <option value="Delhi, India" />
        <option value="Bangalore, India" />
        <option value="Chennai, India" />
        <option value="Hyderabad, India" />
        <option value="Kolkata, India" />
        <option value="Dubai, United Arab Emirates" />
        <option value="Singapore, Singapore" />
        <option value="Kuala Lumpur, Malaysia" />
        <option value="Bangkok, Thailand" />
        <option value="Phuket, Thailand" />
        <option value="Jakarta, Indonesia" />
        <option value="Bali, Indonesia" />
        <option value="Manila, Philippines" />
        <option value="Hong Kong, Hong Kong" />
        <option value="Tokyo, Japan" />
        <option value="Osaka, Japan" />
        <option value="Seoul, South Korea" />
        <option value="Beijing, China" />
        <option value="Shanghai, China" />
        <option value="Guangzhou, China" />
        <option value="Shenzhen, China" />
        <option value="Taipei, Taiwan" />

        {/* North America */}
        <option value="New York, United States" />
        <option value="Los Angeles, United States" />
        <option value="Chicago, United States" />
        <option value="Miami, United States" />
        <option value="Washington, United States" />
        <option value="Boston, United States" />
        <option value="Atlanta, United States" />
        <option value="Houston, United States" />
        <option value="Dallas, United States" />
        <option value="San Francisco, United States" />
        <option value="Toronto, Canada" />
        <option value="Vancouver, Canada" />
        <option value="Montreal, Canada" />
        <option value="Calgary, Canada" />
        <option value="Mexico City, Mexico" />
        <option value="Cancun, Mexico" />

        {/* South America */}
        <option value="São Paulo, Brazil" />
        <option value="Rio de Janeiro, Brazil" />
        <option value="Buenos Aires, Argentina" />
        <option value="Santiago, Chile" />
        <option value="Lima, Peru" />
        <option value="Bogotá, Colombia" />
        <option value="Quito, Ecuador" />
        <option value="Caracas, Venezuela" />
        <option value="Montevideo, Uruguay" />

        {/* Australia & Pacific */}
        <option value="Sydney, Australia" />
        <option value="Melbourne, Australia" />
        <option value="Brisbane, Australia" />
        <option value="Perth, Australia" />
        <option value="Adelaide, Australia" />
        <option value="Auckland, New Zealand" />
        <option value="Wellington, New Zealand" />
        <option value="Christchurch, New Zealand" />
      </datalist>

      <datalist id="destinationCountries">
        <option value="Kenya" />
        <option value="Uganda" />
        <option value="Tanzania" />
        <option value="Rwanda" />
        <option value="Burundi" />
        <option value="Ethiopia" />
        <option value="South Africa" />
        <option value="United Kingdom" />
        <option value="United Arab Emirates" />
        <option value="Qatar" />
        <option value="United States" />
        <option value="France" />
        <option value="Germany" />
        <option value="Italy" />
        <option value="Spain" />
        <option value="Netherlands" />
        <option value="Turkey" />
        <option value="India" />
        <option value="China" />
        <option value="Japan" />

        {/* Africa */}
        <option value="Algeria" />
        <option value="Angola" />
        <option value="Benin" />
        <option value="Botswana" />
        <option value="Burkina Faso" />
        <option value="Cabo Verde" />
        <option value="Cameroon" />
        <option value="Central African Republic" />
        <option value="Chad" />
        <option value="Comoros" />
        <option value="Democratic Republic of the Congo" />
        <option value="Djibouti" />
        <option value="Egypt" />
        <option value="Equatorial Guinea" />
        <option value="Eritrea" />
        <option value="Eswatini" />
        <option value="Gabon" />
        <option value="Gambia" />
        <option value="Ghana" />
        <option value="Guinea" />
        <option value="Guinea-Bissau" />
        <option value="Ivory Coast" />
        <option value="Lesotho" />
        <option value="Liberia" />
        <option value="Libya" />
        <option value="Madagascar" />
        <option value="Malawi" />
        <option value="Mali" />
        <option value="Mauritania" />
        <option value="Mauritius" />
        <option value="Morocco" />
        <option value="Mozambique" />
        <option value="Namibia" />
        <option value="Niger" />
        <option value="Nigeria" />
        <option value="Republic of the Congo" />
        <option value="São Tomé and Príncipe" />
        <option value="Senegal" />
        <option value="Seychelles" />
        <option value="Sierra Leone" />
        <option value="Somalia" />
        <option value="South Sudan" />
        <option value="Sudan" />
        <option value="Togo" />
        <option value="Tunisia" />
        <option value="Zambia" />
        <option value="Zimbabwe" />

        {/* Asia */}
        <option value="Afghanistan" />
        <option value="Armenia" />
        <option value="Azerbaijan" />
        <option value="Bahrain" />
        <option value="Bangladesh" />
        <option value="Bhutan" />
        <option value="Brunei" />
        <option value="Cambodia" />
        <option value="Cyprus" />
        <option value="Georgia" />
        <option value="Indonesia" />
        <option value="Iran" />
        <option value="Iraq" />
        <option value="Israel" />
        <option value="Jordan" />
        <option value="Kazakhstan" />
        <option value="Kuwait" />
        <option value="Kyrgyzstan" />
        <option value="Laos" />
        <option value="Lebanon" />
        <option value="Malaysia" />
        <option value="Maldives" />
        <option value="Mongolia" />
        <option value="Myanmar" />
        <option value="Nepal" />
        <option value="North Korea" />
        <option value="Oman" />
        <option value="Pakistan" />
        <option value="Palestine" />
        <option value="Philippines" />
        <option value="Saudi Arabia" />
        <option value="Singapore" />
        <option value="South Korea" />
        <option value="Sri Lanka" />
        <option value="Syria" />
        <option value="Tajikistan" />
        <option value="Thailand" />
        <option value="Timor-Leste" />
        <option value="Turkmenistan" />
        <option value="Uzbekistan" />
        <option value="Vietnam" />
        <option value="Yemen" />

        {/* Europe */}
        <option value="Albania" />
        <option value="Andorra" />
        <option value="Austria" />
        <option value="Belarus" />
        <option value="Belgium" />
        <option value="Bosnia and Herzegovina" />
        <option value="Bulgaria" />
        <option value="Croatia" />
        <option value="Czech Republic" />
        <option value="Denmark" />
        <option value="Estonia" />
        <option value="Finland" />
        <option value="Greece" />
        <option value="Hungary" />
        <option value="Iceland" />
        <option value="Ireland" />
        <option value="Latvia" />
        <option value="Liechtenstein" />
        <option value="Lithuania" />
        <option value="Luxembourg" />
        <option value="Malta" />
        <option value="Moldova" />
        <option value="Monaco" />
        <option value="Montenegro" />
        <option value="North Macedonia" />
        <option value="Norway" />
        <option value="Poland" />
        <option value="Portugal" />
        <option value="Romania" />
        <option value="Russia" />
        <option value="San Marino" />
        <option value="Serbia" />
        <option value="Slovakia" />
        <option value="Slovenia" />
        <option value="Sweden" />
        <option value="Switzerland" />
        <option value="Ukraine" />
        <option value="Vatican City" />

        {/* North America */}
        <option value="Antigua and Barbuda" />
        <option value="Bahamas" />
        <option value="Barbados" />
        <option value="Belize" />
        <option value="Canada" />
        <option value="Costa Rica" />
        <option value="Cuba" />
        <option value="Dominica" />
        <option value="Dominican Republic" />
        <option value="El Salvador" />
        <option value="Grenada" />
        <option value="Guatemala" />
        <option value="Haiti" />
        <option value="Honduras" />
        <option value="Jamaica" />
        <option value="Mexico" />
        <option value="Nicaragua" />
        <option value="Panama" />
        <option value="Saint Kitts and Nevis" />
        <option value="Saint Lucia" />
        <option value="Saint Vincent and the Grenadines" />
        <option value="Trinidad and Tobago" />

        {/* South America */}
        <option value="Argentina" />
        <option value="Bolivia" />
        <option value="Brazil" />
        <option value="Chile" />
        <option value="Colombia" />
        <option value="Ecuador" />
        <option value="Guyana" />
        <option value="Paraguay" />
        <option value="Peru" />
        <option value="Suriname" />
        <option value="Uruguay" />
        <option value="Venezuela" />

        {/* Oceania */}
        <option value="Australia" />
        <option value="Fiji" />
        <option value="Kiribati" />
        <option value="Marshall Islands" />
        <option value="Micronesia" />
        <option value="Nauru" />
        <option value="New Zealand" />
        <option value="Palau" />
        <option value="Papua New Guinea" />
        <option value="Samoa" />
        <option value="Solomon Islands" />
        <option value="Tonga" />
        <option value="Tuvalu" />
        <option value="Vanuatu" />
      </datalist>

      {/* 1️⃣ Service selector — always visible */}
      <div>
        <label className="text-sm font-medium text-foreground">Travel Service</label>
        <select
          name="service"
          value={formData.service}
          onChange={handleFormChange}
          required
          className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        >
          <option value="">Select a travel service</option>
          <option>Air Tickets</option>
          <option>Hotel Booking</option>
          <option>Visa Processing</option>
          <option>Tours & Safari Packages</option>
          <option>Travel Insurance</option>
        </select>
      </div>

      {/* 2️⃣ Book Now / Get Quote — appear only after service is chosen */}
      {formData.service && (
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://regal-tours.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-primary-foreground font-medium hover:opacity-90 transition-colors"
          >
            Book Now
            <ArrowRight className="h-4 w-4" />
          </a>
          <Button
            type="button"
            onClick={() => setFormType("quote")}
            className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            Get Quote
          </Button>
        </div>
      )}

      {/* 3️⃣ Quote form — shown only after Get Quote */}
      {formType === "quote" && (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {renderNameFields()}

          <div className="grid grid-cols-2 gap-4">
            {renderPhoneField()}
            <div>
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="your@email.com"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>
          </div>

          {renderTravelDetailsFields()}

          <div>
            <label className="text-sm font-medium text-foreground">Travel Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleFormChange}
              rows={2}
              placeholder="Additional preferences, special requests..."
              className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>

          {renderSubscribeCheckbox()}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] transition-all duration-300 group"
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? "Sending..." : "Submit Request"}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </form>
      )}
    </div>
  );

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              {badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
            <p className="text-muted-foreground text-lg mb-8">{description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-background rounded-2xl p-8 shadow-xl border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Quick Quote</h3>
                  <p className="text-muted-foreground text-sm">Get pricing in minutes</p>
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-3 mb-6 border-b border-border">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-3 font-medium text-sm transition-all border-b-2 ${
                      activeCategory === category.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Forms for each category */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                key={activeCategory}
              >
                {activeCategory === "services" && renderServicesForm()}
                {activeCategory === "insurance" && renderInsuranceForm()}
                {activeCategory === "travel" && renderTravelForm()}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;