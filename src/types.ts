export type DocumentType = 'receipt' | 'invoice';

export interface Document {
  id: string;
  type: DocumentType;
  vendorName: string;
  companyName: string;
  totalAmount: number;
  currency: string;
  category: string;
  transactionDate: string;
  taxId?: string;
  description?: string;
  items?: Item[];
  imageSrc?: string;
  file?: File;
  addedBy?: string;
  createdAt: string;
  familyRole?: 'Husband' | 'Wife';
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
}

export interface FilterState {
  vendor: string;
  startDate: string;
  endDate: string;
  category: string;
  companyName: string;
  taxId: string;
  member: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Husband' | 'Wife';
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
}

export const CATEGORIES = [
  'Food',
  'Transport',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Subscriptions',
  'Office',
  'Other'
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'month',
    features: [
      '5 scans per month',
      'Basic categorization',
      'Single user',
      'CSV export'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 4.99,
    period: 'month',
    features: [
      'Unlimited scans',
      'AI categorization',
      'Family mode (2 users)',
      'PDF & Excel export',
      'Email sync'
    ],
    isPopular: true
  },
  {
    id: 'business',
    name: 'Business',
    price: 14.99,
    period: 'month',
    features: [
      'Everything in Pro',
      'Up to 5 family members',
      'Advanced analytics',
      'Tax report generation',
      'Priority support'
    ]
  }
];
