import fs from "fs";
import path from "path";

export function getProductMainImage(slug: string): string {
  const productDir = path.join(process.cwd(), "public/images/products", slug);
  
  try {
    if (fs.existsSync(productDir)) {
      const files = fs.readdirSync(productDir);
      // Look for common image formats
      const images = files.filter(file => 
        /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(file)
      );
      
      if (images.length > 0) {
        // Return the first image found in the folder
        return `/images/products/${slug}/${encodeURIComponent(images[0])}`;
      }
    }
  } catch (error) {
    console.error(`Error reading image for ${slug}:`, error);
  }

  // Fallback to a default placeholder if folder is empty or doesn't exist
  return "/images/products/product-default.jpg";
}

export function getProductGalleryImages(slug: string): string[] {
  const productDir = path.join(process.cwd(), "public/images/products", slug);
  
  try {
    if (fs.existsSync(productDir)) {
      const files = fs.readdirSync(productDir);
      const images = files.filter(file => 
        /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(file)
      );
      
      return images.map(img => `/images/products/${slug}/${encodeURIComponent(img)}`);
    }
  } catch (error) {
    console.error(`Error reading gallery for ${slug}:`, error);
  }

  return [];
}
