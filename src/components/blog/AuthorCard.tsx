import Image from "next/image";
import type { Author } from "@/contentful/queries/posts";

// "Written by": the author's photo, name, role, short bio, and profile links (from the post's
// Author in Contentful), at the end of the article.
export function AuthorCard({ author }: { author: Author }) {
  return (
    <aside
      aria-labelledby="author-name"
      className="flex flex-col gap-5 rounded-[clamp(1rem,1.3vw,1.5rem)] bg-light/70 p-[clamp(1.5rem,2.1vw,2.5rem)] ring-1 ring-primary/5 sm:flex-row sm:items-start"
    >
      {author.photo && (
        <Image
          src={author.photo.url}
          width={96}
          height={96}
          alt=""
          unoptimized={author.photo.isSvg}
          className="size-[clamp(4rem,4.6vw,5.5rem)] shrink-0 rounded-full bg-white object-contain p-1 shadow-[0_8px_22px_-10px_rgb(201_29_76_/_0.35)]"
        />
      )}
      <div>
        <p className="font-mono text-[0.75rem] tracking-[0.14em] text-primary/55 uppercase">Written by</p>
        <p id="author-name" className="mt-2 font-display text-[clamp(1.25rem,1.4vw,1.625rem)] leading-tight font-semibold text-primary">
          {author.name}
        </p>
        {author.role && <p className="mt-1 text-[0.9375rem] text-crimson">{author.role}</p>}
        {author.bio && <p className="mt-3 text-[clamp(0.9375rem,1vw,1.0625rem)] leading-[1.7] text-primary/75">{author.bio}</p>}
        {author.links.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
            {author.links.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.9375rem] font-medium text-primary underline decoration-primary/25 underline-offset-4 hover:decoration-crimson"
                >
                  {new URL(url).hostname.replace(/^www\./, "")}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
