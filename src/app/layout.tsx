import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "شرکت انرژی خورشیدی آدونیس | پیشگام نیروگاه‌ها و تجهیزات سولار در ایران",
  description:
    "شرکت مهندسی انرژی خورشیدی آدونیس؛ طراحی، تامین تجهیزات Tier-1، احداث نیروگاه‌های خورشیدی مسکونی، صنعتی و کشاورزی با گارانتی ۲۵ ساله و محاسبه‌گر هوشمند سودآوری ساتبا.",
  keywords: [
    "انرژی خورشیدی",
    "پنل خورشیدی",
    "اینورتر خورشیدی",
    "نیروگاه خورشیدی خانگی",
    "پکیج برق خورشیدی ویلا",
    "قرارداد ساتبا",
    "قیمت پنل خورشیدی",
    "محاسبه گر برق خورشیدی",
    "باتری لیتیومی خورشیدی",
    "آدونیس سولار",
  ],
  authors: [{ name: "شرکت مهندسی آدونیس سولار" }],
  creator: "آدونیس سولار (Adonis Solar)",
  publisher: "شرکت مهندسی آدونیس سولار",
  metadataBase: new URL("https://adonis-solar.ir"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "آدونیس | راهکارهای هوشمند انرژی خورشیدی و استقلال پایدار برق",
    description:
      "تامین تجهیزات تراز اول Tier-1، اجرای صفر تا صد نیروگاه خورشیدی، گارانتی ۲۵ ساله و خرید تضمینی ۲۰ ساله ساتبا.",
    url: "https://adonis-solar.ir",
    siteName: "انرژی خورشیدی آدونیس",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "نیروگاه خورشیدی آدونیس",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آدونیس | شرکت مهندسی انرژی خورشیدی",
    description: "استقلال پایدار از قطعی برق و درآمدزایی تضمینی با نیروگاه‌های خورشیدی آدونیس",
    images: ["https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden w-full max-w-full">
        {children}
      </body>
    </html>
  );
}
