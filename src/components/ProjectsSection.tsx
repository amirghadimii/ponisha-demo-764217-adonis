'use client';

import React, { useState } from 'react';
import { 
  FolderKanban, 
  MapPin, 
  Zap, 
  Coins, 
  TrendingUp, 
  Leaf, 
  X, 
  Calendar, 
  ArrowLeft,
  CheckCircle2,
  Building2,
  Home,
  Sprout,
  SunMedium
} from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import { Project } from '@/types';
import { formatNumber, formatToman, toPersianDigits } from '@/lib/utils';

export const ProjectsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filterOptions = [
    { id: 'all', label: 'همه پروژه‌ها', icon: FolderKanban },
    { id: 'industrial', label: 'صنعتی و کارخانجات', icon: Building2 },
    { id: 'residential', label: 'مسکونی و ویلایی', icon: Home },
    { id: 'agricultural', label: 'کشاورزی و پمپاژ چاه', icon: Sprout },
    { id: 'farm', label: 'مزارع خورشیدی (آن‌گرید)', icon: SunMedium },
  ];

  const filteredProjects = selectedFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
            <FolderKanban className="w-4 h-4 text-emerald-600" />
            <span>بیش از ۲۸۰ نیروگاه فعال در سراسر ایران</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            نمونه پروژه‌های اجرا شده توسط آدونیس
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            از نیروگاه‌های صنعتی و کارخانجات تا ویلاهای لوکس مستقل از شبکه و مزارع پمپاژ کشاورزی؛ آدونیس پایداری انرژی را در سراسر کشور تضمین نموده است.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group rounded-3xl bg-white border border-slate-200 hover:border-slate-400 transition-all duration-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md cursor-pointer text-right"
            >
              {/* Project Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                
                {/* Location and Category Badges */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/95 text-slate-900 border border-slate-200 shadow-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    {project.location}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
                  <span className="text-xs font-black px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 shadow-sm">
                    ظرفیت: {toPersianDigits(project.capacityKw)} kW
                  </span>
                  <span className="text-[11px] font-mono text-slate-800 bg-white/95 px-2 py-0.5 rounded border border-slate-200 font-bold">
                    سال {project.year}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-950 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Key Numbers Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-0.5">
                      <Coins className="w-3.5 h-3.5 text-amber-600" />
                      <span className="font-semibold">صرفه‌جویی سالانه:</span>
                    </div>
                    <div className="text-xs sm:text-sm font-black text-slate-950 font-mono">
                      {formatNumber(project.annualSavingToman)}
                      <span className="text-[10px] text-slate-500 mr-1">تومان</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-0.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-semibold">تولید سالانه:</span>
                    </div>
                    <div className="text-xs sm:text-sm font-black text-slate-950 font-mono">
                      {formatNumber(project.annualGenerationKwh)}
                      <span className="text-[10px] text-slate-500 mr-1">kWh</span>
                    </div>
                  </div>
                </div>

                {/* Bottom info row */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <Leaf className="w-3.5 h-3.5" />
                    کاهش {toPersianDigits(project.co2ReductionTons)} تن CO2
                  </span>
                  <span className="group-hover:text-amber-600 flex items-center gap-1 font-bold text-slate-900 transition-colors">
                    جزئیات پروژه
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveProject(null)}
          />

          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 text-right">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {activeProject.categoryLabel}
                </span>
                <span className="text-xs font-mono text-slate-600 font-bold">سال بهره‌برداری: {activeProject.year}</span>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
                aria-label="بستن پنجره"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  {activeProject.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-600 mt-1 font-semibold">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{activeProject.location}</span>
                  <span>•</span>
                  <span>کارفرما: {activeProject.clientType}</span>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {activeProject.description}
              </p>

              {/* Stats Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block mb-1">ظرفیت کل نامی:</span>
                  <div className="text-xl font-black text-slate-950 font-mono">
                    {toPersianDigits(activeProject.capacityKw)} kW
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block mb-1">تولید برق سالیانه:</span>
                  <div className="text-xl font-black text-slate-950 font-mono">
                    {formatNumber(activeProject.annualGenerationKwh)} kWh
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block mb-1">صرفه‌جویی سالانه:</span>
                  <div className="text-lg font-black text-slate-950 font-mono">
                    {formatNumber(activeProject.annualSavingToman)} تومان
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block mb-1">کاهش آلایندگی CO2:</span>
                  <div className="text-xl font-black text-emerald-700 font-mono">
                    {toPersianDigits(activeProject.co2ReductionTons)} تن/سال
                  </div>
                </div>
              </div>

              {/* Equipment list */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900">تجهیزات و فناوری‌های به کار رفته در این پروژه:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>تعداد پنل‌ها: {toPersianDigits(activeProject.panelCount)} عدد پنل خورشیدی Tier-1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>اینورتر: {activeProject.inverterModel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>استراکچر: آلومینیوم آنودایز شده و اتصالات ضد طوفان</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>سیستم مانیتورینگ: پایش ابری با قابلیت ارسال پیامک هشدار</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-semibold">آیا به پروژه‌ای مشابه نیاز دارید؟</span>
              <a
                href="#consultation"
                onClick={() => setActiveProject(null)}
                className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-colors shadow-sm"
              >
                درخواست بازدید برای پروژه من
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
