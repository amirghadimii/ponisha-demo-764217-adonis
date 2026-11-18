'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Compass, 
  PackageCheck, 
  FileBadge, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Sparkles,
  Smartphone,
  Flame,
  Award,
  Clock
} from 'lucide-react';
import { SERVICES } from '@/lib/data';

export const ServicesSection: React.FC = () => {
  const steps = [
    {
      num: '۱',
      title: 'بازدید و ارزیابی تخصصی رایگان',
      desc: 'حضور مهندسان آدونیس در محل، سنجش زاویه تابش، ارزیابی مقاومت سقف و اندازه گیری هارمونیک‌های شبکه برق.',
    },
    {
      num: '۲',
      title: 'شبیه‌سازی ۳D و طرح توجیهی',
      desc: 'طراحی تخصصی در نرم‌افزار PVSyst، محاسبه تلفات سایه‌اندازی و ارائه گزارش بازگشت سرمایه و درآمد ماهانه ساتبا.',
    },
    {
      num: '۳',
      title: 'عقد قرارداد رسمی و اداری ساتبا',
      desc: 'اخذ مجوز احداث از شرکت توزیع نیروی برق و ثبت قرارداد ۲۰ ساله خرید تضمینی برق وزارت نیرو بدون زحمت کارفرما.',
    },
    {
      num: '۴',
      title: 'نصب و راه‌اندازی سریع (۳ تا ۷ روز)',
      desc: 'اجرای استراکچر آلومینیومی بدون سوراخ‌کاری ایزوگام، چیدمان پنل‌ها، کابل‌کشی ضد حریق و نصب تابلو برق‌های حفاظتی اشنایدر.',
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
      desc: 'پوشش کامل بیمه آتش‌سوزی، صاعقه، طوفان، سرقت و خسارات ناشی از حوادث طبیعی نیروگاه از بیمه ایران.',
      icon: Flame,
    },
  ];

  return (
    <section id="services" className="py-20 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>خدمات مهندسی، نصب استاندارد و گارانتی طلایی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            صفر تا صد اجرای نیروگاه با بالاترین استاندارد نظام مهندسی
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            از اولین تماس شما تا تحویل نیروگاه و واریز اولین وجه خرید تضمینی برق به حساب بانکی‌تان، تیم مهندسی آدونیس گام‌به‌گام در کنار شماست.
          </p>
        </div>

        {/* Step-by-Step Execution Workflow */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-white text-center mb-8">
            مراحل ۵ گانه اجرای پروژه نیروگاهی شما در آدونیس
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl bg-slate-950/70 border border-slate-800 p-5 flex flex-col justify-between space-y-3 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 font-mono font-black text-base flex items-center justify-center border border-amber-500/20">
                    {step.num}
                  </span>
                  <span className="text-[11px] text-slate-500 font-bold">گام {step.num}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warranty Pillars */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-amber-400 block mb-1">تعهدات کتبی و رسمی</span>
              <h3 className="text-2xl font-black text-white">
                بسته گارانتی طلایی و خدمات پس از فروش آدونیس
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                ضمانت‌نامه رسمی شرکتی ممهور
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {warrantyBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{badge.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{badge.desc}</p>
                </div>
              );
            })}
          </div>

          {/* IoT Smart Monitoring Feature Showcase */}
          <div className="pt-6 border-t border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6 bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">
                  اپلیکیشن اختصاصی پایش آنلاین نیروگاه (Android & iOS & Web)
                </h4>
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                  با تحویل نیروگاه، حساب کاربری سامانه مانیتورینگ هوشمند به شما تقدیم می‌شود. در هر لحظه از شبانه‌روز می‌توانید توان لحظه‌ای تولیدی، درآمد انباشته، وضعیت باتری‌ها و هشدارهای نگهداری را روی گوشی تلفن همراه خود مشاهده فرمایید.
                </p>
              </div>
            </div>

            <a
              href="#consultation"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold shrink-0 transition-colors"
            >
              درخواست مشاوره جهت احداث نیروگاه
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
