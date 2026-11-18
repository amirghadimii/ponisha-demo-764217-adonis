'use client';

import React from 'react';
import { 
  Sun, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  FileCheck, 
  ArrowUp,
  Heart
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-right">
            
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">تجهیزات رده یک Tier-1</div>
                <div className="text-[11px] text-slate-500">برترین برندهای جهانی با گارانتی معتبر</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">۲۵ سال ضمانت راندمان</div>
                <div className="text-[11px] text-slate-500">پشتیبانی و تامین قطعات بلندمدت</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">قرارداد رسمی ساتبا</div>
                <div className="text-[11px] text-slate-500">خرید تضمینی ۲۰ ساله وزارت نیرو</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">پشتیبانی ۲۴ ساعته</div>
                <div className="text-[11px] text-slate-500">پایش آنلاین و امداد فنی فوری</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Company Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
                <Sun className="w-6 h-6 animate-[spin_20s_linear_infinite]" />
              </div>
              <div>
                <span className="text-xl font-black text-white">شرکت انرژی خورشیدی آدونیس</span>
                <p className="text-[11px] text-slate-500">مهندسی، تامین و اجرای نیروگاه‌های تجدیدپذیر</p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              شرکت مهندسی آدونیس از سال ۱۳۹۴ با هدف ایجاد استقلال پایدار انرژی، پایان دادن به خسارات ناشی از خاموشی‌های برق صنایع و ترویج انرژی پاک در کشور فعالیت می‌کند.
            </p>

            <div className="pt-2 text-slate-400 text-xs space-y-1">
              <div>شماره ثبت شرکت: ۴۸۹۲۱۰</div>
              <div>شناسه ملی: ۱۰۱۰۳۹۲۸۱۶۰</div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white">دسترسی سریع</h4>
            <ul className="space-y-2">
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">محاسبه‌گر خورشیدی</a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">پکیج‌های آماده مسکونی</a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">اینورترهای خورشیدی</a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">باتری‌های لیتیومی LiFePO4</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-400 transition-colors">پروژه‌های صنعتی و کارخانجات</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">پرسش‌های متداول ساتبا</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white">دفتر مرکزی تهران</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>سعادت‌آباد، میدان کاج، خیابان سرو غربی، مجتمع سرو، واحد ۵۰۲</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono dir-ltr">{COMPANY_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="font-mono">{COMPANY_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Certifications and Badges */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white">مجوزها و گواهینامه‌ها</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                <span className="text-amber-400 font-bold block">وزارت نیرو</span>
                <span className="text-slate-400">تاییدیه ساتبا</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                <span className="text-emerald-400 font-bold block">نظام مهندسی</span>
                <span className="text-slate-400">پروانه رتبه ۱</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                <span className="text-sky-400 font-bold block">TUV Rheinland</span>
                <span className="text-slate-400">گواهی کیفیت IEC</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                <span className="text-purple-400 font-bold block">بورس انرژی</span>
                <span className="text-slate-400">کارگزاری تابلوی سبز</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Scroll to Top */}
      <div className="border-t border-slate-900 py-6 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 text-center sm:text-right">
            © ۱۴۰۵ تمامی حقوق مادی و معنوی متعلق به <strong>شرکت مهندسی انرژی خورشیدی آدونیس (سهامی خاص)</strong> می‌باشد.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>بازگشت به بالا</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
