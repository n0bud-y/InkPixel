import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventSidebar } from "@/components/events/EventSidebar";
import { Reveal } from "@/components/motion/Reveal";
import { PageSchema } from "@/components/seo/PageSchema";
import { Accordion } from "@/components/ui/Accordion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { eventWhen, events, eventsPage, formatPrice, getEvent, isPast, type SiteEvent } from "@/content/events";
import { absoluteUrl, breadcrumbSchema, eventSchema, faqSchema, pageMetadata } from "@/lib/seo";

const seoOf = (event: SiteEvent) => ({
  title: event.title,
  description: event.excerpt,
  path: `/events/${event.slug}`,
  image: { url: event.poster.src.src, width: event.poster.src.width, height: event.poster.src.height, alt: event.poster.alt },
});

// Rebuilt hourly, so booking closes on the page once the event has ended.
export const revalidate = 3600;

export function generateStaticParams() {
  return events.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const event = getEvent(slug);
  return event ? pageMetadata(seoOf(event)) : {};
}

const sectionTitle = "font-display text-[clamp(1.6rem,2.4vw,2.4rem)] leading-tight font-semibold tracking-[-0.02em] text-primary";
const kicker = "font-mono text-[11px] tracking-[0.18em] text-crimson uppercase";

// An event's page: the banner (title, date, venue, the poster), then the content on the left and
// the booking box on the right (EventSidebar: pinned while the content scrolls on desktop; a bar
// at the bottom of the screen on phones). Content: about the event, the judge, who it's for, the
// tickets, how booking works, the venue, the organisers, and the FAQ.
export default async function EventPage(props: PageProps<"/events/[slug]">) {
  const { slug } = await props.params;
  const event = getEvent(slug);
  if (!event) notFound();
  const seo = seoOf(event);
  const when = eventWhen(event);
  const past = isPast(event);

  return (
    <>
      <PageSchema
        path={seo.path}
        page={{ type: "WebPage", title: seo.title, description: seo.description }}
        items={[
          breadcrumbSchema([
            { name: eventsPage.name, path: "/events" },
            { name: event.title, path: seo.path },
          ]),
          eventSchema({
            name: event.title,
            description: event.excerpt,
            path: seo.path,
            image: absoluteUrl(seo.image.url),
            start: event.start,
            end: event.end,
            venue: event.venue,
            organizer: event.organizer,
            tickets: event.tickets,
            currency: event.currency,
            bookingOpen: event.bookingOpen && !past,
          }),
          faqSchema(event.faqs.map(({ question, answer }) => ({ question, answer: [answer] })), seo.path),
        ]}
      />

      {/* The banner. */}
      <section aria-labelledby="event-title" className="relative isolate overflow-hidden bg-primary">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent_50rem)]" />
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 size-[54rem] max-w-[180vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.32),transparent)]"
        />
        <div className="container-site pt-32 pb-[clamp(3rem,5vw,5.5rem)] sm:pt-40">
          <nav aria-label="Breadcrumb" className="font-mono text-[12px] tracking-[0.12em] text-light/55 uppercase">
            <Link href="/events" className="hover:text-white">
              {eventsPage.name}
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page" className="text-light/80">
              {when.day} {when.month}
            </span>
          </nav>
          <div className="mt-6 grid gap-[clamp(2rem,4vw,4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
            <div className="motion-safe:animate-rise">
              <Eyebrow>{event.highlights.slice(0, 2).join(" · ") || eventsPage.eyebrow}</Eyebrow>
              <h1 id="event-title" className="mt-5 font-display text-[clamp(2.25rem,4.2vw,4.75rem)] leading-[1.04] font-medium tracking-[-0.03em] text-white">
                {event.title}
              </h1>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[clamp(0.95rem,1.05vw,1.15rem)] text-light/85">
                <li>
                  <span className="text-coral">●</span> {when.date}, {when.time}
                </li>
                <li>
                  <span className="text-coral">●</span> {event.venue.name}, Karachi
                </li>
              </ul>
              <p className="mt-5 text-[14px] text-light/60">
                Organised by {event.organizer} · {event.partner}
              </p>
            </div>
            <div className="relative motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_both] motion-safe:[animation-delay:150ms]">
              <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgb(250_97_67_/_0.35),transparent)]" />
              <Image
                src={event.poster.src}
                alt={event.poster.alt}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full rounded-[1.75rem] shadow-[0_50px_100px_-40px_rgb(0_0_0_/_0.9)] ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content and the booking box. */}
      <div className="bg-light pb-28 lg:pb-0">
        <div className="container-site grid gap-[clamp(2rem,3.5vw,4rem)] py-[clamp(3rem,5vw,6rem)] lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_26rem]">
          <div className="order-2 space-y-[clamp(3rem,5vw,5.5rem)] lg:order-1">
            {/* About. */}
            <Reveal>
              <section aria-labelledby="about-title">
                <p className={kicker}>About the show</p>
                <h2 id="about-title" className={`mt-2 ${sectionTitle}`}>
                  Canine Excellence Comes to Karachi
                </h2>
                <div className="mt-5 space-y-4 text-[clamp(1rem,1.1vw,1.15rem)] leading-[1.8] text-primary/80">
                  {event.about.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {event.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-full bg-white px-4 py-2 text-[14px] font-medium text-primary shadow-[0_10px_24px_-16px_rgb(21_25_54_/_0.5)] ring-1 ring-primary/10">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* The judge. */}
            {event.judge && (
              <Reveal>
                <section aria-labelledby="judge-title" className="relative isolate overflow-hidden rounded-[1.75rem] bg-primary text-white">
                  <div aria-hidden="true" className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.45),transparent)]" />
                  <div className="grid sm:grid-cols-[minmax(0,15rem)_1fr]">
                    <Image src={event.judge.photo.src} alt={event.judge.photo.alt} sizes="(min-width: 640px) 15rem, 100vw" className="h-72 w-full object-cover object-top sm:h-full" />
                    <div className="p-[clamp(1.5rem,3vw,2.5rem)]">
                      <p className="font-mono text-[11px] tracking-[0.18em] text-coral uppercase">The judge</p>
                      <h2 id="judge-title" className="mt-2 font-display text-[clamp(1.6rem,2.4vw,2.3rem)] leading-tight font-semibold">
                        {event.judge.name}
                      </h2>
                      <p className="mt-1 text-light/70">Honourable judge from {event.judge.country}</p>
                      <p className="mt-5 text-[clamp(1rem,1.05vw,1.1rem)] leading-[1.75] text-light/85">{event.judge.bio}</p>
                    </div>
                  </div>
                </section>
              </Reveal>
            )}

            {/* Who it's for. */}
            <Reveal stagger={0.1}>
              <section aria-labelledby="audience-title">
                <p className={kicker}>Who it&apos;s for</p>
                <h2 id="audience-title" className={`mt-2 ${sectionTitle}`}>
                  Everyone Who Loves Dogs
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                  {event.audience.map(({ title, text }, index) => (
                    <li key={title} data-reveal className="group rounded-[1.5rem] bg-white p-6 ring-1 ring-primary/10 transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgb(201_29_76_/_0.5)]">
                      <span className="grid size-11 place-items-center rounded-full bg-brand-gradient-reverse font-display font-semibold text-white">{index + 1}</span>
                      <h3 className="mt-4 font-display text-[1.2rem] font-semibold text-primary">{title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-primary/70">{text}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* Tickets. */}
            <Reveal>
              <section aria-labelledby="tickets-title">
                <p className={kicker}>Tickets</p>
                <h2 id="tickets-title" className={`mt-2 ${sectionTitle}`}>
                  Choose Your Ticket
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {event.tickets.map((ticket) => (
                    <li key={ticket.name} className="relative overflow-hidden rounded-[1.5rem] bg-white p-6 ring-1 ring-primary/10">
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" />
                      <p className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-[1.35rem] font-semibold text-primary">{ticket.name}</span>
                        <span className="font-display text-[1.35rem] font-semibold text-crimson">{formatPrice(ticket.price, event.currency) ?? "Price TBA"}</span>
                      </p>
                      <p className="mt-2 text-[15px] leading-relaxed text-primary/70">{ticket.description}</p>
                      <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-primary/45 uppercase">{ticket.exhibitor ? "Per dog" : "Per person"}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* How booking works. */}
            <Reveal stagger={0.1}>
              <section aria-labelledby="how-title">
                <p className={kicker}>How booking works</p>
                <h2 id="how-title" className={`mt-2 ${sectionTitle}`}>
                  Book in Three Steps
                </h2>
                <ol className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Book", "Choose your ticket and fill in your details (and your dog's, for exhibitors)."],
                    ["Pay by Raast", "Scan the Raast QR code or send to the Raast ID shown after booking."],
                    ["Send the receipt", "Send the receipt on WhatsApp with your booking reference. We confirm your place."],
                  ].map(([title, text], index) => (
                    <li key={title} data-reveal className="relative rounded-[1.5rem] border border-dashed border-primary/20 p-6">
                      <span className="font-display text-[2.5rem] leading-none font-semibold text-transparent [-webkit-text-stroke:1.5px_rgb(201_29_76_/_0.55)]">0{index + 1}</span>
                      <h3 className="mt-3 font-display text-[1.15rem] font-semibold text-primary">{title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-primary/70">{text}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>

            {/* Venue. */}
            <Reveal>
              <section aria-labelledby="venue-title" className="rounded-[1.75rem] bg-white p-[clamp(1.5rem,3vw,2.5rem)] ring-1 ring-primary/10">
                <p className={kicker}>The venue</p>
                <h2 id="venue-title" className={`mt-2 ${sectionTitle}`}>
                  {event.venue.name}
                </h2>
                <p className="mt-3 text-[clamp(1rem,1.1vw,1.15rem)] text-primary/75">{event.venue.address}</p>
                <p className="mt-1 text-primary/60">
                  {when.date}, {when.time}
                </p>
                <a
                  href={event.venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-white transition hover:bg-primary/90"
                >
                  Get directions ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </section>
            </Reveal>

            {/* Organisers and partners. */}
            <Reveal>
              <section aria-labelledby="partners-title">
                <p className={kicker}>Organisers & partners</p>
                <h2 id="partners-title" className={`mt-2 ${sectionTitle}`}>
                  Brought to You By
                </h2>
                <p className="mt-4 text-[clamp(1rem,1.1vw,1.15rem)] leading-[1.75] text-primary/80">
                  Organised by <strong className="font-semibold text-primary">{event.organizer}</strong>. {event.partner}.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {event.partners.map((name) => (
                    <li key={name} className="rounded-full border border-primary/15 px-4 py-2 text-[14px] text-primary/80">
                      {name}
                    </li>
                  ))}
                </ul>
                {event.facebookUrl && (
                  <a href={event.facebookUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block font-medium text-crimson underline-offset-4 hover:underline">
                    See the event on Facebook ↗<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </section>
            </Reveal>

            {/* FAQ. */}
            {event.faqs.length > 0 && (
              <section aria-labelledby="faq-title">
                <p className={kicker}>FAQ</p>
                <h2 id="faq-title" className={`mt-2 ${sectionTitle}`}>
                  Questions, Answered
                </h2>
                <Accordion name="event-faq" items={event.faqs.map(({ question, answer }) => ({ question, answer: [answer] }))} defaultOpen={0} className="mt-6" />
              </section>
            )}
          </div>

          <aside aria-label="Booking" className="order-1 lg:order-2">
            <EventSidebar
              event={{
                slug: event.slug,
                title: event.title,
                when: `${when.date}, ${when.time}`,
                venue: event.venue.name,
                currency: event.currency,
                tickets: event.tickets,
                payment: { ...event.payment, qr: event.payment.qr?.src ?? null },
                whatsapp: event.whatsapp,
              }}
              date={when.date}
              time={when.time}
              day={when.day}
              month={when.month}
              start={event.start}
              mapUrl={event.venue.mapUrl}
              phones={event.phones}
              bookingOpen={event.bookingOpen}
              past={past}
            />
          </aside>
        </div>
      </div>
    </>
  );
}
