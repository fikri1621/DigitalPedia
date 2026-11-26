import Link from "next/link";
import Image from "next/image";
import { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/categories/${encodeURIComponent(category.slug)}`}
      className="group relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 flex items-center justify-center border border-neutral-100 transition-all hover:shadow-lg"
    >
      <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 text-white w-full">
        <h3 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform duration-300">
          {category.name}
        </h3>
        <p className="text-sm text-white/80 line-clamp-1 group-hover:translate-x-1 transition-transform duration-300 delay-75">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
