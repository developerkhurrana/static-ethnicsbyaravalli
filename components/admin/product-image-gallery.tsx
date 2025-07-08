"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProductImageGalleryProps {
  images: Array<{ url: string; alt: string }>;
  productName: string;
  trigger?: React.ReactNode;
}

export default function ProductImageGallery({ images, productName, trigger }: ProductImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            View Images ({images.length})
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>{productName} - Image Gallery</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          {/* Main Image */}
          <div className="relative h-96 bg-gray-100">
            <img
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].alt || `${productName} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-500">Image not found</div>';
                }
              }}
            />
            
            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            
            {/* Image Counter */}
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
              {currentImageIndex + 1} of {images.length}
            </div>
          </div>
          
          {/* Thumbnail Navigation */}
          {images.length > 1 && (
            <div className="p-4 border-t">
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-16 h-16 border-2 rounded overflow-hidden ${
                      index === currentImageIndex 
                        ? 'border-blue-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt || `Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">Error</div>';
                        }
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Image Details */}
          <div className="p-4 border-t">
            <h3 className="font-medium text-sm text-gray-700">
              Image {currentImageIndex + 1}
            </h3>
            {images[currentImageIndex].alt && (
              <p className="text-sm text-gray-500 mt-1">
                {images[currentImageIndex].alt}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 