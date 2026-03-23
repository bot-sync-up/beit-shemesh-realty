import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import Script from "next/script";
import settingsData from "@/data/settings.json";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: 'מתווך נדל"ן בית שמש | 20 שנות ניסיון',
  description: 'מתווך נדל"ן מוביל בבית שמש עם מעל 20 שנות ניסיון. דירות למכירה ולהשכרה, נכסים מסחריים, פרויקטים חדשים וקרקעות.',
  keywords: ["מתווך בית שמש", 'נדל"ן בית שמש', "דירות בית שמש", "דירות למכירה בית שמש"],
  openGraph: {
    title: 'מתווך נדל"ן בית שמש | המומחה המקומי',
    description: '20 שנות ניסיון בשוק הנדל"ן של בית שמש. היכרות עמוקה, זמינות גבוהה, תוצאות מוכחות.',
    locale: "he_IL",
    type: "website",
  },
};

const s = settingsData as { phone: string; phoneRaw: string; email: string; gaId: string };

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: 'מתווך נדל"ן בית שמש',
  description: '20 שנות ניסיון בשוק הנדל"ן של בית שמש',
  telephone: s.phoneRaw,
  email: s.email,
  address: { "@type": "PostalAddress", addressLocality: "בית שמש", addressCountry: "IL" },
  areaServed: "בית שמש",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaId = s.gaId;
  return (
    <html lang="he" dir="rtl" className={assistant.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      </head>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-assistant)]">
        {children}
        <BackToTop />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}</Script>
          </>
        )}
      </body>
    </html>
  );
}
