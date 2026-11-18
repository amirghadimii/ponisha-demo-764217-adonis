'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Sun, 
  Zap, 
  Battery, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft, 
  Eye, 
  Sparkles,
  Award
} from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { Product } from '@/types';
import { formatToman } from '@/lib/utils';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductsSectionProps {
  onSelectProductForConsultation?: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onSelectProductForConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: 'همه محصولات و پکیج‌ها', icon: Layers },
    { id: 'packages', label: 'پکیج‌های کامل خورشیدی', icon: Sparkles },
    { id: 'panels', label: 'پنل‌های خورشیدی', icon: Sun },
    { id: 'inverters', label: 'اینورترها', icon: Zap },
    { id: 'batteries', label: 'باتری‌های ذخیره‌ساز', icon: Battery },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleConsult = (product: Product) => {
    if (onSelectProductForConsultation) {
      onSelectProductForConsultation(product);
    }
    const formEl = document.getElementById('consultation');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
            <Layers className="w-4 h-4" />
            <span>تجهیزات تخصصی و پکیج‌های آماده نیروگاهی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            سبد محصولات تراز اول جهانی آدونیس
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            کلیه تجهیزات مستقیماً از برندهای معتبر بین‌المللی Tier-1 با گواهی‌نامه‌های بازرسی اروپایی و گارانتی رسمی تعویض تامین و پشتیبانی می‌گردند.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col shadow-xl hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1"
            >
              {/* Product Image Area */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Category & Tier-1 Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-amber-400 border border-slate-700/60 shadow">
                    {product.categoryLabel}
                  </span>
                  {product.tier1 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Tier-1
                    </span>
                  )}
                </div>

                {/* Popular Badge */}
                {product.badge && (
                  <span className="absolute bottom-3 right-3 text-xs font-black px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {product.shortDesc}
                  </p>
                </div>

                {/* Badges / Specs Pill Row */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-0.5">ظرفیت / توان:</span>
                    <span className="font-bold text-amber-400 font-mono text-xs">{product.capacity}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-0.5">گارانتی:</span>
                    <span className="font-bold text-emerald-400 text-[11px] truncate block">{product.warranty.split('+')[0]}</span>
                  </div>
                </div>

                {/* Key feature checklist (2 items) */}
                <div className="space-y-1.5 pt-1">
                  {product.highlights.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Price and Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">قیمت (تومان):</span>
                    <div className="text-left font-mono font-black text-amber-400 text-lg">
                      {formatToman(product.priceToman)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveModalProduct(product)}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>مشخصات فنی</span>
                    </button>

                    <button
                      onClick={() => handleConsult(product)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-amber-500/10 active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>مشاوره و خرید</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onConsult={handleConsult}
      />
    </section>
  );
};
