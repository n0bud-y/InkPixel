import Image from "next/image";
import Link from "next/link";
import { blog } from "@/content/blog";
import type { Post } from "@/contentful/queries/posts";
import { fullDate } from "./BlogListing";
import { ShareButtons } from "./ShareButtons";

// Top of an article, on navy: the breadcrumb (Insights › category), the title, the excerpt, the
// author, date, and reading time, and the share buttons; then the cover photo, half on the navy
// and half on the white the article starts on. The entrance is CSS, so it starts on the first
// frame; the cover is the LCP image, so it is preloaded.
export function ArticleHeader({ post, shareUrl }: { post: Post; shareUrl: string }) {
  const { author, coverImage } = post;

  return (
    <header className="bg-primary">
      <div className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 size-[54rem] max-w-[180vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.32),transparent)]"
        />
        <div
          className={`container-site pt-36 text-center sm:pt-40 2xl:pt-48 ${coverImage ? "pb-[clamp(2.5rem,3.3vw,4rem)]" : "pb-[clamp(3.5rem,5vw,6rem)]"}`}
        >
          <div className="mx-auto max-w-[62rem] motion-safe:animate-rise">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center justify-center gap-2 font-mono text-[clamp(0.6875rem,0.75vw,0.875rem)] tracking-[0.14em] text-light/55 uppercase">
                <li>
                  <Link href="/blog" className="transition-colors hover:text-white">
                    {blog.title}
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li>
                  <Link
                    href={`/blog/category/${post.categorySlug}`}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-light/85 transition-colors hover:border-white/30 hover:text-white"
                  >
                    {post.category}
                  </Link>
                </li>
              </ol>
            </nav>
            <h1 className="mt-7 font-display text-[clamp(2.25rem,4vw,4.75rem)] leading-[1.06] font-medium tracking-[-0.025em] text-balance text-white">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mx-auto mt-6 max-w-[42em] text-[clamp(1rem,1.17vw,1.4rem)] leading-[1.7] text-light/75">{post.excerpt}</p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[clamp(0.875rem,0.95vw,1.0625rem)] text-light/70">
              {author && (
                <>
                  <span className="inline-flex items-center gap-2.5 font-medium text-white">
                    {author.photo && (
                      <Image
                        src={author.photo.url}
                        width={40}
                        height={40}
                        alt=""
                        unoptimized={author.photo.isSvg}
                        className="size-9 rounded-full bg-white object-contain"
                      />
                    )}
                    {author.name}
                  </span>
                  <span aria-hidden="true" className="text-light/30">
                    ·
                  </span>
                </>
              )}
              <time dateTime={post.publishedDate}>{fullDate.format(new Date(post.publishedDate))}</time>
              <span aria-hidden="true" className="text-light/30">
                ·
              </span>
              <span>{post.readingMinutes} min read</span>
            </div>
            <div className="mt-6 flex justify-center">
              <ShareButtons url={shareUrl} title={post.title} />
            </div>
          </div>
        </div>
      </div>

      {coverImage && (
        <div className="bg-[linear-gradient(to_bottom,var(--primary)_50%,#fff_50%)]">
          <div className="container-site">
            <Image
              src={coverImage.url}
              width={coverImage.width}
              height={coverImage.height}
              alt={coverImage.alt}
              unoptimized={coverImage.isSvg}
              preload
              sizes="(min-width: 120rem) 105rem, (min-width: 64rem) 85vw, 100vw"
              className="mx-auto aspect-[16/9] w-full max-w-[72rem] rounded-[clamp(1rem,1.6vw,1.9rem)] object-cover shadow-[0_30px_80px_-40px_rgb(0_0_0_/_0.8)] motion-safe:animate-rise motion-safe:[animation-delay:150ms]"
            />
          </div>
        </div>
      )}
    </header>
  );
}
