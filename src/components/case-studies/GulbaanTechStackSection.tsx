import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GulbaanTechStackSection() {
  return (
    <section aria-labelledby="gulbaan-techstack-title" className="relative isolate bg-primary py-16 sm:py-24 text-light overflow-hidden">
      <div className="container-site flex flex-col items-center text-center">
        <Reveal>
          <SectionHeading
            id="gulbaan-techstack-title"
            title="Tech Stack Used"
            align="center"
            tone="onDark"
            size="fluid"
          />
        </Reveal>

        {/* Tech Stack Cards Row */}
        <Reveal y={30} delay={0.15} className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-6 w-full max-w-4xl">
          {/* Card 1: Web Architecture */}
          <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl bg-white px-6 sm:px-8 py-5 text-slate-900 shadow-lg border border-white/20">
            <div className="flex items-center gap-5">
              {/* BigCommerce Logo */}
              <div className="flex items-center h-8">
                <svg className="h-6 sm:h-7 w-auto" viewBox="0 0 165 32" fill="none">
                  <path d="M5.5 24L18 4H0L5.5 24Z" fill="#121118" />
                  <path d="M14 28L26.5 8H8.5L14 28Z" fill="#121118" />
                  <path d="M22.5 32L35 12H17L22.5 32Z" fill="#121118" />
                  <text x="42" y="22" fontFamily="sans-serif" fontWeight="900" fontSize="16" fill="#121118" letterSpacing="0.4">
                    BIGCOMMERCE
                  </text>
                </svg>
              </div>

              {/* Vertical Separator */}
              <div className="h-8 w-px bg-slate-200" />

              {/* Node.js Logo */}
              <div className="flex items-center h-8">
                <svg className="h-7 sm:h-8 w-auto" viewBox="0 0 115 32" fill="none">
                  <g fill="#339933">
                    <path d="M14 2L2 9v14l12 7 12-7V9L14 2zm0 3.2l8.8 5.1v10.3L14 25.7l-8.8-5.1V10.3L14 5.2z" />
                    <path d="M14 9.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" />
                  </g>
                  <text x="32" y="23" fontFamily="sans-serif" fontWeight="800" fontSize="21" fill="#333333">
                    node<tspan fill="#339933" fontSize="15">.js</tspan>
                  </text>
                </svg>
              </div>
            </div>

            {/* Label & Details */}
            <div className="text-center sm:text-left border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Web Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
                BigCommerce, Node.js
              </p>
            </div>
          </div>

          {/* Card 2: Tools & Testing */}
          <div className="flex items-center gap-5 rounded-2xl bg-white px-6 sm:px-8 py-5 text-slate-900 shadow-lg border border-white/20">
            {/* Figma Squircle Icon */}
            <div className="size-11 sm:size-12 rounded-xl bg-[#1E1E1E] flex items-center justify-center p-2.5 shrink-0 shadow-xs">
              <svg className="size-6 sm:size-7" viewBox="0 0 38 57" fill="none">
                <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
                <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
                <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
                <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
                <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
              </svg>
            </div>

            {/* Label & Details */}
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Tools &amp; Testing
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
                Figma
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
