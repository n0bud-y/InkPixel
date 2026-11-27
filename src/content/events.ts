import type { StaticImageData } from "next/image";
import dogShowGallery01 from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/gallery-01.webp";
import dogShowGallery02 from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/gallery-02.webp";
import dogShowGallery03 from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/gallery-03.webp";
import dogShowGallery04 from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/gallery-04.webp";
import dogShowGallery05 from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/gallery-05.webp";
import dogShowGallery06 from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/gallery-06.webp";
import dogShowGallery07 from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/gallery-07.webp";
import dogShowGallery08 from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/gallery-08.webp";
import dogShowGallery09 from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/gallery-09.webp";
import dogShowGallery10 from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/gallery-10.webp";
import dogShowJudge from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/judge.webp";
import dogShowPoster from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/poster.webp";
import dogShowRaastQr from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/raast-qr.png";
import { siteConfig } from "@/lib/site";

// Events (28 Nov 2026, project head): events the studio markets and sells tickets for, at /events
// and /events/<slug>. Static content, edited here: Contentful's plan has no room for another
// content type. To add an event, add an entry to `events` (newest first) with its images in
// src/assets/images/events/<slug>/.
//
// Booking (BookingDialog; 28 Nov 2026, project head): one ticket per booking, no forms. The buyer
// picks a ticket, pays its price by Raast (QR code or Raast ID), and sends the transaction
// reference and/or the payment screenshot to the studio on WhatsApp; the studio checks the payment
// and sends the ticket there. More dogs or people are settled in the chat.

export type EventTicket = {
  /** Shown on the page and in the form, e.g. "Visitor". Unique within the event. */
  name: string;
  /** Per ticket (per person, or per dog for exhibitors), in the event's currency; null until it's
   *  set ("Price to be announced"). */
  price: number | null;
  /** Paid once per booking on top of `price × quantity`, e.g. the exhibitor's own entry. */
  entry: number | null;
  description: string;
  /** Exhibitor tickets are per dog (with the exhibitor's entry). */
  exhibitor: boolean;
};

export type SiteEvent = {
  slug: string;
  title: string;
  /** The event card and the search description. */
  excerpt: string;
  /** Start and end, with the time zone (Karachi is +05:00). */
  start: string;
  end: string | null;
  venue: { name: string; address: string; mapUrl: string };
  poster: { src: StaticImageData; alt: string };
  /** Photos for the auto-scrolling gallery, and where they come from (shown under it). */
  gallery: { src: StaticImageData; alt: string }[];
  galleryCredit: string | null;
  /** Paragraphs. */
  about: string[];
  highlights: string[];
  /** Who can join: a title and a line each. */
  audience: { title: string; text: string }[];
  organizer: string;
  partner: string;
  /** Logos on the poster, as names (in poster order). */
  partners: string[];
  judge: { name: string; country: string; bio: string; photo: { src: StaticImageData; alt: string }; profileUrl: string | null } | null;
  currency: string;
  tickets: EventTicket[];
  bookingOpen: boolean;
  payment: {
    /** Raast ID (phone number or IBAN) and the account's title; null until set. */
    raastId: string | null;
    accountTitle: string | null;
    bank: string | null;
    /** The Raast QR code image; null until set. */
    qr: StaticImageData | null;
    /** An optional payment page. */
    link: string | null;
  };
  /** Where buyers send the payment receipt: digits with the country code. */
  whatsapp: string;
  /** Information and registration numbers, as shown. */
  phones: string[];
  facebookUrl: string | null;
  faqs: { question: string; answer: string }[];
};

export const eventsPage = {
  name: "Events",
  eyebrow: "Events",
  title: "Events We *Bring* to Life",
  intro:
    "Shows, launches, and gatherings we market and sell tickets for: campaigns, social media, and booking, from the first post to the day itself.",
  description: "Upcoming events by Ink Pixel Studios and its partners in Pakistan: details, tickets, and booking.",
  upcoming: "Upcoming events",
  past: "Past events",
  empty: "New events are on the way. Follow us on social media to hear first.",
};

export const events: SiteEvent[] = [
  {
    slug: "all-breed-cacib-dog-show-karachi-2026",
    title: "All Breed International CACIB Dog Show – Karachi 2026",
    excerpt:
      "An international all-breed dog show at the Defence Authority Creek Club, Karachi, judged by Vladislava Yaroshuk from Ukraine. Sunday 13 December 2026, 3:00 PM.",
    start: "2026-12-13T15:00:00+05:00",
    end: null,
    venue: {
      name: "Defence Authority Creek Club",
      address: "Zulfiqar Street 1, Phase 8, DHA, Karachi",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Defence+Authority+Creek+Club+Karachi",
    },
    poster: {
      src: dogShowPoster,
      alt: "All Breed CACIB Dog Show Karachi poster: judge Vladislava Yaroshuk holding a corgi, a Dalmatian, the date 13 December 2026, and the organisers' logos",
    },
    // Photos from the organiser's past shows (the PGSDC Facebook page, 28 Nov 2026; project head:
    // a gallery of Pakistani dogs), not from this show.
    gallery: [
      { src: dogShowGallery01, alt: "Winners with their German Shepherd on the first-place podium" },
      { src: dogShowGallery02, alt: "A German Shepherd gaiting with its handler under the floodlights" },
      { src: dogShowGallery03, alt: "A German Shepherd moving with its handler past the crowd" },
      { src: dogShowGallery04, alt: "Dogs and handlers in the ring in front of the Pakistan Kennel Union all-breed show banner" },
      { src: dogShowGallery05, alt: "A black German Shepherd running in the ring" },
      { src: dogShowGallery06, alt: "Third place: a German Shepherd and its owner with a trophy and certificate" },
      { src: dogShowGallery07, alt: "A black German Shepherd standing for the judge" },
      { src: dogShowGallery08, alt: "A black German Shepherd moving across the floodlit ring" },
      { src: dogShowGallery09, alt: "First place: a German Shepherd with its handler on the podium" },
      { src: dogShowGallery10, alt: "Second-place winners with their dog, trophies, and certificates" },
    ],
    galleryCredit: "Photos from the Pakistan German Shepherd Dog Club's past shows.",
    about: [
      "The world of canine excellence comes to Karachi. Dog lovers, breeders, exhibitors, and enthusiasts are invited to the All Breed International CACIB Dog Show – Karachi 2026.",
      "An international event celebrating the beauty, quality, structure, temperament, and standards of dogs from every breed, judged by Vladislava Yaroshuk from Ukraine, who brings international expertise to the ring.",
      "Bring your champions, show your finest dogs, and be part of a celebration of canine excellence. All dog lovers and breed enthusiasts are warmly welcome.",
    ],
    highlights: ["All breeds", "International standards", "CACIB show", "Judge from Ukraine", "DHA Karachi"],
    audience: [
      { title: "Exhibitors", text: "Show your dogs in front of an international judge: your entry, plus a fee for each dog." },
      { title: "Breeders", text: "Meet fellow breeders and see dogs from every breed judged to international standards." },
      { title: "Visitors & families", text: "Dog lovers of all ages are welcome to watch the show." },
    ],
    organizer: "Pakistan German Shepherd Dog Club",
    partner: "Marketing & ticketing partner: Ink Pixel Studios",
    partners: ["PGSDC", "World Kennel Union", "PKU", "Eterna", "Defence Authority Creek Club", "Ink Pixel Studios"],
    judge: {
      name: "Vladislava Yaroshuk",
      country: "Ukraine",
      bio: "The honourable judge of the show, bringing international expertise and judging excellence to Karachi.",
      photo: { src: dogShowJudge, alt: "Judge Vladislava Yaroshuk holding a corgi" },
      // Her public Facebook profile (project head, 28 Nov 2026).
      profileUrl: "https://www.facebook.com/yaroshuk.vladislava",
    },
    currency: "PKR",
    // Prices from the project head (28 Nov 2026): visitors Rs 3,000 each; exhibitors always pay
    // the Rs 3,000 entry, plus Rs 1,500 for each dog (one dog: Rs 4,500; two: Rs 6,000).
    tickets: [
      { name: "Visitor", price: 3000, entry: null, description: "Entry to watch the show, for one person.", exhibitor: false },
      {
        name: "Exhibitor",
        price: 1500,
        entry: 3000,
        description: "Your entry (Rs 3,000) plus Rs 1,500 for each dog you show.",
        exhibitor: true,
      },
    ],
    bookingOpen: true,
    // DUMMY QR CODE (28 Nov 2026): a placeholder until the project head sends the real Raast QR;
    // it encodes only the words "DUMMY RAAST QR CODE". Replace raast-qr.png (and add the Raast ID,
    // account title, and bank) before taking payments.
    payment: { raastId: null, accountTitle: null, bank: null, qr: dogShowRaastQr, link: null },
    // The studio's number until the project head names another.
    whatsapp: siteConfig.phone.tel.replace(/\D/g, ""),
    phones: ["0331 8215888", "0307 2052833", "0345 3189660", "0321 3200020", "0344 4180129"],
    facebookUrl: "https://www.facebook.com/events/1924317768563010/",
    faqs: [
      {
        question: "When and where is the show?",
        answer: "Sunday 13 December 2026 at 3:00 PM, at the Defence Authority Creek Club, Zulfiqar Street 1, Phase 8, DHA, Karachi.",
      },
      {
        question: "Which breeds can take part?",
        answer: "All breeds. It is an all-breed international CACIB show, judged to international standards.",
      },
      {
        question: "How do I book and pay?",
        answer:
          "Press Book now, choose your ticket, and pay the amount by Raast: scan the QR code with your banking app. Then tap Send payment proof on WhatsApp and send us the payment screenshot or the transaction reference in the chat. We check the payment and send your ticket on WhatsApp.",
      },
      {
        question: "How much does it cost to show my dogs?",
        answer:
          "Exhibitors pay the Rs 3,000 entry once, plus Rs 1,500 for each dog: one dog is Rs 4,500, two dogs Rs 6,000, three dogs Rs 7,500. Book one exhibitor ticket (Rs 4,500 with one dog), then tell us on WhatsApp about any more dogs and pay Rs 1,500 for each. Visitors pay Rs 3,000 per person.",
      },
      {
        question: "Who do I contact for questions?",
        answer: "Call or WhatsApp any of the information numbers on this page, or message us on WhatsApp after booking.",
      },
    ],
  },
];

/** Whether an event has ended (or, without an end, started more than 12 hours ago). */
export function isPast(event: SiteEvent, now = Date.now()) {
  const end = event.end ? Date.parse(event.end) : Date.parse(event.start) + 12 * 60 * 60 * 1000;
  return end < now;
}

export const getEvent = (slug: string) => events.find((event) => event.slug === slug) ?? null;

/** A booking's total: the entry (if any) plus the price for each person or dog; null when the
 *  price isn't set. Used everywhere a price is shown, and by the server to price a booking. */
export function ticketTotal(ticket: EventTicket, quantity: number) {
  if (ticket.price === null) return null;
  return (ticket.entry ?? 0) + ticket.price * quantity;
}

/** "PKR 1,000", or null when the price isn't set. */
export function formatPrice(amount: number | null, currency: string) {
  if (amount === null) return null;
  return `${currency === "PKR" ? "Rs" : currency} ${amount.toLocaleString("en-PK")}`;
}

/** The event's date and time in Karachi, e.g. "Sunday 13 December 2026" and "3:00 PM". */
export function eventWhen(event: SiteEvent) {
  const start = new Date(event.start);
  const zone = { timeZone: "Asia/Karachi" } as const;
  return {
    date: start.toLocaleDateString("en-GB", { ...zone, weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    time: start.toLocaleTimeString("en-US", { ...zone, hour: "numeric", minute: "2-digit" }),
    day: start.toLocaleDateString("en-GB", { ...zone, day: "2-digit" }),
    month: start.toLocaleDateString("en-GB", { ...zone, month: "short" }),
  };
}
