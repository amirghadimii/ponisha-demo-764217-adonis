'use client';

import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  ArrowLeft, 
  Calculator, 
  CheckCircle2, 
  Sun,
  Activity,
  BatteryCharging
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

interface HeroProps {
  onOpenConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const keyStats = [
    { value: `${COMPANY_INFO.installedCapacityMw} مگاوات`, label: 'ظرفیت نصب‌شده فعال در کشور', icon: Zap },
    { value: `${COMPANY_INFO.guaranteeYears} سال`, label: 'ضمانت کتبی راندمان و پشتیبانی', icon: ShieldCheck },
    { value: '۳ تا ۴ سال', label: 'دوره بازگشت کامل اصل سرمایه', icon: TrendingUp },
    { value: `${COMPANY_INFO.completedProjectsCount}`, label: 'پروژه موفق خانگی، صنعتی و ویلایی', icon: CheckCircle2 },
  ];

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background Gradient & Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute inset-0 solar-grid-pattern opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-semibold text-amber-300">
                قرارداد رسمی خرید تضمینی ۲۰ ساله ساتبا + تابلوی سبز بورس انرژی
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              استقلال دائمی از قطعی برق و <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 via-amber-300 to-emerald-400">
                درآمدزایی پایدار با انرژی پاک خورشیدی
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              شرکت مهندسی <strong>آدونیس</strong>، مجری تخصصی نیروگاه‌های خورشیدی آن‌گرید و سیستم‌های هیبرید پشتیبان در ایران. سقف خانه، ویلا یا سوله کارخانه خود را به یک ژنراتور پاک و بی‌پایان تولید ثروت و امنیت انرژی تبدیل کنید.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>پایان خاموشی تابستان و معافیت از ماده ۱۶ صنایع</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>درآمد ماهانه تضمین‌شده با پرداخت ماهانه وزارت نیرو</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>تجهیزات رده یک بین‌المللی Tier-1 با استانداردهای CE و TUV</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>تامین باتری‌های LiFePO4 با سوئیچینگ آنی زیر ۱۰ میلی‌ثانیه</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => scrollTo('calculator')}
                className="group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Calculator className="w-5 h-5" />
                <span>محاسبه آنلاین هزینه و درآمد نیروگاه شما</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>

              <button
                onClick={() => {
                  if (onOpenConsultation) {
                    onOpenConsultation();
                  } else {
                    scrollTo('consultation');
                  }
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-base border border-slate-700/80 shadow-md hover:border-amber-500/40 transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>درخواست کارشناسی و بازدید در محل</span>
              </button>
            </div>

            {/* Trust Micro-bar */}
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                مشاوره فنی و امکان‌سنجی ۱۰۰٪ رایگان
              </span>
              <span>•</span>
              <span>پاسخگویی سریع ۲۴ ساعته</span>
              <span>•</span>
              <span className="font-mono text-slate-300">پشتیبانی: {COMPANY_INFO.mobileSupport}</span>
            </div>

          </div>

          {/* Right Column: Energy-Tech Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-1000" />

              {/* Glass Card */}
              <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-xl p-5 shadow-2xl space-y-4">
                
                {/* Header of the Live Monitor Box */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-200">سامانه پایش هوشمند نیروگاه آدونیس</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    آنلاین • زنده
                  </span>
                </div>

                {/* Main Metric Display */}
                <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/60 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">توان تولیدی لحظه‌ای نیروگاه (Real-time Power)</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-amber-400 font-mono">۱۲.۴</span>
                        <span className="text-sm font-bold text-slate-300">کیلووات (kW)</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <Sun className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
                    </div>
                  </div>

                  {/* Progress bar of current solar power against max capacity */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>شدت تابش خورشید: ۹۲٪</span>
                      <span>ظرفیت کل نامی: ۱۵kW</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full w-[83%] animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Sub Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                      <span>تولید امروز</span>
                    </div>
                    <div className="text-lg font-bold text-white font-mono">
                      ۴۸.۶ <span className="text-xs text-slate-400">kWh</span>
                    </div>
                    <p className="text-[10px] text-emerald-400 mt-0.5">معادل ۱۸۸ هزار تومان درآمد</p>
                  </div>

                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <Activity className="w-3.5 h-3.5 text-sky-400" />
                      <span>راندمان اینورتر</span>
                    </div>
                    <div className="text-lg font-bold text-white font-mono">
                      ۹۸.۴٪
                    </div>
                    <p className="text-[10px] text-sky-400 mt-0.5">وضعیت پایدار • بدون خطا</p>
                  </div>
                </div>

                {/* Mini Image Preview */}
                <div className="relative h-32 rounded-xl overflow-hidden border border-slate-800 group">
                  <img
                    src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80"
                    alt="نیروگاه خورشیدی آدونیس"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-xs font-medium text-slate-200">
                      پروژه نصب‌شده: نیروگاه ۱۵kW سعادت‌آباد تهران
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Key Stats Strip */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {keyStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
