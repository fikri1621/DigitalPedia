import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CategoryCard from "@/components/CategoryCard";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DigitalPedia | Premium Digital Templates & Creative Assets",
  description: "Shop high-quality digital templates, planners, workbooks, and creative assets designed to streamline your workflow. Instant access via Etsy.",
};

export default function Home() {
  const bestSellers = products.filter(p => p.bestseller).slice(0, 3);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Categories */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Browse by Category</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Find exactly what you need for your next project from our curated collections.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Best Sellers */}
      <ProductGrid 
        products={bestSellers} 
        title="Best Sellers" 
        subtitle="Our most loved digital products, trusted by thousands of creators."
        columns={3}
      />
    </div>
  );
}
