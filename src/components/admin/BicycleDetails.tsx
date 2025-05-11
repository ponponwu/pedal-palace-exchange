
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BicycleWithOwner } from '@/types/bicycle';

const BicycleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [bicycle, setBicycle] = useState<BicycleWithOwner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBicycleDetails(id);
    }
  }, [id]);

  const fetchBicycleDetails = async (bicycleId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bicycles')
        .select(`
          *,
          owner:profiles(id, full_name, avatar_url)
        `)
        .eq('id', bicycleId)
        .single();

      if (error) throw error;
      
      // Make sure we have the right structure for the owner field
      const bicycleData = data as any;
      const formattedBicycle: BicycleWithOwner = {
        ...bicycleData,
        owner: bicycleData.owner && !bicycleData.owner.error ? {
          id: bicycleData.owner.id || '',
          full_name: bicycleData.owner.full_name || '',
          avatar_url: bicycleData.owner.avatar_url
        } : undefined
      };
      
      setBicycle(formattedBicycle);
    } catch (error) {
      console.error('Error fetching bicycle details:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch bicycle details',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!bicycle) return;
    
    try {
      const { error } = await supabase
        .from('bicycles')
        .update({ status: 'approved' })
        .eq('id', bicycle.id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Bicycle has been approved',
      });
      
      // Update the UI
      setBicycle({ ...bicycle, status: 'approved' });
    } catch (error) {
      console.error('Error approving bicycle:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to approve bicycle',
      });
    }
  };

  const handleReject = async () => {
    if (!bicycle) return;
    
    try {
      const { error } = await supabase
        .from('bicycles')
        .update({ status: 'rejected' })
        .eq('id', bicycle.id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Bicycle has been rejected',
      });
      
      // Update the UI
      setBicycle({ ...bicycle, status: 'rejected' });
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
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{t('pendingReview')}</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">{t('approved')}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">{t('rejected')}</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!bicycle) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Bicycle not found</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/admin/bicycles')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('back')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/bicycles')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('back')}
        </Button>
        
        <div className="flex space-x-2">
          {bicycle.status === 'pending' ? (
            <>
              <Button 
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                onClick={handleApprove}
              >
                <Check className="h-4 w-4 mr-2" />
                {t('approve')}
              </Button>
              
              <Button 
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                onClick={handleReject}
              >
                <X className="h-4 w-4 mr-2" />
                {t('reject')}
              </Button>
            </>
          ) : (
            <div>{renderStatusBadge(bicycle.status)}</div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
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
          
          {bicycle.images && bicycle.images.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bicycle.images.map((image, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-md">
                      <img
                        src={image.url}
                        alt={image.alt || bicycle.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
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
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">{t('adminActions')}</h2>
              <div className="space-y-2">
                {bicycle.status === 'pending' ? (
                  <>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={handleApprove}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      {t('approve')}
                    </Button>
                    
                    <Button 
                      variant="destructive"
                      className="w-full"
                      onClick={handleReject}
                    >
                      <X className="h-4 w-4 mr-2" />
                      {t('reject')}
                    </Button>
                  </>
                ) : bicycle.status === 'approved' ? (
                  <Button 
                    variant="destructive"
                    className="w-full"
                    onClick={handleReject}
                  >
                    <X className="h-4 w-4 mr-2" />
                    {t('reject')}
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleApprove}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {t('approve')}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BicycleDetails;
