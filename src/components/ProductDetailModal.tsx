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
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {product.categoryLabel}
            </span>
            {product.tier1 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <Award className="w-3 h-3" />
                استاندارد بین‌المللی Tier-1
              </span>
            )}
          </div>
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Top Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Image Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-black shadow-lg">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Quick Specs Cards */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>ظرفیت / توان</span>
                  </div>
                  <div id="modal-product-capacity" className="font-bold text-white font-mono">{product.capacity}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>گارانتی معتبر</span>
                  </div>
                  <div id="modal-product-warranty" className="font-bold text-white text-[11px] leading-tight">{product.warranty}</div>
                </div>

                {product.efficiency && (
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Cpu className="w-3.5 h-3.5 text-sky-400" />
                      <span>راندمان</span>
                    </div>
                    <div className="font-bold text-white font-mono">{product.efficiency}</div>
                  </div>
                )}

                {product.lifespan && (
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      <span>طول عمر مفید</span>
                    </div>
                    <div className="font-bold text-white font-mono">{product.lifespan}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Description & Price Column */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h3 id="modal-product-name" className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1" dir="ltr">
                  {product.nameEn}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Key Highlights */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-400">مزایای کلیدی محصول:</h4>
                <div className="space-y-1.5">
                  {product.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Tag & CTA Box */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">قیمت نهایی با احتساب مالیات:</span>
                  <div className="text-left">
                    {product.originalPriceToman && (
                      <div className="text-xs text-slate-500 line-through">
                        {formatToman(product.originalPriceToman)}
                      </div>
                    )}
                    <div id="modal-product-price" className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                      {formatToman(product.priceToman)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    onClick={() => {
                      onConsult(product);
                      onClose();
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>سفارش و ثبت پیش‌فاکتور</span>
                  </button>

                  <a
                    href={`tel:${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>مشاوره تلفنی</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>مشخصات فنی دقیق (Datasheet Summary)</span>
              </h4>
              <span className="text-xs text-slate-500">استانداردهای بین‌المللی IEC / TUV / CE</span>
            </div>

            <div id="modal-specs-table" className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950/60">
              <div className="divide-y divide-slate-800/80">
                {Object.entries(product.specs).map(([label, val], idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-1 sm:grid-cols-3 px-4 py-3 text-xs ${
                      idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-transparent'
                    }`}
                  >
                    <span className="font-semibold text-slate-400">{label}</span>
                    <span className="sm:col-span-2 font-mono text-slate-200 mt-1 sm:mt-0 font-medium text-left dir-ltr">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>ارسال فوری به سراسر ایران • ارائه گارانتی رسمی ممهور شرکتی</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            بستن پنجره
          </button>
        </div>

      </div>
    </div>
  );
};
