'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building, 
  Factory, 
  Compass, 
  Navigation,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormData({ name: '', phone: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 relative bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
            <Phone className="w-4 h-4" />
            <span>پاسخگویی سریع، مشاوره مهندسی و بازدید</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            راه‌های ارتباطی و نشانی دفاتر آدونیس
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            جهت مشاوره تلفنی، استعلام قیمت به‌روز تجهیزات یا هماهنگی جلسه حضوری در دفتر مرکزی یا کارگاه فنی، با ما در تماس باشید.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Information & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Office 1: Central Office Tehran */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">دفتر مرکزی تهران</h3>
                  <span className="text-[11px] text-slate-400">واحد مهندسی، فروش و انعقاد قراردادها</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{COMPANY_INFO.address}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="flex gap-3">
                    <a href="tel:02188245910" className="hover:text-amber-400 font-mono dir-ltr">
                      {COMPANY_INFO.phone}
                    </a>
                    <span>-</span>
                    <a href="tel:02188245911" className="hover:text-amber-400 font-mono dir-ltr">
                      {COMPANY_INFO.phoneSecondary}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{COMPANY_INFO.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Office 2: Workshop & Warehouse Isfahan */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Factory className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">انبار مرکزی و کارگاه فنی</h3>
                  <span className="text-[11px] text-slate-400">تست و مونتاژ استراکچر و اینورترها</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{COMPANY_INFO.factoryAddress}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-amber-400 font-mono">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile / WhatsApp direct block */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 block mb-0.5">مشاوره فوری و واتساپ مهندسی:</span>
                <span className="text-lg font-black text-white font-mono dir-ltr block">
                  {COMPANY_INFO.mobileSupport}
                </span>
              </div>
              <a
                href={`https://wa.me/98${COMPANY_INFO.mobileSupport.slice(1)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-colors"
              >
                ارسال پیام واتساپ
              </a>
            </div>

          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="mb-6 space-y-1">
                <h3 className="text-xl font-bold text-white">
                  ارسال پیام یا سوال فنی به کارشناسان آدونیس
                </h3>
                <p className="text-xs text-slate-400">
                  پیام شما مستقیماً توسط مدیران مهندسی بررسی شده و ظرف کمتر از ۲ ساعت پاسخ داده می‌شود.
                </p>
              </div>

              {isSent ? (
                <div className="p-8 text-center space-y-4 rounded-2xl bg-slate-950 border border-emerald-500/40 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">پیام شما با موفقیت دریافت گردید</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    از تماس شما با شرکت آدونیس سپاسگزاریم. کارشناس مربوطه به زودی با شماره تلفن شما تماس خواهد گرفت.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSent(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold transition-colors cursor-pointer"
                  >
                    ارسال پیام دیگر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 block">نام و نام خانوادگی:</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="نام شما"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 block">شماره تلفن تماس:</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        dir="ltr"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors text-right font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block">موضوع پیام یا نوع پروژه:</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="مثلاً: استعلام قیمت اینورتر ۱۰ کیلووات یا اجرای سقف سوله"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block">متن پیام یا توضیحات:</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="توضیحات خود را در مورد پروژه، محل ملک، توان مورد نظر یا سوالات خود بنویسید..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                  >
                    {isSending ? (
                      <span>در حال ارسال پیام...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>ارسال پیام به واحد مهندسی</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Navigation links */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <span className="flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                مسیریابی حضوری دفتر سعادت‌آباد:
              </span>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  گوگل مپ (Google Maps)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  بلد / نشان
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
