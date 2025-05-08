
import React from 'react';
import OfferTile from './OfferTile';

interface OfferOptionsProps {
  options: {
    amount: number;
    percentageOff: number;
    isRecommended?: boolean;
  }[];
  onSelectAmount: (amount: number) => void;
}

const OfferOptions = ({ options, onSelectAmount }: OfferOptionsProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      {options.map((option, index) => (
        <OfferTile
          key={index}
          amount={option.amount}
          percentageOff={option.percentageOff}
          isRecommended={option.isRecommended}
          onClick={onSelectAmount}
        />
      ))}
    </div>
  );
};

export default OfferOptions;
