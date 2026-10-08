import Image from "next/image";
import type { CaseStudy } from "@/contentful/queries/case-studies";

type HeroProps = {
  layout: CaseStudy["heroLayout"];
  heading: string;
  text: string | null;
  image: CaseStudy["heroImage"];
  layers: CaseStudy["heroLayers"];
  client: CaseStudy["client"];
};

// Top of a case study, in one of two layouts (picked per case study in Contentful). The text
// entrance is CSS, like the home hero, so it starts on the first frame; the hero image is the
// LCP element, so it is preloaded and never hidden.
export function CaseStudyHero(props: HeroProps) {
  return props.layout === "centered" ? <CenteredHero {...props} /> : <SplitHero {...props} />;
}

// The hero image, or, when it has layers, the layers stacked back to front in a box of the
// image's size, each floating up and down (still for reduced motion). The layers are all the
// size of the image, so stacked at rest they are exactly the image. They share one pace and
// start up to 1.3s apart, a gentle wave in which overlapping layers stay within a few pixels
// of each other (further apart, the cut edges between them would show).
function HeroVisual({ image, layers, sizes }: Pick<HeroProps, "image" | "layers"> & { sizes: string }) {
  if (!layers.length) {
    return (
      <Image
        src={image.url}
        width={image.width}
        height={image.height}
        alt={image.alt}
        unoptimized={image.isSvg}
        preload
        sizes={sizes}
        className="h-auto w-auto max-w-full"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={image.alt}
      className="relative w-full"
      style={{ maxWidth: image.width, aspectRatio: `${image.width} / ${image.height}` }}
    >
      {layers.map((layer, index) => (
        <Image
          key={layer.url}
          src={layer.url}
          width={layer.width}
          height={layer.height}
          alt=""
          unoptimized={layer.isSvg}
          preload
          sizes={sizes}
          className="absolute inset-0 size-full motion-safe:animate-float"
          style={{ animationDelay: `${((-1.3 * index) / Math.max(1, layers.length - 1)).toFixed(2)}s` }}
        />
      ))}
    </div>
  );
}

// On white (the header is white on case-study pages): the client's logo (once approved), the
// gradient heading and the intro on the left, the image on the right.
function SplitHero({ heading, text, image, layers, client }: HeroProps) {
  return (
    <section aria-labelledby="case-study-title" className="relative isolate overflow-hidden bg-white">
      <div className="container-site grid grid-cols-[minmax(0,1fr)] items-center gap-10 pt-32 pb-[clamp(4rem,5.85vw,7rem)] sm:pt-36 lg:grid-cols-2 lg:gap-[clamp(2rem,4vw,6rem)] lg:pt-40 2xl:pt-48">
        <div className="motion-safe:animate-rise">
          {client?.logo && (
            <Image
              src={client.logo.url}
              width={client.logo.width}
              height={client.logo.height}
              alt={client.logo.alt || client.name}
              unoptimized={client.logo.isSvg}
              loading="eager"
              className="mb-[clamp(1.25rem,1.6vw,2rem)] h-[clamp(4rem,6vw,7.25rem)] w-auto"
            />
          )}
          <h1
            id="case-study-title"
            className="max-w-[22em] bg-brand-gradient-reverse bg-clip-text font-display text-[clamp(1.75rem,2.35vw,2.8rem)] leading-[1.18] font-bold tracking-[-0.015em] text-transparent"
          >
            {heading}
          </h1>
          {text && (
            <p className="mt-5 max-w-[36em] text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.9] text-primary/85">
              {text}
            </p>
          )}
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroVisual image={image} layers={layers} sizes="(min-width: 1024px) 46vw, 100vw" />
        </div>
      </div>
    </section>
  );
}

// The arch from the design's 1920 × 1065 hero: two orange → pink bands over the navy.
const outerArc =
  "M1929 1131C1929 1054.7 1903.96 979.151 1855.32 908.661C1806.67 838.171 1735.37 774.122 1645.48 720.171C1555.59 666.22 1448.88 623.424 1331.44 594.226C1213.99 565.028 1088.12 550 961 550C833.88 550 708.006 565.028 590.562 594.226C473.119 623.424 366.408 666.22 276.521 720.171C186.633 774.122 115.331 838.171 66.6846 908.661C18.038 979.151 -7.00001 1054.7 -7 1131H60.3363C60.3363 1060.01 83.6327 989.714 128.895 924.127C174.158 858.541 240.5 798.947 324.135 748.749C407.769 698.551 507.057 658.732 616.331 631.565C725.604 604.398 842.723 590.416 961 590.416C1079.28 590.416 1196.4 604.398 1305.67 631.565C1414.94 658.732 1514.23 698.551 1597.87 748.749C1681.5 798.947 1747.84 858.541 1793.1 924.127C1838.37 989.714 1861.66 1060.01 1861.66 1131H1929Z";
const innerArc =
  "M1891 1131C1891 1057.72 1866.94 985.162 1820.21 917.463C1773.47 849.763 1704.97 788.249 1618.61 736.434C1532.25 684.619 1429.73 643.517 1316.9 615.475C1204.06 587.433 1083.13 573 961 573C838.871 573 717.937 587.433 605.104 615.475C492.272 643.517 389.749 684.619 303.391 736.434C217.032 788.25 148.529 849.763 101.792 917.463C55.0551 985.162 31 1057.72 31 1131H95.693C95.693 1062.82 118.075 995.307 161.561 932.317C205.046 869.326 268.784 812.092 349.135 763.881C429.487 715.671 524.877 677.428 629.861 651.336C734.845 625.245 847.366 611.816 961 611.816C1074.63 611.816 1187.15 625.245 1292.14 651.336C1397.12 677.428 1492.51 715.671 1572.86 763.881C1653.22 812.092 1716.95 869.326 1760.44 932.317C1803.93 995.307 1826.31 1062.82 1826.31 1131H1891Z";

const crimson = { stopColor: "var(--crimson)" };
const coral = { stopColor: "var(--coral)" };

// The white heading on the brand gradient (at 50% over navy), with the arch behind the image.
// The artwork is anchored to the bottom and cropped at the sides on narrow screens.
function CenteredHero({ heading, image, layers }: HeroProps) {
  return (
    <section aria-labelledby="case-study-title" className="relative isolate overflow-hidden bg-primary">
      <svg
        aria-hidden="true"
        viewBox="0 0 1920 1065"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 -z-10 "
      >
        <defs>
          <linearGradient id="case-study-hero-sky" x1="311" y1="-492" x2="2163" y2="681" gradientUnits="userSpaceOnUse">
            <stop style={crimson} />
            <stop offset="1" style={coral} />
          </linearGradient>
          <linearGradient id="case-study-hero-arc-outer" x1="307" y1="282" x2="1411" y2="1574" gradientUnits="userSpaceOnUse">
            <stop style={coral} />
            <stop offset="1" style={crimson} />
          </linearGradient>
          <linearGradient id="case-study-hero-arc-inner" x1="333" y1="315" x2="1393" y2="1557" gradientUnits="userSpaceOnUse">
            <stop style={crimson} />
            <stop offset="1" style={coral} />
          </linearGradient>
        </defs>
        <path
          d="M0 0H1920V1065C1920 1065 1684 550 960 550C236 550 0 1065 0 1065V0Z"
          fill="url(#case-study-hero-sky)"
          opacity="0.5"
        />
        <path d={outerArc} fill="url(#case-study-hero-arc-outer)" />
        <path d={innerArc} fill="url(#case-study-hero-arc-inner)" />
      </svg>

      <div className="container-site pt-32 pb-[clamp(2.5rem,3.5vw,4rem)] text-center sm:pt-36 lg:pt-40 2xl:pt-48">
        <h1
          id="case-study-title"
          className="mx-auto max-w-[13em] font-display text-[clamp(2.25rem,4.6vw,5.5rem)] leading-[1.08] font-bold tracking-[-0.02em] text-balance text-white motion-safe:animate-rise"
        >
          {heading}
        </h1>
        <div className="mt-[clamp(2rem,2.5vw,3rem)] flex justify-center">
          <HeroVisual image={image} layers={layers} sizes="(min-width: 1280px) 61vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
