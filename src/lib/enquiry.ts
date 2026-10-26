import { contactPage } from "@/content/contact-page";

const { form } = contactPage;

/** What a contact form sends: the Contact page's project form, or the short "Get in touch" form
 *  (About and the service pages). */
export type Enquiry = {
  form: "project" | "contact";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  /** The services chosen, by name ("Not sure yet" included). */
  services?: string[];
  /** Answers carried over from a service page's cost estimator: [question, answer]. */
  estimate?: { name: string; answers: [string, string][] };
  message: string;
  /** The page the form was sent from. */
  page?: string;
  /** Honeypot: hidden from people, so only bots fill it in. */
  website?: string;
};

/** The email for an enquiry: its subject, and its text (the message, the estimator answers, then
 *  the details), as the site sends it to the studio. */
export function enquiryEmail(enquiry: Enquiry) {
  const named = (enquiry.services ?? []).filter((name) => name !== form.notSure);
  const subject =
    enquiry.form === "project"
      ? `Project enquiry from ${enquiry.name}${named.length ? ` (${named.join(", ")})` : ""}`
      : `Message from ${enquiry.name}`;

  const labels = form.emailLabels;
  const details = [
    [labels.name, enquiry.name],
    [labels.email, enquiry.email],
    [labels.phone, enquiry.phone],
    [labels.company, enquiry.company],
    [labels.services, enquiry.services?.join(", ")],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);
  const estimate = enquiry.estimate?.answers.length
    ? [`${form.estimate.note} (${enquiry.estimate.name}):`, ...enquiry.estimate.answers.map(([question, answer]) => `- ${question} ${answer}`)]
    : [];

  const text = [enquiry.message, estimate.join("\n"), details.join("\n")].filter(Boolean).join("\n\n");
  // One line, so a name can't add lines to the email's headers.
  return { subject: subject.replace(/\s+/g, " ").trim(), text };
}
