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
  PhoneCall,
  Sparkles
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
    }, 600);
  };

  return (
    <section id="contact" className="py-20 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
            <Phone className="w-4 h-4 text-amber-600" />
            <span>پاسخگویی سریع، مشاوره مهندسی و بازدید</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            راه‌های ارتباطی و نشانی دفاتر آدونیس
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            جهت مشاوره تلفنی، استعلام قیمت به‌روز تجهیزات یا هماهنگی جلسه حضوری در دفتر مرکزی یا کارگاه فنی، با ما در تماس باشید.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-right">
          
          {/* Contact Information & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Office 1: Central Office Tehran */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950">دفتر مرکزی تهران</h3>
                  <span className="text-xs text-slate-500 font-semibold">واحد مهندسی، فروش و انعقاد قراردادها</span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                  <span className="leading-relaxed">{COMPANY_INFO.address}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="flex gap-3">
                    <a href="tel:02188245910" className="hover:text-amber-600 font-mono font-bold dir-ltr">
                      {COMPANY_INFO.phone}
                    </a>
                    <span>-</span>
                    <a href="tel:02188245911" className="hover:text-amber-600 font-mono font-bold dir-ltr">
                      {COMPANY_INFO.phoneSecondary}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{COMPANY_INFO.workingHours}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-purple-600 shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="font-mono text-slate-900 font-bold hover:text-amber-600">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Office 2: Factory & Assembly Workshop */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Factory className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950">کارخانه و خط مونتاژ استراکچر</h3>
                  <span className="text-xs text-slate-500 font-semibold">انبار مرکزی تجهیزات و پشتیبانی فنی</span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span className="leading-relaxed">{COMPANY_INFO.factoryAddress}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-mono font-bold dir-ltr">۰۳۱-۴۵۶۴۳۲۱۰</span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-black text-slate-950 mb-2">
              ارسال پیام مستقیم به واحد مهندسی
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              جهت طرح سوالات، استعلام قیمت پروژه‌های صنعتی بالای ۱۰۰ کیلووات یا دریافت مشاوره فنی فرم زیر را تکمیل نمایید.
            </p>

            {isSent ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-slate-950">پیام شما با موفقیت دریافت شد</h4>
                <p className="text-xs text-slate-600">
                  کارشناسان آدونیس در اسرع وقت با شما تماس خواهند گرفت.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  ارسال پیام دیگر
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 block">نام و نام خانوادگی:</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مثال: مهندس حسینی"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 block">شماره تلفن همراه:</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      dir="ltr"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono text-right"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 block">موضوع پیام:</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="مثال: استعلام احداث نیروگاه سقف سوله ۲۰۰ کیلووات"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 block">متن پیام یا مشخصات پروژه:</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="توضیحات تکمیلی..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <span>در حال ارسال پیام...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>ارسال پیام به واحد مهندسی آدونیس</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
