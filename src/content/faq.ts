// Frequently asked questions. Static content: edited here, not in Contentful.
// Used by the home page FAQ; reusable on other pages (e.g. Services, Contact).

export type Faq = {
  question: string;
  /** The answer, one entry per line. */
  answer: string[];
};

export const faqs: Faq[] = [
  {
    question: "How long does a typical engagement take?",
    answer: [
      "Sprints run two weeks. Full projects are usually 8–16 weeks depending on scope.",
      "We can move faster when needed — ask us about our 4-week MVP track.",
    ],
  },
  // PLACEHOLDER: the answers below are drafts (the design only shows the first answer).
  // They are promises to clients, so the studio must confirm or rewrite them before launch.
  {
    question: "Do you work with companies outside Pakistan?",
    answer: [
      "Yes. We work with clients worldwide from our Karachi studio, with regular calls scheduled across time zones.",
    ],
  },
  {
    question: "Who owns the work after launch?",
    answer: [
      "You do. Once the project is paid for, the code, designs, and accounts are handed over to you.",
    ],
  },
  {
    question: "Can you take over an existing codebase?",
    answer: [
      "Yes. We start with a short audit of the code and infrastructure, then agree a plan with you before changing anything.",
    ],
  },
  {
    question: "Do you do retainers or ongoing support?",
    answer: [
      "Yes. After launch, we can stay on a monthly retainer for maintenance, improvements, and new features.",
    ],
  },
];
