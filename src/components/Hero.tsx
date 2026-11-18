'use client';

import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  ArrowLeft, 
  Calculator as CalcIcon, 
  CheckCircle2, 
  Sun,
  Award,
  CircleDot
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
    { value: `${COMPANY_INFO.installedCapacityMw} MW`, label: 'ظرفیت فعال نصب‌شده در سراسر کشور', icon: Zap },
    { value: `${COMPANY_INFO.guaranteeYears} سال`, label: 'ضمانت کتبی راندمان پنل و تجهیزات', icon: ShieldCheck },
    { value: '۳ تا ۴ سال', label: 'دوره بازگشت کامل اصل سرمایه‌گذاری', icon: TrendingUp },
    { value: `${COMPANY_INFO.completedProjectsCount}`, label: 'پروژه موفق صنعتی، مسکونی و کشاورزی', icon: CheckCircle2 },
  ];

  return (
    <section id="hero" className="relative pt-28 pb-16 bg-white overflow-hidden">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 solar-grid-light opacity-70 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Top Header & Value Proposition */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-4 mb-12">
          
          {/* Official Verification Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>مجری مجاز نیروگاه‌های تجدیدپذیر ساتبا • تاییدیه رسمی توانیر و شرکت توزیع برق</span>
          </div>

          {/* Bold Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 leading-[1.18] tracking-tight">
            استقلال دائمی از خاموشی برق و <br />
            <span className="text-amber-600">درآمد تضمین‌شده ۲۰ ساله با انرژی خورشیدی</span>
          </h1>

          {/* Clean Minimalist Subtitle */}
          <p className="text-slate-600 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto">
            شرکت مهندسی <strong>آدونیس</strong>، طراح و مجری نیروگاه‌های خورشیدی آن‌گرید و سیستم‌های هوشمند هیبرید باتری‌دار در ایران. سقف ساختمان یا سوله صنعتی خود را به یک مرکز پاک تولید انرژی و سودآوری بدون وقفه تبدیل کنید.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => scrollTo('calculator')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-base shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95"
            >
              <CalcIcon className="w-5 h-5 text-slate-950" />
              <span>محاسبه آنلاین توان و درآمد نیروگاه</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  scrollTo('consultation');
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>درخواست کارشناسی و بازدید رایگان</span>
            </button>
          </div>

          {/* Quick Value Points */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              پایان خاموشی تابستان صنایع (معافیت ماده ۱۶)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              تجهیزات رده یک بین‌المللی Tier-1
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              واریز ماهانه وجه خرید تضمینی برق توسط ساتبا
            </span>
          </div>

        </div>

        {/* Big Solar Panel Photography Hero Showcase */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl mb-14 bg-slate-100">
          <div className="relative aspect-16/8 sm:aspect-21/9 w-full">
            <img
              src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1600&q=85"
              alt="نیروگاه خورشیدی مدرن آدونیس با پنل‌های مونوکریستال تراز اول"
              className="w-full h-full object-cover"
            />
            {/* Crisp minimal architectural badge overlay */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200 shadow-lg text-right max-w-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-black text-slate-950">نیروگاه مونوکریستال N-Type TOPCon</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">
                طراحی آیرودینامیک سازه آلومینیومی آدونیس مقاوم در برابر طوفان‌های کویری تا ۱۲۰ کیلومتر در ساعت
              </p>
            </div>
          </div>
        </div>

        {/* Oversized Statistics Metrics Bar (Tesla Minimalist Style) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {keyStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-right hover:border-slate-300 transition-colors"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-mono tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
