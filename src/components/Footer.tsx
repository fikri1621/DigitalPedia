import Link from "next/link";
import { ExternalLink, Share2, Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold text-white mb-4 block">
              Digital<span className="text-neutral-500 font-normal">Pedia</span>
            </Link>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Premium digital products for modern creators and entrepreneurs.
            </p>
           
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wider text-white/90">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
             <li>
                <Link href="/categories" className="text-sm hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wider text-white/90">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm hover:text-white transition-colors">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Etsy CTA */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wider text-white/90">
              Purchase
            </h3>
            <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
              All purchases are completed securely on Etsy.
            </p>
            <a
              href="https://yourdigipedia.etsy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-900 bg-white rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Visit Shop <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500">
            © 2026 DigitalPedia. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-neutral-500">
            <Link href="/shop" className="hover:text-white transition-colors">
              All Products
            </Link>
            <Link href="/categories" className="hover:text-white transition-colors">
              Categories
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
