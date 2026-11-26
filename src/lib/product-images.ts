import manifest from "@/data/image-manifest.json";

type ImageManifest = Record<string, string[]>;

const imageManifest = manifest as ImageManifest;

/**
 * Returns the first image found for a product slug.
 * Uses a build-time generated manifest instead of `fs` so this works in
 * runtimes without a filesystem (e.g. Cloudflare Workers).
 */
export function getProductMainImage(slug: string): string {
  const images = imageManifest[slug];

  if (images && images.length > 0) {
    return `/images/products/${encodeURIComponent(slug)}/${encodeURIComponent(images[0])}`;
  }

  // Fallback to a default placeholder if folder is empty or doesn't exist
  return "/images/products/product-default.jpg";
}

/**
 * Returns every image found for a product slug.
 */
export function getProductGalleryImages(slug: string): string[] {
  const images = imageManifest[slug];

  if (images && images.length > 0) {
    return images.map(
      (img) => `/images/products/${encodeURIComponent(slug)}/${encodeURIComponent(img)}`
    );
  }

  return [];
}
