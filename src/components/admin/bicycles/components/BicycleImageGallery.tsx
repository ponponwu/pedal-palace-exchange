
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { BicycleWithOwner } from '@/types/bicycle';

interface BicycleImageGalleryProps {
  bicycle: BicycleWithOwner;
}

const BicycleImageGallery: React.FC<BicycleImageGalleryProps> = ({
  bicycle,
}) => {
  if (!bicycle.images || bicycle.images.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bicycle.images.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-md">
              <AspectRatio ratio={1/1}>
                <img
                  src={image.url}
                  alt={image.alt || bicycle.title}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BicycleImageGallery;
