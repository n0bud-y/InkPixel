import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { PostCard } from "@/components/ui/PostCard";
import { blog } from "@/content/blog";
import type { Category, PostSummary } from "@/contentful/queries/posts";

// --- Pages ---------------------------------------------------------------------------------------
// The first page shows the newest post as the featured post, then a grid of `perPage`; every
// later page a grid of `perPage`. Page 1 is the listing's own address (/blog,
// /blog/category/<slug>), later pages add /page/<n>.

const firstPageSize = blog.perPage + 1;

/** How many pages a listing of `total` posts has (at least one, which may be empty). */
export const pageCount = (total: number) =>
  total <= firstPageSize ? 1 : 1 + Math.ceil((total - firstPageSize) / blog.perPage);

/** The page number in a /page/<n> address, or null when there is no such page (page 1 is the
 *  listing's own address, so /page/1 is not one either). */
export function laterPage(value: string, total: number): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null;
  const page = Number(value);
  return page >= 2 && page <= pageCount(total) ? page : null;
}

/** The /page/<n> numbers of a listing of `total` posts, for generateStaticParams. */
export const laterPages = (total: number) =>
  Array.from({ length: pageCount(total) - 1 }, (_, index) => ({ page: String(index + 2) }));

const pageHref = (basePath: string, page: number) => (page === 1 ? basePath : `${basePath}/page/${page}`);

function postsOnPage(posts: PostSummary[], page: number) {
  if (page === 1) return { featured: posts[0] ?? null, grid: posts.slice(1, firstPageSize) };
  const start = firstPageSize + (page - 2) * blog.perPage;
  return { featured: null, grid: posts.slice(start, start + blog.perPage) };
}

// "1 March 2026". UTC, so the server and every visitor see the same day.
export const fullDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// --- The listing ---------------------------------------------------------------------------------

type BlogListingProps = {
  /** Every post in this listing (the blog, or one category), newest first. */
  posts: PostSummary[];
  /** The categories that have posts, for the pills. */
  categories: Category[];
  /** Set on a category's pages. */
  category?: Category;
  page: number;
};

// The blog listing (/blog) and each category's (/blog/category/<slug>), and their later pages:
// the hero, the category pills, the featured post (first page), the grid, and the page numbers.
export function BlogListing({ posts, categories, category, page }: BlogListingProps) {
  const basePath = category?.href ?? "/blog";
  const pages = pageCount(posts.length);
  const { featured, grid } = postsOnPage(posts, page);

  return (
    <>
      <section aria-labelledby="blog-title" className="relative isolate overflow-hidden bg-primary">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 size-[54rem] max-w-[180vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.32),transparent)]"
        />
        <div className="container-site pt-36 pb-[clamp(2.5rem,3.3vw,4rem)] text-center sm:pt-40 2xl:pt-48">
          <div className="motion-safe:animate-rise">
            <Eyebrow>{category ? `${blog.title} · Category` : blog.eyebrow}</Eyebrow>
            <h1
              id="blog-title"
              className="mt-6 font-display text-[clamp(2.75rem,5vw,6rem)] leading-[1.02] font-medium tracking-[-0.03em] text-white"
            >
              {category?.title ?? blog.title}
              {page > 1 && <span className="sr-only">, page {page}</span>}
            </h1>
            <p className="mx-auto mt-6 max-w-[40em] text-[clamp(1rem,1.17vw,1.4rem)] leading-[1.75] text-light/80">
              {category ? blog.categoryIntro.replace("{category}", category.title.toLowerCase()) : blog.intro}
            </p>
          </div>
          {categories.length > 0 && <CategoryNav categories={categories} active={category?.slug ?? null} page={page} />}
        </div>
      </section>

      <section aria-labelledby="articles-title" className="bg-primary">
        <div className="container-site pb-[clamp(4rem,6.15vw,7.25rem)]">
          <h2 id="articles-title" className="sr-only">
            Articles
          </h2>
          {!featured && grid.length === 0 && (
            <p className="py-16 text-center text-[clamp(1rem,1.1vw,1.25rem)] text-light/70">{blog.empty}</p>
          )}
          {featured && (
            <Reveal y={50}>
              <FeaturedPost post={featured} />
            </Reveal>
          )}
          {grid.length > 0 && (
            <Reveal y={50} stagger={0.1} className={featured ? "mt-[clamp(1rem,1.15vw,1.4rem)]" : ""}>
              <ul className="grid grid-cols-[minmax(0,1fr)] gap-[clamp(1rem,1.15vw,1.4rem)] sm:grid-cols-2 lg:grid-cols-3">
                {grid.map((post) => (
                  <li key={post.slug} data-reveal>
                    <PostCard {...post} />
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          {pages > 1 && <Pagination basePath={basePath} page={page} pages={pages} />}
        </div>
      </section>
    </>
  );
}

// All, then each category; the current one is filled. Phones: a sideways-scrolling row.
function CategoryNav({ categories, active, page }: { categories: Category[]; active: string | null; page: number }) {
  const pills = [{ title: "All", slug: null, href: "/blog" }, ...categories];
  return (
    <nav aria-label="Categories" className="mt-[clamp(2rem,2.9vw,3.5rem)] motion-safe:animate-rise motion-safe:[animation-delay:150ms]">
      <ul className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-8">
        {pills.map((pill) => {
          const current = pill.slug === active;
          return (
            <li key={pill.href} className="shrink-0">
              <Link
                href={pill.href}
                aria-current={current ? (page === 1 ? "page" : "true") : undefined}
                className={[
                  "inline-flex h-11 items-center rounded-full px-5 text-[clamp(0.875rem,0.9vw,1rem)] font-medium transition-colors duration-200 2xl:h-12 2xl:px-6",
                  current
                    ? "bg-brand-gradient text-white shadow-[0_10px_24px_-12px_rgb(201_29_76_/_0.8)]"
                    : "border border-white/15 text-light/80 hover:border-white/35 hover:text-white",
                ].join(" ")}
              >
                {pill.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// The newest post, large: its cover photo beside the category, date, title, excerpt, and reading
// time (stacked on phones). The whole card is one link, like the article cards.
function FeaturedPost({ post }: { post: PostSummary }) {
  return (
    <article
      className={[
        "group relative isolate grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-light lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]",
        "transition-[translate,background-color,border-color,box-shadow] duration-500 ease-out hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_28px_60px_-30px_rgb(0_0_0_/_0.7)] motion-safe:hover:-translate-y-1",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-coral",
      ].join(" ")}
    >
      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[clamp(22rem,28vw,34rem)]">
        {post.coverImage ? (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            fill
            preload
            unoptimized={post.coverImage.isSvg}
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 bg-brand-gradient" />
        )}
      </div>

      <div className="flex flex-col p-[clamp(1.5rem,3vw,3.5rem)]">
        <div className="flex items-center justify-between gap-4 font-mono text-[clamp(0.6875rem,0.75vw,0.9375rem)] leading-none tracking-[0.14em] uppercase">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-light/80">{post.category}</span>
          <time dateTime={post.publishedDate} className="text-light/45">
            {fullDate.format(new Date(post.publishedDate))}
          </time>
        </div>
        <h3 className="mt-[clamp(1.5rem,2.5vw,3rem)] font-display text-[clamp(1.75rem,2.6vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.02em] text-balance text-white lg:mt-auto">
          <Link href={post.href} className="outline-none after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="mt-4 max-w-[36em] text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.75] text-light/70">{post.excerpt}</p>
        )}
        <div className="mt-[clamp(1.5rem,2vw,2.5rem)] flex items-center justify-between text-[clamp(0.875rem,0.95vw,1.0625rem)] text-light/55">
          <span>{post.readingMinutes} min read</span>
          <span className="inline-flex items-center gap-2 font-medium text-light/85 transition-colors duration-300 group-hover:text-coral">
            Read article
            <ArrowUpRightIcon className="size-[1em] transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

// Previous, the page numbers, next. The current page is filled.
function Pagination({ basePath, page, pages }: { basePath: string; page: number; pages: number }) {
  const step = "inline-flex size-11 items-center justify-center rounded-full text-[0.9375rem] font-medium transition-colors duration-200 2xl:size-12";
  const idle = "border border-white/15 text-light/80 hover:border-white/35 hover:text-white";
  return (
    <nav aria-label="Pages" className="mt-[clamp(2.5rem,3.3vw,4rem)]">
      <ul className="flex flex-wrap items-center justify-center gap-2.5">
        {page > 1 && (
          <li>
            <Link href={pageHref(basePath, page - 1)} rel="prev" className={`${step} ${idle}`}>
              <span aria-hidden="true">←</span>
              <span className="sr-only">Previous page</span>
            </Link>
          </li>
        )}
        {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
          <li key={number}>
            <Link
              href={pageHref(basePath, number)}
              aria-current={number === page ? "page" : undefined}
              className={`${step} ${number === page ? "bg-brand-gradient text-white" : idle}`}
            >
              <span className="sr-only">Page </span>
              {number}
            </Link>
          </li>
        ))}
        {page < pages && (
          <li>
            <Link href={pageHref(basePath, page + 1)} rel="next" className={`${step} ${idle}`}>
              <span aria-hidden="true">→</span>
              <span className="sr-only">Next page</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
