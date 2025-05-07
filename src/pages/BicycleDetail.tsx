
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Bookmark, MessageCircle, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Sample bicycle data - In a real app, this would come from an API
const bicycleData = {
  id: '1',
  title: 'Specialized Stumpjumper Expert Carbon 29',
  description: 'The Specialized Stumpjumper Expert is the ultimate trail bike. Featuring FACT 11m carbon fiber construction and 140mm of travel front and rear, this bike is built to tackle any trail with ease. The bike is in excellent condition with only minor wear from normal use. FOX suspension, SRAM X01 Eagle drivetrain, and carbon wheels make this a premium mountain bike that\'s ready for your next adventure.',
  price: 2800,
  location: 'Seattle, WA',
  condition: 'Like New',
  brand: 'Specialized',
  model: 'Stumpjumper Expert Carbon 29',
  year: 2021,
  frameSize: 'Large',
  wheelSize: '29"',
  category: 'Mountain Bike',
  images: [
    'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1623005329937-eb70fb656e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  ],
  sellerName: 'Michael Thompson',
  sellerRating: 4.8,
  yearsOfUse: 1.5,
  contactInfo: {
    phone: '(206) 555-1234',
    email: 'michael.t@example.com'
  }
};

const BicycleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState('');
  const [offer, setOffer] = useState('');
  const { t } = useTranslation();
  
  // In a real app, you would fetch the bicycle data based on the ID
  // For now, we'll just use our sample data
  const bicycle = bicycleData;
  
  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Message submitted:', message);
    // In a real app, this would send the message to the seller
    setMessage('');
    // Show success feedback
    toast({
      title: "訊息已送出",
      description: "您的訊息已成功發送給賣家！",
    });
  };

  const handleSubmitOffer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Offer submitted:', offer);
    // In a real app, this would send the offer to the seller
    setOffer('');
    // Show success feedback
    toast({
      title: "出價已送出",
      description: `您已成功出價 $${offer}！`,
    });
  };
  
  return (
    <MainLayout>
      <div className="container px-4 py-8 mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-5 text-sm text-gray-500">
          <Link to="/" className="hover:text-marketplace-blue">{t('home')}</Link>
          <span className="mx-2">/</span>
          <Link to="/search" className="hover:text-marketplace-blue">{t('search')}</Link>
          <span className="mx-2">/</span>
          <Link to={`/search?category=${bicycle.category}`} className="hover:text-marketplace-blue">{bicycle.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{bicycle.title}</span>
        </nav>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div>
            {bicycle.images.length <= 4 ? (
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src={bicycle.images[selectedImage]} 
                  alt={bicycle.title} 
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg">
                <Carousel>
                  <CarouselContent>
                    {bicycle.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <img 
                          src={image} 
                          alt={`${bicycle.title} - Image ${index + 1}`} 
                          className="object-cover w-full h-full"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            )}
            
            <div className="grid grid-cols-4 gap-4">
              {bicycle.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-marketplace-blue' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${bicycle.title} - Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Bicycle Details */}
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900">{bicycle.title}</h1>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${isFavorite ? 'text-marketplace-orange' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Bookmark className={isFavorite ? "h-5 w-5 fill-marketplace-orange" : "h-5 w-5"} />
              </Button>
            </div>
            
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="success">{bicycle.condition}</Badge>
              <Badge>{bicycle.brand}</Badge>
              <Badge>{bicycle.category}</Badge>
            </div>
            
            <div className="mt-6">
              <div className="text-3xl font-bold text-marketplace-green">${bicycle.price}</div>
              <p className="text-gray-500 mt-1">{t('location')}: {bicycle.location}</p>
            </div>

            {/* Make Offer Button */}
            <div className="mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-marketplace-orange hover:bg-orange-600">
                    <DollarSign className="mr-2 h-5 w-5" />
                    {t('makeOffer')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('makeOffer')}</DialogTitle>
                    <DialogDescription>
                      {t('yourOffer')} ({bicycle.title})
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmitOffer}>
                    <div className="grid gap-4 py-4">
                      <div className="flex items-center gap-4">
                        <DollarSign className="h-5 w-5 text-gray-500" />
                        <Input 
                          type="number" 
                          min="1"
                          value={offer} 
                          onChange={(e) => setOffer(e.target.value)}
                          placeholder="Enter your offer amount" 
                          className="col-span-3" 
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">{t('submit')}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Specifications */}
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <span className="block font-medium text-gray-900">{t('brand')}</span>
                <span className="text-gray-600">{bicycle.brand}</span>
              </div>
              <div>
                <span className="block font-medium text-gray-900">{t('model')}</span>
                <span className="text-gray-600">{bicycle.model}</span>
              </div>
              <div>
                <span className="block font-medium text-gray-900">{t('year')}</span>
                <span className="text-gray-600">{bicycle.year}</span>
              </div>
              <div>
                <span className="block font-medium text-gray-900">{t('frameSize')}</span>
                <span className="text-gray-600">{bicycle.frameSize}</span>
              </div>
              <div>
                <span className="block font-medium text-gray-900">{t('wheelSize')}</span>
                <span className="text-gray-600">{bicycle.wheelSize}</span>
              </div>
              <div>
                <span className="block font-medium text-gray-900">{t('yearsOfUse')}</span>
                <span className="text-gray-600">{bicycle.yearsOfUse} years</span>
              </div>
            </div>
            
            {/* Seller Information */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                  {bicycle.sellerName[0]}
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">{bicycle.sellerName}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(bicycle.sellerRating) ? 'text-yellow-500' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-500">({bicycle.sellerRating.toFixed(1)})</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="mt-8">
              <h3 className="text-lg font-medium">{t('contactSeller')}</h3>
              <form onSubmit={handleSubmitMessage} className="mt-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('askQuestion')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marketplace-blue focus:border-transparent"
                  rows={4}
                  required
                ></textarea>
                
                <Button type="submit" className="mt-4 bg-marketplace-blue hover:bg-blue-600">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t('sendMessage')}
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">{t('description')}</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700">{bicycle.description}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BicycleDetail;
