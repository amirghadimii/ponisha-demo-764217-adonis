export interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: 'panels' | 'inverters' | 'batteries' | 'packages';
  categoryLabel: string;
  shortDesc: string;
  description: string;
  priceToman: number;
  originalPriceToman?: number;
  capacity: string;
  warranty: string;
  efficiency?: string;
  lifespan?: string;
  image: string;
  badge?: string;
  specs: { [key: string]: string };
  highlights: string[];
  inStock: boolean;
  tier1: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: 'industrial' | 'residential' | 'agricultural' | 'farm';
  categoryLabel: string;
  location: string;
  capacityKw: number;
  annualGenerationKwh: number;
  annualSavingToman: number;
  panelCount: number;
  inverterModel: string;
  co2ReductionTons: number;
  year: string;
  image: string;
  description: string;
  clientType: string;
}

export interface CalculationInput {
  mode: 'area' | 'bill';
  roofArea: number; // m^2
  monthlyBill: number; // Toman
  monthlyKwh: number; // kWh
  buildingType: 'residential' | 'villa' | 'commercial' | 'agricultural';
  city: string;
  hasBattery: boolean;
}

export interface CalculationResult {
  recommendedCapacityKw: number;
  panelCount: number;
  panelWattage: number;
  estimatedCostMinToman: number;
  estimatedCostMaxToman: number;
  annualGenerationKwh: number;
  annualSavingToman: number;
  paybackYears: number;
  co2ReductionTonsPerYear: number;
  treesEquivalent: number;
  suitableAreaM2: number;
}

export interface ConsultationFormData {
  fullName: string;
  mobile: string;
  province: string;
  city: string;
  buildingType: string;
  gridType: 'on-grid' | 'off-grid' | 'hybrid';
  estimatedArea: string;
  visitDate: {
    year: number;
    month: number;
    day: number;
  };
  timeSlot: 'morning' | 'afternoon';
  description?: string;
  suggestedCapacityKw?: number;
}
