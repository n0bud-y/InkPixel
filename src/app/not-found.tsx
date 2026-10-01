import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

// Renders outside the (site) layout, so it adds its own header and footer.
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
          <h1 className="text-4xl font-semibold">Page not found</h1>
          <p className="mt-4 text-foreground/70">
            The page you are looking for does not exist or has moved.
          </p>
          <Link href="/" className="mt-6 inline-block underline">
            Go to the home page
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
