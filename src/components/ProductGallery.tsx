"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeImage = images[selectedIndex] || "";

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handlePrev, handleNext]);

  if (images.length === 0) {
    return (
      <div className="relative aspect-square bg-neutral-100 rounded-3xl overflow-hidden border border-neutral-100 flex items-center justify-center text-center p-8">
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-2">
            Main Product Image
          </p>
          <p className="text-2xl font-serif italic text-neutral-300">{productName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="group relative aspect-square bg-neutral-100 rounded-3xl overflow-hidden border border-neutral-100 shadow-sm">
          <Image
            src={activeImage}
            alt={`${productName} view ${selectedIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-all duration-300 cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          />

        {/* Zoom Hint / Fullscreen Trigger */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-neutral-900 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Enlarge image"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Carousel Prev/Next Overlay Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-neutral-900 p-2.5 rounded-full shadow-md opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-105 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-neutral-900 p-2.5 rounded-full shadow-md opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-105 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Badge counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery Carousel */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-neutral-200">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`relative aspect-square w-20 sm:w-24 flex-shrink-0 rounded-2xl border-2 overflow-hidden transition-all ${
                selectedIndex === i
                  ? "border-neutral-900 ring-2 ring-neutral-900/10 scale-95"
                  : "border-neutral-100 opacity-70 hover:opacity-100 hover:border-neutral-300"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox / Zoom Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Top Bar Controls */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 z-10">
            <span className="text-neutral-400 text-xs font-mono uppercase tracking-widest bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">
              {selectedIndex + 1} of {images.length}
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Main Image */}
          <div className="relative w-full max-w-5xl aspect-square sm:aspect-[4/3] max-h-[85vh] flex items-center justify-center">
            <Image
              src={activeImage}
              alt={`${productName} enlarged view`}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>

          {/* Lightbox Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3.5 sm:p-4 rounded-full transition-all active:scale-90"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3.5 sm:p-4 rounded-full transition-all active:scale-90"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </>
          )}

          {/* Lightbox Thumbnail Carousel at Bottom */}
          {images.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedIndex === i
                      ? "border-white scale-105"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 48px, 64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
