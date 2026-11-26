import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

const showcaseItems = [
  {
    title: "Bookkeeping Bundle",
    tag: "Bestseller",
    href: "/product/ultimate-bookkeeping-resources-bundle",
    image:
      "/images/products/ultimate-bookkeeping-resources-bundle/ChatGPT%20Image%202%20Sep%202026%2C%2004.04.51.png",
  },
  {
    title: "600+ Mobile Apps",
    tag: "Source Code",
    href: "/product/600-mobile-app-templates-source-code",
    image:
      "/images/products/600-mobile-app-templates-source-code/1mobileapp.png",
  },
  {
    title: "100k+ Icon Pack",
    tag: "Graphics",
    href: "/product/100000-icon-mega-pack",
    image:
      "/images/products/100000-icon-mega-pack/ChatGPT%20Image%20Jul%2017%2C%202026%2C%2003_23_23%20AM.png",
  },
  {
    title: "10k+ PS Actions",
    tag: "Editing",
    href: "/product/10000-photoshop-actions-bundle",
    image:
      "/images/products/10000-photoshop-actions-bundle/ChatGPT%20Image%20Aug%204%2C%202026%2C%2001_33_45%20AM.png",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 leading-tight mb-6">
              Elevate Your Projects with{" "}
              <span className="italic text-neutral-500">Premium</span> Digital
              Designs.
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Curated collection of professional templates, planners, and
              resources designed to help you create, organize, and succeed.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Explore Products <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-neutral-600 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-all active:scale-95"
              >
                Browse Categories
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Verified Quality
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Instant Delivery
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Secure Etsy Checkout
              </span>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="flex-1 relative w-full max-w-[520px] px-2 sm:px-0">
            <div className="absolute inset-2 sm:inset-0 bg-neutral-100 rounded-3xl transform rotate-3 -z-10 shadow-sm" />

            <div className="relative bg-neutral-950 rounded-3xl p-3.5 sm:p-5 shadow-2xl border border-neutral-800">
              {/* Showcase Window Header */}
              <div className="flex items-center justify-between px-1 pb-3.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Featured Digital Bundles
                </span>
              </div>

              {/* 2x2 Product Collage Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                {showcaseItems.map((item, idx) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/10"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority={idx < 2}
                      loading="eager"
                      sizes="(max-width: 640px) 42vw, 240px"
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-900 bg-white/95 rounded-full shadow-sm">
                      {item.tag}
                    </span>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <p className="text-xs sm:text-sm font-semibold text-white line-clamp-1 group-hover:translate-x-0.5 transition-transform">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Floating Top-Right Badge */}
            <div className="absolute -top-4 right-0 sm:-top-5 sm:-right-5 bg-white px-3.5 py-2.5 rounded-xl shadow-xl border border-neutral-100 flex items-center gap-2.5">
              <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900">40+ Bundles</p>
                <p className="text-[10px] text-neutral-500">Instant Access</p>
              </div>
            </div>

            {/* Floating Bottom-Left Card */}
           
          </div>
        </div>
      </div>
    </section>
  );
}
