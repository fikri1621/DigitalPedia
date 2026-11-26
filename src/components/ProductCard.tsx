import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { getProductMainImage } from "@/lib/product-images";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = getProductMainImage(product.slug);
  const hasImage = image && !image.includes("product-default");

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 transition-all hover:shadow-xl hover:border-neutral-200 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-neutral-50">
        {hasImage ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
            <div className="text-center p-4">
              <p className="text-[10px] uppercase tracking-widest font-bold mb-1">Preview</p>
              <p className="text-sm font-serif italic">{product.name}</p>
            </div>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.newArrival && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-neutral-900 rounded-full">
              New
            </span>
          )}
          {product.bestseller && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-900 bg-white shadow-sm rounded-full">
              Bestseller
            </span>
          )}
        </div>
        
        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Link 
              href={`/product/${product.slug}`}
              className="bg-white text-neutral-900 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 active:scale-95"
            >
              Quick View
            </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/product/${product.slug}`} className="hover:text-neutral-600 transition-colors">
            <h3 className="text-base font-semibold text-neutral-900 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <span className="text-sm font-bold text-neutral-900 blur-[4px] select-none">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>
        
        <p className="text-sm text-neutral-500 mb-6 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Buttons */}
        <div className="mt-auto">
          <a
            href={product.etsyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors shadow-sm active:scale-[0.98]"
          >
            Buy on Etsy <ExternalLink className="w-3.5 h-3.5 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
}
