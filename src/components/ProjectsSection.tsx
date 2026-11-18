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
  Layers, 
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
    <section id="projects" className="py-20 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            <FolderKanban className="w-4 h-4" />
            <span>بیش از ۲۸۰ نیروگاه فعال در سراسر ایران</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            نمونه پروژه‌های اجرا شده توسط آدونیس
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
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
              className="group rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 overflow-hidden flex flex-col shadow-xl hover:shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-1 cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Location and Category Badges */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-slate-700/60 shadow flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {project.location}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
                  <span className="text-xs font-black px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 shadow">
                    ظرفیت: {toPersianDigits(project.capacityKw)} کیلووات
                  </span>
                  <span className="text-[11px] font-mono text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-700">
                    سال {project.year}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Key Numbers Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-0.5">
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      <span>صرفه‌جویی سالانه:</span>
                    </div>
                    <div className="text-xs sm:text-sm font-black text-amber-300 font-mono">
                      {formatNumber(project.annualSavingToman)}
                      <span className="text-[10px] text-slate-400 mr-1">تومان</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-0.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>تولید سالانه:</span>
                    </div>
                    <div className="text-xs sm:text-sm font-black text-emerald-300 font-mono">
                      {formatNumber(project.annualGenerationKwh)}
                      <span className="text-[10px] text-slate-400 mr-1">kWh</span>
                    </div>
                  </div>
                </div>

                {/* Bottom info row */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Leaf className="w-3.5 h-3.5" />
                    کاهش {toPersianDigits(project.co2ReductionTons)} تن CO2
                  </span>
                  <span className="group-hover:text-emerald-300 flex items-center gap-1 font-semibold">
                    جزئیات فنی
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
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setActiveProject(null)}
          />

          <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {activeProject.categoryLabel}
                </span>
                <span className="text-xs font-mono text-slate-400">سال ساخت: {activeProject.year}</span>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 space-y-6">
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {activeProject.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-emerald-400 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{activeProject.location}</span>
                  <span>•</span>
                  <span>کارفرما: {activeProject.clientType}</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeProject.description}
              </p>

              {/* Stats Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">ظرفیت کل نامی:</span>
                  <div className="text-lg font-black text-amber-400 font-mono">
                    {toPersianDigits(activeProject.capacityKw)} kW
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">تولید برق سالیانه:</span>
                  <div className="text-lg font-black text-emerald-400 font-mono">
                    {formatNumber(activeProject.annualGenerationKwh)} kWh
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">صرفه‌جویی سالانه:</span>
                  <div className="text-base font-black text-amber-300 font-mono">
                    {formatNumber(activeProject.annualSavingToman)} تومان
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">کاهش آلایندگی CO2:</span>
                  <div className="text-lg font-black text-teal-400 font-mono">
                    {toPersianDigits(activeProject.co2ReductionTons)} تن/سال
                  </div>
                </div>
              </div>

              {/* Equipment list */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300">تجهیزات و فناوری‌های به کار رفته در این پروژه:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>تعداد پنل‌ها: {toPersianDigits(activeProject.panelCount)} عدد پنل خورشیدی Tier-1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>اینورتر: {activeProject.inverterModel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>استراکچر: آلومینیوم آنودایز شده و اتصالات ضد طوفان</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>سیستم مانیتورینگ: پایش ابری با قابلیت ارسال پیامک هشدار</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <span className="text-xs text-slate-400">آیا به پروژه‌ای مشابه نیاز دارید؟</span>
              <a
                href="#consultation"
                onClick={() => setActiveProject(null)}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-bold text-xs"
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
