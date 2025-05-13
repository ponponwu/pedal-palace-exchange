
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BicycleWithOwner } from '@/types/bicycle';
import { toast } from '@/hooks/use-toast';

export type BicycleStatus = 'pending' | 'approved' | 'rejected';

export const useBicycleManagement = (initialStatus: BicycleStatus = 'pending') => {
  const [bicycles, setBicycles] = useState<BicycleWithOwner[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<BicycleStatus>(initialStatus);

  useEffect(() => {
    fetchBicycles(activeTab);
  }, [activeTab]);

  const fetchBicycles = async (status: BicycleStatus) => {
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

  return {
    bicycles,
    loading,
    activeTab,
    setActiveTab,
    handleApprove,
    handleReject,
  };
};
