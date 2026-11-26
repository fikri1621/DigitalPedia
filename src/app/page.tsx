import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CategoryCard from "@/components/CategoryCard";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { CheckCircle2, Zap, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";

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

      {/* 4. Why Choose Us */}
      <section className="py-24 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 text-neutral-900">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-3">Premium Quality</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Every design is meticulously crafted to ensure professional results for your projects.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 text-neutral-900">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-3">Instant Access</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Download your files immediately after purchase via Etsy for a seamless experience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 text-neutral-900">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-3">Secure Checkout</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Shop with confidence using Etsy&apos;s trusted and secure payment processing system.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 text-neutral-900">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-3">Easy Editing</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Our templates are designed to be user-friendly and fully customizable to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals */}
      <ProductGrid 
        products={newArrivals} 
        title="New Arrivals" 
        subtitle="Freshly designed resources to spark your creativity and productivity."
        columns={4}
      />

      {/* 6. Brand Introduction */}
      <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 leading-tight">
              Designing digital tools for the <span className="italic text-neutral-400 font-normal">modern entrepreneur.</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
              AuraDigital was born from a passion for clean design and functional productivity. We believe that professional-grade assets should be accessible to everyone, helping you save time while maintaining an impeccable brand image.
            </p>
            <Link 
              href="/shop" 
              className="inline-flex items-center text-sm font-bold uppercase tracking-widest hover:text-neutral-300 transition-colors"
            >
              Explore Our Collection <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
        {/* Background decorative element */}
        <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 w-96 h-96 bg-neutral-800 rounded-full blur-3xl opacity-50"></div>
      </section>

      
    </div>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}
