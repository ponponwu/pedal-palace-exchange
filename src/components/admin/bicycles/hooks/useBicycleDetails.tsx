
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BicycleWithOwner } from '@/types/bicycle';
import { toast } from '@/hooks/use-toast';

export const useBicycleDetails = (bicycleId: string) => {
  const [bicycle, setBicycle] = useState<BicycleWithOwner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bicycleId) {
      fetchBicycleDetails(bicycleId);
    }
  }, [bicycleId]);

  const fetchBicycleDetails = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bicycles')
        .select(`
          *,
          owner:profiles(id, full_name, avatar_url)
        `)
        .eq('id', id)
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

  return {
    bicycle,
    loading,
    handleApprove,
    handleReject,
  };
};
