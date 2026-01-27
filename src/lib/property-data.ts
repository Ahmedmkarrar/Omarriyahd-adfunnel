export const propertyData = {
  // Basic Info
  address: "9805 Steelhead Rd",
  city: "Paso Robles",
  state: "CA",
  zip: "93446",
  fullAddress: "9805 Steelhead Rd, Paso Robles, CA 93446",
  price: 1195000,
  priceFormatted: "$1,195,000",

  // Property Details
  beds: 4,
  baths: 3.5,
  sqft: 2856,
  lotSize: "1.02 acres",
  lotSqft: 44431,
  yearBuilt: 2004,
  propertyType: "Single Family Residence",
  garage: 3,
  garageType: "Attached",
  stories: 2,
  fireplace: true,
  fireplaceCount: 2,

  // Features
  headline: "A Private 1-Acre Mediterranean Estate Near Lake Nacimiento",
  tagline:
    "Luxury Living - Panoramic Views - Entertainer's Kitchen - ADU Potential",

  description: `Discover your private Mediterranean retreat in the prestigious Heritage Ranch community. This stunning 4-bedroom, 3.5-bathroom estate spans nearly 2,900 square feet on over an acre of beautifully landscaped grounds, offering the perfect blend of luxury living and natural serenity.

The moment you arrive, you're greeted by authentic Mediterranean architecture featuring terracotta roof tiles, stucco walls, and elegant archways that transport you to the Italian countryside. Step inside to discover soaring ceilings, rich hardwood floors, and an abundance of natural light pouring through oversized windows.

The heart of this home is the chef's dream kitchen, complete with professional-grade appliances, granite countertops, a massive center island, and custom cabinetry. The open floor plan flows seamlessly into the great room, where a statement fireplace creates the perfect backdrop for entertaining or quiet evenings at home.

The primary suite is a true sanctuary, featuring a spa-like bathroom with dual vanities, a soaking tub, and a walk-in shower. A private balcony offers morning coffee views of the surrounding hills and distant lake glimpses.

Outside, the property truly shines. The expansive grounds include mature landscaping, a covered patio perfect for al fresco dining, and space for a pool, gardens, or additional structures. The detached garage offers potential for an ADU conversion—ideal for guests, rental income, or a home office.

Located just minutes from Lake Nacimiento and the world-famous Paso Robles wine country, this property offers the best of both worlds: peaceful country living with easy access to dining, shopping, and recreation.`,

  highlights: [
    {
      icon: "home",
      title: "Mediterranean Elegance",
      description: "Authentic architecture with modern luxury finishes throughout",
    },
    {
      icon: "mountain",
      title: "Breathtaking Views",
      description: "Panoramic lake and hill country vistas from multiple rooms",
    },
    {
      icon: "chef-hat",
      title: "Entertainer's Kitchen",
      description: "Chef-grade appliances, granite counters, and expansive island",
    },
    {
      icon: "building",
      title: "ADU Potential",
      description: "Detached garage conversion opportunity for guests or income",
    },
  ],

  keyFeatures: [
    "Mediterranean-style architecture",
    "Lake Nacimiento proximity",
    "Panoramic hill and valley views",
    "Gourmet entertainer's kitchen",
    "ADU/guest house potential",
    "Spacious 1+ acre lot",
    "Premium finishes throughout",
    "Private and serene setting",
    "3-car attached garage",
    "Two fireplaces",
    "Soaring ceilings",
    "Hardwood floors",
    "Primary suite balcony",
    "Spa-like master bath",
    "Covered outdoor patio",
    "Mature landscaping",
  ],

  stats: [
    { label: "Square Feet", value: "2,856", icon: "square" },
    { label: "Bedrooms", value: "4", icon: "bed" },
    { label: "Bathrooms", value: "3.5", icon: "bath" },
    { label: "Lot Size", value: "1.02 ac", icon: "trees" },
    { label: "Year Built", value: "2004", icon: "calendar" },
    { label: "Garage", value: "3-Car", icon: "car" },
    { label: "Fireplaces", value: "2", icon: "flame" },
    { label: "Stories", value: "2", icon: "layers" },
  ],

  lifestyle: [
    {
      icon: "wine",
      title: "Wine Country",
      description: "Minutes from world-class wineries and tasting rooms",
    },
    {
      icon: "waves",
      title: "Lake Recreation",
      description: "Close to Lake Nacimiento for boating and water sports",
    },
    {
      icon: "store",
      title: "Small-Town Charm",
      description: "Vibrant downtown with dining, shops, and community",
    },
  ],

  // Map coordinates
  coordinates: {
    lat: 35.6089,
    lng: -120.8656,
  },

  // Agent Info
  agent: {
    name: "Omar Riyad",
    title: "Luxury Real Estate Advisor",
    brokerage: "Revel Real Estate",
    license: "DRE #02052562",
    phone: "805.268.3615",
    email: "omar@revelrealestate.com",
    photo: "/agent-photo.jpg",
    bio: "With over a decade of experience in luxury California real estate, Omar specializes in Paso Robles and Central Coast properties. His white-glove service and market expertise ensure a seamless buying experience for discerning clients.",
  },

  // Photo gallery - all property photos
  photos: [
    { id: 1, src: "/photos/1.jpg", alt: "Mediterranean estate front exterior", category: "Exterior" },
    { id: 2, src: "/photos/2.jpg", alt: "Estate entrance and landscaping", category: "Exterior" },
    { id: 3, src: "/photos/3.jpg", alt: "Property exterior view", category: "Exterior" },
    { id: 4, src: "/photos/4.jpg", alt: "Spacious living room", category: "Interior" },
    { id: 5, src: "/photos/5.jpg", alt: "Living area with fireplace", category: "Interior" },
    { id: 6, src: "/photos/6.jpg", alt: "Gourmet chef's kitchen", category: "Kitchen" },
    { id: 7, src: "/photos/7.jpg", alt: "Kitchen island and breakfast bar", category: "Kitchen" },
    { id: 8, src: "/photos/8.jpg", alt: "Primary bedroom suite", category: "Interior" },
    { id: 9, src: "/photos/9.jpg", alt: "Primary bathroom", category: "Interior" },
    { id: 10, src: "/photos/10.jpg", alt: "Outdoor patio area", category: "Outdoor" },
    { id: 11, src: "/photos/11.jpg", alt: "Backyard and grounds", category: "Outdoor" },
    { id: 12, src: "/photos/12.jpg", alt: "Additional living space", category: "Interior" },
    { id: 13, src: "/photos/13.jpg", alt: "Bedroom", category: "Interior" },
    { id: 14, src: "/photos/14.jpg", alt: "Bathroom", category: "Interior" },
    { id: 15, src: "/photos/15.jpg", alt: "Dining area", category: "Interior" },
    { id: 16, src: "/photos/16.jpg", alt: "Home office or den", category: "Interior" },
    { id: 17, src: "/photos/17.jpg", alt: "Guest bedroom", category: "Interior" },
    { id: 18, src: "/photos/18.jpg", alt: "Laundry or utility room", category: "Interior" },
    { id: 19, src: "/photos/19.jpg", alt: "Garage", category: "Exterior" },
    { id: 20, src: "/photos/20.jpg", alt: "Panoramic views", category: "Views" },
    { id: 21, src: "/photos/21.jpg", alt: "Property grounds", category: "Outdoor" },
    { id: 22, src: "/photos/22.jpg", alt: "Landscape details", category: "Outdoor" },
    { id: 23, src: "/photos/23.jpg", alt: "Additional exterior view", category: "Exterior" },
    { id: 24, src: "/photos/25.jpg", alt: "Aerial view of property", category: "Views" },
  ],

  // Dossier contents (what they get access to)
  dossierContents: [
    "High-resolution property photos (40+)",
    "Detailed floor plans",
    "Property disclosures",
    "Pricing strategy & market analysis",
    "Neighborhood insights & comparables",
    "Direct contact to listing agent",
  ],

  // MLS/Listing info
  mlsNumber: "NS25012345",
  listingDate: "2025-01-15",
  daysOnMarket: 11,
};

export type PropertyData = typeof propertyData;
