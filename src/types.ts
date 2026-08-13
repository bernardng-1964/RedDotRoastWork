export type UserMode = 'B2B' | 'B2C';

export interface FlavorProfile {
  acidity: number; // 1 to 5
  body: number; // 1 to 5
  sweetness: number; // 1 to 5
  bitterness: number; // 1 to 5
  aroma: number; // 1 to 5
}

export interface CoffeeBean {
  id: string;
  name: string;
  subtitle: string;
  origin: string;
  region: string;
  altitude: string;
  roastLevel: 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Dark' | 'Omni-Roast';
  processingMethod: 'Washed' | 'Natural' | 'Honey' | 'Anaerobic Fermentation' | 'Traditional Nanyang Roast';
  flavorNotes: string[];
  price250g: number;
  price1kg: number;
  price5kg: number; // Wholesale tier
  price20kg: number; // Bulk wholesale rate per kg
  cuppingScore: number;
  description: string;
  recommendedBrew: string[];
  flavorProfile: FlavorProfile;
  image: string;
  inStock: boolean;
  isPopularB2B?: boolean;
  isPopularB2C?: boolean;
}

export interface CoffeeMachine {
  id: string;
  name: string;
  brand: string;
  category: 'High-Volume Commercial' | 'Boutique Bistro' | 'Office Executive' | 'Prosumer Home';
  monthlyRental: number;
  outrightPrice: number;
  dailyCapacity: string;
  boilerCount: string;
  powerRequirements: string;
  features: string[];
  freeMonthlyBeansKg: number;
  image: string;
}

export interface GiftPackagingOption {
  id: string;
  name: string;
  tag: string;
  price: number;
  description: string;
  image: string;
}

export interface GiftCardDesign {
  id: string;
  title: string;
  theme: string;
  artist: string;
  previewUrl: string;
}

export interface CustomGiftSet {
  beanId: string;
  beanQuantity: '250g Bag' | '2x 250g Duo' | '500g Tin' | '10x Drip Bag Box';
  packagingId: string;
  cardDesignId: string;
  recipientName: string;
  senderName: string;
  personalMessage: string;
  deliveryDate?: string;
}

export interface QuizState {
  step: number;
  brewMethod: string;
  flavorPreference: string;
  milkPreference: string;
  experienceLevel: string;
}

export interface CartItem {
  id: string;
  title: string;
  subtitle: string;
  unitPrice: number;
  quantity: number;
  unitLabel: string;
  type: 'BEAN' | 'MACHINE_RENTAL' | 'CUSTOM_GIFT' | 'SAMPLE_KIT';
  mode: UserMode;
  image: string;
  details?: Record<string, string>;
}

export interface CustomRoastRequest {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  estimatedKgPerMonth: number;
  primaryBeanOrigin: string;
  secondaryBeanOrigin: string;
  targetRoast: string;
  packagingPreference: string;
  preferredCuppingDate: string;
  additionalNotes: string;
}

export interface OrderStatus {
  orderId: string;
  customerName: string;
  type: 'B2B' | 'B2C';
  status: 'Roast Scheduled' | 'SFA Food-Safe Roasting' | 'Vacuum Pack & QC' | 'Out for Dispatch' | 'Delivered';
  postalCode: string;
  address: string;
  driverName?: string;
  driverPhone?: string;
  estimatedDelivery: string;
  items: string[];
  timeline: { title: string; time: string; completed: boolean; current?: boolean }[];
}

export interface ArchitecturalSpecs {
  sitemap: { page: string; route: string; description: string; targetAudience: string }[];
  visualHierarchy: { level: string; font: string; color: string; usage: string }[];
  conversionCopyMatrix: { component: string; headline: string; b2bCopy: string; b2cCopy: string; ctaText: string }[];
}
