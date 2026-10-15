import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { PostCard } from "@/components/ui/PostCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blog } from "@/content/blog";
import type { PostSummary } from "@/contentful/queries/posts";

// Up to three more posts after an article: from the same category first, then the newest of the
// rest. Hidden when there are no others. Same cards and layout as the home page's "From the studio.".
export function RelatedPosts({ current, posts }: { current: { slug: string; categorySlug: string }; posts: PostSummary[] }) {
  const others = posts.filter((post) => post.slug !== current.slug);
  const related = [
    ...others.filter((post) => post.categorySlug === current.categorySlug),
    ...others.filter((post) => post.categorySlug !== current.categorySlug),
  ].slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-title" className="bg-primary">
      <div className="container-site pt-[clamp(4rem,6.15vw,7.25rem)] pb-[clamp(4rem,5.6vw,6.75rem)]">
        <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="related-title" title={blog.related.title} />
          <div data-reveal>
            <Button href="/blog" variant="secondary">
              All articles
              <ArrowUpRightIcon className="size-[1em] transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </Reveal>

        {/* Phones and tablets: a sideways-scrolling row; desktop: three columns. */}
        <Reveal y={50} stagger={0.12} className="mt-[clamp(2.5rem,4vw,4.5rem)]">
          <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:scroll-px-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-[clamp(1rem,1.15vw,1.4rem)] lg:overflow-visible lg:px-0 lg:pb-0">
            {related.map((post) => (
              <li key={post.slug} data-reveal className="w-[min(82vw,26rem)] shrink-0 snap-start lg:w-auto">
                <PostCard {...post} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
