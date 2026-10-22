"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { contactPage } from "@/content/contact-page";
import { siteConfig } from "@/lib/site";

const { form } = contactPage;

/** A service page's cost estimator, so its answers can be written out: its name, its core
 *  service, and its questions (id → question). */
export type Estimator = { name: string; core: string; questions: Record<string, string> };

/** A core service as a chip: its slug, its name, and a white line icon (drawn as a mask). */
export type ServiceChoice = { slug: string; label: string; icon: string };

type TextField = "name" | "email" | "message";
type Errors = Partial<Record<TextField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A white line icon as a shape filled with a colour (CSS mask).
const maskOf = (src: string): CSSProperties => ({
  maskImage: `url(${src})`,
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskImage: `url(${src})`,
  WebkitMaskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
});

const input =
  "mt-2 block w-full rounded-xl border bg-primary/[0.025] px-4 py-3 text-[clamp(0.9375rem,0.95vw,1.0625rem)] text-primary outline-none transition duration-200 placeholder:text-primary/35 hover:border-primary/25 focus:border-crimson/70 focus:bg-white focus:ring-4 focus:ring-crimson/10";
const chip =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[clamp(0.875rem,0.9vw,1rem)] font-medium transition duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-crimson/25";

// The Contact page's form: name, email, phone, company, the services (chips, several allowed),
// a budget (chips, one), and the message. Until the lead pipeline (P3-14) sends messages from the
// site, Submit opens the visitor's email app with everything written out, addressed to the studio,
// then shows a panel with a "Copy message" fallback. Without JavaScript the browser does much the
// same (a mailto: form, with its own required-field checks).
//
// - Errors show under a field when it is left empty or wrong, and on Submit (which then moves
//   focus to the first one); they clear as soon as the field is fixed.
// - Coming from a cost estimator (/contact?service=<service page>&<question>=<answer>…), its core
//   service is chosen and the answers show in a box above the message (with "Remove"), and go
//   into the email. `?service=<core service>` only chooses the service. The address is read in the
//   browser, so the page stays static.
export function ProjectForm({ services, estimators }: { services: ServiceChoice[]; estimators: Record<string, Estimator> }) {
  const [chosen, setChosen] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [estimate, setEstimate] = useState<{ name: string; answers: [string, string][] } | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<{ subject: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLHeadingElement>(null);

  // Our own error messages replace the browser's once JavaScript runs; read the estimator answers.
  useEffect(() => {
    if (formRef.current) formRef.current.noValidate = true;
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("service") ?? "";
    const estimator = estimators[slug];
    const core = estimator?.core ?? (services.some((item) => item.slug === slug) ? slug : null);
    const answers = estimator
      ? Object.entries(estimator.questions).flatMap(([id, question]): [string, string][] => {
          const answer = params.get(id);
          return answer ? [[question, answer]] : [];
        })
      : [];
    // Reading the address happens once, after the first render (the page is static).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (core) setChosen([core]);
    if (estimator && answers.length) setEstimate({ name: estimator.name, answers });
  }, [services, estimators]);

  useEffect(() => {
    if (sent) sentRef.current?.focus();
  }, [sent]);

  const errorOf = (field: TextField, value: string) => {
    if (!value.trim()) return form.errors[field];
    if (field === "email" && !emailPattern.test(value.trim())) return form.errors.emailFormat;
  };

  // On leaving a field: show its error. While typing: only clear one that is fixed.
  const check = (field: TextField, value: string, typing = false) => {
    const error = errorOf(field, value);
    if (typing && !errors[field]) return;
    setErrors((current) => ({ ...current, [field]: error }));
  };

  const toggleService = (slug: string) =>
    setChosen((current) => (current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const fields: TextField[] = ["name", "email", "message"];
    const found = Object.fromEntries(fields.map((field) => [field, errorOf(field, value(field))])) as Errors;
    setErrors(found);
    const first = fields.find((field) => found[field]);
    if (first) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const serviceNames = chosen.map((slug) => services.find((item) => item.slug === slug)?.label ?? form.notSure);
    const labels = form.emailLabels;
    const details = [
      [labels.name, value("name")],
      [labels.email, value("email")],
      [labels.phone, value("phone")],
      [labels.company, value("company")],
      [labels.services, serviceNames.join(", ")],
      [labels.budget, budget],
    ]
      .filter(([, text]) => text)
      .map(([name, text]) => `${name}: ${text}`);
    const estimateLines = estimate
      ? [`${form.estimate.note} (${estimate.name}):`, ...estimate.answers.map(([question, answer]) => `- ${question} ${answer}`)]
      : [];
    const named = serviceNames.filter((name) => name !== form.notSure);
    const subject = `Project enquiry from ${value("name")}${named.length ? ` (${named.join(", ")})` : ""}`;
    const body = [value("message"), estimateLines.join("\n"), details.join("\n")].filter(Boolean).join("\n\n");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent({ subject, body });
  };

  const copy = async () => {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(`${sent.subject}\n\n${sent.body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (sent) {
    return (
      <div className="mt-[clamp(2rem,3vw,3rem)] rounded-2xl border border-crimson/15 bg-linear-to-br from-[#fff4f1] to-[#fdecef] p-[clamp(1.5rem,2.2vw,2.5rem)] motion-safe:animate-rise">
        <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-brand-gradient-reverse text-white shadow-[0_12px_32px_-10px_rgb(201_29_76_/_0.75)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3 ref={sentRef} tabIndex={-1} className="mt-5 font-display text-[clamp(1.5rem,1.8vw,2rem)] leading-tight font-medium text-primary focus:outline-none">
          {form.sent.title}
        </h3>
        <p className="mt-2 max-w-[34em] text-[clamp(0.9375rem,0.95vw,1.0625rem)] leading-[1.7] text-primary/80">{form.sent.text}</p>
        <p className="mt-5 text-[clamp(0.875rem,0.9vw,1rem)] leading-[1.7] text-primary/70">
          {form.sent.fallback}{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-crimson underline underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/15 bg-white px-5 text-[14px] font-medium text-primary transition hover:border-crimson/40 hover:text-crimson"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              {copied ? <path d="m5 12.5 4.5 4.5L19 7.5" /> : <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>}
            </svg>
            <span aria-live="polite">{copied ? form.sent.copied : form.sent.copy}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSent(null);
              setCopied(false);
            }}
            className="px-3 py-2 text-[14px] font-medium text-primary/70 underline-offset-4 hover:text-crimson hover:underline"
          >
            {form.sent.again}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={`mailto:${siteConfig.email}`}
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
      className="mt-[clamp(1.75rem,2.4vw,2.75rem)] grid grid-cols-[minmax(0,1fr)] gap-x-[clamp(1rem,1.4vw,1.5rem)] gap-y-[clamp(1.25rem,1.6vw,1.75rem)] sm:grid-cols-2"
    >
      <Field label={form.fields.name.label} required error={errors.name} name="name">
        {(props) => (
          <input
            {...props}
            autoComplete="name"
            placeholder={form.fields.name.placeholder}
            onBlur={(event) => check("name", event.target.value)}
            onChange={(event) => check("name", event.target.value, true)}
          />
        )}
      </Field>
      <Field label={form.fields.email.label} required error={errors.email} name="email">
        {(props) => (
          <input
            {...props}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={form.fields.email.placeholder}
            onBlur={(event) => check("email", event.target.value)}
            onChange={(event) => check("email", event.target.value, true)}
          />
        )}
      </Field>
      <Field label={form.fields.phone.label} name="phone">
        {(props) => <input {...props} type="tel" autoComplete="tel" placeholder={form.fields.phone.placeholder} />}
      </Field>
      <Field label={form.fields.company.label} name="company">
        {(props) => <input {...props} autoComplete="organization" placeholder={form.fields.company.placeholder} />}
      </Field>

      <ChipGroup legend={form.services.label} hint={form.services.hint}>
        {[...services, { slug: "not-sure", label: form.notSure, icon: "" }].map((service) => {
          const on = chosen.includes(service.slug);
          return (
            <label key={service.slug} className="relative">
              <input
                type="checkbox"
                name="service"
                value={service.slug}
                checked={on}
                onChange={() => toggleService(service.slug)}
                className="peer sr-only"
              />
              <span
                className={`${chip} ${on ? "border-transparent bg-brand-gradient-reverse text-white shadow-[0_10px_24px_-12px_rgb(201_29_76_/_0.8)]" : "border-primary/15 bg-white text-primary hover:border-crimson/40 hover:bg-crimson/[0.03]"}`}
              >
                {service.icon ? (
                  <span
                    aria-hidden="true"
                    className={`block size-[1.15em] shrink-0 ${on ? "bg-white" : "bg-brand-gradient-reverse"}`}
                    style={maskOf(service.icon)}
                  />
                ) : (
                  <span aria-hidden="true" className={`grid size-[1.15em] place-items-center rounded-full border text-[0.7em] font-bold ${on ? "border-white" : "border-crimson text-crimson"}`}>
                    ?
                  </span>
                )}
                {service.label}
                {on && <Tick />}
              </span>
            </label>
          );
        })}
      </ChipGroup>

      <ChipGroup legend={form.budget.label} hint={form.budget.hint}>
        {form.budgets.map((range) => {
          const on = budget === range;
          return (
            <label key={range} className="relative">
              <input
                type="radio"
                name="budget"
                value={range}
                checked={on}
                onChange={() => setBudget(range)}
                // A second click on the chosen range clears it (the budget is optional).
                onClick={() => on && setBudget("")}
                className="peer sr-only"
              />
              <span
                className={`${chip} ${on ? "border-crimson bg-crimson/[0.06] text-crimson" : "border-primary/15 bg-white text-primary hover:border-crimson/40 hover:bg-crimson/[0.03]"}`}
              >
                {range}
                {on && <Tick />}
              </span>
            </label>
          );
        })}
      </ChipGroup>

      {estimate && (
        <div className="rounded-2xl border border-crimson/15 bg-linear-to-br from-[#fff7f4] to-[#fdf0f2] p-4 sm:col-span-2 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <p className="flex items-center gap-2 text-[14px] font-semibold text-primary">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-crimson">
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <path d="M9 7h6M9 11h6M9 15h3" />
              </svg>
              {form.estimate.title.replace("{name}", estimate.name)}
            </p>
            <button
              type="button"
              onClick={() => setEstimate(null)}
              className="shrink-0 text-[13px] font-medium text-primary/60 underline-offset-4 hover:text-crimson hover:underline"
            >
              {form.estimate.remove}
            </button>
          </div>
          <dl className="mt-3 grid gap-x-6 gap-y-2 text-[14px] leading-snug sm:grid-cols-2">
            {estimate.answers.map(([question, answer]) => (
              <div key={question}>
                <dt className="text-primary/55">{question}</dt>
                <dd className="font-medium text-primary">{answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <Field label={form.fields.message.label} required error={errors.message} name="message" wide>
        {(props) => (
          <textarea
            {...props}
            rows={5}
            placeholder={form.fields.message.placeholder}
            onBlur={(event) => check("message", event.target.value)}
            onChange={(event) => check("message", event.target.value, true)}
            className={`${props.className} min-h-36 resize-y [field-sizing:content]`}
          />
        )}
      </Field>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:col-span-2">
        <button
          type="submit"
          className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-brand-gradient-reverse px-[clamp(1.75rem,2.2vw,2.5rem)] text-[clamp(0.9375rem,1vw,1.125rem)] font-medium text-white shadow-[0_12px_32px_-10px_rgb(201_29_76_/_0.75)] transition duration-200 ease-out hover:-translate-y-px hover:brightness-110 sm:h-[3.25rem] 2xl:h-14"
        >
          {form.submit}
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[1.1em] transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <p className="text-[13px] text-primary/55">{form.intro}</p>
      </div>
    </form>
  );
}

// A labelled text field: the label (with * when required, "Optional" otherwise), the input
// (rendered by the caller with the props given), and its error under it.
function Field({
  label,
  name,
  required = false,
  error,
  wide = false,
  children,
}: {
  label: string;
  name: TextField | "phone" | "company";
  required?: boolean;
  error?: string;
  wide?: boolean;
  children: (props: {
    id: string;
    name: string;
    required: boolean;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
    className: string;
  }) => ReactNode;
}) {
  const id = `contact-${name}`;
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="flex items-baseline gap-1 text-[clamp(0.875rem,0.9vw,1rem)] font-medium text-primary">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-crimson">
            *
          </span>
        ) : (
          <span className="ml-auto text-[12px] font-normal text-primary/45">{form.optional}</span>
        )}
      </label>
      {children({
        id,
        name,
        required,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? `${id}-error` : undefined,
        className: `${input} ${error ? "border-crimson bg-crimson/[0.03]" : "border-primary/12"}`,
      })}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-crimson">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-3.5 shrink-0">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7.5v5.5M12 16.5v.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// A group of chips (checkboxes or radio buttons) with its question and a hint.
function ChipGroup({ legend, hint, children }: { legend: string; hint: string; children: ReactNode }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="text-[clamp(0.875rem,0.9vw,1rem)] font-medium text-primary">{legend}</legend>
      <p className="mt-0.5 text-[13px] text-primary/55">{hint}</p>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Tick() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="-mr-1 size-[1em] shrink-0">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
