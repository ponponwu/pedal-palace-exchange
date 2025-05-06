
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const Messages = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">消息中心</h3>
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">您沒有任何消息</h3>
        <p className="mt-2 text-sm text-gray-500">當您有新的消息時會顯示在這裡</p>
        <Button className="mt-4" variant="outline" onClick={() => navigate('/')}>
          瀏覽自行車
        </Button>
      </div>
    </div>
  );
};

export default Messages;
