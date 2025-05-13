
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  message: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read: boolean;
  bicycle_id: string;
  sender?: { full_name: string };
  receiver?: { full_name: string };
  bicycle?: { title: string };
}

const MessageManagement: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    fetchMessages();
  }, []);
  
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!sender_id(full_name),
          receiver:profiles!receiver_id(full_name),
          bicycle:bicycles(title)
        `)
        .order('created_at', { ascending: false })
        .limit(100);
        
      if (error) throw error;
      
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        variant: 'destructive',
        title: t('error'),
        description: t('failedToFetchMessages'),
      });
    } finally {
      setLoading(false);
    }
  };
  
  const viewConversation = async (bicycleId: string, senderId: string, receiverId: string) => {
    try {
      // Fetch all messages between these users for this bicycle
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!sender_id(full_name),
          receiver:profiles!receiver_id(full_name),
          bicycle:bicycles(title)
        `)
        .eq('bicycle_id', bicycleId)
        .or(`sender_id.eq.${senderId},sender_id.eq.${receiverId}`)
        .or(`receiver_id.eq.${senderId},receiver_id.eq.${receiverId}`)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      setChatMessages(data || []);
      setSelectedChat(bicycleId + senderId + receiverId);
    } catch (error) {
      console.error('Error fetching conversation:', error);
      toast({
        variant: 'destructive',
        title: t('error'),
        description: t('failedToFetchConversation'),
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('allMessages')}</h1>
        <p className="text-gray-500">{t('viewAndManageUserMessages')}</p>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">{t('allMessages')}</TabsTrigger>
          <TabsTrigger value="unread">{t('unreadMessages')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card className="p-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">{t('noMessagesFound')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Message List */}
                <div className="lg:col-span-1 border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 p-3 border-b">
                    <h3 className="font-medium">{t('conversations')}</h3>
                  </div>
                  
                  <div className="divide-y max-h-[600px] overflow-y-auto">
                    {[...new Map(messages.map(msg => 
                      [`${msg.bicycle_id}${msg.sender_id}${msg.receiver_id}`, msg]
                    )).values()].map((msg) => (
                      <div 
                        key={msg.id}
                        onClick={() => viewConversation(msg.bicycle_id, msg.sender_id, msg.receiver_id)}
                        className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedChat === msg.bicycle_id + msg.sender_id + msg.receiver_id 
                            ? 'bg-blue-50 border-l-4 border-blue-500' 
                            : ''
                        }`}
                      >
                        <div className="flex justify-between">
                          <p className="font-medium truncate">
                            {msg.sender?.full_name} → {msg.receiver?.full_name}
                          </p>
                          <span className="text-xs text-gray-500">{formatDate(msg.created_at).split(',')[0]}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                        <p className="text-xs text-gray-400 truncate mt-1">
                          {msg.bicycle?.title || t('deletedBicycle')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Message Detail */}
                <div className="lg:col-span-2 border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 p-3 border-b">
                    <h3 className="font-medium">{t('conversation')}</h3>
                  </div>
                  
                  <div className="p-4 max-h-[600px] overflow-y-auto">
                    {selectedChat ? (
                      chatMessages.length > 0 ? (
                        <div className="space-y-4">
                          {chatMessages.map((msg) => (
                            <div key={msg.id} className="flex flex-col">
                              <div className="flex items-center mb-1">
                                <span className="font-medium">{msg.sender?.full_name}</span>
                                <span className="text-xs text-gray-500 ml-2">
                                  {formatDate(msg.created_at)}
                                </span>
                              </div>
                              <div className="bg-gray-100 p-3 rounded-lg self-start max-w-[80%]">
                                {msg.message}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">{t('noMessagesInConversation')}</p>
                        </div>
                      )
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">{t('selectConversationToView')}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="unread">
          <Card className="p-4">
            <div className="text-center py-8">
              <p className="text-gray-500">{t('unreadMessagesFeatureComingSoon')}</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessageManagement;
