'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  Building2, 
  Zap, 
  Layers, 
  ArrowLeft, 
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  FileCheck
} from 'lucide-react';
import { 
  isValidIranianMobile, 
  toPersianDigits, 
  JALALI_MONTHS, 
  IRAN_CITIES, 
  BUILDING_TYPES 
} from '@/lib/utils';
import { COMPANY_INFO } from '@/lib/data';

interface ConsultationFormProps {
  initialData?: {
    capacityKw?: number;
    area?: number;
    buildingType?: string;
    productName?: string;
  };
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ initialData }) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('تهران');
  const [city, setCity] = useState('تهران');
  const [buildingType, setBuildingType] = useState(initialData?.buildingType || 'residential');
  const [gridType, setGridType] = useState<'on-grid' | 'off-grid' | 'hybrid'>('on-grid');
  const [area, setArea] = useState(initialData?.area?.toString() || '');
  const [targetCapacity, setTargetCapacity] = useState(initialData?.capacityKw?.toString() || '');
  
  // Jalali Date State
  const [jalaliYear, setJalaliYear] = useState(1405);
  const [jalaliMonth, setJalaliMonth] = useState(2); // اردیبهشت (0-indexed 1)
  const [jalaliDay, setJalaliDay] = useState(15);
  const [timeSlot, setTimeSlot] = useState<'morning' | 'afternoon'>('morning');
  const [description, setDescription] = useState(
    initialData?.productName ? `متقاضی استعلام و خرید: ${initialData.productName}` : ''
  );

  // Validation & Submission State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Calculate days in selected Jalali month
  const daysInMonth = jalaliMonth < 6 ? 31 : jalaliMonth < 11 ? 30 : 29;

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errs.fullName = 'لطفاً نام و نام خانوادگی خود را وارد نمایید.';
    }

    if (!mobile.trim()) {
      errs.mobile = 'لطفاً شماره تلفن همراه خود را وارد کنید.';
    } else if (!isValidIranianMobile(mobile)) {
      errs.mobile = 'شماره همراه نامعتبر است. فرمت صحیح: ۱۱ رقم با شروع ۰۹ (مثلاً ۰۹۱۲۳۴۵۶۷۸۹)';
    }

    if (!city.trim()) {
      errs.city = 'لطفاً شهر پروژه را مشخص فرمایید.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real network submission to Adonis CRM
    setTimeout(() => {
      setIsSubmitting(false);
      const randomCode = `AD-${Math.floor(10000 + Math.random() * 90000)}`;
      setTrackingCode(randomCode);
    }, 1200);
  };

  const handleCopyCode = () => {
    if (trackingCode) {
      navigator.clipboard.writeText(trackingCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleReset = () => {
    setTrackingCode(null);
    setFullName('');
    setMobile('');
    setErrors({});
  };

  return (
    <section id="consultation" className="py-20 relative bg-slate-950 border-t border-slate-800">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>امکان‌سنجی، ارزیابی سقف و برآورد اقتصادی رایگان</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            درخواست کارشناسی و بازدید حضوری در محل
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            کارشناسان ارشد فنی آدونیس در تاریخ انتخابی شما در محل پروژه حاضر شده و نقشه اولیه زاویه تابش، استراکچر و برآورد دقیق مالی را تنظیم می‌نمایند.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          {trackingCode ? (
            /* Success State View */
            <div className="py-6 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  درخواست شما با موفقیت ثبت شد
                </span>
                <h3 className="text-2xl font-black text-white">
                  جلسه بازدید و ارزیابی فنی در تقویم آدونیس رزرو گردید
                </h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  جناب آقای / سرکار خانم <strong className="text-white">{fullName}</strong>، کارشناسان مهندسی آدونیس حداکثر ظرف ۲ ساعت کاری جهت هماهنگی ساعت دقیق با شماره <strong className="text-amber-400 font-mono">{toPersianDigits(mobile)}</strong> تماس حاصل خواهند نمود.
                </p>
              </div>

              {/* Tracking Code Badge */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">شماره پیگیری اختصاصی پرونده:</span>
                  <span className="text-xl font-black text-amber-400 font-mono tracking-wider">
                    {trackingCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">کپی شد</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>کپی کد</span>
                    </>
                  )}
                </button>
              </div>

              {/* Summary Details Box */}
              <div className="max-w-md mx-auto text-xs text-slate-300 rounded-2xl bg-slate-950/60 p-4 border border-slate-800/80 divide-y divide-slate-800">
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">تاریخ بازدید درخواستی (شمسی):</span>
                  <span className="font-bold text-white">
                    {toPersianDigits(jalaliDay)} {JALALI_MONTHS[jalaliMonth]} {toPersianDigits(jalaliYear)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">بازه زمانی:</span>
                  <span className="font-bold text-amber-300">
                    {timeSlot === 'morning' ? 'نوبت صبح (۹:۰۰ الی ۱۳:۰۰)' : 'نوبت عصر (۱۴:۰۰ الی ۱۸:۰۰)'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">محل پروژه:</span>
                  <span className="font-bold text-white">{city}</span>
                </div>
                {targetCapacity && (
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">ظرفیت مد نظر:</span>
                    <span className="font-bold text-emerald-400 font-mono">{toPersianDigits(targetCapacity)} kW</span>
                  </div>
                )}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>ثبت درخواست بازدید جدید</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>تماس فوری با دفتر مرکزی ({COMPANY_INFO.phone})</span>
                </a>
              </div>

            </div>
          ) : (
            /* Interactive Consultation Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>نام و نام خانوادگی متقاضی:</span>
                    <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="مثال: مهندس رضوانی"
                    className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.fullName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-amber-500'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>شماره تلفن همراه (جهت هماهنگی و پیامک):</span>
                    <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      if (errors.mobile) setErrors({ ...errors, mobile: '' });
                    }}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    dir="ltr"
                    className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors text-right font-mono ${
                      errors.mobile ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-amber-500'
                    }`}
                  />
                  {errors.mobile && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.mobile}</span>
                    </p>
                  )}
                </div>

              </div>

              {/* Row 2: Location & Building Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* City / Province */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>استان و شهر محل احداث:</span>
                    <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {IRAN_CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} (استان {c.province})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Building Usage */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>نوع کاربری و ملک:</span>
                  </label>
                  <select
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {BUILDING_TYPES.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Row 3: Grid Type & System Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                
                {/* Grid Connection Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">نوع سیستم مد نظر:</label>
                  <select
                    value={gridType}
                    onChange={(e) => setGridType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="on-grid">متصل به شبکه (آن‌گرید ساتبا)</option>
                    <option value="hybrid">هیبرید هوشمند با باتری (ضد قطعی)</option>
                    <option value="off-grid">مستقل از شبکه (آف‌گرید ویلایی)</option>
                  </select>
                </div>

                {/* Approximate Area */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">مساحت تقریبی سقف (m²):</label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="مثال: ۸۰"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                {/* Target Capacity kW */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">ظرفیت مد نظر (کیلووات):</label>
                  <input
                    type="number"
                    value={targetCapacity}
                    onChange={(e) => setTargetCapacity(e.target.value)}
                    placeholder="مثال: ۱۰"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

              </div>

              {/* Row 4: Jalali Date Picker (Solar Hijri Calendar Selector) */}
              <div className="space-y-3 p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>انتخاب تاریخ ترجیحی بازدید کارشناسی (تقویم شمسی جلالی):</span>
                  </span>
                  <span className="text-[11px] text-amber-400 font-bold">
                    {toPersianDigits(jalaliDay)} {JALALI_MONTHS[jalaliMonth]} {toPersianDigits(jalaliYear)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Jalali Day */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block">روز:</span>
                    <select
                      value={jalaliDay}
                      onChange={(e) => setJalaliDay(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    >
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          روز {toPersianDigits(d)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Jalali Month */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block">ماه:</span>
                    <select
                      value={jalaliMonth}
                      onChange={(e) => setJalaliMonth(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      {JALALI_MONTHS.map((m, idx) => (
                        <option key={idx} value={idx}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Jalali Year */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block">سال:</span>
                    <select
                      value={jalaliYear}
                      onChange={(e) => setJalaliYear(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    >
                      <option value={1405}>سال ۱۴۰۵</option>
                      <option value={1406}>سال ۱۴۰۶</option>
                    </select>
                  </div>
                </div>

                {/* Time Slot Toggle */}
                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 block mb-1.5">بازه زمانی مناسب برای حضور کارشناس:</span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setTimeSlot('morning')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        timeSlot === 'morning'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>نوبت صبح (۹:۰۰ الی ۱۳:۰۰)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTimeSlot('afternoon')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        timeSlot === 'afternoon'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>نوبت عصر (۱۴:۰۰ الی ۱۸:۰۰)</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Row 5: Notes & Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  توضیحات تکمیلی یا آدرس دقیق پروژه (اختیاری):
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="مثال: سقف سوله به مساحت ۴۰۰ متر مربع از نوع ساندویچ پانل، دارای انشعاب برق صنعتی ۱۰۰ آمپر..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>در حال ثبت اطلاعات در سامانه مهندسی آدونیس...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-slate-950" />
                    <span>ثبت نهایی درخواست و دریافت کد رهگیری بازدید</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-500">
                🔒 اطلاعات شما نزد شرکت انرژی خورشیدی آدونیس محفوظ بوده و به هیچ شخص ثالثی واگذار نخواهد شد.
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
