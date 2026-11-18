'use client';

import React, { useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Zap, 
  Clock, 
  CheckCircle2, 
  FileText, 
  PhoneCall, 
  Sparkles, 
  Cpu, 
  Award 
} from 'lucide-react';
import { Product } from '@/types';
import { formatToman, toPersianDigits } from '@/lib/utils';
import { COMPANY_INFO } from '@/lib/data';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onConsult: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onConsult,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div id="product-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div 
        id="modal-backdrop"
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              {product.categoryLabel}
            </span>
            {product.tier1 && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                استاندارد بین‌المللی Tier-1
              </span>
            )}
          </div>
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
            aria-label="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-right">
          
          {/* Top Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Image Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-black shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Quick Specs Cards */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    <span className="font-semibold">ظرفیت / توان</span>
                  </div>
                  <div id="modal-product-capacity" className="font-black text-slate-950 font-mono text-sm">{product.capacity}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold">گارانتی رسمی</span>
                  </div>
                  <div id="modal-product-warranty" className="font-bold text-slate-950 text-[11px] leading-tight">{product.warranty}</div>
                </div>

                {product.efficiency && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                      <Cpu className="w-3.5 h-3.5 text-sky-600" />
                      <span className="font-semibold">راندمان اسمی</span>
                    </div>
                    <div className="font-black text-slate-950 font-mono">{product.efficiency}</div>
                  </div>
                )}

                {product.lifespan && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                      <span className="font-semibold">طول عمر مفید</span>
                    </div>
                    <div className="font-black text-slate-950 font-mono">{product.lifespan}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Description & Price Column */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <h3 id="modal-product-name" className="text-xl sm:text-2xl font-black text-slate-950 leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-1" dir="ltr">
                  {product.nameEn}
                </p>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {product.description}
              </p>

              {/* Key Highlights */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold text-slate-900">مزایای کلیدی محصول:</h4>
                <div className="space-y-1.5">
                  {product.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Tag & CTA Box */}
              <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">قیمت نهایی با احتساب مالیات:</span>
                  <div className="text-left">
                    {product.originalPriceToman && (
                      <div className="text-xs text-slate-400 line-through">
                        {formatToman(product.originalPriceToman)}
                      </div>
                    )}
                    <div id="modal-product-price" className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                      {formatToman(product.priceToman)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <button
                    onClick={() => {
                      onConsult(product);
                      onClose();
                    }}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow transition-all active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>سفارش و ثبت پیش‌فاکتور</span>
                  </button>

                  <a
                    href={`tel:${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`}
                    className="py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>مشاوره تلفنی فوری</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-slate-950 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>مشخصات فنی و کاتالوگ دقیق (Datasheet Summary)</span>
              </h4>
              <span className="text-xs font-semibold text-slate-500">استانداردهای بین‌المللی IEC / TUV / CE</span>
            </div>

            <div id="modal-specs-table" className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
              <div className="divide-y divide-slate-200">
                {Object.entries(product.specs).map(([label, val], idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-1 sm:grid-cols-3 px-4 py-3 text-xs ${
                      idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'
                    }`}
                  >
                    <span className="font-bold text-slate-700">{label}</span>
                    <span className="sm:col-span-2 font-mono text-slate-900 mt-1 sm:mt-0 font-semibold text-left dir-ltr">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600 font-medium">
          <span>ارسال فوری به سراسر کشور • گارانتی رسمی ممهور شرکتی آدونیس</span>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-950 font-bold transition-colors cursor-pointer"
          >
            بستن پنجره
          </button>
        </div>

      </div>
    </div>
  );
};
