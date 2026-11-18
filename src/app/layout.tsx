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
    "شرکت انرژی خورشیدی آدونیس؛ مشاوره، طراحی، فروش تجهیزات Tier-1 و اجرای نیروگاه‌های خورشیدی خانگی، صنعتی و کشاورزی با گارانتی ۲۵ ساله و محاسبه‌گر هوشمند بازدهی و درآمد ساتبا.",
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
  authors: [{ name: "شرکت انرژی پاک آدونیس" }],
  creator: "آدونیس سولار (Adonis Solar)",
  publisher: "شرکت انرژی پاک آدونیس",
  metadataBase: new URL("https://adonis-solar.ir"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "آدونیس | راهکارهای هوشمند انرژی خورشیدی و استقلال پایدار برق",
    description:
      "تامین تجهیزات تراز اول، اجرای صفر تا صد نیروگاه خورشیدی، گارانتی ۲۵ ساله و قرارداد رسمی خرید تضمینی برق وزارت نیرو (ساتبا).",
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
    description: "استقلال برق در تابستان و زمستان با نیروگاه‌های خورشیدی با کیفیت آدونیس",
    images: ["https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1120",
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
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
