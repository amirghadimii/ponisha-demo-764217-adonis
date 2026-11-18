'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Clock, 
  Flame, 
  CheckCircle2,
  Cpu,
  Zap,
  Layers,
  ArrowLeft
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const steps = [
    {
      num: '۱',
      title: 'بازدید و ارزیابی تخصصی رایگان',
      desc: 'حضور مهندسان آدونیس در محل پروژه، سنجش زاویه تابش، ارزیابی استحکام سقف و اندازه‌گیری هارمونیک‌های برق.',
    },
    {
      num: '۲',
      title: 'شبیه‌سازی ۳D و طرح توجیهی',
      desc: 'طراحی تخصصی در نرم‌افزار PVSyst، محاسبه دقیق تلفات سایه‌اندازی و ارائه گزارش بازگشت سرمایه و درآمد ماهانه ساتبا.',
    },
    {
      num: '۳',
      title: 'عقد قرارداد رسمی و اداری ساتبا',
      desc: 'اخذ مجوز احداث از شرکت توزیع برق و ثبت قرارداد ۲۰ ساله خرید تضمینی برق وزارت نیرو بدون زحمت کارفرما.',
    },
    {
      num: '۴',
      title: 'نصب و راه‌اندازی سریع (۳ تا ۷ روز)',
      desc: 'اجرای استراکچر آلومینیومی بدون آسیب به ایزوگام، چیدمان پنل‌ها، کابل‌کشی مقاوم UV و نصب تابلو برق‌های حفاظتی.',
    },
    {
      num: '۵',
      title: 'تحویل سامانه و پایش هوشمند ابری',
      desc: 'تست اتصال به شبکه، نصب کنتور دوطرفه دیجیتال، تست نهایی و تحویل پنل کاربری مانیتورینگ موبایل به کارفرما.',
    },
  ];

  const warrantyBadges = [
    {
      title: '۲۵ سال ضمانت راندمان پنل',
      desc: 'تضمین کتبی راندمان حداقل ۸۴.۸٪ پس از ۲۵ سال کارکرد پیوسته در اقلیم ایران با برگه اصالت هولوگرام‌دار.',
      icon: Award,
    },
    {
      title: '۵ سال تعویض بی‌قیدوشرط اینورتر',
      desc: 'تعویض فوری اینورتر در صورت هرگونه نقص عملکردی بدون معطلی در خط تعمیرات.',
      icon: Clock,
    },
    {
      title: '۱۰ سال ضمانت باتری‌های LiFePO4',
      desc: 'بیش از ۶۰۰۰ چرخه شارژ و دشارژ واقعی برای بانک باتری‌های فسفات آهن لیتیوم.',
      icon: ShieldCheck,
    },
    {
      title: '۳ سال بیمه‌نامه حوادث رایگان',
      desc: 'پوشش کامل بیمه آتش‌سوزی، صاعقه، طوفان، سرقت و حوادث طبیعی نیروگاه از بیمه ایران.',
      icon: Flame,
    },
  ];

  return (
    <section id="services" className="py-20 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>خدمات مهندسی، نصب استاندارد و گارانتی طلایی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            صفر تا صد احداث نیروگاه با استاندارد نظام مهندسی
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            از اولین تماس شما تا تحویل نیروگاه و واریز اولین وجه خرید تضمینی برق به حساب بانکی‌تان، تیم مهندسی آدونیس گام‌به‌گام در کنار شماست.
          </p>
        </div>

        {/* Step-by-Step Execution Workflow */}
        <div className="mb-20 text-right">
          <h3 className="text-xl sm:text-2xl font-black text-slate-950 text-center mb-10">
            مراحل ۵ گانه اجرای پروژه نیروگاهی شما در آدونیس
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:border-slate-400 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center font-mono shadow-sm mb-4">
                    {step.num}
                  </div>
                  <h4 className="text-base font-black text-slate-950 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 25-Year Warranty & Guarantees */}
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-white text-right">
          <div className="max-w-3xl mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400">
              <Award className="w-4 h-4" />
              <span>تعهد کیفیت و اصالت بدون قید و شرط</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              بسته خدمات گارانتی طلایی ۲۵ ساله آدونیس
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              تضمین عملکرد پایدار تجهیزات، حفظ راندمان تولید انرژی و آرامش خاطر سرمایه‌گذاران با اسناد معتبر حقوقی و بیمه‌ای.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {warrantyBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
