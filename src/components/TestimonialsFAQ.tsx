'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Quote, 
  Zap, 
  Star, 
  MessageSquare,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { FAQS, TESTIMONIALS } from '@/lib/data';

export const TestimonialsFAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 relative bg-slate-900/30 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Block */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>رضایت کارفرمایان و صاحبان صنایع</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              روایت کارفرمایان نیروگاه‌های خورشیدی آدونیس
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              صدها کارخانه، مجتمع مسکونی و زمین کشاورزی با اعتماد به دانش مهندسی آدونیس، به آرامش خاطر و استقلال کامل انرژی دست یافته‌اند.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-7 flex flex-col justify-between space-y-6 relative group hover:border-amber-500/40 transition-colors shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      {item.capacity}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    «{item.comment}»
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-amber-500/30"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{item.name}</div>
                    <div className="text-[11px] text-slate-400">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Block */}
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>پاسخ به ابهامات و پرسش‌های متداول</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              سوالات پرتکرار پیرامون نیروگاه‌های خورشیدی در ایران
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              هر آنچه باید درباره قرارداد ۲۰ ساله ساتبا، تکنولوژی پنل‌ها و شرایط فنی احداث نیروگاه خورشیدی بدانید.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-500/5'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-right gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-amber-500/20 text-amber-400' : 'text-slate-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mini Contact Pill in FAQ */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">پاسخ سوال خود را نیافتید؟</div>
                <div className="text-xs text-slate-400">کارشناسان فنی آدونیس آماده پاسخگویی و مشاوره تخصصی رایگان به شما هستند.</div>
              </div>
            </div>
            <a
              href="#contact"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
            >
              ارتباط مستقیم با واحد فنی
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
