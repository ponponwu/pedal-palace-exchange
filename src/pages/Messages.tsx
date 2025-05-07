
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Send, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

// Sample message data - In a real app, this would come from an API
const sampleMessages = {
  'bicycle-1': [
    {
      id: 1,
      sender: 'buyer',
      message: '我對您的腳踏車感興趣，我願意出價$2500。',
      timestamp: new Date(2025, 4, 5, 14, 30),
      isOffer: true,
      offerAmount: 2500,
    },
    {
      id: 2,
      sender: 'seller',
      message: '謝謝您的興趣！不過我希望至少能賣$2700。',
      timestamp: new Date(2025, 4, 5, 15, 45),
      isOffer: false,
    },
    {
      id: 3,
      sender: 'buyer',
      message: '我可以提高到$2600，這是我能提供的最高價格。',
      timestamp: new Date(2025, 4, 6, 9, 20),
      isOffer: true,
      offerAmount: 2600,
    },
    {
      id: 4,
      sender: 'seller',
      message: '好的，我接受您的出價。請問您方便何時來取車？',
      timestamp: new Date(2025, 4, 6, 10, 5),
      isOffer: false,
      accepted: true,
    },
  ],
  'bicycle-2': [
    {
      id: 1,
      sender: 'buyer',
      message: '您好，這台腳踏車還在銷售嗎？我想出價$1800。',
      timestamp: new Date(2025, 4, 7, 11, 15),
      isOffer: true,
      offerAmount: 1800,
    },
  ],
};

const Messages = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const bicycleId = searchParams.get('bicycleId') || 'bicycle-1';
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  
  const messages = sampleMessages[bicycleId as keyof typeof sampleMessages] || [];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="mr-2 p-2" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{t('messageConversation')}</h1>
        </div>
        
        {messages.length > 0 ? (
          <div className="flex flex-col space-y-4 mb-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.sender === 'buyer' 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.isOffer && (
                    <div className={`font-semibold mb-1 ${
                      msg.sender === 'buyer' ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      {msg.sender === 'buyer' ? t('youOffered') : t('sellerOffered')}: 
                      <span className="font-bold"> ${msg.offerAmount}</span>
                      {msg.accepted && (
                        <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                          {t('accepted')}
                        </span>
                      )}
                    </div>
                  )}
                  <p>{msg.message}</p>
                  <div className={`text-xs mt-2 ${
                    msg.sender === 'buyer' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {format(msg.timestamp, 'yyyy-MM-dd HH:mm')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="text-center py-10 mb-6">
            <CardContent className="pt-6">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">{t('noMessages')}</h3>
              <p className="mt-2 text-sm text-gray-500">{t('startConversation')}</p>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder={t('typeMessage')} 
            className="flex-grow"
          />
          <Button type="submit">
            <Send className="h-4 w-4 mr-2" />
            {t('send')}
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Messages;
