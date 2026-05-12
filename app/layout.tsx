import type { Metadata, Viewport } from "next";
import { Assistant } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import settings from "@/data/settings.json";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://haktovet-hanevona.mad4113633.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'הכתובת הנכונה | תיווך נדל"ן בבית שמש — 20 שנות ניסיון',
    template: "%s | הכתובת הנכונה",
  },
  description:
    'הכתובת הנכונה — תיווך נדל"ן מקצועי בבית שמש. 20 שנות ניסיון, ליווי אישי, ידע מקומי עמוק. דירות למכירה ולהשכרה, פנטהאוזים, בתים פרטיים, נכסים מסחריים וקרקעות.',
  keywords: [
    "מתווך בית שמש",
    "נדלן בית שמש",
    "דירות למכירה בית שמש",
    "דירות להשכרה בית שמש",
    "הכתובת הנכונה",
    "תיווך נדלן בית שמש",
    "רמת בית שמש",
    "פנטהאוז בית שמש",
  ],
  authors: [{ name: "הכתובת הנכונה" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: SITE_URL,
    siteName: "הכתובת הנכונה",
    title: 'הכתובת הנכונה | תיווך נדל"ן בבית שמש',
    description:
      "מצא את הבית שלך — תיווך מקצועי עם ליווי אישי. 20 שנות ניסיון בבית שמש ובסביבה.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "הכתובת הנכונה" }],
  },
  twitter: {
    card: "summary_large_image",
    title: 'הכתובת הנכונה | תיווך נדל"ן בבית שמש',
    description: "תיווך נדל\"ן מקצועי בבית שמש — 20 שנות ניסיון, ליווי אישי.",
    images: ["/og-image.svg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#0F6E56",
  width: "device-width",
  initialScale: 1,
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "הכתובת הנכונה",
  alternateName: settings.brandEn,
  description: settings.tagline,
  url: SITE_URL,
  telephone: settings.phoneRaw,
  email: settings.email,
  image: `${SITE_URL}/og-image.svg`,
  logo: `${SITE_URL}/logo.svg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "בית שמש",
    addressCountry: "IL",
  },
  areaServed: ["בית שמש", "רמת בית שמש", "הר טוב"],
  sameAs: [settings.facebookUrl, settings.instagramUrl].filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={assistant.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-assistant)] antialiased">
        {children}
        <WhatsAppButton />
        <BackToTop />

        {settings.gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${settings.gaId}');`}
            </Script>
          </>
        )}
        {settings.metaPixelId && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${settings.metaPixelId}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
