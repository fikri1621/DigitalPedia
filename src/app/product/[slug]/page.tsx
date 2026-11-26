import { Suspense } from "react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/utils";
import ProductGrid from "@/components/ProductGrid";
import { ExternalLink, Check, Info } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductGalleryImages } from "@/lib/product-images";
import ProductGallery from "@/components/ProductGallery";
import ShareButtons from "@/components/ShareButtons";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found | DigitalPedia" };

  const category = categories.find((c) => c.id === product.categoryId);
  const categoryName = category ? category.name : "Digital Assets";

  const title = `Beli ${product.name} - ${categoryName} | DigitalPedia`;
  const description = `${product.shortDescription} Dapatkan akses instan ke ${product.name} secara aman via Etsy. Kumpulan template & aset digital pilihan terbaik dari DigitalPedia.`;
  const pageUrl = `https://digitalpedia.store/product/${product.slug}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      categoryName,
      "template digital",
      "aset digital",
      "etsy digital download",
      "digitalpedia",
      ...product.features
    ],
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      siteName: "DigitalPedia",
      images: [
        {
          url: product.mainImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.mainImage],
    },
    alternates: {
      canonical: pageUrl,
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
    .slice(0, 4);

  const galleryImages = getProductGalleryImages(product.slug);
  const displayImages = galleryImages.length > 0 ? galleryImages : [product.mainImage];

  // Schema Markup (JSON-LD) untuk Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": displayImages,
    "description": product.fullDescription,
    "brand": {
      "@type": "Brand",
      "name": "DigitalPedia"
    },
    "offers": {
      "@type": "Offer",
      "url": product.etsyUrl,
      "priceCurrency": product.currency,
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "DigitalPedia Etsy Shop"
      }
    }
  };

  return (
    <div className="bg-white min-h-screen py-12">
      {/* Script JSON-LD untuk SEO Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-8 text-xs font-medium text-neutral-400 uppercase tracking-widest" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-neutral-900 transition-colors">Shop</Link>
          {category && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/categories/${encodeURIComponent(category.slug)}`} className="hover:text-neutral-900">{category.name}</Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-neutral-900 truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product Details Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Product Gallery Component */}
          <ProductGallery images={displayImages} productName={product.name} />

          {/* Product Info Column */}
          <div className="flex flex-col">
            <div className="border-b border-neutral-100 pb-6 mb-6">
              {category && (
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 block">
                  {category.name}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-neutral-900 blur-[6px] select-none">
                  {formatPrice(product.price, product.currency)}
                </span>
                <span className="text-xs bg-green-50 text-green-700 font-semibold px-2.5 py-1 rounded-full border border-green-200">
                  Instant Download via Etsy
                </span>
              </div>
            </div>

            <div className="prose prose-neutral max-w-none mb-8">
              <p className="text-neutral-600 text-base leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            {/* Features list */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-3">
                  Highlights & Features
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-neutral-600">
                      <Check className="w-4 h-4 text-neutral-900 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What's included */}
            {product.whatsIncluded && product.whatsIncluded.length > 0 && (
              <div className="mb-8 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-1.5 text-neutral-500" /> What You Will Receive
                </h2>
                <ul className="list-disc list-inside text-xs text-neutral-600 space-y-1 pl-1">
                  {product.whatsIncluded.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Buy Action Section */}
            <div className="mt-auto pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={product.etsyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Buy Safely on Etsy <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>

            {/* Share Buttons */}
            <div className="mt-6">
              <ShareButtons
                title={product.name}
                url={`https://digitalpedia.store/product/${product.slug}`}
                image={displayImages[0]}
              />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-neutral-100 pt-16">
            <ProductGrid
              products={relatedProducts}
              title="You Might Also Like"
              subtitle="Explore similar items from our collection."
              columns={4}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-4 bg-neutral-200 rounded w-1/4 mb-8"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square bg-neutral-200 rounded-3xl"></div>
        <div className="space-y-4">
          <div className="h-8 bg-neutral-200 rounded w-3/4"></div>
          <div className="h-6 bg-neutral-200 rounded w-1/4"></div>
          <div className="h-24 bg-neutral-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
