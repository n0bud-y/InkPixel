// Frequently asked questions. Static content: edited here, not in Contentful.
// Used by the FAQ section (home, About, service pages).
//
// From the content document (23 Oct 2026), with the studio's name corrected. TO CONFIRM (issue
// I17): some answers name services and industries the site doesn't offer yet (blockchain, game
// development, cloud services, staff augmentation; telecom and construction).

export type Faq = {
  question: string;
  /** The answer, one entry per line. */
  answer: string[];
};

export const faqs: Faq[] = [
  {
    question: "What services does Ink Pixel Studios provide?",
    answer: [
      "Ink Pixel Studios offers a wide array of technology and digital solutions such as mobile app development, web development, custom software development, AI development, cloud services, blockchain development, game development, digital marketing, staff augmentation, and technology consulting.",
    ],
  },
  {
    question: "Are you able to build an app for iOS and Android?",
    answer: [
      "Yes. Depending on the project needs, our mobile app development teams can create apps designed for iOS and Android, or build cross-platform apps, such as the ones built using Flutter and React Native.",
    ],
  },
  {
    question: "Will Ink Pixel Studios be able to create a custom software solution for my business?",
    answer: [
      "Absolutely. Rather than putting your business into a “one size fits all” solution, we create custom software solutions tailored to your workflows, your users, your requirements for operation, and your business goals.",
    ],
  },
  {
    question: "Do you offer AI and automation solutions?",
    answer: [
      "Yes. AI Development, AI Agent Development, Generative AI, Machine Learning, Natural Language Processing, Chatbots, and AI Automation Solutions to boost productivity, automate repetitive tasks, and optimize decision-making.",
    ],
  },
  {
    question: "Will you support us in moving our business to the cloud?",
    answer: [
      "Yes. Our cloud services range from cloud migration, infrastructure migration, cloud application development, managed cloud services, serverless computing, DevOps enablement, cloud infrastructure and cloud cost optimization.",
    ],
  },
  {
    question: "Does your website offer follow up support after it's published?",
    answer: [
      "Yes. App Support and Maintenance, Cloud Support, Software Maintenance, optimization, updates, troubleshooting and continuing technical help are all available to help maintain the security and performance of your digital product.",
    ],
  },
  {
    question: "Are you able to come up with ideas for particular industries?",
    answer: [
      "Yes. We develop industry specific technology solutions for industries such as fintech, healthcare, real estate, e-commerce, retail, logistics, telecom, construction and on-demand.",
    ],
  },
];
