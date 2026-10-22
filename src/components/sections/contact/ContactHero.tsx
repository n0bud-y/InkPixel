import { Eyebrow } from "@/components/ui/Eyebrow";
import { withAccent } from "@/components/ui/accent";
import { contactPage } from "@/content/contact-page";

// The Contact page's hero, as on the Our Work and Insights pages: navy with the faint grid and a
// crimson glow, the eyebrow, title, and one line. Less space below it, since the form card follows
// on the same navy.
export function ContactHero() {
  return (
    <section aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-primary">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent_60rem)]" />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 size-[54rem] max-w-[180vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.32),transparent)]"
      />
      <div className="container-site pt-36 pb-[clamp(1rem,2vw,2.5rem)] text-center motion-safe:animate-rise sm:pt-40 2xl:pt-48">
        <Eyebrow>{contactPage.eyebrow}</Eyebrow>
        <h1
          id="contact-title"
          className="mt-6 font-display text-[clamp(2.75rem,5vw,6rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance text-white"
        >
          {withAccent(contactPage.title)}
        </h1>
        <p className="mx-auto mt-6 max-w-[40em] text-[clamp(1rem,1.17vw,1.4rem)] leading-[1.75] text-light/80">
          {contactPage.intro}
        </p>
      </div>
    </section>
  );
}
