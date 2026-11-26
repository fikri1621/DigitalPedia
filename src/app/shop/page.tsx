import { Suspense } from "react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Search, SlidersHorizontal, Tag } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Digital Products | DigitalPedia",
  description: "Browse our complete collection of premium digital templates, planners, and resources.",
};

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
  }>;
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-neutral-50 py-12 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex mb-4 text-xs font-medium text-neutral-400 uppercase tracking-widest" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">Shop</span>
          </nav>
          <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-2">
            Shop All Products
          </h1>
          <p className="text-sm text-neutral-500 max-w-2xl">
            Discover our full range of professional digital assets and creative resources.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<ShopResultsSkeleton />}>
          <ShopResults searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function ShopResults({ searchParams }: ShopPageProps) {
  const { category, search, sort } = await searchParams;

  const activeCategory = category
    ? categories.find(c => c.slug.toLowerCase() === category.toLowerCase())
    : null;

  let filteredProducts = [...products];

  if (activeCategory) {
    filteredProducts = filteredProducts.filter(p => p.categoryId === activeCategory.id);
  }

  if (search) {
    const query = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.shortDescription.toLowerCase().includes(query)
    );
  }

  if (sort === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === "newest") {
    filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-4 flex items-center">
            <Search className="w-3.5 h-3.5 mr-2" /> Search
          </h3>
          <form action="/shop" className="relative">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Keyword..."
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            {category && <input type="hidden" name="category" value={category} />}
          </form>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-4 flex items-center">
            <Tag className="w-3.5 h-3.5 mr-2" /> Categories
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/shop"
                className={`text-sm block py-1 hover:text-neutral-900 transition-colors ${!category ? 'font-bold text-neutral-900' : 'text-neutral-500'}`}
              >
                All Products
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                  className={`text-sm block py-1 hover:text-neutral-900 transition-colors ${activeCategory?.id === cat.id ? 'font-bold text-neutral-900' : 'text-neutral-500'}`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-4 flex items-center">
            <SlidersHorizontal className="w-3.5 h-3.5 mr-2" /> Sort
          </h3>
          <div className="space-y-2">
            {[
              { label: "Default", value: "" },
              { label: "Newest", value: "newest" },
              { label: "Price: Low to High", value: "price-asc" },
              { label: "Price: High to Low", value: "price-desc" },
            ].map((s) => (
              <Link
                key={s.value}
                href={{
                  pathname: '/shop',
                  query: {
                    ...(category ? { category } : {}),
                    ...(search ? { search } : {}),
                    ...(s.value ? { sort: s.value } : {})
                  }
                }}
                className={`block text-sm py-1 hover:text-neutral-900 transition-colors ${sort === s.value || (!sort && !s.value) ? 'font-bold text-neutral-900' : 'text-neutral-500'}`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1">
        {activeCategory && (
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-1">
              {activeCategory.name}
            </h2>
            <p className="text-sm text-neutral-500">{activeCategory.description}</p>
          </div>
        )}

        <div className="mb-8">
          <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">
            Showing {filteredProducts.length} Results
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
            <p className="text-neutral-500 italic mb-4">No products found in this category.</p>
            <Link href="/shop" className="text-xs font-bold uppercase tracking-widest text-neutral-900 underline underline-offset-4">
              View all products
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

function ShopResultsSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
        <div className="space-y-3">
          <div className="h-3 w-20 bg-neutral-100 rounded" />
          <div className="h-10 w-full bg-neutral-100 rounded-lg" />
        </div>
        <div className="space-y-3">
          <div className="h-3 w-24 bg-neutral-100 rounded" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-3 w-32 bg-neutral-100 rounded" />
          ))}
        </div>
        <div className="space-y-3">
          <div className="h-3 w-16 bg-neutral-100 rounded" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-3 w-36 bg-neutral-100 rounded" />
          ))}
        </div>
      </aside>

      <main className="flex-1">
        <div className="h-3 w-28 bg-neutral-100 rounded mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-neutral-100 overflow-hidden">
              <div className="aspect-square bg-neutral-100" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-3/4 bg-neutral-100 rounded" />
                <div className="h-3 w-full bg-neutral-100 rounded" />
                <div className="h-3 w-2/3 bg-neutral-100 rounded" />
                <div className="h-9 w-full bg-neutral-100 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
