// The blog's own text ("Insights" in the menu). Static content: edited here, not in Contentful;
// the posts, categories, and authors are in Contentful.
export const blog = {
  title: "Insights",
  eyebrow: "From the studio",
  intro:
    "Notes from our designers, developers, and strategists on building digital products: what works, what doesn't, and what we're trying next.",
  /** The search description when the blog's Page SEO entry in Contentful has none (stand-in,
   *  issue I9); `{category}` pages use `categoryIntro`. */
  description: "Articles from the Ink Pixel Studios team on design, development, product, and growth.",
  /** A category page's intro; `{category}` is the category's name, in lower case. */
  categoryIntro: "Articles about {category} from the Ink Pixel Studios team.",
  /** Posts per page in the grid. The first page also has the newest post, as the featured post. */
  perPage: 9,
  empty: "No articles here yet. Check back soon.",
  related: { title: "Keep reading." },
};
