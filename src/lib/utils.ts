// Utility functions for Persian digits, formatting, Jalali date, and solar calculations

export const toPersianDigits = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return '';
  const str = num.toString();
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (w) => persianDigits[parseInt(w, 10)]);
};

export const formatNumber = (num: number | string): string => {
  if (num === undefined || num === null || isNaN(Number(num))) return '۰';
  const parts = Number(num).toLocaleString('en-US').split('.');
  const intPart = toPersianDigits(parts[0]);
  if (parts.length > 1) {
    return `${intPart}.${toPersianDigits(parts[1])}`;
  }
  return intPart;
};

export const formatToman = (amount: number): string => {
  return `${formatNumber(amount)} تومان`;
};

export const formatMillionToman = (amount: number): string => {
  const millions = (amount / 1_000_000).toFixed(1);
  return `${toPersianDigits(millions)} میلیون تومان`;
};

// Jalali calendar utilities for visit scheduler
export const JALALI_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

export const IRAN_CITIES = [
  { name: 'تهران', sunFactor: 1.0, province: 'تهران' },
  { name: 'اصفهان', sunFactor: 1.15, province: 'اصفهان' },
  { name: 'یزد', sunFactor: 1.25, province: 'یزد' },
  { name: 'کرمان', sunFactor: 1.28, province: 'کرمان' },
  { name: 'شیراز', sunFactor: 1.18, province: 'فارس' },
  { name: 'مشهد', sunFactor: 1.05, province: 'خراسان رضوی' },
  { name: 'تبریز', sunFactor: 0.95, province: 'آذربایجان شرقی' },
  { name: 'قم', sunFactor: 1.15, province: 'قم' },
  { name: 'اهواز', sunFactor: 1.22, province: 'خوزستان' },
  { name: 'بندرعباس', sunFactor: 1.2, province: 'هرمزگان' },
  { name: 'ساری / مازندران', sunFactor: 0.85, province: 'مازندران' },
  { name: 'رشت / گیلان', sunFactor: 0.82, province: 'گیلان' },
];

export const BUILDING_TYPES = [
  { id: 'residential', label: 'مسکونی (آپارتمان و منزل شهری)' },
  { id: 'villa', label: 'ویلا و باغ (نیازمند استقلال کامل از قطعی)' },
  { id: 'commercial', label: 'تجاری، اداری و پاساژها' },
  { id: 'agricultural', label: 'کشاورزی، دامداری و پمپ آب چاه' },
];

// Calculation formula implementation
export interface SolarCalcParams {
  mode: 'area' | 'bill';
  roofArea: number; // m2
  monthlyBillToman: number; // Toman
  buildingType: string;
  cityName: string;
  hasBattery: boolean;
}

export function computeSolarNeeds(params: SolarCalcParams) {
  const city = IRAN_CITIES.find((c) => c.name === params.cityName) || IRAN_CITIES[0];
  const sunMultiplier = city.sunFactor;

  let recommendedCapacityKw = 5;

  if (params.mode === 'area') {
    // 1 kW needs approximately 6.5 m² of usable roof area with modern 550W panels
    const rawKw = params.roofArea / 6.5;
    recommendedCapacityKw = Math.max(1, Math.round(rawKw * 2) / 2);
  } else {
    // In Iran, electricity tariffs have steep progressive ladders.
    // An average 5kW plant offsets standard residential/commercial bills between 1.5M to 4M Toman monthly,
    // plus potential SATBA buyback rate of ~3,500 to 4,200 Toman per kWh generated.
    // Rough estimate: every 1M Toman monthly bill corresponds to approx 3-4 kW capacity need or peak consumption
    const estimatedMonthlyKwh = Math.max(250, (params.monthlyBillToman / 2200));
    const dailyKwh = estimatedMonthlyKwh / 30;
    const rawKw = dailyKwh / (4.2 * sunMultiplier);
    recommendedCapacityKw = Math.max(2, Math.round(rawKw * 2) / 2);
  }

  // Cap capacity nicely based on typical presets
  if (recommendedCapacityKw > 500) recommendedCapacityKw = 500;

  // Single panel wattage: 550W (0.55 kW)
  const panelWattage = 550;
  const panelCount = Math.ceil((recommendedCapacityKw * 1000) / panelWattage);

  // Usable area needed
  const suitableAreaM2 = Math.round(panelCount * 2.6); // each 550W panel is ~2.3m2 + 0.3m2 spacing

  // Annual Generation in kWh: in Iran average 1 kWp yields ~1700 kWh * sunMultiplier
  const annualGenerationKwh = Math.round(recommendedCapacityKw * 1720 * sunMultiplier);

  // Cost estimates in Toman:
  // On-grid EPC cost: ~32,000,000 Toman per kW
  // Hybrid/Battery cost: ~46,000,000 Toman per kW
  const baseRatePerKw = params.hasBattery ? 46_000_000 : 32_000_000;
  // Volume discount for larger systems:
  const scaleDiscount = recommendedCapacityKw > 50 ? 0.88 : recommendedCapacityKw > 20 ? 0.92 : 1.0;
  const estimatedCostMinToman = Math.round(recommendedCapacityKw * baseRatePerKw * scaleDiscount * 0.95);
  const estimatedCostMaxToman = Math.round(recommendedCapacityKw * baseRatePerKw * scaleDiscount * 1.08);

  // Annual Savings & SATBA guaranteed purchase value:
  // With SATBA guaranteed rate ~3,800 Toman/kWh or avoided blackout penalties + grid bills
  const revenuePerKwh = 3850;
  const annualSavingToman = Math.round(annualGenerationKwh * revenuePerKwh);

  // Payback period
  const avgCost = (estimatedCostMinToman + estimatedCostMaxToman) / 2;
  const rawPayback = avgCost / (annualSavingToman || 1);
  const paybackYears = Number(Math.max(2.8, Math.min(5.5, rawPayback)).toFixed(1));

  // Environmental impact
  // In Iran fossil fuel grid, each kWh emits ~0.65 kg CO2
  const co2ReductionTonsPerYear = Number(((annualGenerationKwh * 0.65) / 1000).toFixed(1));
  const treesEquivalent = Math.round(co2ReductionTonsPerYear * 45);

  return {
    recommendedCapacityKw,
    panelCount,
    panelWattage,
    estimatedCostMinToman,
    estimatedCostMaxToman,
    annualGenerationKwh,
    annualSavingToman,
    paybackYears,
    co2ReductionTonsPerYear,
    treesEquivalent,
    suitableAreaM2,
  };
}

// Iranian Mobile validation: 09xxxxxxxxx (11 digits starting with 09)
export function isValidIranianMobile(phone: string): boolean {
  const cleanPhone = phone.trim().replace(/[۰-۹]/g, (d) =>
    ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'].indexOf(d).toString()
  );
  return /^09[0-9]{9}$/.test(cleanPhone);
}
