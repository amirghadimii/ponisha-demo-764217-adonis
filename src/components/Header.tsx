'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sun, 
  Phone, 
  Menu, 
  X, 
  Calculator, 
  Layers, 
  ShieldCheck, 
  FolderKanban, 
  HelpCircle, 
  PhoneCall,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'صفحه اصلی', href: '#hero', icon: Sun },
    { label: 'محاسبه‌گر سولار', href: '#calculator', icon: Calculator, badge: 'هوشمند' },
    { label: 'محصولات و پکیج‌ها', href: '#products', icon: Layers },
    { label: 'پروژه‌های اجرا شده', href: '#projects', icon: FolderKanban },
    { label: 'خدمات و گارانتی', href: '#services', icon: ShieldCheck },
    { label: 'سوالات متداول', href: '#faq', icon: HelpCircle },
    { label: 'تماس با ما', href: '#contact', icon: PhoneCall },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            href="#hero" 
            className="flex items-center gap-3 group text-right focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-500 text-slate-950 shadow-sm group-hover:bg-amber-600 transition-colors">
              <Sun className="w-6 h-6 animate-[spin_25s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-950 group-hover:text-amber-600 transition-colors">
                  آدونیس
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                  سولار
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">شرکت مهندسی انرژی خورشیدی</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Direct Phone Call */}
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-slate-800 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors text-sm font-semibold"
              title="تماس مستقیم با کارشناسان آدونیس"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="dir-ltr text-left font-mono font-bold">{COMPANY_INFO.phone}</span>
            </a>

            {/* Consultation CTA */}
            <button
              onClick={() => {
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  handleNavClick('#consultation');
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>مشاوره و بازدید رایگان</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200"
              aria-label="تماس با کارشناس"
            >
              <Phone className="w-5 h-5 text-emerald-600" />
            </a>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors focus:outline-none cursor-pointer"
              aria-label="باز کردن منوی موبایل"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-drawer-menu" className="lg:hidden fixed inset-x-0 top-[73px] bg-white border-b border-slate-200 shadow-xl px-5 py-6 transition-all duration-200 max-h-[calc(100vh-73px)] overflow-y-auto">
          <div className="space-y-1.5 pb-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-testid="mobile-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-800 hover:bg-slate-100 hover:text-amber-700 transition-colors cursor-pointer font-bold"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{link.label}</span>
                  </div>
                  {link.badge ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                      {link.badge}
                    </span>
                  ) : (
                    <ArrowLeft className="w-4 h-4 text-slate-400" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  handleNavClick('#consultation');
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>درخواست کارشناسی و بازدید حضوری</span>
            </button>

            <a
              href={`tel:${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-sm font-bold"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>تماس مستقیم: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
