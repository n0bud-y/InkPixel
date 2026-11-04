"use client";

import { useEffect, useId, useRef, useState } from "react";
import { EstimateThankYouDialog } from "@/components/ui/EstimateThankYouDialog";
import { contactPage } from "@/content/contact-page";
import type { EstimatorQuestion } from "@/content/service-pages";
import type { Enquiry } from "@/lib/enquiry";
import { sendEnquiry } from "@/lib/send-enquiry";

const heading = "font-display text-[clamp(1.375rem,1.6vw,1.875rem)] leading-tight font-semibold focus:outline-none";
const pill =
  "inline-flex h-[clamp(2.75rem,2.7vw,3.25rem)] items-center justify-center rounded-full text-[clamp(0.9375rem,0.95vw,1.125rem)] font-semibold";

// The cost estimator: one question at a time (radio buttons, or checkboxes where several answers
// fit), a progress bar, then a last step that emails the service and answers directly. No prices
// are shown.
// - The steps are stacked in one grid cell (only the current one visible, the others inert), so
//   the card is as tall as the longest step and nothing jumps between steps.
// - Moving between steps puts keyboard focus on the new question.
export function EstimatorQuiz({
  serviceName,
  questions,
}: {
  serviceName: string;
  questions: EstimatorQuestion[];
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState<"busy" | "unavailable" | null>(null);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const current = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const id = useId();
  const total = questions.length;
  const allAnswered = questions.every((question) => (answers[question.id] ?? []).length > 0);

  // Focus only after the visitor moved (never on load).
  useEffect(() => {
    if (moved.current) current.current?.focus();
  }, [step]);

  const go = (next: number) => {
    moved.current = true;
    setStep(next);
  };

  const choose = (question: EstimatorQuestion, option: string, checked: boolean) => {
    const chosen = answers[question.id] ?? [];
    const next = question.multiple
      ? checked
        ? [...chosen, option]
        : chosen.filter((value) => value !== option)
      : [option];
    setAnswers({ ...answers, [question.id]: next });
  };

  const submitEstimate = async () => {
    if (sending || submitted || !allAnswered) return;
    const estimateAnswers: [string, string][] = questions.map(({ id: key, question }) => [
      question,
      (answers[key] ?? []).join(", "),
    ]);

    setSending(true);
    setFailed(null);
    try {
      const enquiry: Enquiry = {
        form: "estimate",
        estimate: { name: serviceName, answers: estimateAnswers },
        page: window.location.pathname,
      };
      const result = await sendEnquiry(enquiry);
      if (result.ok) {
        setSubmitted(true);
        setThankYouOpen(true);
      } else setFailed(result.reason === "busy" ? "busy" : "unavailable");
    } catch (error) {
      console.error("Estimate submission failed.", error);
      setFailed("unavailable");
    } finally {
      setSending(false);
    }
  };

  // Visible and animated in when current; hidden (but still taking space) otherwise.
  const stepClass = (active: boolean) =>
    `col-start-1 row-start-1 ${active ? "motion-safe:animate-rise" : "invisible"}`;

  return (
    <>
      <EstimateThankYouDialog open={thankYouOpen} onClose={() => setThankYouOpen(false)} />
      <div className="rounded-3xl bg-brand-gradient-reverse px-[clamp(1.5rem,1.7vw,2rem)] pt-[clamp(1.5rem,1.7vw,2rem)] pb-[clamp(2rem,3.5vw,4.25rem)] text-white shadow-[0_30px_70px_-30px_rgb(0_0_0_/_0.6)]">
        <div aria-hidden="true" className="h-1 overflow-hidden rounded-full bg-white/35">
          <div
            className="h-full rounded-full bg-white transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${((step + 1) / (total + 1)) * 100}%` }}
          />
        </div>

        <div className="mt-[clamp(2rem,2.6vw,3.1rem)] grid">
          {questions.map((question, index) => {
            const active = index === step;
            const chosen = answers[question.id] ?? [];
            return (
              <form
                key={question.id}
                inert={!active}
                onSubmit={(event) => {
                  event.preventDefault();
                  go(index + 1);
                }}
                className={stepClass(active)}
              >
                <fieldset>
                  <legend>
                    <h3 ref={active ? current : undefined} tabIndex={-1} className={heading}>
                      <span className="sr-only">Question {index + 1} of {total}: </span>
                      <span aria-hidden="true">Q{index + 1}. </span>
                      {question.question}
                    </h3>
                  </legend>
                  {question.multiple && <p className="mt-2 text-sm text-white/85">Choose all that apply.</p>}
                  <div className="mt-[clamp(1rem,1.3vw,1.5rem)] flex flex-col gap-[clamp(0.6rem,0.75vw,0.9rem)]">
                    {question.options.map((option) => (
                      <label
                        key={option}
                        className="flex w-fit cursor-pointer items-center gap-[clamp(0.75rem,0.95vw,1.1rem)] text-[clamp(0.9375rem,0.95vw,1.125rem)]"
                      >
                        <input
                          type={question.multiple ? "checkbox" : "radio"}
                          name={`${id}-${question.id}`}
                          value={option}
                          checked={chosen.includes(option)}
                          onChange={(event) => choose(question, option, event.target.checked)}
                          className="peer sr-only"
                        />
                        {/* The design's white ring; filled when chosen. */}
                        <span
                          aria-hidden="true"
                          className={`relative size-[1.2em] shrink-0 border-[1.5px] border-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white after:absolute after:inset-[3px] after:scale-0 after:bg-white after:transition-transform after:duration-200 peer-checked:after:scale-100 motion-reduce:after:transition-none ${question.multiple ? "rounded-[0.3em] after:rounded-[0.15em]" : "rounded-full after:rounded-full"}`}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="mt-[clamp(1.5rem,2vw,2.25rem)] flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={chosen.length === 0}
                    className={`${pill} min-w-[clamp(9rem,9.7vw,11.75rem)] border-2 border-white px-6 transition-colors duration-200 enabled:hover:bg-white enabled:hover:text-crimson disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    Next
                  </button>
                  {index > 0 && <BackButton onClick={() => go(index - 1)} />}
                </div>
              </form>
            );
          })}

          <div inert={step !== total} className={stepClass(step === total)}>
            <h3 ref={step === total ? current : undefined} tabIndex={-1} className={heading}>
              Your estimate is one step away
            </h3>
            <p className="mt-3 max-w-[34em] text-[clamp(0.9375rem,0.95vw,1.125rem)] leading-[1.7] text-white/90">
              Send us your answers and we&apos;ll come back with an estimate for your project.
            </p>
            <div className="mt-[clamp(1.5rem,2vw,2.25rem)] flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={submitEstimate}
                disabled={sending || submitted || !allAnswered}
                className={`${pill} gap-2 bg-white px-[clamp(1.5rem,2vw,2.25rem)] text-crimson transition-transform duration-200 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-70`}
              >
                {sending ? contactPage.form.sending : submitted ? "Estimate sent" : "Get my estimate"}
                {sending && (
                  <span
                    aria-hidden="true"
                    className="size-[1em] animate-spin rounded-full border-2 border-crimson/30 border-t-crimson"
                  />
                )}
              </button>
              <BackButton onClick={() => go(total - 1)} />
            </div>
            <div aria-live="polite" className="empty:hidden">
              {failed && <p className="mt-3 text-sm font-medium text-white">{contactPage.form.failed[failed]}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-2 text-[clamp(0.875rem,0.9vw,1.0625rem)] font-medium text-white/90 underline-offset-4 hover:text-white hover:underline"
    >
      Back
    </button>
  );
}
