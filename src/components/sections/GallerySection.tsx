
import { useState, useEffect } from 'react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { imagesCollection } from '@/lib/firebase';
import { Loader2, Image as ImageIcon } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
}

const GallerySection = () => {
  const { data: images, loading, error } = useFirebaseData<GalleryImage>(imagesCollection);

  if (loading) {
    return (
      <section className="bg-secondary py-12">
        <div className="container-custom">
          <h2 className="section-heading text-center mb-8">Gallery</h2>
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading gallery...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error loading gallery:", error);
    return null; // Hide section on error
  }

  // Don't show the gallery section if there are no images
  if (images.length === 0) {
    return null;
  }

  return (
    <section className="bg-secondary py-12">
      <div className="container-custom">
        <h2 className="section-heading text-center mb-8">Gallery</h2>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {images.map((image) => (
              <CarouselItem key={image.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="overflow-hidden rounded-lg shadow-md h-64">
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback for image loading errors
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <h3 className="font-medium">{image.title}</h3>
                  {image.description && <p className="text-sm text-muted-foreground">{image.description}</p>}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
};

export default GallerySection;
