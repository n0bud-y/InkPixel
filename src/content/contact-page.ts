// The Contact page (/contact). There is no design for it; it follows the site's own style (the
// Our Work and Insights heroes, the "Get in touch" card). The address, phone, email, and map are
// the studio's details from src/lib/site.ts and src/content/about.ts.
//
// PLACEHOLDER (issue I14): the budget ranges and the "What happens next" steps are stand-ins;
// the meta description is a stand-in too (issue I9).
export const contactPage = {
  /** The page's name, e.g. in the browser tab and the breadcrumb. */
  name: "Contact",
  description:
    "Tell Ink Pixel Studios about your project. Email info@inkpixelstudios.com or visit our office on Shahra-e-Faisal, Karachi; we reply within a working day.",
  eyebrow: "Contact",
  /** Accented words are in *stars*. */
  title: "Let's Talk About Your *Project*",
  intro:
    "Tell us what you're building, where you're stuck, or what you'd like to improve. We read every message and reply within a working day.",

  form: {
    title: "Tell us about your project",
    intro: "Fields marked * are required. It takes about a minute.",
    fields: {
      name: { label: "Your name", placeholder: "Jane Smith" },
      email: { label: "Email", placeholder: "jane@company.com" },
      phone: { label: "Phone", placeholder: "+92 300 1234567" },
      company: { label: "Company", placeholder: "Company or brand" },
      message: { label: "Your message", placeholder: "What are you building, and what do you need from us?" },
    },
    optional: "Optional",
    services: { label: "What can we help with?", hint: "Choose all that apply." },
    notSure: "Not sure yet",
    budget: { label: "Estimated budget", hint: "Optional. Helps us suggest the right approach." },
    // PLACEHOLDER: stand-in ranges; show only ranges the studio is happy to quote.
    budgets: ["Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+", "Not sure yet"],
    errors: {
      name: "Please tell us your name.",
      email: "Please enter your email address.",
      emailFormat: "That email doesn't look right. Check it for typos.",
      message: "Please tell us a little about your project.",
    },
    /** Labels for the details at the end of the email. */
    emailLabels: { name: "Name", email: "Email", phone: "Phone", company: "Company", services: "Services", budget: "Budget" },
    /** The box with a visitor's answers from a service page's cost estimator. */
    estimate: { title: "From your {name} estimate", remove: "Remove", note: "My answers from the cost estimator" },
    submit: "Send message",
    /** After Submit, which opens the visitor's email app (until the lead pipeline, P3-14). */
    sent: {
      title: "Almost there!",
      text: "Your email app should open with your message ready to send. Just press Send there.",
      fallback: "Nothing opened? Copy your message and email it to",
      copy: "Copy message",
      copied: "Copied",
      again: "Write another message",
    },
  },

  details: {
    badge: "We reply within a working day",
  },

  steps: {
    title: "What Happens *Next*",
    intro: "No long forms or sales scripts. Here's how a project starts with us.",
    items: [
      {
        title: "We reply within a working day",
        text: "Someone from the team reads your message and comes back with questions, or a time to talk.",
      },
      {
        title: "A free consultation call",
        text: "A 30-minute call about your goals, your users, and what success looks like. No commitment.",
      },
      {
        title: "Your estimate and plan",
        text: "A clear scope, timeline, and estimate, so you can decide with everything on the table.",
      },
    ],
  },

  faqEyebrow: "FAQ",
};
