
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { BicycleWithOwner } from '@/types/bicycle';

interface SellerCardProps {
  bicycle: BicycleWithOwner;
}

const SellerCard: React.FC<SellerCardProps> = ({
  bicycle,
}) => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">{t('sellerInformation')}</h2>
        <div className="flex items-center space-x-4">
          {bicycle.owner?.avatar_url ? (
            <img
              src={bicycle.owner.avatar_url}
              alt={bicycle.owner.full_name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 font-medium">
                {bicycle.owner?.full_name?.charAt(0) || 'U'}
              </span>
            </div>
          )}
          <div>
            <p className="font-medium">{bicycle.owner?.full_name || 'Unknown user'}</p>
            <p className="text-sm text-gray-500">User ID: {bicycle.user_id}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerCard;
