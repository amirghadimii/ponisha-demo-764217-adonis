'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calculator as CalcIcon, 
  Sun, 
  Zap, 
  Coins, 
  Calendar, 
  Leaf, 
  TrendingUp, 
  Layers, 
  Check, 
  ArrowLeft, 
  Info, 
  Maximize2, 
  Receipt 
} from 'lucide-react';
import { 
  computeSolarNeeds, 
  IRAN_CITIES, 
  BUILDING_TYPES, 
  toPersianDigits, 
  formatToman, 
  formatNumber 
} from '@/lib/utils';

interface CalculatorProps {
  onApplyToConsultation?: (params: { capacityKw: number; area: number; buildingType: string }) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onApplyToConsultation }) => {
  const [mode, setMode] = useState<'area' | 'bill'>('area');
  const [roofArea, setRoofArea] = useState<number>(100); // default 100 m2
  const [monthlyBillToman, setMonthlyBillToman] = useState<number>(5000000); // 5M Toman
  const [selectedCity, setSelectedCity] = useState<string>('تهران');
  const [buildingType, setBuildingType] = useState<string>('residential');
  const [hasBattery, setHasBattery] = useState<boolean>(false);

  // Real-time calculation
  const result = useMemo(() => {
    return computeSolarNeeds({
      mode,
      roofArea,
      monthlyBillToman,
      cityName: selectedCity,
      buildingType,
      hasBattery,
    });
  }, [mode, roofArea, monthlyBillToman, selectedCity, buildingType, hasBattery]);

  const handleApply = () => {
    if (onApplyToConsultation) {
      onApplyToConsultation({
        capacityKw: result.recommendedCapacityKw,
        area: roofArea,
        buildingType,
      });
    }
    const formElement = document.getElementById('consultation');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculator" className="py-20 relative bg-slate-900/60 border-y border-slate-800/80">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
            <CalcIcon className="w-4 h-4" />
            <span>محاسبه‌گر هوشمند فنی و اقتصادی نیروگاه خورشیدی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            برآورد دقیق ظرفیت، هزینه و سود سرمایه‌گذاری
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            تنها با وارد کردن متراژ سقف یا مبلغ قبض فعلی برق خود، ظرفیت بهینه، درآمد سالانه از قرارداد ساتبا و هزینه تخمینی تجهیزات را به صورت لحظه‌ای محاسبه نمایید.
          </p>
        </div>

        {/* Main Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls / Inputs Column */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-3xl border border-slate-800/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
            
            {/* Input Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">مبنای اصلی محاسبه نیروگاه:</label>
              <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-slate-900 border border-slate-800">
                <button
                  type="button"
                  id="calc-mode-area"
                  onClick={() => setMode('area')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    mode === 'area'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>بر اساس مساحت سقف ({toPersianDigits(roofArea)} m²)</span>
                </button>

                <button
                  type="button"
                  id="calc-mode-bill"
                  onClick={() => setMode('bill')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    mode === 'bill'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Receipt className="w-4 h-4" />
                  <span>بر اساس قبض برق ({formatNumber(monthlyBillToman)} تومان)</span>
                </button>
              </div>
            </div>

            {/* Input 1: Roof Area with numeric input and slider */}
            <div className={`space-y-3 p-5 rounded-2xl border transition-all ${
              mode === 'area' ? 'bg-slate-900/70 border-amber-500/40 ring-1 ring-amber-500/20' : 'bg-slate-900/30 border-slate-800/60 opacity-80'
            }`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-slate-200">
                    مساحت مفید پشت‌بام یا زمین بدون سایه:
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700">
                  <input
                    id="roof-area-input"
                    type="number"
                    min="10"
                    max="1000"
                    value={roofArea}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 0) setRoofArea(val);
                    }}
                    className="w-16 bg-transparent text-lg font-black text-amber-400 font-mono text-center focus:outline-none"
                  />
                  <span className="text-xs text-slate-400">متر مربع</span>
                </div>
              </div>

              <input
                id="roof-area-slider"
                type="range"
                min="20"
                max="500"
                step="5"
                value={roofArea}
                onChange={(e) => setRoofArea(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>۲۰ مترمربع</span>
                <span>۱۰۰ مترمربع</span>
                <span>۲۵۰ مترمربع</span>
                <span>۵۰۰+ مترمربع</span>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs text-slate-400 self-center">انتخاب سریع:</span>
                {[
                  { label: 'آپارتمان (۳۵m²)', val: 35 },
                  { label: 'خانه ویلایی (۷۰m²)', val: 70 },
                  { label: 'نیروگاه ۱۰۰ متری (۱۰۰m²)', val: 100 },
                  { label: 'سوله کارگاهی (۲۰۰m²)', val: 200 },
                  { label: 'کارخانه صنعتی (۴۰۰m²)', val: 400 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => {
                      setRoofArea(preset.val);
                      setMode('area');
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                      roofArea === preset.val
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Monthly Electricity Bill with numeric input and slider */}
            <div className={`space-y-3 p-5 rounded-2xl border transition-all ${
              mode === 'bill' ? 'bg-slate-900/70 border-amber-500/40 ring-1 ring-amber-500/20' : 'bg-slate-900/30 border-slate-800/60 opacity-80'
            }`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-slate-200">
                    میانگین هزینه قبض ماهانه برق:
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700">
                  <input
                    id="monthly-bill-input"
                    type="number"
                    min="500000"
                    max="50000000"
                    step="500000"
                    value={monthlyBillToman}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 0) setMonthlyBillToman(val);
                    }}
                    className="w-28 bg-transparent text-base font-black text-amber-400 font-mono text-center focus:outline-none"
                  />
                  <span className="text-xs text-slate-400">تومان</span>
                </div>
              </div>

              <input
                id="monthly-bill-slider"
                type="range"
                min="500000"
                max="20000000"
                step="500000"
                value={monthlyBillToman}
                onChange={(e) => setMonthlyBillToman(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>۵۰۰ هزار تومان</span>
                <span>۵ میلیون تومان</span>
                <span>۱۰ میلیون تومان</span>
                <span>۲۰+ میلیون تومان</span>
              </div>

              {/* Quick Presets for Bill */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs text-slate-400 self-center">انتخاب سریع:</span>
                {[
                  { label: 'مسکونی معمولی (۱.۵ م)', val: 1500000 },
                  { label: 'قبض ۵ میلیون تومان', val: 5000000 },
                  { label: 'تجاری/کارگاهی (۸ م)', val: 8000000 },
                  { label: 'صنعتی پرمصرف (۱۵ م)', val: 15000000 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => {
                      setMonthlyBillToman(preset.val);
                      setMode('bill');
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                      monthlyBillToman === preset.val
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* City & Building Type Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* City Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>شهر محل احداث (پتانسیل تابش):</span>
                  <span className="text-[11px] text-amber-400">شاخص تابش ایران</span>
                </label>
                <select
                  id="calc-city-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {IRAN_CITIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} (استان {c.province})
                    </option>
                  ))}
                </select>
              </div>

              {/* Building Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">نوع کاربری ملک:</label>
                <select
                  id="calc-building-select"
                  value={buildingType}
                  onChange={(e) => setBuildingType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {BUILDING_TYPES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Battery Backup Checkbox Toggle */}
            <div 
              id="calc-battery-toggle"
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 cursor-pointer select-none"
              onClick={() => setHasBattery(!hasBattery)}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                hasBattery ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-600 bg-slate-950'
              }`}>
                {hasBattery && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>افزودن سیستم باتری لیتیومی LiFePO4 (پشتیبان ضد خاموشی)</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 rounded">
                    توصیه شده برای ویلاها و صنایع
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  با انتخاب باتری، هنگام قطعی کامل شبکه برق، سیستم به صورت خودکار برق ساختمان را بدون وقفه تامین می‌نماید.
                </p>
              </div>
            </div>

          </div>

          {/* Results Display Column */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Result Card */}
            <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-5">
              
              {/* Top Highlight Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Sun className="w-4 h-4" />
                  برآورد مهندسی و مالی آدونیس
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  شهر: {selectedCity} • حالت: {mode === 'area' ? 'مساحت سقف' : 'قبض برق'}
                </span>
              </div>

              {/* Primary Output: Capacity & Panels */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">ظرفیت پیشنهادی نیروگاه:</span>
                  <div className="flex items-baseline gap-1.5">
                    <span id="recommended-capacity-kw" className="text-3xl font-black text-amber-400 font-mono">
                      {toPersianDigits(result.recommendedCapacityKw)}
                    </span>
                    <span className="text-xs font-bold text-slate-300">کیلووات (kW)</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    نیاز به ~{toPersianDigits(result.suitableAreaM2)} مترمربع فضا
                  </span>
                </div>

                <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">تعداد پنل‌های مورد نیاز:</span>
                  <div className="flex items-baseline gap-1.5">
                    <span id="panel-count-result" className="text-3xl font-black text-emerald-400 font-mono">
                      {toPersianDigits(result.panelCount)}
                    </span>
                    <span className="text-xs font-bold text-slate-300">عدد پنل ۵۵۰W</span>
                  </div>
                  <span className="text-[11px] text-emerald-400/90 mt-1 block">
                    پنل رده ۱ بایفشیال N-Type
                  </span>
                </div>
              </div>

              {/* Estimated Total Investment */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>برآورد هزینه تجهیزات + نصب و راه‌اندازی کامل:</span>
                  <Coins className="w-4 h-4 text-amber-400" />
                </div>
                <div id="estimated-cost-range" className="text-xl sm:text-2xl font-black text-white font-mono">
                  {formatNumber(result.estimatedCostMinToman)} تا {formatNumber(result.estimatedCostMaxToman)}
                  <span className="text-xs font-medium text-slate-400 mr-1.5">تومان</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                  <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>شامل صفر تا صد پنل‌ها، اینورتر، استراکچر، کابل‌کشی و کنتور ساتبا</span>
                </div>
              </div>

              {/* Economic & Environmental Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    <span>درآمد / صرفه‌جویی سالانه:</span>
                  </div>
                  <div id="annual-saving-result" className="text-base font-black text-amber-300 font-mono">
                    {formatNumber(result.annualSavingToman)}
                    <span className="text-[10px] text-slate-400 mr-1">تومان</span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    تولید: {formatNumber(result.annualGenerationKwh)} kWh/سال
                  </span>
                </div>

                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>دوره بازگشت سرمایه:</span>
                  </div>
                  <div id="payback-years-result" className="text-base font-black text-emerald-300 font-mono">
                    {toPersianDigits(result.paybackYears)}
                    <span className="text-xs text-slate-400 mr-1">سال</span>
                  </div>
                  <span className="text-[10px] text-emerald-400/80">
                    + بیش از ۲۰ سال سود خالص
                  </span>
                </div>

                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 col-span-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">کاهش آلودگی زیست محیطی</div>
                      <div className="text-[11px] text-slate-400">
                        جلوگیری از انتشار {toPersianDigits(result.co2ReductionTonsPerYear)} تن CO2 در سال
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                    {toPersianDigits(result.treesEquivalent)} درخت معادل
                  </span>
                </div>
              </div>

              {/* Apply / Send to Consultation Button */}
              <button
                type="button"
                id="apply-calculator-btn"
                onClick={handleApply}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>ثبت این برآورد در فرم بازدید و کارشناسی در محل</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
