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
  ArrowUp
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';
import { toPersianDigits } from '@/lib/utils';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs text-right">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-slate-900 bg-slate-900/50 py-8">
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
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-sm">
                <Sun className="w-6 h-6 animate-[spin_25s_linear_infinite]" />
              </div>
              <div>
                <span className="text-xl font-black text-white">شرکت انرژی خورشیدی آدونیس</span>
                <p className="text-[11px] text-slate-400">مهندسی، تامین و اجرای نیروگاه‌های تجدیدپذیر</p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              شرکت مهندسی آدونیس از سال ۱۳۹۴ با هدف ایجاد استقلال پایدار انرژی، پایان دادن به خسارات ناشی از خاموشی‌های برق صنایع و ترویج انرژی پاک در سراسر کشور فعالیت می‌کند.
            </p>

            <div className="pt-2 text-slate-400 text-xs space-y-1 font-mono">
              <div>شماره ثبت شرکت: ۴۸۹۲۱۰</div>
              <div>شناسه ملی: ۱۰۱۰۳۹۲۸۱۶۰</div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">صفحه اصلی</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">محاسبه‌گر آنلاین هزینه و درآمد</a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">تجهیزات و پکیج‌های نیروگاهی</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-400 transition-colors">پروژه‌های اجرا شده در کشور</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">خدمات فنی و گارانتی طلایی</a>
              </li>
              <li>
                <a href="#consultation" className="hover:text-amber-400 transition-colors">درخواست کارشناسی و بازدید در محل</a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white">ارتباط با آدونیس</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-mono dir-ltr">{COMPANY_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                <span className="font-mono">{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {toPersianDigits(1405)} شرکت مهندسی و توسعه انرژی پاک آدونیس. تمامی حقوق محفوظ است.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>بازگشت به ابتدای صفحه</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
