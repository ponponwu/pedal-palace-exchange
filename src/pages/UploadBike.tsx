
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Bike, Camera, DollarSign, CheckCircle } from 'lucide-react';

import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';

import BasicDetailsStep from '@/components/sell/BasicDetailsStep';
import PhotosStep from '@/components/sell/PhotosStep';
import PricingLocationStep from '@/components/sell/PricingLocationStep';
import ReviewStep from '@/components/sell/ReviewStep';

// Define the schema for the form
const sellBikeSchema = z.object({
  // Basic details
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  model: z.string().min(1, { message: "Model is required" }),
  year: z.string().min(4, { message: "Valid year is required" }),
  bikeType: z.string().min(1, { message: "Bike type is required" }),
  frameSize: z.string().min(1, { message: "Frame size is required" }),
  description: z.string().min(20, { message: "Please provide a detailed description (at least 20 characters)" }),
  
  // Photos and condition
  photos: z.array(z.any()).min(1, { message: "At least one photo is required" }),
  condition: z.string().min(1, { message: "Condition is required" }),
  
  // Pricing & location
  price: z.string().min(1, { message: "Price is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  contactMethod: z.string().min(1, { message: "Contact method is required" }),
});

type SellBikeFormValues = z.infer<typeof sellBikeSchema>;

const UploadBike = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const totalSteps = 4; // Total number of steps

  const form = useForm<SellBikeFormValues>({
    resolver: zodResolver(sellBikeSchema),
    defaultValues: {
      title: "",
      brand: "",
      model: "",
      year: "",
      bikeType: "",
      frameSize: "",
      description: "",
      photos: [],
      condition: "",
      price: "",
      location: "",
      contactMethod: "app",
    },
    mode: "onChange"
  });

  const { formState } = form;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const onSubmit = async (data: SellBikeFormValues) => {
    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(i);
      }
      
      console.log('Form submitted:', data);
      toast.success("Your bike has been listed successfully!");
      navigate('/');
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to list your bike. Please try again.");
    }
  };

  // Check if user is logged in
  if (!user) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="text-center p-8 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-6">You need to sign in to list a bike for sale.</p>
            <Button onClick={() => navigate('/login')} className="bg-marketplace-blue hover:bg-blue-600">
              Sign In
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const steps = [
    {
      title: "Bike Details",
      icon: <Bike className="h-5 w-5" />,
      content: <BasicDetailsStep form={form} />
    },
    {
      title: "Photos",
      icon: <Camera className="h-5 w-5" />,
      content: <PhotosStep form={form} />
    },
    {
      title: "Pricing",
      icon: <DollarSign className="h-5 w-5" />,
      content: <PricingLocationStep form={form} />
    },
    {
      title: "Review",
      icon: <CheckCircle className="h-5 w-5" />,
      content: <ReviewStep form={form} />
    }
  ];

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="p-4 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900">Sell Your Bike</h1>
              <p className="mt-1 text-sm text-gray-500">
                Complete the form below to list your bike for sale.
              </p>
            </div>
            
            {/* Progress bar */}
            <div className="px-4 sm:px-6 pb-4">
              <Progress value={progressPercentage} className="h-2" />
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>Step {currentStep + 1} of {totalSteps}</span>
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
            </div>

            {/* Step indicators */}
            <div className="px-4 sm:px-6 pb-6 overflow-x-auto">
              <div className="flex space-x-1 min-w-max">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    disabled={formState.isSubmitting}
                    className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      index === currentStep
                        ? 'bg-marketplace-blue text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{step.icon}</span>
                    <span className="hidden sm:inline">{step.title}</span>
                    <span className="inline sm:hidden">{index + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Display current step content */}
              {steps[currentStep].content}

              {/* Navigation buttons */}
              <div className="mt-8 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0 || formState.isSubmitting}
                >
                  Previous
                </Button>

                {currentStep < totalSteps - 1 ? (
                  <Button 
                    type="button"
                    onClick={nextStep}
                    disabled={formState.isSubmitting}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    disabled={formState.isSubmitting || !formState.isValid}
                  >
                    {formState.isSubmitting ? 'Submitting...' : 'List Bike for Sale'}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UploadBike;
