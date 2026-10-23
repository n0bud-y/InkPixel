// The Privacy Policy and Terms and Conditions pages (LegalPage). Static content: edit the text
// here. PLACEHOLDER (issue I15): developer-written starting text for a studio like ours, not
// legal advice; have it reviewed (and the "Last updated" dates set) before launch.

/** A block of a section: a paragraph, a bulleted list, or the studio's contact details. */
export type LegalBlock = string | { list: string[] } | { contact: true };

export type LegalSection = {
  /** The section's #id (its link in "On this page"). */
  id: string;
  title: string;
  body: LegalBlock[];
};

export type LegalDocument = {
  /** Plain name: breadcrumb and the search title fallback. */
  name: string;
  /** Search description fallback (the Page SEO entry in Contentful takes precedence). */
  description: string;
  path: string;
  /** Hero title; `*word*` is shown in the brand gradient. */
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export const legalLabels = { eyebrow: "Legal", updated: "Last updated", toc: "On this page" };

export const privacyPolicy: LegalDocument = {
  name: "Privacy Policy",
  description: "How Ink Pixel Studios collects, uses, and protects personal data on this website.",
  path: "/privacy-policy",
  title: "Privacy *Policy*",
  intro:
    "Your privacy matters to us. This policy explains what information we collect when you visit our website or contact us, how we use it, and the choices you have.",
  updated: "22 October 2026",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      body: [
        "Ink Pixel Studios (“we”, “us”, “our”) is a digital studio based in Karachi, Pakistan, building websites, apps, custom software, brands, and AI automation for businesses worldwide. We are responsible for the personal information described in this policy.",
      ],
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      body: [
        "We only collect the information we need to answer you and to run this website:",
        {
          list: [
            "Details you send us: when you use a contact form, it opens your own email app with your message ready to send. We receive what you choose to send, such as your name, email address, phone number, company, project details, and budget.",
            "Messages and calls: anything you share with us by email, phone, or in meetings about a project.",
            "Technical information: like most websites, our hosting provider records basic technical data (such as your IP address, browser type, and the pages requested) to deliver the site securely and fix problems.",
          ],
        },
        "This website does not ask you to create an account and does not store the content of the contact forms itself.",
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use your information",
      body: [
        {
          list: [
            "To reply to your enquiry and to prepare proposals, estimates, and quotes.",
            "To deliver and support the work you hire us for.",
            "To keep this website secure, working, and fast.",
            "To meet our legal, tax, and accounting obligations.",
          ],
        },
        "We do not sell your personal information, and we do not use it for automated decisions that affect you.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      body: [
        "This website does not currently use cookies for analytics or advertising. If we add analytics or other tools that use cookies in the future, we will update this policy and, where the law requires it, ask for your consent first.",
      ],
    },
    {
      id: "sharing",
      title: "Sharing your information",
      body: [
        "We share personal information only when we need to:",
        {
          list: [
            "With service providers who help us run our business, such as website hosting, email, and content management providers, who may only use it on our behalf.",
            "When the law requires it, or to protect our rights, our clients, or the public.",
            "With your permission, for example when you ask us to introduce you to a partner.",
          ],
        },
        "Some of these providers are located outside Pakistan. When information is transferred abroad, we take reasonable steps to keep it protected.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      body: [
        "We keep enquiries for as long as we are discussing a project with you, and project records for as long as we need them to support the work and meet legal and accounting requirements. After that, we delete or anonymise them.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      body: [
        "Depending on where you live, you may have the right to:",
        {
          list: [
            "Ask for a copy of the personal information we hold about you.",
            "Ask us to correct or update it.",
            "Ask us to delete it, or to stop using it for a particular purpose.",
            "Complain to your local data protection authority.",
          ],
        },
        "To make a request, contact us using the details below. We will reply within 30 days.",
      ],
    },
    {
      id: "security-and-children",
      title: "Security and children",
      body: [
        "We use reasonable technical and organisational measures to protect your information, but no website or email system is completely secure.",
        "Our website and services are meant for businesses and are not directed at children under 16. We do not knowingly collect information from children.",
      ],
    },
    {
      id: "changes-and-contact",
      title: "Changes and contact",
      body: [
        "We may update this policy from time to time. The date at the top of this page shows when it last changed. For any question about this policy or your information, contact us:",
        { contact: true },
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  name: "Terms and Conditions",
  description: "The terms and conditions for using the Ink Pixel Studios website.",
  path: "/terms",
  title: "Terms and *Conditions*",
  intro:
    "These terms explain the rules for using our website. By using the site, you agree to them, so please read them carefully.",
  updated: "22 October 2026",
  sections: [
    {
      id: "about-these-terms",
      title: "About these terms",
      body: [
        "This website is operated by Ink Pixel Studios (“we”, “us”, “our”), a digital studio based in Karachi, Pakistan. These terms apply to your use of this website. If you do not agree with them, please do not use the site.",
      ],
    },
    {
      id: "using-the-website",
      title: "Using the website",
      body: [
        "You may browse and share this website for personal and business purposes. You agree not to:",
        {
          list: [
            "Use the site in a way that breaks any law or harms others.",
            "Try to gain unauthorised access to the site, its servers, or its data, or disrupt how it works.",
            "Copy, scrape, or reuse the site’s content at scale without our written permission.",
            "Send us harmful code, spam, or misleading information through our contact forms.",
          ],
        },
      ],
    },
    {
      id: "our-services",
      title: "Our services and proposals",
      body: [
        "The descriptions of our services, estimates from our cost calculators, prices, and timelines on this website are for general information only and are not an offer. Every project is agreed in a separate written proposal or contract, and that agreement’s terms apply to the work. If it differs from these terms, the project agreement wins.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      body: [
        "Unless stated otherwise, the content of this website (text, designs, graphics, logos, illustrations, code, and videos) belongs to Ink Pixel Studios or is used with permission. You may not copy, change, or republish it without our written permission, except to share links to our pages.",
        "Ownership of the work we create for clients is set out in each project agreement.",
      ],
    },
    {
      id: "case-studies",
      title: "Case studies and client names",
      body: [
        "Our case studies, client names, and logos are shown with our clients’ permission to illustrate our work. They remain the property of their owners and do not mean that a client endorses anything beyond the work described.",
      ],
    },
    {
      id: "links",
      title: "Links to other websites",
      body: [
        "Our website may link to websites run by others, such as our clients’ sites, app stores, or Google Maps. We are not responsible for their content, availability, or privacy practices.",
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimer",
      body: [
        "We work to keep this website accurate and available, but it is provided “as is”. We do not promise that it will always be complete, current, error-free, or uninterrupted, and articles on our blog are general information, not professional advice for your situation.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      body: [
        "To the extent the law allows, Ink Pixel Studios is not liable for any indirect or consequential loss, or for loss of profit, data, or business, arising from your use of this website. Nothing in these terms limits liability that cannot be limited by law.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      body: [
        "These terms are governed by the laws of Pakistan, and the courts of Karachi have jurisdiction over any dispute about them.",
      ],
    },
    {
      id: "changes-and-contact",
      title: "Changes and contact",
      body: [
        "We may update these terms from time to time. The date at the top of this page shows when they last changed, and continuing to use the site means you accept the updated terms. For any question about them, contact us:",
        { contact: true },
      ],
    },
  ],
};
