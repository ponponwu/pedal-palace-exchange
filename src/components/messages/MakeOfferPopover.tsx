
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  
  const handleSelectAmount = (amount: number) => {
    onSubmit(amount);
  };
  
  const handleSubmitCustom = () => {
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount > 0) {
      onSubmit(amount);
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
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div 
          className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50"
          onClick={() => handleSelectAmount(fivePercent)}
        >
          <div className="font-bold text-lg">${fivePercent.toLocaleString()}</div>
          <div className="text-sm text-gray-500">- 5%</div>
        </div>
        
        <div 
          className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50 relative"
          onClick={() => handleSelectAmount(tenPercent)}
        >
          <div className="absolute top-0 left-0 w-full text-xs text-blue-600 bg-blue-50 rounded-t-lg">
            {t('recommended')}
          </div>
          <div className="font-bold text-lg mt-2">${tenPercent.toLocaleString()}</div>
          <div className="text-sm text-gray-500">- 10%</div>
        </div>
        
        <div 
          className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50"
          onClick={() => handleSelectAmount(fifteenPercent)}
        >
          <div className="font-bold text-lg">${fifteenPercent.toLocaleString()}</div>
          <div className="text-sm text-gray-500">- 15%</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <div className="p-3 border rounded-lg">
            <div className="text-gray-700">{t('individualOffer')}</div>
            <Input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="mt-1 border-0 p-0 focus:ring-0 text-lg font-semibold"
              placeholder={originalPrice.toString()}
            />
          </div>
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
