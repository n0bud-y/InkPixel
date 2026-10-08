import { Fragment, type ReactNode } from "react";

// A Contentful Rich Text field, as returned in its GraphQL `json`.
export type RichTextNode = {
  nodeType: string;
  value?: string;
  marks?: { type: string }[];
  data?: { uri?: string };
  content?: RichTextNode[];
};

type Tone = "onDark" | "onLight";

// Same size and colours as SectionHeading's `md` paragraphs.
const textClass = "text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.9]";
const toneClass: Record<Tone, string> = { onDark: "text-light/80", onLight: "text-primary/85" };

// Text with its marks; a line break inside a paragraph (Shift+Enter) becomes <br>.
function renderText({ value = "", marks = [] }: RichTextNode): ReactNode {
  let text: ReactNode = value
    .split("\n")
    .flatMap((line, index) => (index ? [<br key={index} />, line] : [line]));
  for (const { type } of marks) {
    if (type === "bold") text = <strong className="font-semibold">{text}</strong>;
    if (type === "italic") text = <em>{text}</em>;
    if (type === "underline") text = <u>{text}</u>;
  }
  return text;
}

function renderInline(nodes: RichTextNode[] = []): ReactNode[] {
  return nodes.map((node, index) => {
    if (node.nodeType === "text") return <Fragment key={index}>{renderText(node)}</Fragment>;
    if (node.nodeType === "hyperlink" && node.data?.uri) {
      return (
        <a
          key={index}
          href={node.data.uri}
          className="underline decoration-current/35 underline-offset-[0.2em] transition-colors hover:decoration-current"
        >
          {renderInline(node.content)}
        </a>
      );
    }
    return null;
  });
}

const isEmpty = (node: RichTextNode) =>
  !node.content?.some((child) => child.nodeType !== "text" || child.value?.trim());

// A list item's paragraphs, as one line of text.
const itemText = (item: RichTextNode) =>
  item.content
    ?.filter((child) => child.nodeType === "paragraph")
    .flatMap((paragraph, index) => [index ? <br key={`br-${index}`} /> : null, ...renderInline(paragraph.content)]);

// Renders the nodes our Rich Text fields allow (see their validations in contentful/migrations):
// paragraphs, bold/italic/underline, links, and lists. Other nodes are skipped. Top-level blocks
// are marked data-reveal, so they cascade in when wrapped in <Reveal>.
export function RichText({
  document,
  tone = "onDark",
  align = "left",
  className,
}: {
  document: RichTextNode;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  const blocks = (document.content ?? []).filter((node) => !(node.nodeType === "paragraph" && isEmpty(node)));

  return (
    <div className={[textClass, toneClass[tone], "[&>*+*]:mt-[1lh]", centered ? "text-center" : "", className].filter(Boolean).join(" ")}>
      {blocks.map((node, index) => {
        if (node.nodeType === "paragraph") {
          return (
            <p key={index} data-reveal className={`max-w-[44em] ${centered ? "mx-auto" : ""}`}>
              {renderInline(node.content)}
            </p>
          );
        }
        if (node.nodeType === "unordered-list") {
          return (
            <ul key={index} data-reveal className={`space-y-[0.65em] font-medium ${centered ? "mx-auto w-fit text-left" : ""}`}>
              {node.content?.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3 leading-[1.6]">
                  <span
                    aria-hidden="true"
                    className="mt-[0.3em] inline-flex size-[1em] shrink-0 items-center justify-center rounded-full border-2 border-coral"
                  >
                    <span className="size-[0.35em] rounded-full bg-coral" />
                  </span>
                  <span>{itemText(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (node.nodeType === "ordered-list") {
          return (
            <ol
              key={index}
              data-reveal
              className={`list-decimal space-y-[0.65em] pl-[1.25em] leading-[1.6] marker:font-semibold marker:text-coral ${centered ? "mx-auto w-fit text-left" : ""}`}
            >
              {node.content?.map((item, itemIndex) => (
                <li key={itemIndex} className="pl-1">
                  {itemText(item)}
                </li>
              ))}
            </ol>
          );
        }
        return null;
      })}
    </div>
  );
}
