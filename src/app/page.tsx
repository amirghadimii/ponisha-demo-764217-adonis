'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Calculator } from '@/components/Calculator';
import { ProductsSection } from '@/components/ProductsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ConsultationForm } from '@/components/ConsultationForm';
import { TestimonialsFAQ } from '@/components/TestimonialsFAQ';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Product } from '@/types';

export default function Home() {
  const [consultationInitialData, setConsultationInitialData] = useState<{
    capacityKw?: number;
    area?: number;
    buildingType?: string;
    productName?: string;
  }>({});

  const handleApplyFromCalculator = (params: { capacityKw: number; area: number; buildingType: string }) => {
    setConsultationInitialData((prev) => ({
      ...prev,
      capacityKw: params.capacityKw,
      area: params.area,
      buildingType: params.buildingType,
    }));
  };

  const handleSelectProductForConsultation = (product: Product) => {
    setConsultationInitialData((prev) => ({
      ...prev,
      productName: product.name,
      capacityKw: parseFloat(product.capacity) || prev.capacityKw,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Semantic Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Interactive Solar Needs Calculator */}
        <Calculator onApplyToConsultation={handleApplyFromCalculator} />

        {/* 3. Products & Equipment with Detail Modal */}
        <ProductsSection onSelectProductForConsultation={handleSelectProductForConsultation} />

        {/* 4. Completed Projects Showcase */}
        <ProjectsSection />

        {/* 5. Installation Services & 25-Year Warranty */}
        <ServicesSection />

        {/* 6. Consultation & Site-Visit Form with Jalali Date Picker */}
        <ConsultationForm key={JSON.stringify(consultationInitialData)} initialData={consultationInitialData} />

        {/* 7. Testimonials & FAQs */}
        <TestimonialsFAQ />

        {/* 8. Contact Section */}
        <ContactSection />
      </main>

      {/* Semantic Footer */}
      <Footer />
    </div>
  );
}
