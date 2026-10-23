// Industries and their solutions. Static content: edited here, not in Contentful.
// Used by the "Industry-Specific Solutions" section (home and core service pages) and the
// header's Industries menu; reusable for /industries.
import type { StaticImageData } from "next/image";
import fintech from "@/assets/images/icons/industries/fintech.png";
import healthcare from "@/assets/images/icons/industries/healthcare.png";
import logistics from "@/assets/images/icons/industries/logistics.png";
import realEstate from "@/assets/images/icons/industries/real-estate.png";
import ecommerce from "@/assets/images/icons/industries/ecommerce.svg";
import building from "@/assets/images/icons/solutions/building-2.svg";
import calculator from "@/assets/images/icons/solutions/calculator.svg";
import calendarCheck from "@/assets/images/icons/solutions/calendar-check.svg";
import chartPie from "@/assets/images/icons/solutions/chart-pie.svg";
import clipboardList from "@/assets/images/icons/solutions/clipboard-list.svg";
import contact from "@/assets/images/icons/solutions/contact.svg";
import creditCard from "@/assets/images/icons/solutions/credit-card.svg";
import fileHeart from "@/assets/images/icons/solutions/file-heart.svg";
import hospital from "@/assets/images/icons/solutions/hospital.svg";
import house from "@/assets/images/icons/solutions/house.svg";
import landmark from "@/assets/images/icons/solutions/landmark.svg";
import lock from "@/assets/images/icons/solutions/lock.svg";
import mapPin from "@/assets/images/icons/solutions/map-pin.svg";
import packageIcon from "@/assets/images/icons/solutions/package.svg";
import plug from "@/assets/images/icons/solutions/plug.svg";
import rotate3d from "@/assets/images/icons/solutions/rotate-3d.svg";
import route from "@/assets/images/icons/solutions/route.svg";
import scanFace from "@/assets/images/icons/solutions/scan-face.svg";
import shieldCheck from "@/assets/images/icons/solutions/shield-check.svg";
import shoppingBag from "@/assets/images/icons/solutions/shopping-bag.svg";
import smartphone from "@/assets/images/icons/solutions/smartphone.svg";
import sparkles from "@/assets/images/icons/solutions/sparkles.svg";
import store from "@/assets/images/icons/solutions/store.svg";
import target from "@/assets/images/icons/solutions/target.svg";
import trendingUp from "@/assets/images/icons/solutions/trending-up.svg";
import truck from "@/assets/images/icons/solutions/truck.svg";
import usersRound from "@/assets/images/icons/solutions/users-round.svg";
import video from "@/assets/images/icons/solutions/video.svg";
import wallet from "@/assets/images/icons/solutions/wallet.svg";
import warehouse from "@/assets/images/icons/solutions/warehouse.svg";

/** What we build for an industry: a white line icon (painted with a CSS mask), a name, a line. */
export type Solution = {
  title: string;
  description: string;
  icon: StaticImageData;
};

export type Industry = {
  /** URL-safe id, also used for the tab. */
  slug: string;
  label: string;
  description: string;
  icon: StaticImageData;
  /** Six, so the 2-column grids stay even. */
  solutions: Solution[];
};

// PLACEHOLDER (issue I16): developer-written solutions for each industry, to be confirmed or
// replaced with what the studio actually offers each one.
export const industries: Industry[] = [
  {
    slug: "fintech",
    label: "Fintech",
    description:
      "Our fintech solutions simplify complex financial processes and strengthen security to help businesses drive operational efficiency.",
    icon: fintech,
    solutions: [
      { title: "Digital Banking Apps", description: "Secure mobile and web banking with accounts, transfers, and statements.", icon: landmark },
      { title: "Payment Gateways", description: "Card, wallet, and bank payments with fast, reliable checkout flows.", icon: creditCard },
      { title: "KYC & Onboarding", description: "Identity checks and smooth sign-up that meet compliance rules.", icon: scanFace },
      { title: "Financial Dashboards", description: "Real-time reports, portfolios, and analytics in one clear view.", icon: chartPie },
      { title: "Fraud Prevention & Security", description: "Monitoring, alerts, and protection for every transaction.", icon: shieldCheck },
      { title: "Wallets & Lending Platforms", description: "Digital wallets, loans, and credit products built to scale.", icon: wallet },
    ],
  },
  {
    slug: "healthcare",
    label: "Healthcare",
    description:
      "We build healthcare solutions that streamline operations, elevate patient care, and ensure industry compliance.",
    icon: healthcare,
    solutions: [
      { title: "Patient Portals", description: "Records, results, and messages patients can reach anytime.", icon: contact },
      { title: "Telemedicine Apps", description: "Video consultations, prescriptions, and follow-ups from anywhere.", icon: video },
      { title: "Appointment Booking", description: "Online scheduling, reminders, and fewer missed visits.", icon: calendarCheck },
      { title: "Clinic & Hospital Systems", description: "Staff, wards, billing, and inventory managed in one place.", icon: hospital },
      { title: "Health Records Integration", description: "Connect EHR, lab, and pharmacy systems securely.", icon: fileHeart },
      { title: "Compliance & Data Security", description: "Privacy-first builds with access control and audit trails.", icon: lock },
    ],
  },
  {
    slug: "real-estate",
    label: "Real estate",
    description:
      "We empower real estate businesses with strategies that increase property value and streamline transactions.",
    icon: realEstate,
    solutions: [
      { title: "Property Listing Websites", description: "Searchable listings with filters, maps, and enquiry forms.", icon: house },
      { title: "Virtual Tours", description: "3D walkthroughs and galleries that sell before the visit.", icon: rotate3d },
      { title: "Agent & Lead CRM", description: "Track leads, viewings, and deals across your team.", icon: usersRound },
      { title: "Property Management", description: "Tenants, rent, maintenance, and documents in one system.", icon: building },
      { title: "Lead Generation & Ads", description: "Campaigns and landing pages that bring in serious buyers.", icon: target },
      { title: "Mortgage & ROI Calculators", description: "Interactive tools that help buyers decide faster.", icon: calculator },
    ],
  },
  {
    slug: "logistics",
    label: "Logistics",
    description:
      "We transform logistics with technology, optimizing supply chains and ensuring efficient, cost-effective deliveries.",
    icon: logistics,
    solutions: [
      { title: "Fleet & Shipment Tracking", description: "Live locations, status updates, and delivery history.", icon: truck },
      { title: "Route Optimization", description: "Smarter routes that save fuel, time, and cost.", icon: route },
      { title: "Warehouse Management", description: "Stock, picking, and dispatch with fewer errors.", icon: warehouse },
      { title: "Driver & Delivery Apps", description: "Jobs, proof of delivery, and navigation on the go.", icon: smartphone },
      { title: "Customer Tracking Portals", description: "Let customers follow orders and book pickups themselves.", icon: mapPin },
      { title: "Dispatch & Reporting", description: "Automated assignments and performance reports.", icon: clipboardList },
    ],
  },
  {
    slug: "ecommerce",
    label: "Ecommerce",
    description:
      "We specialize in crafting unique eCommerce solutions that drive conversions and elevate customer experiences.",
    icon: ecommerce,
    solutions: [
      { title: "Online Stores", description: "Fast, branded storefronts on Shopify, WooCommerce, or custom builds.", icon: store },
      { title: "Checkout & Payments", description: "Simple, secure checkout with local and global payments.", icon: shoppingBag },
      { title: "Inventory & Orders", description: "Stock, orders, and returns synced across channels.", icon: packageIcon },
      { title: "Marketplace Integrations", description: "Connect Amazon, Daraz, ERPs, and shipping partners.", icon: plug },
      { title: "Personalization", description: "Recommendations and offers tailored to each shopper.", icon: sparkles },
      { title: "Conversion Optimization", description: "Testing and UX improvements that lift sales.", icon: trendingUp },
    ],
  },
];

/** The header's Industries menu (the industries above, display only): the bar under them. */
export const industryMenu = {
  callout: "Don't see your industry?",
  button: { label: "Book a free call", href: "/contact" },
};
