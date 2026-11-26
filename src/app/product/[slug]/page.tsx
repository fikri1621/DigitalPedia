import { Suspense } from "react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/utils";
import ProductGrid from "@/components/ProductGrid";
import { ExternalLink, Check, Info, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductGalleryImages } from "@/lib/product-images";
import ProductGallery from "@/components/ProductGallery";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | AuraDigital`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  const galleryImages = getProductGalleryImages(product.slug);
  const displayImages = galleryImages.length > 0 ? galleryImages : [];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-xs font-medium text-neutral-400 uppercase tracking-widest" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-neutral-900">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-neutral-900">Shop</Link>
          {category && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/categories/${encodeURIComponent(category.slug)}`} className="hover:text-neutral-900">{category.name}</Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-neutral-900 truncate max-w-[150px] sm:max-w-none">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          {/* Product Gallery */}
          <ProductGallery images={displayImages} productName={product.name} />

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {product.newArrival && (
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-neutral-900 rounded-full">
                    New Arrival
                  </span>
                )}
                {product.bestseller && (
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-900 bg-neutral-100 rounded-full">
                    Bestseller
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-neutral-900">
                {formatPrice(product.price, product.currency)}
              </p>
            </div>

            <div className="mb-8 p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                {product.shortDescription}
              </p>
              <div className="space-y-4">
                <a
                  href={product.etsyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-8 py-4 text-sm font-bold uppercase tracking-widest text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all shadow-xl hover:shadow-2xl active:scale-95"
                >
                  Buy on Etsy <ExternalLink className="w-4 h-4 ml-2" />
                </a>
                <p className="text-[10px] text-center text-neutral-400 uppercase tracking-widest">
                  Secure checkout and instant delivery via Etsy
                </p>
              </div>
            </div>

            {/* Product Details Tabs-style sections */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-4 flex items-center">
                  <Info className="w-4 h-4 mr-2" /> Description
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-neutral-500">
                        <Check className="w-4 h-4 text-neutral-900 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-4">What&apos;s Included</h3>
                  <ul className="space-y-2">
                    {product.whatsIncluded.map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-neutral-500">
                        <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full mr-3 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {product.compatibility && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-4">Compatibility</h3>
                  <p className="text-sm text-neutral-500 italic">
                    Works best with {product.compatibility}
                  </p>
                </div>
              )}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-neutral-100">
               <button className="flex items-center text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors">
                  <Share2 className="w-3.5 h-3.5 mr-2" /> Share Product
               </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-neutral-100 pt-24">
            <ProductGrid 
              products={relatedProducts} 
              title="You May Also Like" 
              subtitle="Complementary digital resources to enhance your workflow."
              columns={3}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="bg-white min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-4 w-48 bg-neutral-100 rounded mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-neutral-100 rounded-3xl" />
          <div className="space-y-6">
            <div className="h-8 w-3/4 bg-neutral-100 rounded" />
            <div className="h-6 w-1/4 bg-neutral-100 rounded" />
            <div className="h-32 bg-neutral-100 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
