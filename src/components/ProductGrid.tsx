import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
}

export default function ProductGrid({ products, title, subtitle, columns = 3 }: ProductGridProps) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-neutral-500 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {products.length > 0 ? (
          <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
            <p className="text-neutral-500 italic">No products found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
