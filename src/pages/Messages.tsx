import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Send, MessageCircle, MapPin, DollarSign, Camera, ShieldCheck, User } from 'lucide-react';
import { format } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import MakeOfferPopover from '@/components/messages/MakeOfferPopover';
import ChatHeader from '@/components/messages/ChatHeader';
import { toast } from '@/hooks/use-toast';

// Sample bicycle data - In a real app, this would come from an API
const bicyclesData = {
  'bicycle-1': {
    id: '1',
    title: 'Specialized Stumpjumper Expert Carbon 29',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890',
    seller: {
      name: 'Michael Thompson',
      location: 'Seattle, WA',
      currency: 'USD',
    }
  },
  'bicycle-2': {
    id: '2',
    title: 'Émonda SL 5 Disc 2022',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91',
    seller: {
      name: 'Mauricio',
      location: 'Miami, United States',
      currency: 'USD',
    }
  },
};

// Sample conversation data - In a real app, this would come from an API
const sampleConversations = [
  {
    id: 'bicycle-1',
    otherUser: 'Michael Thompson',
    lastMessage: '我可以提高到$2600，這是我能提供的最高價格。',
    timestamp: new Date(2025, 4, 6, 9, 20),
    unread: true,
    bicycleTitle: 'Specialized Stumpjumper Expert Carbon 29',
    bicycleImage: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890',
  },
  {
    id: 'bicycle-2',
    otherUser: 'Mauricio',
    lastMessage: '您好，這台腳踏車還在銷售嗎？',
    timestamp: new Date(2025, 4, 7, 11, 15),
    unread: false,
    bicycleTitle: 'Émonda SL 5 Disc 2022',
    bicycleImage: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91',
  },
];

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
      message: '您好，這台腳踏車還在銷售嗎？',
      timestamp: new Date(2025, 4, 7, 11, 15),
      isOffer: false,
    },
    {
      id: 2,
      sender: 'buyer',
      message: 'Offer: $1,870',
      timestamp: new Date(2025, 4, 7, 20, 34),
      isOffer: true,
      offerAmount: 1870,
      status: 'sent'
    },
  ],
};

const formatMessageDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
};

const Messages = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const bicycleId = searchParams.get('bicycleId') || 'bicycle-2';
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [showOfferPopover, setShowOfferPopover] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  
  // Add local state to store messages so we can update them dynamically
  const [localMessages, setLocalMessages] = useState<Record<string, any[]>>(sampleMessages);
  
  const messages = localMessages[bicycleId as keyof typeof localMessages] || [];
  const bicycle = bicyclesData[bicycleId as keyof typeof bicyclesData] || {
    title: 'Bicycle',
    price: 0,
    image: '',
    seller: { name: 'Seller', location: 'Unknown', currency: 'USD' }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Create a new message
      const newMsg = {
        id: messages.length + 1,
        sender: 'buyer',
        message: newMessage,
        timestamp: new Date(),
        isOffer: false
      };
      
      // Update the messages for this conversation
      setLocalMessages(prev => ({
        ...prev,
        [bicycleId]: [...(prev[bicycleId as keyof typeof prev] || []), newMsg]
      }));
      
      // Clear the input
      setNewMessage('');
      
      // Show toast notification
      toast({
        title: t('messageSent'),
        description: t('yourMessageHasBeenSent'),
      });
    }
  };

  const toggleOfferPopover = () => {
    setShowOfferPopover(!showOfferPopover);
  };
  
  const handleMakeOffer = (amount: number) => {
    // Create a new message for the offer
    const newOfferMsg = {
      id: messages.length + 1,
      sender: 'buyer',
      message: `${t('offer')}: $${amount.toLocaleString()}`,
      timestamp: new Date(),
      isOffer: true,
      offerAmount: amount,
      status: 'sent'
    };
    
    // Update the messages for this conversation
    setLocalMessages(prev => ({
      ...prev,
      [bicycleId]: [...(prev[bicycleId as keyof typeof prev] || []), newOfferMsg]
    }));
    
    // Close the offer popover
    setShowOfferPopover(false);
  };
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  const handleSelectConversation = (id: string) => {
    navigate(`/messages?bicycleId=${id}`);
  };

  return (
    <MainLayout>
      <div className="flex h-screen bg-gray-50">
        {/* Conversations Sidebar */}
        <div 
          className={`bg-white border-r w-80 flex-shrink-0 transition-all duration-300 ${
            showSidebar ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:relative z-10 h-full`}
        >
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">{t('messages')}</h2>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-60px)]">
            {sampleConversations.map((conversation) => (
              <div 
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.id)}
                className={`p-4 border-b flex cursor-pointer hover:bg-gray-50 transition-colors ${
                  bicycleId === conversation.id ? 'bg-gray-100' : ''
                }`}
              >
                <div className="relative mr-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                    {conversation.bicycleImage ? (
                      <img 
                        src={conversation.bicycleImage} 
                        alt={conversation.bicycleTitle}
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <Avatar>
                        <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white">
                          <User className="h-6 w-6" />
                        </div>
                      </Avatar>
                    )}
                  </div>
                  {conversation.unread && (
                    <div className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-sm truncate">{conversation.otherUser}</p>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {formatMessageDate(conversation.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  <p className="text-xs text-gray-400 truncate">{conversation.bicycleTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Mobile Sidebar Toggle */}
          <button
            className="md:hidden absolute top-4 left-4 z-20"
            onClick={toggleSidebar}
          >
            <ArrowLeft className={`h-5 w-5 transition-transform ${showSidebar ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Bicycle Info Header */}
          <ChatHeader 
            bicycle={bicycle}
            onBack={() => navigate(-1)}
          />
          
          {/* Safe Trading Banner */}
          <div className="bg-white px-4 py-3 border-b flex items-center">
            <ShieldCheck className="h-6 w-6 text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-700">
                {t('staySafe')}: {t('neverSharePersonalDetails')}
              </p>
              <a href="#" className="text-sm text-blue-600">{t('learnMore')}</a>
            </div>
          </div>

          {/* Seller Info Card */}
          <div className="bg-white px-4 py-3 border-b">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium">{t('hi')}, {t('imThe')} {bicycle.seller.name}</h3>
              <div className="flex items-center text-gray-700 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{bicycle.seller.location}</span>
              </div>
              <div className="flex items-center text-gray-700 mt-1">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm">{bicycle.seller.currency} $</span>
              </div>
            </div>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
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
                          : 'bg-white text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {msg.isOffer && (
                        <div className={`mb-1 ${
                          msg.sender === 'buyer' ? 'text-white' : 'text-gray-600'
                        }`}>
                          <div className="font-semibold">
                            {t('offer')}: ${msg.offerAmount.toLocaleString()}
                          </div>
                          {msg.status && (
                            <div className="text-sm">
                              {msg.status === 'sent' ? t('sent') : msg.status}
                            </div>
                          )}
                          {msg.accepted && (
                            <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                              {t('accepted')}
                            </span>
                          )}
                        </div>
                      )}
                      {!msg.isOffer && <p>{msg.message}</p>}
                      <div className={`text-xs mt-2 ${
                        msg.sender === 'buyer' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {format(new Date(msg.timestamp), 'HH:mm')}
                      </div>
                    </div>
                    {msg.sender === 'seller' && (
                      <Avatar className="h-8 w-8 ml-2">
                        <div className="bg-green-500 text-white h-full w-full flex items-center justify-center">
                          {bicycle.seller.name[0]}
                        </div>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <Card className="text-center py-10 mb-6">
                <div className="pt-6">
                  <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{t('noMessages')}</h3>
                  <p className="mt-2 text-sm text-gray-500">{t('startConversation')}</p>
                </div>
              </Card>
            )}
          </div>
          
          {/* Message Input Area */}
          <div className="p-4 border-t bg-white">
            {showOfferPopover ? (
              <MakeOfferPopover 
                originalPrice={bicycle.price}
                onCancel={() => setShowOfferPopover(false)}
                onSubmit={handleMakeOffer}
              />
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <Input 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder={t('typeMessage')} 
                    className="flex-grow"
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => {}}>
                    <Camera className="h-5 w-5" />
                  </Button>
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    {t('send')}
                  </Button>
                </form>
                
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={toggleOfferPopover}
                  >
                    {t('makeAnOffer')}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
