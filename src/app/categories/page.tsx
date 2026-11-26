import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Collections | DigitalPedia",
  description: "Browse our complete curated collections of premium digital assets, organized to help you find the perfect tools for your projects.",
};

export default function CategoriesPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-neutral-50 py-20 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex mb-4 text-xs font-medium text-neutral-400 uppercase tracking-widest" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">Categories</span>
          </nav>
          <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-4">Collections</h1>
          <p className="text-neutral-500 max-w-2xl">
            Explore our curated collections of premium digital products, organized to help you find exactly what you need.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
