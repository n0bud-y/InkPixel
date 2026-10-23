// The Privacy Policy, Terms and Conditions, and Refund Policy pages (LegalPage). Static content: edit
// the text here. From the content document (Website Content – Ink Pixel Studio.docx), with the
// studio's name and obvious typos fixed and a few lines whose list formatting was lost repaired;
// each document's first paragraph is its hero intro. Issue I15: not legal advice; have it reviewed
// before launch, and name the jurisdiction in the Terms' "Governing Law and Disputes".

/** A block of a section: a paragraph, a subheading, a bulleted list, or the studio's contact details. */
export type LegalBlock = string | { heading: string } | { list: string[] } | { contact: true };

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

export const legalLabels = {
  eyebrow: "Legal",
  updated: "Last updated",
  toc: "On this page",
};

export const privacyPolicy: LegalDocument = {
  name: "Privacy Policy",
  description: "How Ink Pixel Studios collects, uses, and protects personal data on this website.",
  path: "/privacy-policy",
  title: "Privacy *Policy*",
  intro:
    "Welcome to Ink Pixel Studios. We value your privacy and take seriously your personal information that you disclose to us via our site, contact forms, consultations or business interactions.",
  updated: "23 October 2026",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      body: [
        "This Privacy Policy tells you how we collect, use, store, disclose, or protect information during your visits to this website or when you inquire about our services or use our services. We provide website design and development, software development, mobile application development, AI automation, branding, digital marketing, and technology solutions.",
        "The use of our website or the giving of your information to us is an acknowledgement of the practices outlined in this policy. If consent is required by applicable law, we will seek consent separately.",
      ],
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      body: [
        "Based on how you use our website and services, we might collect the following types of information:",
        {
          heading: "Personal Information",
        },
        "We may collect the following information when you contact us, request a consultation or ask about a project:",
        {
          list: [
            "Full name",
            "Email address",
            "Telephone number",
            "The name of the company or organization.",
            "Business Address (if applicable)",
            "Data that is submitted via contact forms",
            "Connective ideas and question information",
          ],
        },
        {
          heading: "Project and Business Information",
        },
        "We may gather information required to comprehend and complete your project, such as your business needs, project briefs, brand materials, website content materials, design references, software requirements, and other documents that you voluntarily submit.",
        "Please refrain from sharing highly personal and confidential information unless it is required to provide the agreed service and safeguards are appropriate.",
        {
          heading: "Technical and Usage Information",
        },
        "As you use our website, some information may be automatically gathered, such as:",
        {
          list: [
            "IP address and approximate location derived from the IP address.",
            "Browser type and device information",
            "Operating system",
            "The number of pages visited and the amount of time spent on the website.",
            "Went to a website or engaged in general browsing activity and referred websites to others.",
            "Information about the performance of the website, the diagnosis information, and the error information.",
          ],
        },
        "The information gathered will be dependent upon website technologies and tools being used.",
        "Cookies and other similar technologies are also used.",
        "Cookies, pixels, tags and similar technologies are used on our website to facilitate the website's functionality, for storing preferences, for understanding the behavior of visitors, for measuring the performance of marketing actions and otherwise.",
        "Non-essential cookies will only be installed where necessary following the proper consent. Consent can also be managed via your browser settings, or any consent-management tool you can find on our site.",
        "Some aspects of the website may be affected if you block some of the cookies.",
      ],
    },
    {
      id: "use-of-your-information",
      title: "Use of Your Information",
      body: [
        "Collected information can be used by Ink Pixel Studios for:",
        {
          list: [
            "Answer queries and provide advice on request.",
            "Compose project proposals, quotations, and service agreements.",
            "Provide website, software, application, branding, marketing, and AI services.",
            "Provide updates on projects, feedback, deadlines, and project deliverables.",
            "Process invoices and payments and manage relevant business documentation.",
            "Run, troubleshoot and enhance our site and services.",
            "Customize suggestions for services based on individual needs.",
            "Deliver marketing communications as appropriate and when necessary and with consent.",
            "Identify, investigate and deter misuse, security incidents and fraud.",
            "Comply with relevant legal, regulatory, accounting and contractual requirements.",
            "Safeguard our legal rights and arbitrate disputes.",
          ],
        },
        "We will not use personal information for purposes that are substantially different from those described here unless we have an appropriate legal basis for doing so or give additional notice if required.",
      ],
    },
    {
      id: "legal-basis-for-processing",
      title: "Legal Basis for Processing",
      body: [
        "The information we process on any of the following bases may apply to you depending on the jurisdiction that applies to you:",
        {
          list: [
            "Permission to perform a task; consent: When you have given permission for a specific purpose.",
            "Contract: If it is required to provide a service or take any steps asked in advance before entering into a contract.",
            "Legitimate interests: Where processing is considered to be necessary for a business purpose, for the improvement of services, to ensure security or to prevent fraud, and is not outweighed by the rights of the individuals involved.",
            "Legal requirements: If the law requires it.",
            "Other legally valid reasons: If identified by the laws that apply to the person and the business.",
          ],
        },
        "Consent may be withdrawn where consent is a legal basis for processing. If processing is conducted lawfully before withdrawal, it will not be affected by withdrawal.",
      ],
    },
    {
      id: "how-we-share-information",
      title: "How We Share Information",
      body: [
        "We do not barter personal information for payment. We will share information in the following cases, if it is appropriate and lawful:",
        {
          heading: "Service Providers",
        },
        "We may disclose information to trusted providers, which is necessary for us to carry out our business, including:",
        {
          list: [
            "Web Hosting and infrastructure Providers",
            "Services for cloud storage and file sharing.",
            "Payment processors",
            "These are customer relationship management and communication platforms that are used to deal with customers.",
            "Analytics and website performance companies",
            "Email and marketing platforms.",
            "Software, App & AI Technological providers",
          ],
        },
        "These providers may handle information as they see fit and per their own privacy policies. We employ suitable contractual and security arrangements to safeguard information, when required.",
        {
          heading: "Project Partners and Subcontractors",
        },
        'Relevant information relating to the project may be shared with appropriately authorized team members, developers, designers, consultants or subcontractors as may be required to provide the services agreed. Access shall be restricted to that which is "necessary and reasonable" in performance of the work.',
        {
          heading: "Legal and security requirements",
        },
        "We might disclose information when required to do so by law for any proper legal reasons, or if we are asked to, for our rights, to investigate suspected fraud and to protect the safety and security of our business or users, or others.",
        {
          heading: "Business Transfers",
        },
        "In the event of our business being merged or acquired, restructured or asset sold, information may be transferred in accordance with applicable laws and reasonable safeguards.",
      ],
    },
    {
      id: "ai-tools-and-automated-processing",
      title: "AI Tools and Automated Processing",
      body: [
        "AI-powered tools or external AI services provided by Ink Pixel Studios can be used in various capacities to support tasks in the studio, such as workflow automation, content processing, software development, chatbot features, and data organization.",
        "If these tools are used to process client data, then we will take reasonable steps to ensure that appropriate services and configurations are used for the agreed purpose. This does not mean, however, that third-party providers do not have their own data-handling practices.",
        "Confidential, sensitive, or regulated data must not be provided to AI tools without evaluation and proper permissions and protection.",
        "Output produced by the AI might be incorrect or misinformed, and may need to be checked if human verification is required. Automated processing is not the only basis by which we make decisions about individuals with legal or other significant consequences unless there is an appropriate legal basis and required safeguards.",
      ],
    },
    {
      id: "data-retention",
      title: "Data Retention",
      body: [
        "We keep personal data as long as it is sufficient for the purpose for which it was submitted, such as delivering services, managing projects, maintaining records, resolving disputes, ensuring security and legal compliance.",
        "The retention periods can differ depending on the information type, nature of services, contractual requirements and regulation.",
        "Subject to legal requirements and legitimate recordkeeping needs, reasonable measures will be implemented to remove, anonymize or securely dispose of information when it is no longer necessary.",
        "Unless otherwise stated in a written agreement with the client, important files and deliverables for the project should be kept by the client.",
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      body: [
        "Reasonable administrative, technical and organizational measures are put in place to prevent the loss, destruction, disclosure, alteration, unauthorized access to personal data.",
        "But none of the websites, digital storage systems, email sending or online services can be assured to be absolutely safe. We will therefore not guarantee complete protection.",
        "It is your responsibility to ensure that your account information is kept secure, that you use secure communication methods when appropriate, and that you report promptly any suspicious activity involving your account which may involve interaction with us.",
      ],
    },
    {
      id: "your-privacy-rights",
      title: "Your Privacy Rights",
      body: [
        "These are the rights you may have under the laws that apply to you:",
        {
          list: [
            "Ask us for information about you that we have.",
            "Ask for a correction of incorrect or incomplete information.",
            "Ask to have personal data removed, under specific conditions.",
            "Request restrictions on certain processing activities.",
            "Resist some processing, such as some direct marketing.",
            "Ask for a hard copy of some information.",
            "Withdraw consent if processing is based on consent.",
            "Complain to an appropriate data protection authority.",
          ],
        },
        "These rights are not unlimited, and are subject to legal exceptions.",
        "A privacy request may be made by sending a message to us using the contact information or the contact form available on our website. Please be aware that we might need to verify your identity before we respond. We will reply within the time limits specified by the applicable laws.",
      ],
    },
    {
      id: "marketing-communications",
      title: "Marketing Communications",
      body: [
        "Service communications - may be sent regarding inquiries, proposals, project status, invoices, support etc.",
        "Also, promotional communications may be sent as allowed by law. To opt-out of marketing emails, use the unsubscribe link, if available, or reach out to us.",
        "Refusing to receive marketing related communications will not stop us sending essential messages in connection with an active project, payment or contractual obligation.",
      ],
    },
    {
      id: "third-party-websites-and-services",
      title: "Third-Party Websites and Services",
      body: [
        "We may include links to other resources online, applications, payment services, social media platforms or other websites.",
        "We are not responsible for the privacy practices, content or security of those third parties. Utilizing or visiting their services will be as per their respective terms and policies concerning privacy.",
        "Please be sure to carefully consider those policies before entering personal information into any external service.",
      ],
    },
    {
      id: "international-data-transfers",
      title: "International Data Transfers",
      body: [
        "Personal information may be processed or stored in other countries than the country of your residence depending on our service providers, business operations and your location.",
        "If there are international transfers where safeguards are required by the applicable law, we will take reasonable steps to provide the safeguards required by that law.",
      ],
    },
    {
      id: "children-s-privacy",
      title: "Children's Privacy",
      body: [
        "Our website and business services are for use by businesses and individuals who are legally allowed to use them. We do not knowingly solicit personal information directly from children where it is legally necessary and do not collect personal information directly from children unless this is legally required.",
        "If you think a child has given us personal information that they shouldn't have, please write to us to help us understand what has happened and what action to take.",
      ],
    },
    {
      id: "changes-to-this-privacy-policy",
      title: "Changes to This Privacy Policy",
      body: [
        "We reserve the right to modify this Privacy Policy from time to time to address changes in the services, technologies being used on the Web, our business or legal requirements.",
        "This updated version will be published on this page and will have an updated revision date. If required by law, we will give further notice or obtain consent for changes to the material.",
      ],
    },
    {
      id: "contact-us",
      title: "Contact Us",
      body: [
        "For any questions on this Privacy Policy, exercise of the privacy rights and/or information about the processing of personal data, you can contact Ink Pixel Studios on the official contact form or on the contact data provided on our website.",
        {
          contact: true,
        },
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  name: "Terms and Conditions",
  description: "The terms and conditions for using the Ink Pixel Studios website and services.",
  path: "/terms",
  title: "Terms and *Conditions*",
  intro:
    "Welcome to Ink Pixel Studios. These Terms and Conditions govern your access to and use of our website, communications, and services.",
  updated: "23 October 2026",
  sections: [
    {
      id: "introduction-and-acceptance",
      title: "Introduction and Acceptance",
      body: [
        "Ink Pixel Studios provides digital services that may include website design and development, custom software development, mobile application development, AI automation, AI consulting, branding, digital marketing, and related technology solutions.",
        "By accessing our website, submitting an inquiry, accepting a proposal, or engaging our services, you agree to these Terms and Conditions to the extent applicable to your interaction with us. A separate signed agreement, proposal, statement of work, or service-specific contract may establish additional terms for a particular project.",
        "If you do not agree to these terms, please discontinue use of the website and do not engage our services.",
      ],
    },
    {
      id: "eligibility-and-business-information",
      title: "Eligibility and Business Information",
      body: [
        "You must be legally capable of entering into a binding agreement to purchase our services.",
        "If you act on behalf of a company or other organization, you confirm that you have the authority to represent that organization and accept contractual obligations on its behalf.",
        "Before entering into a service agreement, the applicable legal business name, business registration details where required, contact information, and other necessary contracting information should be confirmed.",
      ],
    },
    {
      id: "our-services",
      title: "Our Services",
      body: [
        "Ink Pixel Studios may provide services including, but not limited to:",
        {
          list: [
            "Website design, development, maintenance, and optimization",
            "Custom software and business process automation",
            "iOS and Android application development",
            "App maintenance, scaling, and technical support",
            "AI chatbots, virtual assistants, and custom AI agents",
            "AI consulting, training, and system integrations",
            "Document and data processing solutions",
            "Branding and visual identity services",
            "Digital marketing, search engine optimization, and social media services",
          ],
        },
        "The exact scope, deliverables, pricing, timeline, revision limits, and support arrangements for each project will be established in the applicable proposal or written agreement.",
        "Descriptions on our website are general service summaries and do not automatically include every feature or deliverable for every project.",
      ],
    },
    {
      id: "project-proposals-and-agreements",
      title: "Project Proposals and Agreements",
      body: [
        "Before work begins, we may provide a proposal, quotation, project brief, or statement of work describing the agreed services.",
        "Depending on the project, the agreement may specify:",
        {
          list: [
            "Scope of work and deliverables",
            "Project milestones and estimated timeline",
            "Fees, deposits, and payment schedule",
            "Client responsibilities and required materials",
            "Included revisions and approval procedures",
            "Hosting, licensing, integrations, and third-party costs",
            "Ownership and licensing rights",
            "Maintenance, warranty, and support arrangements",
            "Cancellation and refund terms",
          ],
        },
        "A project will ordinarily begin after the required approvals, information, and initial payment have been received, unless otherwise agreed in writing.",
        "Any material change to the approved scope may require a revised quotation, adjusted timeline, or additional payment.",
      ],
    },
    {
      id: "client-responsibilities",
      title: "Client Responsibilities",
      body: [
        "Clients are responsible for providing accurate information, timely feedback, and the materials reasonably necessary to complete their projects.",
        "You agree to:",
        {
          list: [
            "Provide complete and accurate project requirements.",
            "Supply content, images, brand assets, credentials, and approvals when needed.",
            "Confirm that you have permission to use all materials provided to us.",
            "Review deliverables and communicate requested changes within agreed timelines.",
            "Maintain appropriate backups of your original files and important business data.",
            "Obtain any permissions, licenses, or consents required for your business operations.",
            "Ensure that instructions and supplied materials comply with applicable laws.",
            "Maintain control over your own accounts and credentials unless account management is expressly included.",
          ],
        },
        "Delays in receiving materials, feedback, approvals, or access may affect delivery dates and project costs.",
        "We are not responsible for delays or defects caused by incomplete instructions, inaccurate client-provided information, unauthorized changes, or third-party systems outside our reasonable control.",
      ],
    },
    {
      id: "pricing-and-payments",
      title: "Pricing and Payments",
      body: [
        "Prices, payment schedules, deposits, and applicable charges will be communicated in the relevant proposal, invoice, or written agreement.",
        "Unless otherwise agreed:",
        {
          list: [
            "Payments must be made according to the agreed schedule.",
            "Work may be paused if required payments are overdue.",
            "Additional requests outside the agreed scope may incur additional charges.",
            "Third-party costs, including software subscriptions, hosting, domains, API usage, paid plugins, stock assets, and advertising spend, are the client's responsibility unless expressly included in writing.",
          ],
        },
        "Taxes, duties, and similar charges will be handled according to applicable law and the agreed pricing terms.",
        "If a payment is disputed, the parties should communicate promptly and attempt to resolve the issue in good faith. Any late-payment charges or collection costs must be specified in the applicable agreement and permitted by law.",
      ],
    },
    {
      id: "revisions-approvals-and-change-requests",
      title: "Revisions, Approvals, and Change Requests",
      body: [
        "The number and type of revisions included in a project will be determined by the applicable proposal or agreement.",
        "A revision generally means an adjustment to an existing deliverable within the agreed scope. A new feature, additional page, substantial redesign, new integration, or change to previously approved requirements may be treated as additional work.",
        "Clients are responsible for reviewing deliverables and providing clear, consolidated feedback within the agreed review period.",
        "Approval may be provided in writing or through another agreed project approval method. Approval of a deliverable may authorize the next project stage, including deployment, publication, or final file delivery.",
      ],
    },
    {
      id: "timelines-and-delivery",
      title: "Timelines and Delivery",
      body: [
        "Project timelines are estimates unless a specific deadline is expressly agreed in writing.",
        "Delivery may depend on client feedback, content availability, approvals, payment, third-party access, app-store reviews, hosting providers, or other external requirements.",
        "We will make reasonable efforts to follow the agreed schedule, but we cannot guarantee that external reviews, integrations, or third-party services will be completed within a particular timeframe.",
        "If a project is delayed, the parties should discuss the cause and agree on reasonable next steps.",
      ],
    },
    {
      id: "intellectual-property-rights",
      title: "Intellectual Property Rights",
      body: [
        {
          heading: "Client Materials",
        },
        "You retain ownership of materials you provide to us, subject to any rights held by third parties. You grant us permission to use those materials only as reasonably necessary to perform the agreed services.",
        "You confirm that you have the rights and permissions required to provide those materials for the intended use.",
        {
          heading: "Project Deliverables",
        },
        "Ownership of final deliverables will be determined by the applicable written agreement.",
        "Where the agreement provides for transfer of ownership, the transfer will take effect upon satisfaction of the stated conditions, which may include full payment.",
        "Unless expressly transferred, we retain ownership of our pre-existing tools, reusable code, frameworks, templates, methods, processes, know-how, and other materials developed independently of the client project.",
        {
          heading: "Third-Party Materials",
        },
        "Third-party fonts, images, plugins, libraries, software, APIs, AI models, and other components may be subject to separate licenses or terms.",
        "Your rights to use such materials are governed by the relevant third-party terms. Additional license fees may apply.",
        {
          heading: "Portfolio and Promotion",
        },
        "We will not publicly disclose confidential client information without appropriate authorization. If we wish to display a client project, name, logo, or deliverable in our portfolio or marketing materials, we will obtain permission where required by the applicable agreement or law.",
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      body: [
        "Each party may receive confidential business, technical, financial, or project information from the other.",
        "The receiving party agrees to use such information only for the agreed business purpose, limit access to authorized individuals who need it, and take reasonable measures to protect it.",
        "Confidentiality obligations do not ordinarily apply to information that is publicly available through no breach, already lawfully known, independently developed, or lawfully received from another source.",
        "Where a separate nondisclosure agreement applies, its terms will govern the relevant confidential information.",
      ],
    },
    {
      id: "website-use-and-acceptable-conduct",
      title: "Website Use and Acceptable Conduct",
      body: [
        "You agree not to:",
        {
          list: [
            "Use our website for unlawful, fraudulent, or misleading purposes.",
            "Attempt to gain unauthorized access to our systems or accounts.",
            "Introduce malicious code or interfere with website functionality.",
            "Copy, scrape, or exploit website content in violation of applicable law or intellectual property rights.",
            "Submit content that infringes third-party rights or violates applicable law.",
            "Misrepresent your identity or authority when contacting us.",
            "Interfere with the use of our website by other visitors.",
          ],
        },
        "We may restrict access to our website where reasonably necessary to protect security, comply with law, or address misuse.",
      ],
    },
    {
      id: "ai-services-and-automated-solutions",
      title: "AI Services and Automated Solutions",
      body: [
        "Our AI-related services may include chatbots, virtual assistants, AI agents, content workflows, document processing, and integrations with third-party tools.",
        "AI systems can produce incomplete, inaccurate, outdated, or unexpected results. Clients are responsible for reviewing AI-generated outputs where accuracy, legal compliance, safety, or business judgment is important.",
        "Unless expressly agreed otherwise, our AI solutions are intended to support business processes rather than replace necessary human review or professional judgment.",
        "Clients must ensure they have the right to use any data submitted to AI systems and must not provide personal, confidential, regulated, or sensitive information without appropriate authorization and safeguards.",
        "We do not promise that AI systems will always be available, error-free, unbiased, or capable of producing a specific business outcome.",
      ],
    },
    {
      id: "third-party-platforms-and-integrations",
      title: "Third-Party Platforms and Integrations",
      body: [
        "Our services may rely on third-party platforms, including hosting providers, domain registrars, payment processors, app stores, analytics tools, APIs, advertising platforms, plugins, and software subscriptions.",
        "These services may have their own terms, fees, technical requirements, and availability limitations.",
        "We are not responsible for independent changes, outages, suspensions, pricing changes, security incidents, or policy decisions made by third-party providers, except to the extent liability cannot lawfully be excluded.",
        "If a third-party service becomes unavailable or changes its functionality, additional work may be required to adapt the project.",
      ],
    },
    {
      id: "maintenance-support-and-security",
      title: "Maintenance, Support, and Security",
      body: [
        "Maintenance, updates, bug fixes, monitoring, hosting, and technical support are included only where specified in the applicable agreement or package.",
        "Unless expressly agreed, completing a project does not automatically create an ongoing maintenance obligation.",
        "Clients are responsible for maintaining appropriate account access, credentials, backups, licenses, and security practices for systems under their control.",
        "We will handle agreed maintenance work with reasonable care, but no digital system can be guaranteed to remain free from vulnerabilities, downtime, or compatibility issues.",
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      body: [
        "Our website and general service descriptions are provided for informational purposes.",
        "Except for commitments expressly stated in a written agreement or rights that cannot be excluded by law, services are provided without implied warranties to the maximum extent permitted by applicable law.",
        "We do not guarantee specific sales, traffic, search rankings, advertising results, conversion rates, revenue, user growth, or other business outcomes.",
        "Results may depend on factors outside our control, including market conditions, client decisions, competition, third-party algorithms, platform policies, and user behavior.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      body: [
        "To the maximum extent permitted by applicable law, neither party will be liable to the other for indirect, incidental, special, exemplary, or consequential losses, including loss of profits, revenue, business opportunities, goodwill, or data, arising from the relevant services or these terms.",
        "Subject to applicable law and any separate written agreement, our total liability arising from a particular project will not exceed the fees paid or payable to us for that project during the twelve months preceding the event giving rise to the claim.",
        "Nothing in these terms excludes or limits liability where doing so would be unlawful, including liability that cannot legally be excluded for fraud, willful misconduct, or other protected rights.",
        "Any limitation of liability must be interpreted consistently with mandatory consumer protection and other applicable laws.",
      ],
    },
    {
      id: "indemnification",
      title: "Indemnification",
      body: [
        "To the extent permitted by law, you agree to be responsible for claims, losses, or expenses arising from materials you supply that infringe third-party rights, your unlawful use of the services, or your material breach of these terms.",
        "This provision does not apply to the extent a claim results from our own breach, negligence, misconduct, or other conduct for which responsibility cannot legally be transferred.",
      ],
    },
    {
      id: "suspension-and-termination",
      title: "Suspension and Termination",
      body: [
        "Either party may terminate a project in accordance with the applicable written agreement.",
        "We may suspend services or access where reasonably necessary due to non-payment, unlawful activity, security concerns, material breach, or a third-party restriction affecting the work.",
        "Upon termination, the parties will settle outstanding amounts and handle completed work, work in progress, access credentials, project files, and any transferable rights according to the applicable agreement and refund policy.",
        "Termination does not remove obligations that accrued before termination or provisions intended to continue afterward, such as payment, confidentiality, intellectual property, and applicable liability provisions.",
      ],
    },
    {
      id: "privacy",
      title: "Privacy",
      body: [
        "Our collection and use of personal information are described in our Privacy Policy. By using our website, you acknowledge that you have had an opportunity to review that policy.",
        "Where applicable law requires consent for specific processing activities, that consent will be obtained separately.",
      ],
    },
    {
      id: "governing-law-and-disputes",
      title: "Governing Law and Disputes",
      body: [
        "These Terms and Conditions will be governed by the laws of the jurisdiction identified in the final published version of this policy, without regard to conflict-of-law rules, subject to mandatory legal protections that apply to you.",
        "The parties will first attempt to resolve disputes through good-faith communication. If a dispute cannot be resolved informally, it may be referred to the courts or other dispute-resolution forum with appropriate jurisdiction under applicable law.",
      ],
    },
    {
      id: "changes-to-these-terms",
      title: "Changes to These Terms",
      body: [
        "We may update these Terms and Conditions to reflect changes to our services, business practices, or legal obligations.",
        "Updates will be posted on this page with a revised date. Changes will apply prospectively unless otherwise permitted by law or agreed in writing.",
        "Material changes to an existing project agreement will be handled in accordance with that agreement and applicable law.",
      ],
    },
    {
      id: "contact-us",
      title: "Contact Us",
      body: [
        "For any questions on these Terms and Conditions, you can contact Ink Pixel Studios on the official contact form or on the contact data provided on our website.",
        {
          contact: true,
        },
      ],
    },
  ],
};

export const refundPolicy: LegalDocument = {
  name: "Refund Policy",
  description: "How cancellations, refund requests, and payment disputes work for projects with Ink Pixel Studios.",
  path: "/refund-policy",
  title: "Refund *Policy*",
  intro:
    "At Ink Pixel Studios, we provide customized digital services designed around each client's requirements. Our services may include website design and development, software development, mobile application development, AI automation, branding, digital marketing, consulting, and related technology solutions.",
  updated: "23 October 2026",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      body: [
        "Because these services often involve project planning, creative work, development time, resource allocation, and customized deliverables, refund eligibility depends on the project stage, work completed, payment terms, and applicable law.",
        "This Refund Policy explains how we handle refund requests, project cancellations, payment disputes, and related concerns. It should be read alongside the relevant proposal, service agreement, and Terms and Conditions.",
      ],
    },
    {
      id: "scope-of-this-policy",
      title: "Scope of This Policy",
      body: [
        "This policy applies to payments made directly to Ink Pixel Studios for services, projects, or other offerings covered by our written agreements.",
        "Certain charges may be governed by separate terms, including third-party software subscriptions, domain registrations, hosting services, advertising budgets, paid licenses, stock assets, API usage, and other external services.",
        "Where a separate written agreement establishes specific refund terms for a project, those terms will apply to the extent they are lawful and consistent with mandatory consumer rights.",
      ],
    },
    {
      id: "general-refund-principles",
      title: "General Refund Principles",
      body: [
        "Refund eligibility is assessed based on the nature of the service and the stage at which a cancellation or refund request is made.",
        "As a general proposed policy:",
        {
          list: [
            "Before work begins: A refund may be considered for eligible payments if the project has not started, subject to the written agreement, any disclosed non-refundable charges, and applicable law.",
            "After work begins: Refund eligibility may be limited to the portion of payment attributable to services not performed, where a refund is due under the agreement or applicable law.",
            "After partial delivery: Any eligible refund may take into account completed work, approved milestones, committed resources, and the terms of the agreement.",
            "After final delivery or approval: Completed and accepted work is generally not refundable except where required by law or expressly provided in the applicable agreement.",
            "For recurring services: Cancellation generally affects future billing, subject to the subscription terms, notice period, and applicable law.",
          ],
        },
        "These principles are not intended to remove any statutory rights or override a project-specific commitment.",
      ],
    },
    {
      id: "website-design-and-development-refunds",
      title: "Website Design and Development Refunds",
      body: [
        "Website projects may involve discovery, planning, wireframes, design concepts, development, testing, integrations, and deployment.",
        "If a client requests cancellation:",
        {
          list: [
            "Before project work begins, we will review the payment terms and determine whether a refund is due.",
            "Once project work has begun, the value of work completed and any applicable contractual commitments may be considered when assessing a refund.",
            "If design concepts, development work, or other milestones have been delivered and accepted, those completed portions are generally not refundable unless the agreement or applicable law provides otherwise.",
            "If a project is incomplete due to an issue attributable to Ink Pixel Studios, we will review the circumstances and determine an appropriate remedy under the agreement and applicable law.",
          ],
        },
        "Domain registration, hosting, premium themes, plugins, third-party licenses, and other external charges may be non-refundable under the relevant provider's terms. We will identify such charges where reasonably possible before purchase.",
      ],
    },
    {
      id: "software-and-mobile-application-development-refunds",
      title: "Software and Mobile Application Development Refunds",
      body: [
        "Custom software and mobile application projects may require requirements analysis, technical architecture, interface design, coding, integration, testing, and deployment preparation.",
        "Refund requests for these projects will be reviewed according to the agreed milestones and work completed.",
        {
          list: [
            "Work already completed and delivered will generally not qualify for a refund except where required by law or agreed in writing.",
            "Payments for work not yet performed may be considered for refund where appropriate under the contract and applicable law.",
            "Third-party API fees, software subscriptions, app-store charges, hosting fees, and external licenses are subject to their providers' refund policies.",
            "Additional features, revisions, or changes outside the original scope may involve separate charges and will be handled according to the relevant agreement.",
          ],
        },
        "If a delivered feature does not meet an expressly agreed specification, the client should notify us with sufficient details so that we can assess the issue and determine the appropriate contractual remedy.",
      ],
    },
    {
      id: "ai-automation-consulting-and-integration-services",
      title: "AI Automation, Consulting, and Integration Services",
      body: [
        "AI-related projects may include workflow analysis, AI agent configuration, chatbot development, integrations, training, testing, and implementation.",
        "Refund requests for these services will be assessed based on the agreed scope, work completed, deliverables supplied, and applicable agreement.",
        "AI systems and third-party tools may produce variable results or change over time. A result that differs from an expected business outcome does not automatically establish refund eligibility unless a specific outcome or acceptance criterion was expressly agreed in writing or a refund is otherwise required by law.",
        "Where an agreed deliverable fails to meet a documented requirement, we will review the issue and consider appropriate corrective work, replacement, partial refund, or another remedy where required or agreed.",
      ],
    },
    {
      id: "branding-design-and-digital-marketing-refunds",
      title: "Branding, Design, and Digital Marketing Refunds",
      body: [
        "Creative and marketing services may include branding, logo design, graphics, social media content, search engine optimization, advertising setup, and campaign management.",
        "Refund eligibility may depend on the work completed, concepts or content delivered, campaign activities performed, and the applicable agreement.",
        {
          list: [
            "Completed and approved creative deliverables are generally not refundable except where required by law or agreed in writing.",
            "Requests to change creative direction after approval may be treated as additional work.",
            "Advertising budgets paid to advertising platforms are separate from our service fees and are subject to the platform's terms.",
            "Marketing performance, audience response, search rankings, leads, and sales may vary and are not guaranteed unless a specific written agreement provides otherwise.",
          ],
        },
        "If a deliverable does not meet an expressly agreed requirement, please notify us so that we can review the concern and determine an appropriate remedy.",
      ],
    },
    {
      id: "deposits-and-advance-payments",
      title: "Deposits and Advance Payments",
      body: [
        "Some projects require an advance payment or deposit to reserve resources and begin work.",
        "Any deposit described as non-refundable must be clearly disclosed and agreed to before payment, and may be retained only to the extent permitted by applicable law.",
        "If a client cancels after work has begun, we may assess the value of work completed and documented, approved project expenses, and other charges permitted by the agreement and law.",
        "We will not rely on this policy to retain an amount that must legally be refunded.",
      ],
    },
    {
      id: "cancellation-requests",
      title: "Cancellation Requests",
      body: [
        "Clients who wish to cancel a project or service should submit a written request through the official contact form or contact details published on our website.",
        "Please include:",
        {
          list: [
            "Your full name and contact email",
            "Project or invoice reference, where available",
            "The service you wish to cancel",
            "The reason for the cancellation",
            "Relevant payment or project details",
          ],
        },
        "We may request additional information to verify the request and identify the applicable agreement.",
        "Cancellation will take effect according to the project agreement, subscription terms, and applicable law. Work already completed, approved, or delivered may remain payable.",
      ],
    },
    {
      id: "how-to-request-a-refund",
      title: "How to Request a Refund",
      body: [
        "To request a refund, contact Ink Pixel Studios using the official contact details or form published on our website.",
        "Please provide:",
        {
          list: [
            "Your name and contact information.",
            "The project name or invoice number.",
            "The amount and date of payment.",
            "A clear explanation of the refund request.",
            "Relevant supporting information, such as agreed specifications or delivery records.",
          ],
        },
        "We will review the request against the relevant agreement, project status, payment records, and applicable law.",
        "We aim to acknowledge refund requests within five business days and provide a decision or status update within a reasonable period. If additional review is necessary, we will communicate that to you.",
      ],
    },
    {
      id: "refund-processing",
      title: "Refund Processing",
      body: [
        "If a refund is approved, it will ordinarily be issued through the original payment method where practicable, unless another method is agreed or required.",
        "Processing times may vary depending on the payment provider, bank, card issuer, and payment method. We cannot control delays caused by external financial institutions.",
        "Any deductions or processing fees will be applied only where permitted by applicable law and the agreed payment terms.",
      ],
    },
    {
      id: "chargebacks-and-payment-disputes",
      title: "Chargebacks and Payment Disputes",
      body: [
        "If you have a concern about a payment, please contact us first so that we can review the issue and attempt to resolve it.",
        "You retain any rights available through your payment provider, bank, card issuer, or applicable law. Nothing in this policy prevents you from exercising those rights.",
        "We may provide relevant invoices, agreements, delivery records, and communication history to a payment provider when responding to a legitimate payment dispute.",
      ],
    },
    {
      id: "third-party-products-and-services",
      title: "Third-Party Products and Services",
      body: [
        "Certain project components may be purchased from or provided by third parties, including:",
        {
          list: [
            "Domain names and hosting services",
            "Premium software and plugins",
            "Stock photography, fonts, and creative assets",
            "AI platforms and API services",
            "App-store accounts and related fees",
            "Advertising platforms and campaign budgets",
            "External subscriptions and licensed tools",
          ],
        },
        "Refunds for these products and services are subject to the relevant provider's terms. Where the charges are paid directly to a third party, the client may need to contact that provider.",
        "We will clarify third-party charges and responsibilities where reasonably possible during project planning.",
      ],
    },
    {
      id: "revisions-and-technical-issues",
      title: "Revisions and Technical Issues",
      body: [
        "A request for a refund should be distinguished from a request for revisions, corrections, or technical support.",
        "If a deliverable does not meet the agreed specifications, please provide a written description of the issue and any relevant supporting material. We will assess the concern and determine whether corrective work, a revision, or another remedy is appropriate under the agreement.",
        "Revisions beyond the agreed scope, changes to approved requirements, or problems caused by unauthorized modifications or unsupported third-party systems may involve additional charges.",
        "Nothing in this section limits rights that cannot lawfully be excluded.",
      ],
    },
    {
      id: "exceptional-circumstances",
      title: "Exceptional Circumstances",
      body: [
        "We recognize that unexpected circumstances may affect a project. We may review exceptional cases individually, taking into account the circumstances, work completed, contractual terms, and applicable law.",
        "Any discretionary refund or alternative resolution will be communicated in writing and will not automatically establish a refund entitlement for other projects.",
      ],
    },
    {
      id: "changes-to-this-refund-policy",
      title: "Changes to This Refund Policy",
      body: [
        "We may update this policy to reflect changes in our services, payment arrangements, or legal obligations.",
        "The updated version will be published on this page with a revised date. Changes will not remove rights already established under an existing agreement or applicable law.",
      ],
    },
    {
      id: "contact-us",
      title: "Contact Us",
      body: [
        "For any questions on this Refund Policy, you can contact Ink Pixel Studios on the official contact form or on the contact data provided on our website.",
        {
          contact: true,
        },
      ],
    },
  ],
};
