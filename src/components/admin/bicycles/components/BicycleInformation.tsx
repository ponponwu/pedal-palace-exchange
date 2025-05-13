
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { BicycleWithOwner } from '@/types/bicycle';

interface BicycleInformationProps {
  bicycle: BicycleWithOwner;
}

const BicycleInformation: React.FC<BicycleInformationProps> = ({
  bicycle,
}) => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold mb-4">{bicycle.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-500">{t('brand')}</p>
            <p className="font-medium">{bicycle.brand || 'Not specified'}</p>
          </div>
          
          <div>
            <p className="text-gray-500">{t('model')}</p>
            <p className="font-medium">{bicycle.model || 'Not specified'}</p>
          </div>
          
          <div>
            <p className="text-gray-500">{t('year')}</p>
            <p className="font-medium">{bicycle.year || 'Not specified'}</p>
          </div>
          
          <div>
            <p className="text-gray-500">{t('location')}</p>
            <p className="font-medium">{bicycle.location || 'Not specified'}</p>
          </div>
          
          <div>
            <p className="text-gray-500">{t('frameSize')}</p>
            <p className="font-medium">{bicycle.frame_size || 'Not specified'}</p>
          </div>
          
          <div>
            <p className="text-gray-500">{t('wheelSize')}</p>
            <p className="font-medium">{bicycle.wheel_size || 'Not specified'}</p>
          </div>
          
          <div>
            <p className="text-gray-500">{t('condition')}</p>
            <p className="font-medium">{bicycle.condition || 'Not specified'}</p>
          </div>
          
          <div>
            <p className="text-gray-500">{t('price')}</p>
            <p className="font-medium text-lg">${bicycle.price}</p>
          </div>
        </div>
        
        <div>
          <p className="text-gray-500 mb-2">{t('description')}</p>
          <p className="text-gray-700">{bicycle.description || 'No description provided'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BicycleInformation;
