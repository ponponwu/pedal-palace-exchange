
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import OfferOptions from './offer/OfferOptions';
import CustomOfferInput from './offer/CustomOfferInput';

interface MakeOfferPopoverProps {
  originalPrice: number;
  onCancel: () => void;
  onSubmit: (amount: number) => void;
}

const MakeOfferPopover = ({ originalPrice, onCancel, onSubmit }: MakeOfferPopoverProps) => {
  const { t } = useTranslation();
  const [customAmount, setCustomAmount] = useState('');
  
  // Calculate recommended offers
  const fifteenPercent = Math.floor(originalPrice * 0.85);
  const tenPercent = Math.floor(originalPrice * 0.9);
  const fivePercent = Math.floor(originalPrice * 0.95);
  
  const offerOptions = [
    { amount: fivePercent, percentageOff: 5, isRecommended: false },
    { amount: tenPercent, percentageOff: 10, isRecommended: true },
    { amount: fifteenPercent, percentageOff: 15, isRecommended: false },
  ];
  
  const handleSelectAmount = (amount: number) => {
    toast({
      title: t('offerSent'),
      description: `$${amount.toLocaleString()} ${t('offerHasBeenSent')}`,
    });
    onSubmit(amount);
  };
  
  const handleSubmitCustom = () => {
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount > 0) {
      toast({
        title: t('offerSent'),
        description: `$${amount.toLocaleString()} ${t('offerHasBeenSent')}`,
      });
      onSubmit(amount);
    } else {
      toast({
        title: t('invalidAmount'),
        description: t('pleaseEnterValidAmount'),
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">{t('makeAnOffer')}</h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <OfferOptions 
        options={offerOptions}
        onSelectAmount={handleSelectAmount}
      />
      
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <CustomOfferInput
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder={originalPrice.toString()}
          />
        </div>
        
        <div className="col-span-1">
          <Button 
            className="w-full h-full"
            onClick={handleSubmitCustom}
          >
            {t('offer')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MakeOfferPopover;
