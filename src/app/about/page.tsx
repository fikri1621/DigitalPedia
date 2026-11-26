import { Award, Feather, Rocket } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold mb-8">Crafting Digital Excellence.</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            We empower creators and entrepreneurs with professional-grade digital tools and templates designed for modern workflows.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-8 leading-tight">
                Our design philosophy is simple: <span className="italic font-normal text-neutral-500">Beauty meets utility.</span>
              </h2>
              <div className="space-y-8">
                <p className="text-neutral-600 leading-relaxed">
                  Founded in 2024, AuraDigital began with a singular goal: to bridge the gap between high-end design agency quality and accessible digital products. We noticed that many templates on the market were either overly complex or lacked professional polish.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  Every product in our shop is built on a foundation of clean typography, ample white space, and functional layout. We don&apos;t just sell files; we sell time-saving solutions that help you look your best from day one.
                </p>
              </div>
            </div>
            <div className="relative aspect-square bg-neutral-100 rounded-3xl overflow-hidden border border-neutral-100 flex items-center justify-center">
               <div className="text-center p-12">
                  <p className="text-sm font-serif italic text-neutral-400">Studio Photo / Brand Visual</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-neutral-100">
               <Feather className="w-8 h-8 text-neutral-900 mb-6" />
               <h3 className="text-lg font-bold mb-4">Intentional Design</h3>
               <p className="text-sm text-neutral-500 leading-relaxed">
                 We obsess over every pixel and point. Every element in our templates serves a purpose for the user.
               </p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-neutral-100">
               <Rocket className="w-8 h-8 text-neutral-900 mb-6" />
               <h3 className="text-lg font-bold mb-4">Effortless Workflow</h3>
               <p className="text-sm text-neutral-500 leading-relaxed">
                 Our products are designed to be plug-and-play, letting you focus on what you do best without fighting the software.
               </p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-neutral-100">
               <Award className="w-8 h-8 text-neutral-900 mb-6" />
               <h3 className="text-lg font-bold mb-4">Etsy Verified</h3>
               <p className="text-sm text-neutral-500 leading-relaxed">
                 We leverage Etsy&apos;s world-class platform to provide secure transactions and instant, reliable file delivery.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-8">Ready to transform your brand?</h2>
          <Link 
            href="/shop" 
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all shadow-xl active:scale-95"
          >
            Explore the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
