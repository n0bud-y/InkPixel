import { brandIcon } from "@/lib/brand-mark";

// The icon iPhones and iPads use for "Add to Home Screen" (they round the corners themselves).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return brandIcon(size.width);
}
