
import React from 'react';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

interface CustomOfferInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const CustomOfferInput = ({ value, onChange, placeholder }: CustomOfferInputProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="p-3 border rounded-lg">
      <div className="text-gray-700">{t('individualOffer')}</div>
      <Input
        type="number"
        value={value}
        onChange={onChange}
        className="mt-1 border-0 p-0 focus:ring-0 text-lg font-semibold"
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomOfferInput;
