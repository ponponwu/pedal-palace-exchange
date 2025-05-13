
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { BicycleWithOwner } from '@/types/bicycle';

interface AdminActionsProps {
  bicycle: BicycleWithOwner;
  onApprove: () => void;
  onReject: () => void;
}

const AdminActions: React.FC<AdminActionsProps> = ({
  bicycle,
  onApprove,
  onReject,
}) => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">{t('adminActions')}</h2>
        <div className="space-y-2">
          {bicycle.status === 'pending' ? (
            <>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={onApprove}
              >
                <Check className="h-4 w-4 mr-2" />
                {t('approve')}
              </Button>
              
              <Button 
                variant="destructive"
                className="w-full"
                onClick={onReject}
              >
                <X className="h-4 w-4 mr-2" />
                {t('reject')}
              </Button>
            </>
          ) : bicycle.status === 'approved' ? (
            <Button 
              variant="destructive"
              className="w-full"
              onClick={onReject}
            >
              <X className="h-4 w-4 mr-2" />
              {t('reject')}
            </Button>
          ) : (
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={onApprove}
            >
              <Check className="h-4 w-4 mr-2" />
              {t('approve')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminActions;
