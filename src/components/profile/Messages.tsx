
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Messages = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleViewAllMessages = () => {
    navigate('/messages');
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{t('messages')}</h3>
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">{t('youHaveNoMessages')}</h3>
        <p className="mt-2 text-sm text-gray-500">{t('messagesWillAppearHere')}</p>
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            {t('browseBicycles')}
          </Button>
          <Button onClick={handleViewAllMessages}>
            {t('viewAllMessages')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
