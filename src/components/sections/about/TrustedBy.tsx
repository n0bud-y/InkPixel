import Image from "next/image";
import { Fragment } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { awards, clients } from "@/content/about";

// White box with a 1px brand-gradient border (as in the design).
const boxStyle = { background: "linear-gradient(#fff, #fff) padding-box, var(--gradient-reverse) border-box" };

// "Trusted by Industry Leaders": the clients' logos, six in a row on desktop, then a thin
// gradient line and the studio's awards, spread across the row with dividers between them
// (one per row on phones and two on tablets, without dividers).
export function TrustedBy() {
  return (
    <section aria-labelledby="trusted-title" className="bg-white">
      <div className="container-site py-[clamp(3.5rem,5.6vw,6.75rem)]">
        <Reveal stagger={0.06}>
          <h2
            id="trusted-title"
            data-reveal
            className="text-center font-display text-[clamp(1.75rem,3vw,3.6rem)] leading-tight font-semibold tracking-[-0.025em] text-primary"
          >
            Trusted by Industry Leaders
          </h2>
          <ul className="mt-[clamp(2rem,2.4vw,3rem)] grid grid-cols-2 gap-[clamp(0.75rem,1.1vw,1.3rem)] sm:grid-cols-3 lg:grid-cols-6">
            {clients.map((client) => (
              <li
                key={client.name}
                data-reveal
                className="overflow-hidden rounded-[0.625rem] border border-transparent"
                style={boxStyle}
              >
                <Image src={client.logo} alt={client.name} sizes="(min-width: 1024px) 13vw, 45vw" className="h-auto w-full" />
              </li>
            ))}
          </ul>

          {awards.length > 0 && (
            <>
              {/* The design's line runs a little past the logos on both sides. */}
              <div
                aria-hidden="true"
                data-reveal
                className="mt-[clamp(1.5rem,1.45vw,1.75rem)] h-px bg-linear-to-r from-crimson/60 via-coral/60 to-crimson/60 lg:-mx-[1.5vw]"
              />
              <ul
                aria-label="Awards and ratings"
                className="mt-[clamp(1.5rem,1.8vw,2.1rem)] grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 sm:gap-y-5 lg:flex lg:items-center lg:justify-between"
              >
                {awards.map((award, index) => (
                  <Fragment key={award.label}>
                    {index > 0 && <li aria-hidden="true" className="hidden h-[clamp(1.5rem,1.8vw,2.2rem)] w-px bg-[#bababa] lg:block" />}
                    <li data-reveal className="flex items-center gap-2 max-lg:justify-center">
                      <Image src={award.icon} alt="" className="h-[clamp(1rem,1.1vw,1.375rem)] w-auto shrink-0" />
                      <span className="bg-brand-gradient-reverse bg-clip-text font-display text-[clamp(0.9375rem,1.35vw,1.625rem)] leading-tight font-semibold text-transparent">
                        {award.label}
                      </span>
                    </li>
                  </Fragment>
                ))}
              </ul>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
