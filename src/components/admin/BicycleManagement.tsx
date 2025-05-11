
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BicycleWithOwner } from '@/types/bicycle';

const BicycleManagement: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [bicycles, setBicycles] = useState<BicycleWithOwner[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    fetchBicycles(activeTab);
  }, [activeTab]);

  const fetchBicycles = async (status: 'pending' | 'approved' | 'rejected') => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bicycles')
        .select(`
          *,
          owner:profiles(id, full_name, avatar_url)
        `)
        .eq('status', status);

      if (error) throw error;
      
      // Format the data to match the BicycleWithOwner type
      const formattedBicycles: BicycleWithOwner[] = (data || []).map((item: any) => ({
        ...item,
        owner: item.owner && !item.owner.error ? {
          id: item.owner.id || '',
          full_name: item.owner.full_name || '',
          avatar_url: item.owner.avatar_url
        } : undefined
      }));
      
      setBicycles(formattedBicycles);
    } catch (error) {
      console.error('Error fetching bicycles:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch bicycles',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bicycles')
        .update({ status: 'approved' })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Bicycle has been approved',
      });
      
      // Update the UI
      setBicycles(prev => prev.filter(bicycle => bicycle.id !== id));
    } catch (error) {
      console.error('Error approving bicycle:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to approve bicycle',
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bicycles')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Bicycle has been rejected',
      });
      
      // Update the UI
      setBicycles(prev => prev.filter(bicycle => bicycle.id !== id));
    } catch (error) {
      console.error('Error rejecting bicycle:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to reject bicycle',
      });
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">{t('pendingReview')}</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">{t('approved')}</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">{t('rejected')}</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('bicycleManagement')}</h1>
        <p className="text-gray-500">{t('reviewAndManage')}</p>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as 'pending' | 'approved' | 'rejected')}>
        <TabsList className="mb-6">
          <TabsTrigger value="pending">{t('pendingApproval')}</TabsTrigger>
          <TabsTrigger value="approved">{t('approved')}</TabsTrigger>
          <TabsTrigger value="rejected">{t('rejected')}</TabsTrigger>
        </TabsList>
        
        {['pending', 'approved', 'rejected'].map((status) => (
          <TabsContent key={status} value={status} className="focus-visible:outline-none focus-visible:ring-0">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            ) : bicycles.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg border">
                <p className="text-gray-500">
                  {status === 'pending' ? t('noPendingBicycles') : `${t('no')} ${t(status.toLowerCase())} ${t('bicycles')}`}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('title')}</TableHead>
                      <TableHead>{t('seller')}</TableHead>
                      <TableHead>{t('price')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bicycles.map((bicycle) => (
                      <TableRow key={bicycle.id}>
                        <TableCell className="font-medium">{bicycle.title}</TableCell>
                        <TableCell>{bicycle.owner?.full_name || 'Unknown'}</TableCell>
                        <TableCell>${bicycle.price}</TableCell>
                        <TableCell>{renderStatusBadge(bicycle.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => navigate(`/admin/bicycles/${bicycle.id}`)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              {t('viewDetails')}
                            </Button>
                            
                            {bicycle.status === 'pending' && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                                  onClick={() => handleApprove(bicycle.id)}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  {t('approve')}
                                </Button>
                                
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                  onClick={() => handleReject(bicycle.id)}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  {t('reject')}
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default BicycleManagement;
