import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { PostCard } from "@/components/ui/PostCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLatestPosts, type PostSummary } from "@/contentful/queries/posts";

// "From the studio.": the three newest blog posts from Contentful.
// The section hides itself when there are no posts yet, or when Contentful can't be reached,
// so the home page never breaks because of it.
export async function Insights() {
  let posts: PostSummary[] = [];
  try {
    posts = await getLatestPosts(3);
  } catch (error) {
    console.error("Insights section hidden: could not load posts from Contentful.", error);
  }
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="insights-title" className="relative isolate overflow-hidden bg-primary">
      <div className="container-site pt-[clamp(4rem,6.15vw,7.25rem)] pb-[clamp(4rem,5.6vw,6.75rem)]">
        <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div data-reveal className="mb-8">
              <Eyebrow>09 · Insights</Eyebrow>
            </div>
            <SectionHeading id="insights-title" size="lg" title="From the studio." />
          </div>
          <div data-reveal>
            <Button href="/blog" variant="secondary">
              All articles
              <ArrowUpRightIcon className="size-[1em] transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </Reveal>

        {/* Phones and tablets: a sideways-scrolling row; desktop: three columns. */}
        <Reveal y={50} stagger={0.12} className="mt-[clamp(2.5rem,5.1vw,6rem)]">
          <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:scroll-px-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-[clamp(1rem,1.15vw,1.4rem)] lg:overflow-visible lg:px-0 lg:pb-0">
            {posts.map((post) => (
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
