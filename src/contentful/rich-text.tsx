import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import type { ContentfulImage } from "@/contentful/queries/case-studies";
import { siteConfig } from "@/lib/site";

// A Contentful Rich Text field, as returned in its GraphQL `json`.
export type RichTextNode = {
  nodeType: string;
  value?: string;
  marks?: { type: string }[];
  /** `uri` on links; `target` on embedded images and links to other entries. */
  data?: { uri?: string; target?: { sys: { id: string } } };
  content?: RichTextNode[];
};

/** What a field's embedded images and entry links point to (its GraphQL `links`), by id. */
export type RichTextLinks = {
  images: Map<string, ContentfulImage>;
  hrefs: Map<string, string>;
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
    if (type === "code") {
      text = <code className="rounded-md bg-primary/[0.06] px-[0.35em] py-[0.1em] font-mono text-[0.85em] text-primary">{text}</code>;
    }
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

// --- Blog articles ------------------------------------------------------------------------------

export type Heading = { id: string; text: string; level: 2 | 3 };

const plainText = (node: RichTextNode): string =>
  node.nodeType === "text" ? (node.value ?? "") : (node.content ?? []).map(plainText).join("");

const HEADING_LEVELS: Record<string, 2 | 3 | 4> = { "heading-2": 2, "heading-3": 3, "heading-4": 4 };

// Each heading's id (for links to it), from its text: "Where the time goes" → "where-the-time-goes",
// numbered when two headings read the same. Returns the ids in document order.
function headingIds(document: RichTextNode): string[] {
  const used = new Map<string, number>();
  return (document.content ?? [])
    .filter((node) => HEADING_LEVELS[node.nodeType])
    .map((node) => {
      const base =
        plainText(node)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") || "section";
      const count = (used.get(base) ?? 0) + 1;
      used.set(base, count);
      return count === 1 ? base : `${base}-${count}`;
    });
}

// The article's main headings (levels 2 and 3), for its table of contents.
export function articleHeadings(document: RichTextNode): Heading[] {
  const ids = headingIds(document);
  return (document.content ?? [])
    .filter((node) => HEADING_LEVELS[node.nodeType])
    .flatMap((node, index) => {
      const level = HEADING_LEVELS[node.nodeType];
      const text = plainText(node).trim();
      return level === 4 || !text ? [] : [{ id: ids[index], text, level }];
    });
}

const linkClass =
  "text-crimson underline decoration-crimson/35 underline-offset-[0.2em] transition-colors hover:decoration-crimson";

// Inline content of an article: text, links (other sites open in a new tab), and links to other
// posts and case studies. A link to an entry that isn't published is shown as plain text.
function renderArticleInline(nodes: RichTextNode[] = [], links: RichTextLinks): ReactNode[] {
  return nodes.map((node, index) => {
    if (node.nodeType === "text") return <Fragment key={index}>{renderText(node)}</Fragment>;
    const children = renderArticleInline(node.content, links);
    if (node.nodeType === "hyperlink" && node.data?.uri) {
      const uri = node.data.uri;
      const external = /^https?:\/\//.test(uri) && !uri.startsWith(siteConfig.url);
      return external ? (
        <a key={index} href={uri} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {children}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <a key={index} href={uri} className={linkClass}>
          {children}
        </a>
      );
    }
    if (node.nodeType === "entry-hyperlink") {
      const href = node.data?.target && links.hrefs.get(node.data.target.sys.id);
      return href ? (
        <Link key={index} href={href} className={linkClass}>
          {children}
        </Link>
      ) : (
        <Fragment key={index}>{children}</Fragment>
      );
    }
    return null;
  });
}

const headingClass = {
  2: "scroll-mt-32 font-display text-[clamp(1.625rem,2.05vw,2.5rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-primary",
  3: "scroll-mt-32 font-display text-[clamp(1.3125rem,1.45vw,1.75rem)] leading-[1.3] font-semibold tracking-[-0.01em] text-primary",
  4: "scroll-mt-32 text-[clamp(1.125rem,1.2vw,1.375rem)] leading-[1.4] font-semibold text-primary",
};

// A blog post's body, on white: everything the post's Rich Text field allows (see
// contentful/migrations/0001-blog-model.cjs): paragraphs, headings 2–4 (with ids for the table of
// contents), lists, quotes, dividers, images, links, and bold, italic, underline, and code. Other
// nodes are skipped.
export function ArticleBody({ document, links, className }: { document: RichTextNode; links: RichTextLinks; className?: string }) {
  const ids = headingIds(document);
  let heading = 0;
  const blocks = (document.content ?? []).filter((node) => !(node.nodeType === "paragraph" && isEmpty(node)));

  return (
    <div
      className={[
        "text-[clamp(1.0625rem,1.15vw,1.25rem)] leading-[1.85] text-primary/85",
        "[&>*+*]:mt-[1.15em] [&>h2]:mt-[2.2em] [&>h3]:mt-[1.8em] [&>h4]:mt-[1.6em] [&>h2+*]:mt-[0.7em] [&>h3+*]:mt-[0.6em] [&>h4+*]:mt-[0.5em] [&>hr]:my-[2.4em] [&>*:first-child]:mt-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {blocks.map((node, index) => {
        const level = HEADING_LEVELS[node.nodeType];
        if (level) {
          const Tag = `h${level}` as const;
          return (
            <Tag key={index} id={ids[heading++]} className={headingClass[level]}>
              {renderArticleInline(node.content, links)}
            </Tag>
          );
        }
        if (node.nodeType === "paragraph") return <p key={index}>{renderArticleInline(node.content, links)}</p>;
        if (node.nodeType === "unordered-list" || node.nodeType === "ordered-list") {
          const ordered = node.nodeType === "ordered-list";
          const List = ordered ? "ol" : "ul";
          return (
            <List
              key={index}
              className={ordered ? "list-decimal space-y-[0.5em] pl-[1.4em] marker:font-semibold marker:text-coral" : "space-y-[0.5em]"}
            >
              {node.content?.map((item, itemIndex) => {
                const text = item.content
                  ?.filter((child) => child.nodeType === "paragraph")
                  .flatMap((paragraph, paragraphIndex) => [
                    paragraphIndex ? <br key={`br-${paragraphIndex}`} /> : null,
                    ...renderArticleInline(paragraph.content, links),
                  ]);
                return ordered ? (
                  <li key={itemIndex} className="pl-1">
                    {text}
                  </li>
                ) : (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] size-[0.4em] shrink-0 rounded-full bg-coral" />
                    <span>{text}</span>
                  </li>
                );
              })}
            </List>
          );
        }
        if (node.nodeType === "blockquote") {
          return (
            <blockquote
              key={index}
              className="border-l-[3px] border-coral pl-[1.2em] font-display text-[1.15em] leading-[1.55] font-medium text-primary [&>p+p]:mt-[0.6em]"
            >
              {node.content?.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{renderArticleInline(paragraph.content, links)}</p>
              ))}
            </blockquote>
          );
        }
        if (node.nodeType === "hr") return <hr key={index} className="h-px border-0 bg-primary/15" />;
        if (node.nodeType === "embedded-asset-block") {
          const image = node.data?.target && links.images.get(node.data.target.sys.id);
          if (!image) return null;
          return (
            <figure key={index}>
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.alt}
                unoptimized={image.isSvg}
                sizes="(min-width: 64rem) 50vw, 100vw"
                className="h-auto w-full rounded-[clamp(0.75rem,1vw,1.25rem)]"
              />
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
}
