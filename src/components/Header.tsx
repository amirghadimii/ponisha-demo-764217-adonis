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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'صفحه اصلی', href: '#hero', icon: Sun },
    { label: 'محاسبه‌گر سولار', href: '#calculator', icon: Calculator, badge: 'هوشمند' },
    { label: 'محصولات و تجهیزات', href: '#products', icon: Layers },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
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
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
              <Sun className="w-6 h-6 text-slate-950 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  آدونیس
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  سولار
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">شرکت مهندسی انرژی خورشیدی</p>
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
                className="relative px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all flex items-center gap-1.5"
              >
                {link.label}
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Phone quick link */}
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors text-sm font-medium"
              title="تماس مستقیم با کارشناسان"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="dir-ltr text-left font-mono">{COMPANY_INFO.phone}</span>
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
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>مشاوره و بازدید رایگان</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="p-2 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800"
              aria-label="تماس با کارشناس"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors focus:outline-none cursor-pointer"
              aria-label="باز کردن منوی موبایل"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-drawer-menu" className="lg:hidden fixed inset-x-0 top-[65px] bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl px-5 py-6 transition-all duration-300 max-h-[calc(100vh-70px)] overflow-y-auto">
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
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-200 hover:bg-slate-900 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-amber-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">{link.label}</span>
                  </div>
                  {link.badge ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      {link.badge}
                    </span>
                  ) : (
                    <ArrowLeft className="w-4 h-4 text-slate-600" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  handleNavClick('#consultation');
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>درخواست کارشناسی و بازدید حضوری</span>
            </button>

            <a
              href={`tel:${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-medium"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>تماس مستقیم: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
