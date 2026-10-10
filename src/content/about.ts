// About page content. Static content: edited here, not in Contentful.
// Images were exported from the About design (src/assets/design/About.svg).
import type { StaticImageData } from "next/image";
import designzHub from "@/assets/images/about/clients/designz-hub.webp";
import drumondAutoBody from "@/assets/images/about/clients/drumond-auto-body.webp";
import gulbaan from "@/assets/images/about/clients/gulbaan.webp";
import ihr from "@/assets/images/about/clients/ihr.webp";
import pakArmoring from "@/assets/images/about/clients/pak-armoring.webp";
import starAziziBuilders from "@/assets/images/about/clients/star-azizi-builders.webp";
import awardRibbon from "@/assets/images/about/icons/award-ribbon.svg";
import awardStar from "@/assets/images/about/icons/award-star.svg";
import missionIcon from "@/assets/images/about/icons/mission.svg";
import statProfessionals from "@/assets/images/about/icons/stat-professionals.svg";
import statProjects from "@/assets/images/about/icons/stat-projects.svg";
import statSatisfaction from "@/assets/images/about/icons/stat-satisfaction.svg";
import statYears from "@/assets/images/about/icons/stat-years.svg";
import valueBulb from "@/assets/images/about/icons/value-bulb.svg";
import valueHandshake from "@/assets/images/about/icons/value-handshake.svg";
import valueMonitor from "@/assets/images/about/icons/value-monitor.svg";
import valueShield from "@/assets/images/about/icons/value-shield.svg";
import valuesIcon from "@/assets/images/about/icons/values.svg";
import visionIcon from "@/assets/images/about/icons/vision.svg";
import monisBari from "@/assets/images/about/monis-bari.webp";
import aliHassan from "@/assets/images/about/team/ali-hassan.webp";
import aliyan from "@/assets/images/about/team/aliyan.webp";
import danishKhalidBari from "@/assets/images/about/team/danish-khalid-bari.webp";
import isfahanAli from "@/assets/images/about/team/isfahan-ali.webp";
import monisBariTeam from "@/assets/images/about/team/monis-bari.webp";
import muhammadAyyan from "@/assets/images/about/team/muhammad-ayyan.webp";
import muhammadDaniyal from "@/assets/images/about/team/muhammad-daniyal.webp";
import muhammadZeeshan from "@/assets/images/about/team/muhammad-zeeshan.webp";
import mussyabKhan from "@/assets/images/about/team/mussyab-khan.webp";
import osamaAhmed from "@/assets/images/about/team/osama-ahmed.webp";
import shahzaibMoin from "@/assets/images/about/team/shahzaib-moin.webp";
import syedHassan from "@/assets/images/about/team/syed-hassan.webp";
import moazzamAli from "@/assets/images/about/team/syed-moazzam-ali.webp";
import shahnoorHamza from "@/assets/images/about/team/syed-shahnoor-hamza.webp";
import tahaAli from "@/assets/images/about/team/syed-taha-ali.webp";
import tassinAhmed from "@/assets/images/about/team/tassin-ahmed.webp";
import wali from "@/assets/images/about/team/wali.webp";

const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing.";

export const aboutHero = {
  title: "Where Creativity Meets Technology",
  text: "We build powerful digital experiences through smart technology, creative design, and strategic thinking—helping businesses grow, scale, and stand out in a digital-first world.",
  button: { label: "Explore Our Work", href: "/case-studies" },
};

export type Client = { name: string; logo: StaticImageData };

// "Trusted by Industry Leaders". Logo use approved by each client (confirmed by the project
// head on 9 Oct 2026).
export const clients: Client[] = [
  { name: "Pak Armoring", logo: pakArmoring },
  { name: "Gulbaan", logo: gulbaan },
  { name: "ihr", logo: ihr },
  { name: "Star Azizi Builders", logo: starAziziBuilders },
  { name: "Designz Hub", logo: designzHub },
  { name: "Drumond Auto Body", logo: drumondAutoBody },
];

export type Award = { label: string; icon: StaticImageData };

// The studio's awards and ratings, under the logos. Confirmed as Ink Pixel Studios' own by the
// project head on 10 Oct 2026; keep the numbers current.
export const awards: Award[] = [
  { label: "Clutch 4.8 / 83+ reviews", icon: awardStar },
  { label: "Inc. 5000 / 2024", icon: awardRibbon },
  { label: "GoodFirms Leader", icon: awardRibbon },
  { label: "Deloitte Fast 50", icon: awardRibbon },
];

export type AboutStat = {
  value: number;
  suffix: string;
  label: string;
  icon: StaticImageData;
};

// "Who Are We". Projects and satisfaction match the home page's stats; professionals and years
// confirmed by the project head (9 Oct 2026).
export const whoWeAre = {
  title: "Who *Are We*",
  text: "Ink Pixel Studios stands out as a leading software and digital solutions company in Pakistan because we combine creativity, technical expertise, and business strategy. Our team of skilled professionals is committed to delivering innovative, reliable, and high-quality solutions that help businesses grow, improve efficiency, and achieve measurable results. From web and mobile development to branding and digital marketing, we ensure every project is handled with professionalism and care.",
  stats: [
    { value: 100, suffix: "+", label: "Successful Projects", icon: statProjects },
    { value: 93, suffix: "%", label: "Client Satisfaction", icon: statSatisfaction },
    { value: 500, suffix: "+", label: "Professionals", icon: statProfessionals },
    { value: 10, suffix: "+ Years", label: "Of Experience", icon: statYears },
  ] satisfies AboutStat[],
  values: [
    {
      title: "Expertise & Experience",
      text: "With a team of highly skilled designers, developers, and digital marketers, we bring years of expertise to deliver solutions tailored to your business needs.",
      icon: valueShield,
    },
    {
      title: "Innovative Solutions",
      text: "We leverage modern technologies and creative strategies to develop web, mobile, branding, and marketing solutions that stand out in the market.",
      icon: valueBulb,
    },
    {
      title: "Client-Centric Approach",
      text: "Our process is designed around client satisfaction. We focus on clear communication, understanding your goals, and delivering results that exceed expectations.",
      icon: valueMonitor,
    },
    // Not in the design; added on 10 Oct 2026 (project head).
    {
      title: "Long-Term Partnership",
      text: "We don't disappear after launch. From ongoing support to new features, we grow with your business and stay the team you can call.",
      icon: valueHandshake,
    },
  ],
};

export type TeamMember = { name: string; role: string; photo: StaticImageData };

// "Meet The People Behind Ink Pixel Studios". The intro, the people, their order, and the photos
// come from the live site's About page (inkpixelstudios.com/about-us), added at the project
// head's request on 10 Oct 2026; the first four on 9 Oct (photos from the design).
export const team = {
  title: "Meet The People Behind *Ink Pixel Studios*",
  intro:
    "Behind every project at Ink Pixel Studios is a team of developers, designers, and strategists who bring ideas to life with precision and creativity. Get to know the people who turn your vision into reliable, high-quality digital solutions.",
  members: [
    { name: "Monis Bari", role: "Founder & CEO", photo: monisBariTeam },
    { name: "Danish Khalid Bari", role: "COO", photo: danishKhalidBari },
    { name: "Osama Ahmed", role: "CRO", photo: osamaAhmed },
    { name: "Isfahan Ali", role: "CFO", photo: isfahanAli },
    { name: "Syed Moazzam Ali", role: "CTO", photo: moazzamAli },
    { name: "Muhammad Zeeshan", role: "Vice President - Customer Representative", photo: muhammadZeeshan },
    { name: "Aliyan", role: "Senior Manager - Customer Representative", photo: aliyan },
    { name: "Tassin Ahmed", role: "Senior Executive - Customer Representative", photo: tassinAhmed },
    { name: "Wali", role: "Senior Executive - Customer Representative", photo: wali },
    { name: "Syed Hassan", role: "Senior Executive - Customer Representative", photo: syedHassan },
    { name: "Mussyab Khan", role: "Senior Manager - Web Application", photo: mussyabKhan },
    { name: "Ali Hassan", role: "Senior Manager - Marketing", photo: aliHassan },
    { name: "Syed Shahnoor Hamza", role: "Senior Manager - Performance Marketing", photo: shahnoorHamza },
    { name: "Syed Taha Ali", role: "Senior Manager - Design", photo: tahaAli },
    { name: "Muhammad Daniyal", role: "Senior Executive - Web Developer", photo: muhammadDaniyal },
    { name: "Muhammad Ayyan", role: "Executive - Web Developer", photo: muhammadAyyan },
    { name: "Shahzaib Moin", role: "Executive - Marketing", photo: shahzaibMoin },
  ] satisfies TeamMember[],
};

// "What Drives Us Forward". PLACEHOLDER: the text, mission, vision, and values are the design's
// lorem ipsum; replace them with the studio's own words.
export const drivesUs = {
  title: "What Drives Us *Forward*",
  text: lorem,
  button: { label: "Talk to Us", href: "/contact" },
  items: [
    { question: "Our Mission", answer: [lorem], icon: missionIcon },
    { question: "Our Vision", answer: [lorem], icon: visionIcon },
    { question: "Our Values", answer: [lorem], icon: valuesIcon },
  ],
};

// Founder card. Monis Bari agreed to appear (confirmed by the project head on 9 Oct 2026).
// PLACEHOLDER: the bio is the design's lorem ipsum.
export const founder = {
  name: "Monis Bari",
  role: "Founder & CEO",
  bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.",
  photo: monisBari,
};

// "Get In Touch" / "Contact Us". The address and email come from siteConfig (src/lib/site.ts).
// The form in the design waits for the lead pipeline (P3-14); until then the panel links to
// email and the contact page. The map is a static image (no map scripts on the page) that
// opens Google Maps at the office (its plus code, from the design).
export const visitUs = {
  title: "Get In Touch",
  text: "Tell us what you're working on. We'll come back within a working day.",
  hours: "We are currently open by appointment only.",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=V38J%2BR9%20Karachi",
};
