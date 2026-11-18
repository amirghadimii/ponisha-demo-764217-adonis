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
  ArrowLeft, 
  AlertCircle,
  Copy,
  Check,
  RotateCcw
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
  const [city, setCity] = useState('تهران');
  const [buildingType, setBuildingType] = useState(initialData?.buildingType || 'residential');
  const [gridType, setGridType] = useState<'on-grid' | 'off-grid' | 'hybrid'>('on-grid');
  const [area, setArea] = useState(initialData?.area?.toString() || '');
  const [targetCapacity, setTargetCapacity] = useState(initialData?.capacityKw?.toString() || '');
  
  // Jalali Date State
  const [jalaliYear, setJalaliYear] = useState(1405);
  const [jalaliMonth, setJalaliMonth] = useState(2); // خرداد (0-indexed 2)
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
    }, 250);
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
    <section id="consultation" className="py-20 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>امکان‌سنجی، ارزیابی سقف و برآورد اقتصادی رایگان</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            درخواست کارشناسی و بازدید حضوری در محل
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            کارشناسان ارشد مهندسی آدونیس در تاریخ انتخابی شما در محل پروژه حاضر شده و نقشه اولیه زاویه تابش، استحکام سازه و برآورد رسمی را ارائه می‌نمایند.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl text-right">
          
          {trackingCode ? (
            /* Success State View */
            <div id="consultation-success-view" className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  درخواست شما با موفقیت ثبت شد
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                  جلسه بازدید و ارزیابی فنی در تقویم آدونیس رزرو گردید
                </h3>
                <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  جناب آقای / سرکار خانم <strong className="text-slate-950">{fullName}</strong>، کارشناسان مهندسی آدونیس حداکثر ظرف ۲ ساعت کاری جهت هماهنگی ساعت دقیق با شماره <strong className="text-slate-950 font-mono">{toPersianDigits(mobile)}</strong> تماس حاصل خواهند نمود.
                </p>
              </div>

              {/* Tracking Code Badge */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="text-right">
                  <span className="text-xs text-slate-500 block font-semibold">شماره پیگیری اختصاصی پرونده:</span>
                  <span id="tracking-code-display" className="text-2xl font-black text-slate-950 font-mono tracking-wider">
                    {trackingCode}
                  </span>
                </div>
                <button
                  type="button"
                  id="copy-tracking-code-btn"
                  onClick={handleCopyCode}
                  className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">کپی شد</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-600" />
                      <span>کپی کد</span>
                    </>
                  )}
                </button>
              </div>

              {/* Summary Details Box */}
              <div className="max-w-md mx-auto text-xs text-slate-700 rounded-2xl bg-slate-50 p-4 border border-slate-200 divide-y divide-slate-200 text-right">
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-semibold">تاریخ بازدید درخواستی (شمسی):</span>
                  <span className="font-bold text-slate-950">
                    {toPersianDigits(jalaliDay)} {JALALI_MONTHS[jalaliMonth]} {toPersianDigits(jalaliYear)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-semibold">بازه زمانی:</span>
                  <span className="font-bold text-slate-950">
                    {timeSlot === 'morning' ? 'نوبت صبح (۹:۰۰ الی ۱۳:۰۰)' : 'نوبت عصر (۱۴:۰۰ الی ۱۸:۰۰)'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-semibold">محل پروژه:</span>
                  <span className="font-bold text-slate-950">{city}</span>
                </div>
                {targetCapacity && (
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500 font-semibold">ظرفیت مد نظر:</span>
                    <span className="font-black text-slate-950 font-mono">{toPersianDigits(targetCapacity)} kW</span>
                  </div>
                )}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  id="reset-form-btn"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>ثبت درخواست بازدید جدید</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>تماس مستقیم با دفتر مرکزی ({COMPANY_INFO.phone})</span>
                </a>
              </div>

            </div>
          ) : (
            /* Interactive Consultation Form */
            <form id="consultation-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-600" />
                    <span>نام و نام خانوادگی متقاضی:</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="consultation-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="مثال: مهندس رضوانی"
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-slate-950 placeholder-slate-400 focus:outline-none transition-colors ${
                      errors.fullName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-300 focus:border-amber-500'
                    }`}
                  />
                  {errors.fullName && (
                    <p id="fullname-error" className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-bold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>شماره تلفن همراه (جهت هماهنگی و پیامک):</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="consultation-mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      if (errors.mobile) setErrors({ ...errors, mobile: '' });
                    }}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    dir="ltr"
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-slate-950 placeholder-slate-400 focus:outline-none transition-colors text-right font-mono font-semibold ${
                      errors.mobile ? 'border-rose-500 focus:border-rose-500' : 'border-slate-300 focus:border-amber-500'
                    }`}
                  />
                  {errors.mobile && (
                    <p id="mobile-error-message" className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-bold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.mobile}</span>
                    </p>
                  )}
                </div>

              </div>

              {/* Row 2: Location & Building Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* City / Province */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>استان و شهر محل احداث پروژه:</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="consultation-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-950 focus:outline-none focus:border-amber-500 transition-colors font-medium"
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
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>نوع کاربری و ملک:</span>
                  </label>
                  <select
                    id="consultation-building-type"
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-950 focus:outline-none focus:border-amber-500 transition-colors font-medium"
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
                  <label className="text-xs font-bold text-slate-800 block">نوع سیستم مد نظر:</label>
                  <select
                    id="consultation-grid-type"
                    value={gridType}
                    onChange={(e) => setGridType(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-3 text-xs text-slate-950 focus:outline-none focus:border-amber-500 transition-colors font-semibold"
                  >
                    <option value="on-grid">متصل به شبکه (آن‌گرید ساتبا)</option>
                    <option value="hybrid">هیبرید هوشمند با باتری (ضد قطعی)</option>
                    <option value="off-grid">مستقل از شبکه (آف‌گرید ویلایی)</option>
                  </select>
                </div>

                {/* Approximate Area */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">مساحت تقریبی سقف (m²):</label>
                  <input
                    id="consultation-area"
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="مثال: ۱۰۰"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                {/* Target Capacity kW */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">ظرفیت مد نظر (کیلووات):</label>
                  <input
                    id="consultation-capacity"
                    type="number"
                    value={targetCapacity}
                    onChange={(e) => setTargetCapacity(e.target.value)}
                    placeholder="مثال: ۱۵.۵"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

              </div>

              {/* Row 4: Jalali Date Picker (Solar Hijri Calendar Selector) */}
              <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>انتخاب تاریخ ترجیحی بازدید کارشناسی (تقویم شمسی جلالی):</span>
                  </span>
                  <span id="selected-jalali-date-label" className="text-xs text-amber-700 font-black">
                    {toPersianDigits(jalaliDay)} {JALALI_MONTHS[jalaliMonth]} {toPersianDigits(jalaliYear)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Jalali Day */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 block font-semibold">روز:</span>
                    <select
                      id="jalali-day-select"
                      value={jalaliDay}
                      onChange={(e) => setJalaliDay(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-950 focus:outline-none focus:border-amber-500 font-mono font-bold"
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
                    <span className="text-[11px] text-slate-500 block font-semibold">ماه:</span>
                    <select
                      id="jalali-month-select"
                      value={jalaliMonth}
                      onChange={(e) => setJalaliMonth(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-950 focus:outline-none focus:border-amber-500 font-bold"
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
                    <span className="text-[11px] text-slate-500 block font-semibold">سال:</span>
                    <select
                      id="jalali-year-select"
                      value={jalaliYear}
                      onChange={(e) => setJalaliYear(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-950 focus:outline-none focus:border-amber-500 font-mono font-bold"
                    >
                      <option value={1405}>سال ۱۴۰۵</option>
                      <option value={1406}>سال ۱۴۰۶</option>
                    </select>
                  </div>
                </div>

                {/* Time Slot Toggle */}
                <div className="pt-2">
                  <span className="text-xs text-slate-600 block mb-1.5 font-bold">بازه زمانی مناسب برای حضور کارشناس در محل:</span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      id="timeslot-morning-btn"
                      onClick={() => setTimeSlot('morning')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        timeSlot === 'morning'
                          ? 'bg-amber-500 text-slate-950 border-amber-500'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>نوبت صبح (۹:۰۰ الی ۱۳:۰۰)</span>
                    </button>

                    <button
                      type="button"
                      id="timeslot-afternoon-btn"
                      onClick={() => setTimeSlot('afternoon')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        timeSlot === 'afternoon'
                          ? 'bg-amber-500 text-slate-950 border-amber-500'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>نوبت عصر (۱۴:۰۰ الی ۱۸:۰۰)</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Row 5: Notes & Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  توضیحات تکمیلی یا آدرس دقیق پروژه (اختیاری):
                </label>
                <textarea
                  id="consultation-description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="مثال: سقف سوله به مساحت ۴۰۰ متر مربع از نوع ساندویچ پانل، دارای انشعاب برق صنعتی ۱۰۰ آمپر..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="consultation-submit-btn"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
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

              <div className="text-center text-[11px] text-slate-500 font-medium">
                🔒 اطلاعات شما نزد شرکت مهندسی آدونیس محفوظ بوده و صرفاً جهت هماهنگی جلسه ارزیابی استفاده می‌گردد.
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
