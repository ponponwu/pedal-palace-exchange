
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { SellBikeFormValues } from './types';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  prevStep: () => void;
  nextStep: () => void;
  form: UseFormReturn<SellBikeFormValues>;
  isSubmitting: boolean;
}

const StepNavigation = ({
  currentStep,
  totalSteps,
  prevStep,
  nextStep,
  form,
  isSubmitting
}: StepNavigationProps) => {
  return (
    <div className="mt-8 flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 0 || isSubmitting}
      >
        Previous
      </Button>

      {currentStep < totalSteps - 1 ? (
        <Button 
          type="button"
          onClick={nextStep}
          disabled={isSubmitting}
        >
          Continue
        </Button>
      ) : (
        <Button 
          type="submit"
          disabled={isSubmitting || !form.formState.isValid}
        >
          {isSubmitting ? 'Submitting...' : 'List Bike for Sale'}
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;
