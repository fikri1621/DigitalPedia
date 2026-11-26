"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-neutral-900">
            Digital<span className="text-neutral-500 font-normal">Pedia</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
              Categories
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Etsy Store Button */}
           
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar Dropdown */}
      {isSearchOpen && (
        <div className="border-t border-neutral-100 bg-neutral-50 px-4 py-3">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex gap-2">
            <input
              type="text"
              placeholder="Search products, templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-4 pt-2 pb-4 space-y-1">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 rounded-md"
          >
            Home
          </Link>
          <Link
            href="/shop"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 rounded-md"
          >
            Shop
          </Link>
          <Link
            href="/categories"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 rounded-md"
          >
            Categories
          </Link>
        </div>
      )}
    </header>
  );
}
