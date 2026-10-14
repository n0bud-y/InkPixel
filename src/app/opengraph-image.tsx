import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// The site's share image (Open Graph and Twitter), for every page without its own; case studies
// use their image from Contentful. Generated at build time: the brand drop on navy, the name in
// the heading font (Bricolage Grotesque from Google Fonts, or the built-in font if that fails),
// the tagline, and the address.

export const alt = `${siteConfig.name}: software, branding, and digital products`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The drop from the logo, as DropIcon draws it (src/components/ui/Button.tsx).
const drop =
  "M6.80096 0C7.63523 1.10846 9.66733 3.44118 11.2748 5.71259H11.7335V5.93642H12.0339V6.13106H11.4841V8.6808H14.1382V8.97275H13.6765V9.27541H12.7981V11.3366H13.9779V11.6782H14.3785V11.9565H12.4957V13.3871H13.6734V13.6723H13.1396C12.6429 14.9225 11.7753 16.0012 10.6468 16.7717C9.51832 17.5422 8.1798 17.9697 6.80096 18C5.76046 17.9759 4.73873 17.7257 3.81085 17.2675C2.88296 16.8094 2.0725 16.1551 1.43903 15.3527C0.805553 14.5502 0.365156 13.6201 0.150201 12.6306C-0.0647552 11.641 -0.0488075 10.6173 0.196872 9.63452C0.883921 6.88916 5.44188 1.81401 6.80696 0H6.80096ZM15.2418 5.68144H14.4937V6.40841H15.2418V5.68144ZM11.7455 6.37922V8.43069H13.8567V6.37922H11.7455ZM13.7836 13.2061V12.1356H12.6819V13.2061H13.7836ZM15.3961 11.7123H14.6479V12.4392H15.3961V11.7123ZM14.667 9.51968H13.0515V11.0943H14.667V9.51968ZM16 7.23854H14.7811V8.4229H16V7.23854ZM10.4335 6.08824V6.81228H11.1816V6.08824H10.4335ZM8.0769 7.8098H9.76849V6.16609H8.0769V7.8098ZM9.50208 11.5186V8.73529H6.63771V11.5186H9.50208ZM10.6038 10.7663H12.2793V9.13722H10.6128V10.7663H10.6038ZM11.1115 13.3842V12.0071H9.69938V13.3842H11.1115Z";

// The heading font as TrueType (the image renderer can't read the site's woff2 files).
async function headingFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600")).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image() {
  const font = await headingFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "88px 96px",
          backgroundColor: "#151936",
          backgroundImage:
            "radial-gradient(circle at 92% 8%, rgba(201,29,76,0.45), transparent 45%), radial-gradient(circle at 8% 100%, rgba(250,97,67,0.22), transparent 40%)",
          color: "#f6efeb",
        }}
      >
        <svg width="104" height="117" viewBox="0 0 16 18">
          <defs>
            <linearGradient id="drop" x1="0" y1="0" x2="16" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c91d4c" />
              <stop offset="1" stopColor="#fa6143" />
            </linearGradient>
          </defs>
          <path fillRule="evenodd" clipRule="evenodd" d={drop} fill="url(#drop)" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: font ? "Bricolage Grotesque" : undefined, fontSize: 88, letterSpacing: -2, lineHeight: 1.05, color: "#ffffff" }}>
            {siteConfig.name}
          </div>
          <div style={{ marginTop: 24, fontSize: 34, lineHeight: 1.35, maxWidth: 900, opacity: 0.85 }}>
            {siteConfig.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28, color: "#fa6143" }}>
          <div style={{ width: 72, height: 4, borderRadius: 2, backgroundImage: "linear-gradient(90deg, #c91d4c, #fa6143)" }} />
          {new URL(siteConfig.url).host}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Bricolage Grotesque", data: font, style: "normal", weight: 600 }] : undefined,
    },
  );
}
