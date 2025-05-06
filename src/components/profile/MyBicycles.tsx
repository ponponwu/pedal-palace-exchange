
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bike } from 'lucide-react';

const MyBicycles = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">我的自行車</h3>
        <Button onClick={() => navigate('/upload')} variant="outline">發佈新車</Button>
      </div>
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <Bike className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">您還沒有發佈任何自行車</h3>
        <p className="mt-2 text-sm text-gray-500">開始發佈您的第一輛自行車吧</p>
        <Button className="mt-4 bg-marketplace-blue hover:bg-blue-600" onClick={() => navigate('/upload')}>
          立即發佈
        </Button>
      </div>
    </div>
  );
};

export default MyBicycles;
