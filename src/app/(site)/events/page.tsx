import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { PageSchema } from "@/components/seo/PageSchema";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withAccent } from "@/components/ui/accent";
import { eventWhen, events, eventsPage, formatPrice, isPast, ticketTotal, type SiteEvent } from "@/content/events";
import { breadcrumbSchema, itemListSchema, pageMetadataFromCms } from "@/lib/seo";

// Rebuilt hourly, so an event moves to "Past events" once it has ended.
export const revalidate = 3600;

export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({ title: eventsPage.name, description: eventsPage.description, path: "/events" });
}

// "Events": upcoming events first (soonest first), then past ones (latest first), each a card
// linking to its page.
export default function EventsPage() {
  const upcoming = events.filter((event) => !isPast(event)).sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
  const past = events.filter((event) => isPast(event)).sort((a, b) => Date.parse(b.start) - Date.parse(a.start));

  return (
    <>
      <PageSchema
        path="/events"
        page={{ type: "CollectionPage", title: eventsPage.name, description: eventsPage.description }}
        items={[
          itemListSchema(
            eventsPage.name,
            events.map(({ title, slug }) => ({ name: title, path: `/events/${slug}` })),
          ),
          breadcrumbSchema([{ name: eventsPage.name, path: "/events" }]),
        ]}
      />
      <section aria-labelledby="events-title" className="relative isolate overflow-hidden bg-primary">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent_60rem)]" />
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 size-[54rem] max-w-[180vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.32),transparent)]"
        />
        <div className="container-site pt-36 pb-[clamp(4rem,6.15vw,7.25rem)] sm:pt-40 2xl:pt-48">
          <div className="text-center motion-safe:animate-rise">
            <Eyebrow>{eventsPage.eyebrow}</Eyebrow>
            <h1 id="events-title" className="mt-6 font-display text-[clamp(2.75rem,5vw,6rem)] leading-[1.02] font-medium tracking-[-0.03em] text-white">
              {withAccent(eventsPage.title)}
            </h1>
            <p className="mx-auto mt-6 max-w-[40em] text-[clamp(1rem,1.17vw,1.4rem)] leading-[1.75] text-light/80">{eventsPage.intro}</p>
          </div>

          <div className="mt-[clamp(2.5rem,3.5vw,4.5rem)] space-y-[clamp(3rem,4vw,5rem)] motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_both] motion-safe:[animation-delay:200ms]">
            <div>
              <h2 className="font-mono text-[12px] tracking-[0.18em] text-light/60 uppercase">{eventsPage.upcoming}</h2>
              {upcoming.length ? (
                <ul className="mt-5 grid gap-6">
                  {upcoming.map((event) => (
                    <li key={event.slug}>
                      <EventCard event={event} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-12 text-center text-[clamp(1rem,1.1vw,1.25rem)] text-light/70">{eventsPage.empty}</p>
              )}
            </div>
            {past.length > 0 && (
              <div>
                <h2 className="font-mono text-[12px] tracking-[0.18em] text-light/60 uppercase">{eventsPage.past}</h2>
                <ul className="mt-5 grid gap-6 md:grid-cols-2">
                  {past.map((event) => (
                    <li key={event.slug}>
                      <EventCard event={event} compact />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}

// An event as one link: the poster, a date badge, the title, the venue, the price from, and
// "Book now" (or "View event" once it's over). Wide (poster beside the text) unless `compact`.
function EventCard({ event, compact = false }: { event: SiteEvent; compact?: boolean }) {
  const when = eventWhen(event);
  const prices = event.tickets.flatMap((ticket) => ticketTotal(ticket, 1) ?? []);
  const from = prices.length ? formatPrice(Math.min(...prices), event.currency) : null;
  const past = isPast(event);

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group grid overflow-hidden rounded-[1.75rem] bg-white text-primary ring-1 ring-white/10 transition duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-40px_rgb(250_97_67_/_0.6)] ${
        compact ? "" : "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
      }`}
    >
      <div className="relative overflow-hidden">
        <Image
          src={event.poster.src}
          alt=""
          sizes={compact ? "(min-width: 768px) 45vw, 100vw" : "(min-width: 1024px) 55vw, 100vw"}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-white/35 to-transparent motion-safe:transition-transform motion-safe:duration-1000 motion-safe:ease-out motion-safe:group-hover:translate-x-[400%]"
        />
        <span className="absolute top-4 left-4 grid w-16 overflow-hidden rounded-2xl bg-white text-center shadow-lg motion-safe:animate-float">
          <span className="bg-brand-gradient py-1 font-mono text-[11px] tracking-[0.16em] text-white uppercase">{when.month}</span>
          <span className="py-1.5 font-display text-[1.75rem] leading-none font-semibold">{when.day}</span>
        </span>
      </div>
      <div className="flex flex-col justify-center p-[clamp(1.5rem,3vw,3rem)]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-crimson uppercase">
          {when.date} · {when.time}
        </p>
        <h3 className="mt-3 font-display text-[clamp(1.5rem,2.2vw,2.4rem)] leading-tight font-semibold">{event.title}</h3>
        <p className="mt-3 text-[15px] text-primary/65">
          {event.venue.name}, {event.venue.address}
        </p>
        {!compact && <p className="mt-4 text-[clamp(1rem,1.05vw,1.1rem)] leading-relaxed text-primary/75">{event.excerpt}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="relative isolate inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-brand-gradient px-6 text-[15px] font-semibold text-white shadow-[0_12px_30px_-10px_rgb(201_29_76_/_0.75)] transition duration-300 group-hover:brightness-110">
            {past ? "View event" : "Book now"}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
          {!past && <span className="text-[15px] font-medium text-primary/70">{from ? `From ${from}` : "Tickets on sale"}</span>}
        </div>
      </div>
    </Link>
  );
}
