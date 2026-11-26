import { Suspense } from "react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import { notFound } from "next/navigation";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const category = categories.find(
    (c) =>
      c.slug.toLowerCase() === decodedSlug.toLowerCase() ||
      c.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.categoryId === category.id);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Banner */}
      <section className="bg-neutral-900 text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex mb-6 text-xs font-medium text-neutral-400 uppercase tracking-widest" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">{category.name}</h1>
          <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-neutral-800 rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProductGrid 
          products={categoryProducts}
          columns={3}
        />
      </div>
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div className="bg-white min-h-screen animate-pulse">
      <section className="bg-neutral-900 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="h-8 w-64 bg-neutral-800 rounded mb-6" />
           <div className="h-12 w-96 bg-neutral-800 rounded mb-4" />
        </div>
      </section>
    </div>
  );
}
