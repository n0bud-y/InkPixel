import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultShareImage, indexable, siteSchema } from "@/lib/seo";
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd items={siteSchema()} />
        {children}
      </body>
    </html>
  );
}
