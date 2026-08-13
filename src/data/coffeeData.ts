import { CoffeeBean, CoffeeMachine, GiftPackagingOption, GiftCardDesign, OrderStatus, ArchitecturalSpecs } from '../types';

export const SPECIALTY_BEANS: CoffeeBean[] = [
  {
    id: 'rd-red-dot-house',
    name: 'Red Dot House Blend',
    subtitle: 'Signature Kallang Roastery Flagship',
    origin: 'Colombia & Ethiopia Blend',
    region: 'Huila & Yirgacheffe Dual Origin',
    altitude: '1,800 - 2,100m',
    roastLevel: 'Medium',
    processingMethod: 'Washed',
    flavorNotes: ['Dark Chocolate', 'Bergamot', 'Toasted Almond', 'Cane Sugar Sweetness'],
    price250g: 18.50,
    price1kg: 58.00,
    price5kg: 240.00, // $48/kg
    price20kg: 38.00, // $38/kg wholesale bulk rate
    cuppingScore: 87.5,
    description: 'Engineered for Singapore’s dynamic coffee culture. Balanced as a clean black espresso and cuts smoothly through milk with rich cocoa notes.',
    recommendedBrew: ['Espresso Machine', 'Flat White', 'Pourover Drip', 'Aeropress'],
    flavorProfile: { acidity: 3, body: 4, sweetness: 5, bitterness: 2, aroma: 5 },
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isPopularB2B: true,
    isPopularB2C: true,
  },
  {
    id: 'rd-ethiopia-aricha',
    name: 'Ethiopia Yirgacheffe Aricha',
    subtitle: 'Single Origin Micro-Lot',
    origin: 'Ethiopia',
    region: 'Gedeo Zone, Yirgacheffe',
    altitude: '2,000 - 2,200m',
    roastLevel: 'Light',
    processingMethod: 'Natural',
    flavorNotes: ['Wild Jasmine', 'Ripe Blueberry', 'Peach Nectar', 'Meyer Lemon'],
    price250g: 22.00,
    price1kg: 72.00,
    price5kg: 310.00, // $62/kg
    price20kg: 48.00, // $48/kg wholesale
    cuppingScore: 89.2,
    description: 'An explosive floral and fruity natural process bean. Highly praised by specialty pourover enthusiasts and boutique cafes seeking single origin feature lots.',
    recommendedBrew: ['V60 Pourover', 'Chemex', 'Cold Brew', 'Iced Black'],
    flavorProfile: { acidity: 5, body: 2, sweetness: 5, bitterness: 1, aroma: 5 },
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isPopularB2B: false,
    isPopularB2C: true,
  },
  {
    id: 'rd-sumatra-gayo',
    name: 'Sumatra Lake Toba Gayo',
    subtitle: 'Direct Trade Earthy Elegance',
    origin: 'Indonesia',
    region: 'Aceh Highlands, Sumatra',
    altitude: '1,400 - 1,600m',
    roastLevel: 'Medium-Dark',
    processingMethod: 'Honey',
    flavorNotes: ['Pipe Tobacco', 'Cedar Wood', 'Dark Treacle', 'Spiced Plum'],
    price250g: 17.00,
    price1kg: 52.00,
    price5kg: 215.00, // $43/kg
    price20kg: 34.00, // $34/kg wholesale
    cuppingScore: 85.5,
    description: 'Full-bodied and deeply syrupy with minimal acidity. A favorite for Traditional Nanyang modern espresso adaptations and bold iced lattes.',
    recommendedBrew: ['Espresso', 'French Press', 'Iced Latte', 'Traditional Cloth Filter'],
    flavorProfile: { acidity: 1, body: 5, sweetness: 3, bitterness: 4, aroma: 4 },
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isPopularB2B: true,
    isPopularB2C: false,
  },
  {
    id: 'rd-colombia-pink-bourbon',
    name: 'Colombia Huila Pink Bourbon',
    subtitle: 'Anaerobic Fermentation Special Reserve',
    origin: 'Colombia',
    region: 'Pitalito, Huila',
    altitude: '1,950m',
    roastLevel: 'Omni-Roast',
    processingMethod: 'Anaerobic Fermentation',
    flavorNotes: ['Pink Guava', 'Blood Orange', 'Cacao Nibs', 'Rose Water'],
    price250g: 26.00,
    price1kg: 88.00,
    price5kg: 380.00,
    price20kg: 58.00,
    cuppingScore: 91.0,
    description: 'Rare Pink Bourbon mutation with a 72-hour anaerobic fermentation process. Complex tropical acidity with an intoxicating silky mouthfeel.',
    recommendedBrew: ['Pourover', 'Syphon', 'Filter', 'Specialty Shot'],
    flavorProfile: { acidity: 4, body: 3, sweetness: 5, bitterness: 1, aroma: 5 },
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isPopularB2B: false,
    isPopularB2C: true,
  },
  {
    id: 'rd-nanyang-artisan-roast',
    name: 'Modern Nanyang Heritage Roast',
    subtitle: 'Butter-Free Singapore Craft Blend',
    origin: 'Singapore & Brazil Blend',
    region: 'Kallang Craft Roast',
    altitude: '1,200 - 1,600m',
    roastLevel: 'Dark',
    processingMethod: 'Traditional Nanyang Roast',
    flavorNotes: ['Caramelized Brown Sugar', 'Roasted Hazelnut', 'Dark Malt', 'Condensed Milk Harmony'],
    price250g: 15.00,
    price1kg: 45.00,
    price5kg: 185.00,
    price20kg: 29.00,
    cuppingScore: 84.8,
    description: 'A health-conscious, clean-burning homage to Singapore Kopi culture. Roasted without margarine or sugar additives, delivering rich caramel sweetness natively.',
    recommendedBrew: ['Traditional Cloth Filter', 'Moka Pot', 'Iced Kopi C', 'Espresso'],
    flavorProfile: { acidity: 1, body: 5, sweetness: 4, bitterness: 4, aroma: 4 },
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isPopularB2B: true,
    isPopularB2C: false,
  },
  {
    id: 'rd-guatemala-antigua',
    name: 'Guatemala Antigua Pastoral',
    subtitle: 'Volcanic Soil Estate',
    origin: 'Guatemala',
    region: 'Antigua Valley',
    altitude: '1,700m',
    roastLevel: 'Medium-Light',
    processingMethod: 'Washed',
    flavorNotes: ['Red Apple', 'Toffee Crunch', 'Milk Chocolate', 'Orange Blossom'],
    price250g: 19.50,
    price1kg: 62.00,
    price5kg: 265.00,
    price20kg: 42.00,
    cuppingScore: 86.8,
    description: 'Grown in nutrient-dense volcanic soil. Delivers crisp malic acidity paired with smooth chocolate backnotes, ideal for all-day cafe brewing.',
    recommendedBrew: ['Auto Drip Brewer', 'Pourover', 'Flat White', 'Batch Brew'],
    flavorProfile: { acidity: 3, body: 3, sweetness: 4, bitterness: 2, aroma: 4 },
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isPopularB2B: true,
    isPopularB2C: false,
  }
];

export const COMMERCIAL_MACHINES: CoffeeMachine[] = [
  {
    id: 'mach-la-marzocco-linea-pb',
    name: 'La Marzocco Linea PB 2-Group',
    brand: 'La Marzocco (Italy)',
    category: 'High-Volume Commercial',
    monthlyRental: 480,
    outrightPrice: 18500,
    dailyCapacity: '300 - 600 Cups/day',
    boilerCount: 'Dual Boiler (Coffee + Steam)',
    powerRequirements: '220V 3-Phase / 4600W',
    features: [
      'P.I.D. Temperature Controller',
      'Dual PID Boilers & Eco Saturated Groups',
      'Digital Display & Shot Timer',
      'Includes Quarterly SFA Water Filter Swap',
      'Free 12kg Monthly Bean Credit Included'
    ],
    freeMonthlyBeansKg: 12,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebd02f2a888?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mach-victoria-arduino-black-eagle',
    name: 'Victoria Arduino VA388 Black Eagle 2G',
    brand: 'Victoria Arduino (Italy)',
    category: 'High-Volume Commercial',
    monthlyRental: 620,
    outrightPrice: 24000,
    dailyCapacity: '500+ Cups/day',
    boilerCount: 'T3 Multi-Boiler System',
    powerRequirements: '230V Single / 3-Phase 7300W',
    features: [
      'Gravimetric Technology (Weight-based profiling)',
      'T3 Multi-Boiler Thermal Stability',
      'Cool-Touch Steam Wands',
      'Dedicated Account Engineer Support',
      'Free 18kg Monthly Bean Credit Included'
    ],
    freeMonthlyBeansKg: 18,
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mach-eversys-cameo',
    name: 'Eversys Cameo Superautomatic',
    brand: 'Eversys (Switzerland)',
    category: 'Office Executive',
    monthlyRental: 550,
    outrightPrice: 21000,
    dailyCapacity: '175 Cups/hour',
    boilerCount: 'Modular Dual Boiler',
    powerRequirements: '230V Single-Phase / 3700W',
    features: [
      'One-touch Microfoam Barista Quality Milk',
      'Electronic Ceramic Grinder Self-Calibrating',
      'Telemetry Monitoring for Preventive Maintenance',
      'Perfect for High-Tech Offices & Corporate Pantries',
      'Free 15kg Monthly Bean Credit Included'
    ],
    freeMonthlyBeansKg: 15,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mach-breville-dual-boiler-home',
    name: 'Breville Dual Boiler & Smart Grinder Pro',
    brand: 'Breville (Prosumer)',
    category: 'Prosumer Home',
    monthlyRental: 120,
    outrightPrice: 2499,
    dailyCapacity: '10 - 30 Cups/day',
    boilerCount: 'Dual Stainless Steel Boilers',
    powerRequirements: '220-240V Standard Socket',
    features: [
      'OPV Pressure Limit & Pre-infusion',
      'Digital PID Temperature Control',
      'Includes Barista Starter Kit & Tamp',
      'Free 2x 250g Monthly Fresh Beans',
      'Zero-Deposit Lease Option for Home Enthusiasts'
    ],
    freeMonthlyBeansKg: 0.5,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80'
  }
];

export const GIFT_PACKAGING_OPTIONS: GiftPackagingOption[] = [
  {
    id: 'pack-shophouse-canvas',
    name: 'Heritage Shophouse Canvas Tote & Box',
    tag: 'Singapore Signature',
    price: 12.00,
    description: 'Eco-friendly natural canvas tote featuring hand-drawn Katong shophouse illustrations, paired with a debossed oatmeal kraft box.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pack-bamboo-tea-chest',
    name: 'Artisanal Bamboo & Brass Lock Chest',
    tag: 'Executive Premium',
    price: 18.00,
    description: 'Sustainable bamboo wood box with custom velvet lining and brass closure latch. Designed for re-use as a tea/coffee display.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pack-gold-foil-tin',
    name: 'Matt Mahogany Gold Foil Airtight Tin Duo',
    tag: 'Modern Luxury',
    price: 15.00,
    description: 'Two nitrogen-flushed airtight tins finished in dark mahogany with gold hot-stamped Red Dot Roastworks emblem.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80'
  }
];

export const GIFT_CARD_DESIGNS: GiftCardDesign[] = [
  {
    id: 'card-kallang-sunset',
    title: 'Kallang River Sunset & Roastery',
    theme: 'Artisanal Warmth',
    artist: 'Local SG Artist Collective',
    previewUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'card-peranakan-tile',
    title: 'Peranakan Geometric Blossom',
    theme: 'Heritage Cultural',
    artist: 'Singapore Design Studio',
    previewUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'card-botanical-marley',
    title: 'Coffee Plant Botanical Engraving',
    theme: 'Minimalist Natural',
    artist: 'Red Dot Roastworks Studio',
    previewUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80'
  }
];

export const SG_POSTAL_DATABASE: Record<string, { address: string; district: string }> = {
  '349144': { address: '12 Kallang Way, Red Dot Industrial Building', district: 'Kallang / MacPherson (D13)' },
  '048582': { address: '16 Collyer Quay, Income At Raffles', district: 'Raffles Place / Marina Bay (D01)' },
  '238881': { address: '390 Orchard Road, Palais Renaissance', district: 'Orchard / Grange (D09)' },
  '428751': { address: '20 East Coast Road, Katong V', district: 'Katong / Joo Chiat (D15)' },
  '138567': { address: '1 Fusionopolis Way, Connexis', district: 'One-North / Buona Vista (D05)' },
  '535889': { address: '2 Serangoon Avenue 3, NEX', district: 'Serangoon / Hougang (D19)' }
};

export const SAMPLE_ORDER_TRACKING: OrderStatus = {
  orderId: 'RDR-SG-8842',
  customerName: 'Artisan Cafe @ Katong (B2B Wholesale)',
  type: 'B2B',
  status: 'Out for Dispatch',
  postalCode: '428751',
  address: '20 East Coast Road, #01-12 Katong V, Singapore 428751',
  driverName: 'Ah Beng Transport (Temperature-Controlled Fleet #3)',
  driverPhone: '+65 9123 4567',
  estimatedDelivery: 'Today, 2:30 PM - 3:15 PM',
  items: ['15kg Red Dot House Blend (Whole Bean)', '5kg Ethiopia Yirgacheffe Aricha (Medium Roast)'],
  timeline: [
    { title: 'Order Confirmed & Payment Processed via PayNow QR', time: 'Today 08:30 AM', completed: true },
    { title: 'SFA Food-Safe Batch Roasting (#ROAST-20260812-04)', time: 'Today 09:45 AM', completed: true },
    { title: 'Degassing & Vacuum Pack Seal Quality Inspection', time: 'Today 11:15 AM', completed: true },
    { title: 'Loaded onto Temperature-Controlled Van Fleet #3', time: 'Today 01:15 PM', completed: true, current: true },
    { title: 'Arrival & Barista Handover Signature at Katong V', time: 'Estimated 02:45 PM', completed: false }
  ]
};

export const ARCHITECTURAL_SPECS: ArchitecturalSpecs = {
  sitemap: [
    { page: 'Hero & Dual Switcher', route: '#hero', description: 'Dual B2B/B2C landing switch with live Singapore delivery status ticker and trust badges.', targetAudience: 'Cafes & Home Enthusiasts' },
    { page: 'Bean Inventory & Matrix', route: '#inventory', description: 'Real-time filterable specialty coffee grid with flavor profile radar pentagon and wholesale calculator.', targetAudience: 'All Buyers (B2B Bulk + B2C Pack)' },
    { page: 'B2B Commercial Solutions', route: '#b2b-commercial', description: 'Coffee machine rental/lease portal, ROI calculator, and custom private label roast creator.', targetAudience: 'Cafe Owners, Office Managers, F&B Partners' },
    { page: 'Custom Gift Set Builder', route: '#gift-builder', description: '4-Step interactive gift builder with custom bean selection, artisanal SG packaging & personalized card.', targetAudience: 'B2C Enthusiasts, Corporate Gifting' },
    { page: 'Find Your Brew Quiz', route: '#coffee-quiz', description: '3-Question taste & brewing device quiz providing personalized coffee matches & brew recipes.', targetAudience: 'Home Brewers & Beginners' },
    { page: 'Logistics & Safety Bar', route: '#logistics', description: 'Singapore delivery schedules, SFA Grade A hygiene standards, and live order tracking simulator.', targetAudience: 'Logistics & Operational Verification' },
    { page: 'Multi-Channel Footer', route: '#footer', description: 'PayNow/Stripe payment links, Kallang Roastery contact info, and newsletter micro-lot drops.', targetAudience: 'Community & Footprint' }
  ],
  visualHierarchy: [
    { level: 'Display Hero Headings', font: 'Fraunces Serif (Bold / 44px-60px)', color: 'Warm Mahogany (#2A1E1B) & Terracotta Accent (#C85A32)', usage: 'Core value proposition headlines' },
    { level: 'Section Titles & H2', font: 'Fraunces Serif (Medium / 28px-36px)', color: 'Espresso Dark (#3B2A26)', usage: 'Major architectural section dividers' },
    { level: 'Subtitles & UI Headers', font: 'Plus Jakarta Sans (SemiBold / 16px-20px)', color: 'Warm Chestnut (#5C433E)', usage: 'Card titles, feature labels, modal headers' },
    { level: 'Body Text & Descriptions', font: 'Plus Jakarta Sans (Regular / 14px-16px / line-height 1.6)', color: 'Muted Earth Tone (#4A3B37)', usage: 'Product descriptions, copy block text, guides' },
    { level: 'Micro-Copy & Badges', font: 'Plus Jakarta Sans (Bold Uppercase / 11px-12px / tracking-wide)', color: 'White on Terracotta or Deep Espresso', usage: 'Trust badges, status pill indicators, tier labels' }
  ],
  conversionCopyMatrix: [
    {
      component: 'Hero Section',
      headline: 'From Local Roasts to Café Customization.',
      b2bCopy: 'Powering 120+ Singapore cafes with artisanal, food-safe roasts, flexible 30-day credit terms, and commercial machine rentals.',
      b2cCopy: 'Freshly roasted in Kallang and delivered to your doorstep within 24 hours. Savor micro-lot single origins and bespoke gift sets.',
      ctaText: 'Explore Wholesale Portal / Order Fresh Roast'
    },
    {
      component: 'Bean Matrix',
      headline: 'Transparent Sourcing. Uncompromising Flavor.',
      b2bCopy: 'Bulk tiered wholesale pricing starting from 1kg up to 50kg+. Full cupping notes, altitude data, and batch consistency guarantees.',
      b2cCopy: 'Hand-picked beans roasted fresh weekly. Discover flavor notes from wild berries to dark caramel Nanyang roasts.',
      ctaText: 'Calculate Bulk Price / Add 250g Bag'
    },
    {
      component: 'Commercial Machines',
      headline: 'World-Class Equipment. Zero Operational Hassle.',
      b2bCopy: 'Lease commercial Espresso machines like La Marzocco & Victoria Arduino with free monthly bean credits and SFA-compliant maintenance.',
      b2cCopy: 'Prosumer home espresso lease plans with zero deposit and fresh bean deliveries to elevate your home bar.',
      ctaText: 'Request Lease Quote / Book Consultation'
    },
    {
      component: 'Gift Set Builder',
      headline: 'Gift the Art of Singapore Specialty Coffee.',
      b2bCopy: 'Custom branded corporate gifts with company logo packaging, personalized appreciation cards, and islandwide multi-address dispatch.',
      b2cCopy: 'Craft a bespoke coffee present for loved ones: choose roasted beans, artisanal SG tote packaging, and a hand-written card.',
      ctaText: 'Start Gifting Step 1'
    }
  ]
};
