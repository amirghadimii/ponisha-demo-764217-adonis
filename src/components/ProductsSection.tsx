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
  Award,
  ChevronLeft
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
    <section id="products" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
            <Layers className="w-4 h-4 text-amber-600" />
            <span>تجهیزات تخصصی و پکیج‌های آماده نیروگاهی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            سبد محصولات تراز اول جهانی Tier-1
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            کلیه پنل‌ها، اینورترها و باتری‌های آدونیس مستقیماً از معتبرترین برندهای دارای استانداردهای بازرسی اروپایی همراه با گارانتی کتبی تعویض و بیمه‌نامه رسمی تامین می‌گردند.
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Asymmetric Product Showcase (Avoids repetitive identical grids) */}
        <div className="space-y-8">
          
          {/* Spotlight Hero Card (First product when available) */}
          {filteredProducts.length > 0 && (
            <div
              key={filteredProducts[0].id}
              data-testid="product-card"
              onClick={() => setActiveModalProduct(filteredProducts[0])}
              className="group rounded-3xl bg-slate-50 border border-slate-300 hover:border-amber-500 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md cursor-pointer grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-slate-100 min-h-[300px]">
                <img
                  src={filteredProducts[0].image}
                  alt={filteredProducts[0].name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                {filteredProducts[0].badge && (
                  <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black shadow-sm">
                    {filteredProducts[0].badge}
                  </span>
                )}
                <div className="absolute bottom-4 right-4 bg-white/95 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900">
                  {filteredProducts[0].categoryLabel}
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 text-right">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300">
                      محصول منتخب مهندسی آدونیس
                    </span>
                    {filteredProducts[0].tier1 && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        استاندارد بین‌المللی Tier-1
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 group-hover:text-amber-600 transition-colors">
                    {filteredProducts[0].name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {filteredProducts[0].shortDesc}
                  </p>
                </div>

                {/* Key Spec Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">ظرفیت اسمی</span>
                    <span className="text-sm font-black text-slate-950 font-mono">{filteredProducts[0].capacity}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">گارانتی تعویض</span>
                    <span className="text-xs font-bold text-slate-950">{filteredProducts[0].warranty.split('+')[0]}</span>
                  </div>
                  {filteredProducts[0].efficiency && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                      <span className="text-[11px] text-slate-500 block">راندمان</span>
                      <span className="text-sm font-black text-slate-950 font-mono">{filteredProducts[0].efficiency}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Bar: Price & CTA */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">قیمت ویژه:</span>
                    <div className="text-2xl font-black text-slate-950 font-mono">
                      {formatToman(filteredProducts[0].priceToman)}
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white font-bold text-xs group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <span>مشاهده کاتالوگ و دیتاشیت</span>
                    <ChevronLeft className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Products (Varied 2-column or 3-column architectural cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.slice(1).map((product) => (
              <div
                key={product.id}
                data-testid="product-card"
                onClick={() => setActiveModalProduct(product)}
                className="group rounded-3xl bg-white border border-slate-200 hover:border-amber-500 transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md cursor-pointer text-right"
              >
                <div>
                  {/* Product Photography */}
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    {product.badge && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-black shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-white/95 text-slate-800 text-[11px] font-bold border border-slate-200">
                      {product.categoryLabel}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-lg font-black text-slate-950 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                        {product.shortDesc}
                      </p>
                    </div>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">ظرفیت</span>
                        <span className="font-bold text-slate-900 font-mono text-[11px]">{product.capacity}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">ضمانت</span>
                        <span className="font-bold text-slate-900 text-[10px]">{product.warranty.split('+')[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & CTA */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block">قیمت:</span>
                    <span className="text-lg font-black text-slate-950 font-mono">
                      {formatToman(product.priceToman)}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center transition-colors">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

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
