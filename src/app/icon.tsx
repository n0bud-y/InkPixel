import { brandIcon } from "@/lib/brand-mark";

// App icons for phones' home screens and the web app manifest (src/app/manifest.ts), generated at
// build time: /icon/192 and /icon/512. Browser tabs keep favicon.ico.
export function generateImageMetadata() {
  return [192, 512].map((size) => ({ id: String(size), size: { width: size, height: size }, contentType: "image/png" }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  return brandIcon(Number(await id));
}
