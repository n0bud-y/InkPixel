// The Contact page (/contact). There is no design for it; it follows the site's own style (the
// Our Work and Insights heroes, the "Get in touch" card). The address, phone, email, and map are
// the studio's details from src/lib/site.ts and src/content/about.ts.
//
// PLACEHOLDER (issue I14): the "What happens next" steps are stand-ins;
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
    errors: {
      name: "Please tell us your name.",
      email: "Please enter your email address.",
      emailFormat: "That email doesn't look right. Check it for typos.",
      message: "Please tell us a little about your project.",
    },
    /** Labels for the details at the end of the email. */
    emailLabels: { name: "Name", email: "Email", phone: "Phone", company: "Company", services: "Services" },
    /** The box with a visitor's answers from a service page's cost estimator. */
    estimate: { title: "From your {name} estimate", remove: "Remove", note: "My answers from the cost estimator" },
    submit: "Send message",
    sending: "Sending…",
    /** The thank-you popup after the message is sent to the studio (both contact forms). `*…*`
     *  is shown in the brand gradient; {name} is the visitor's first name, {email} their address. */
    thanks: {
      eyebrow: "Message received",
      title: "Thank you, *{name}*!",
      text: "Your message is on its way to our team. We read every enquiry ourselves and will get back to you soon.",
      reply: "We'll reply to {email} within one working day.",
      close: "Back to the site",
      closeLabel: "Close",
      work: { label: "See our work", href: "/case-studies" },
    },
    /** The line under the button when the message couldn't be sent (both contact forms). */
    failed: {
      unavailable: "Sorry, your message couldn't be sent just now. Please try again in a moment.",
      busy: "You've sent several messages in a few minutes. Please wait a little, then try again.",
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
