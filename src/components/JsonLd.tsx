import React from 'react';
import { COMPANY_INFO, PRODUCTS } from '@/lib/data';

export const JsonLd = () => {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://adonis-solar.ir/#organization',
    name: 'شرکت انرژی خورشیدی آدونیس (Adonis Solar)',
    alternateName: 'آدونیس سولار',
    description:
      'طراحی، تامین و اجرای نیروگاه‌های خورشیدی خانگی، صنعتی، کشاورزی و ویلایی در ایران با گارانتی ۲۵ ساله و قرارداد رسمی خرید تضمینی ساتبا',
    url: 'https://adonis-solar.ir',
    telephone: '+982188245910',
    email: COMPANY_INFO.email,
    priceRange: 'IRR',
    image: 'https://adonis-solar.ir/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'سعادت‌آباد، میدان کاج، خیابان سرو غربی، مجتمع تجاری اداری سرو، طبقه پنجم، واحد ۵۰۲',
      addressLocality: 'تهران',
      addressRegion: 'تهران',
      postalCode: '1998765432',
      addressCountry: 'IR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '35.7820',
      longitude: '51.3712',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
        opens: '08:30',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Thursday'],
        opens: '08:30',
        closes: '14:00',
      },
    ],
    sameAs: [
      'https://instagram.com/adonis_solar',
      'https://linkedin.com/company/adonis-solar',
      'https://t.me/adonis_solar',
    ],
  };

  const productSchemas = PRODUCTS.map((product) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Adonis Solar (آدونیس)',
    },
    offers: {
      '@type': 'Offer',
      url: `https://adonis-solar.ir/#products`,
      priceCurrency: 'IRR',
      price: (product.priceToman * 10).toString(), // Rial in schema standard
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'شرکت انرژی خورشیدی آدونیس',
      },
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {productSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};
