import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { defaultShareImage, indexable } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

// Headings. The optical-size axis keeps large headlines crisp.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

// Body text.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Small labels only (eyebrows, tags).
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Defaults for every page; each page sets its own title, description, canonical URL, and Open
// Graph tags with pageMetadata() (src/lib/seo.ts). Twitter's tags are filled from Open Graph.
// Structured data is each page's own (<PageSchema>), so a page can replace any of it.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    images: [defaultShareImage],
  },
  twitter: { card: "summary_large_image" },
  robots: indexable ? undefined : { index: false, follow: false },
  // Google Search Console ownership check (<meta name="google-site-verification">). Keep it.
  verification: { google: "XUHo0WC4b6qqG-0kf1b3Y5KIkcbXP1FMwUHkVnealgY" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google tag (gtag.js): Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-N33JLE8FFM" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-N33JLE8FFM');`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
