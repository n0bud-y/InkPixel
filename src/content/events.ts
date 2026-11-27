import type { StaticImageData } from "next/image";
import dogShowJudge from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/judge.webp";
import dogShowPoster from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/poster.webp";
import dogShowRaastQr from "@/assets/images/events/all-breed-cacib-dog-show-karachi-2026/raast-qr.png";
import { siteConfig } from "@/lib/site";

// Events (28 Nov 2026, project head): events the studio markets and sells tickets for, at /events
// and /events/<slug>. Static content, edited here: Contentful's plan has no room for another
// content type. To add an event, add an entry to `events` (newest first) with its images in
// src/assets/images/events/<slug>/.
//
// Booking: the buyer picks a ticket and fills in the form; the booking is emailed to the studio
// (sendBooking, priced from this file, never from the browser), then the buyer pays by Raast (QR
// code or Raast ID) and sends the receipt on WhatsApp. The studio confirms by hand.

export type EventTicket = {
  /** Shown on the page and in the form, e.g. "Visitor". Unique within the event. */
  name: string;
  /** Per ticket (per person, or per dog for exhibitors), in the event's currency; null until it's
   *  set ("Price to be announced"). */
  price: number | null;
  /** Paid once per booking on top of `price × quantity`, e.g. the exhibitor's own entry. */
  entry: number | null;
  description: string;
  /** Exhibitor tickets ask for the dog's details (one ticket per dog). */
  exhibitor: boolean;
};

export type SiteEvent = {
  slug: string;
  /** Booking references start with it, e.g. "DOG" → DOG-7K2QX9. Letters only. */
  code: string;
  title: string;
  /** The event card and the search description. */
  excerpt: string;
  /** Start and end, with the time zone (Karachi is +05:00). */
  start: string;
  end: string | null;
  venue: { name: string; address: string; mapUrl: string };
  poster: { src: StaticImageData; alt: string };
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
    code: "DOG",
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
        question: "How do I pay?",
        answer:
          "Book on this page, then pay by Raast: scan the QR code or send to the Raast ID shown after you book, and send the receipt on WhatsApp with your booking reference. We confirm your booking once the payment is received.",
      },
      {
        question: "How much does it cost to show my dogs?",
        answer:
          "Exhibitors pay the Rs 3,000 entry once, plus Rs 1,500 for each dog: one dog is Rs 4,500, two dogs Rs 6,000, three dogs Rs 7,500. Choose the number of dogs in the form and fill in each dog's details. Visitors pay Rs 3,000 per person.",
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

/** How a ticket's total is made up, e.g. "Entry Rs 3,000 + 2 dogs × Rs 1,500"; null without an entry. */
export function ticketBreakdown(ticket: EventTicket, quantity: number, currency: string) {
  if (ticket.price === null || !ticket.entry) return null;
  const unit = ticket.exhibitor ? (quantity === 1 ? "dog" : "dogs") : quantity === 1 ? "person" : "people";
  return `Entry ${formatPrice(ticket.entry, currency)} + ${quantity} ${unit} × ${formatPrice(ticket.price, currency)}`;
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
