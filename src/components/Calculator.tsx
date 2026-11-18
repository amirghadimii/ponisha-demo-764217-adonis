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
  Check, 
  ArrowLeft, 
  Info, 
  Maximize2, 
  Receipt,
  Sparkles,
  ShieldCheck,
  CheckCircle2
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
    <section id="calculator" className="py-20 relative bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
            <CalcIcon className="w-4 h-4 text-amber-600" />
            <span>محاسبه‌گر هوشمند فنی و اقتصادی نیروگاه خورشیدی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            مرکز تحلیل اقتصادی و تخمین بازدهی آدونیس
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            با تنظیم متراژ پشت‌بام یا مبلغ قبض ماهانه، توان نیروگاه، تعداد پنل‌های رده‌یک، هزینه تمام‌شده و درآمد نقدی سالانه خود را به‌صورت زنده برآورد نمایید.
          </p>
        </div>

        {/* Main Centerpiece Calculator Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left/Main Column: Input Controls */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 text-right">
              
              {/* Mode Toggle Bar */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-700 block">مبنای ورودی محاسبات:</span>
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    id="calc-mode-area"
                    onClick={() => setMode('area')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      mode === 'area'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
                    }`}
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>بر اساس متراژ سقف ({toPersianDigits(roofArea)} مترمربع)</span>
                  </button>

                  <button
                    type="button"
                    id="calc-mode-bill"
                    onClick={() => setMode('bill')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      mode === 'bill'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
                    }`}
                  >
                    <Receipt className="w-4 h-4" />
                    <span>بر اساس مبلغ قبض ({formatNumber(monthlyBillToman)} تومان)</span>
                  </button>
                </div>
              </div>

              {/* Input 1: Roof Area Slider & Input */}
              <div className={`p-6 rounded-2xl border transition-all ${
                mode === 'area'
                  ? 'bg-amber-50/40 border-amber-300 ring-2 ring-amber-400/20'
                  : 'bg-slate-50 border-slate-200 opacity-90'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-bold text-slate-900">
                      مساحت مفید پشت‌بام یا زمین (متر مربع):
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-300 shadow-sm">
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
                      className="w-16 bg-transparent text-lg font-black text-slate-950 font-mono text-center focus:outline-none"
                    />
                    <span className="text-xs font-bold text-slate-600">m²</span>
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
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />

                <div className="flex justify-between text-xs text-slate-500 font-mono mt-2">
                  <span>۲۰ مترمربع</span>
                  <span>۱۰۰ مترمربع</span>
                  <span>۲۵۰ مترمربع</span>
                  <span>۵۰۰+ مترمربع</span>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="text-xs font-bold text-slate-600 self-center">انتخاب سریع:</span>
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
                      className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                        roofArea === preset.val
                          ? 'bg-amber-500 text-slate-950 border-amber-500'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input 2: Monthly Electricity Bill Slider & Input */}
              <div className={`p-6 rounded-2xl border transition-all ${
                mode === 'bill'
                  ? 'bg-amber-50/40 border-amber-300 ring-2 ring-amber-400/20'
                  : 'bg-slate-50 border-slate-200 opacity-90'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-bold text-slate-900">
                      میانگین هزینه قبض ماهانه برق:
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-300 shadow-sm">
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
                      className="w-28 bg-transparent text-base font-black text-slate-950 font-mono text-center focus:outline-none"
                    />
                    <span className="text-xs font-bold text-slate-600">تومان</span>
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
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />

                <div className="flex justify-between text-xs text-slate-500 font-mono mt-2">
                  <span>۵۰۰ هزار تومان</span>
                  <span>۵ میلیون تومان</span>
                  <span>۱۰ میلیون تومان</span>
                  <span>۲۰+ میلیون تومان</span>
                </div>

                {/* Quick Presets for Bill */}
                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="text-xs font-bold text-slate-600 self-center">انتخاب سریع:</span>
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
                      className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                        monthlyBillToman === preset.val
                          ? 'bg-amber-500 text-slate-950 border-amber-500'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
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
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>شهر محل احداث نیروگاه:</span>
                    <span className="text-[11px] text-amber-700 font-bold">شاخص تابش ایران</span>
                  </label>
                  <select
                    id="calc-city-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 focus:outline-none focus:border-amber-500 transition-colors font-medium"
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
                  <label className="text-xs font-bold text-slate-800 block">نوع کاربری ملک:</label>
                  <select
                    id="calc-building-select"
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 focus:outline-none focus:border-amber-500 transition-colors font-medium"
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
                className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer select-none transition-colors ${
                  hasBattery
                    ? 'bg-amber-50/60 border-amber-400'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => setHasBattery(!hasBattery)}
              >
                <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                  hasBattery ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-400 bg-white'
                }`}>
                  {hasBattery && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-slate-950 flex flex-wrap items-center gap-2">
                    <span>افزودن سیستم باتری لیتیومی LiFePO4 (پشتیبان ضد خاموشی)</span>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">
                      پیشنهاد ویژه ویلاها و کارخانجات
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    با افزودن باتری هوشمند، هنگام قطع کامل برق سراسری، سیستم کمتر از ۱۰ میلی‌ثانیه بدون وقفه برق مورد نیاز شما را تامین خواهد نمود.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Live Result Panel with Oversized Numerals (Midnight Navy Ink) */}
            <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-10 text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-r border-slate-900">
              
              <div className="space-y-6">
                
                {/* Top Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Sun className="w-4 h-4" />
                    نتیجه برآورد مهندسی آدونیس
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {selectedCity} • {mode === 'area' ? 'مساحت سقف' : 'قبض برق'}
                  </span>
                </div>

                {/* Primary Outputs: Recommended Capacity & Panels Count (Oversized Numerals) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-right">
                    <span className="text-xs font-semibold text-slate-400 block mb-1">ظرفیت پیشنهادی:</span>
                    <div className="flex items-baseline gap-2">
                      <span id="recommended-capacity-kw" className="text-4xl sm:text-5xl font-black text-amber-400 font-mono tracking-tight">
                        {toPersianDigits(result.recommendedCapacityKw)}
                      </span>
                      <span className="text-xs font-bold text-slate-300">kW</span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-2 block">
                      فضای مورد نیاز: ~{toPersianDigits(result.suitableAreaM2)} مترمربع
                    </span>
                  </div>

                  <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-right">
                    <span className="text-xs font-semibold text-slate-400 block mb-1">تعداد پنل ۵۵۰ وات:</span>
                    <div className="flex items-baseline gap-2">
                      <span id="panel-count-result" className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono tracking-tight">
                        {toPersianDigits(result.panelCount)}
                      </span>
                      <span className="text-xs font-bold text-slate-300">پنل</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 mt-2 block">
                      بایفشیال N-Type TOPCon
                    </span>
                  </div>
                </div>

                {/* Estimated Turnkey Cost */}
                <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-1.5 text-right">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-semibold">برآورد کل هزینه تجهیزات، نصب و راه‌اندازی:</span>
                    <Coins className="w-4 h-4 text-amber-400" />
                  </div>
                  <div id="estimated-cost-range" className="text-xl sm:text-2xl font-black text-white font-mono">
                    {formatNumber(result.estimatedCostMinToman)} تا {formatNumber(result.estimatedCostMaxToman)}
                    <span className="text-xs font-medium text-slate-400 mr-2">تومان</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    شامل صفر تا صد پنل‌ها، اینورتر خورشیدی، استراکچر آلومینیومی، کابل‌کشی و کنتور رسمی ساتبا
                  </p>
                </div>

                {/* Economic & ROI Metrics */}
                <div className="grid grid-cols-2 gap-3 text-right">
                  <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                      <span>درآمد سالانه ساتبا:</span>
                    </div>
                    <div id="annual-saving-result" className="text-lg sm:text-xl font-black text-amber-300 font-mono">
                      {formatNumber(result.annualSavingToman)}
                      <span className="text-[10px] text-slate-400 mr-1">تومان</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      تولید: {formatNumber(result.annualGenerationKwh)} kWh/سال
                    </span>
                  </div>

                  <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>دوره بازگشت سرمایه:</span>
                    </div>
                    <div id="payback-years-result" className="text-lg sm:text-xl font-black text-emerald-300 font-mono">
                      {toPersianDigits(result.paybackYears)}
                      <span className="text-xs text-slate-400 mr-1">سال</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 block mt-1">
                      سپس ۲۰ سال سود خالص
                    </span>
                  </div>

                  <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 col-span-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Leaf className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">کاهش آلودگی زیست محیطی</div>
                        <div className="text-[11px] text-slate-400">
                          جلوگیری از انتشار {toPersianDigits(result.co2ReductionTonsPerYear)} تن CO2 در سال
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                      معادل {toPersianDigits(result.treesEquivalent)} درخت
                    </span>
                  </div>
                </div>

              </div>

              {/* Submit / Apply Button */}
              <div className="pt-6">
                <button
                  type="button"
                  id="apply-calculator-btn"
                  onClick={handleApply}
                  className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>ثبت این برآورد در فرم بازدید و کارشناسی در محل</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
