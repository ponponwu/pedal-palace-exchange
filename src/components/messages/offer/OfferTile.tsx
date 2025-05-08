
import React from 'react';

interface OfferTileProps {
  amount: number;
  percentageOff: number;
  isRecommended?: boolean;
  onClick: (amount: number) => void;
}

const OfferTile = ({ amount, percentageOff, isRecommended = false, onClick }: OfferTileProps) => {
  return (
    <div 
      className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50 relative"
      onClick={() => onClick(amount)}
    >
      {isRecommended && (
        <div className="absolute top-0 left-0 w-full text-xs text-blue-600 bg-blue-50 rounded-t-lg">
          {isRecommended ? 'recommended' : ''}
        </div>
      )}
      <div className={`font-bold text-lg ${isRecommended ? 'mt-2' : ''}`}>
        ${amount.toLocaleString()}
      </div>
      <div className="text-sm text-gray-500">- {percentageOff}%</div>
    </div>
  );
};

export default OfferTile;
