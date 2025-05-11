
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bike, Check, Clock, Users, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    pendingBicycles: 0,
    approvedBicycles: 0,
    rejectedBicycles: 0,
    totalUsers: 0,
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Fetch bicycle counts by status
      const [pendingResult, approvedResult, rejectedResult, usersResult] = await Promise.all([
        supabase.from('bicycles').select('id', { count: 'exact' }).eq('status', 'pending'),
        supabase.from('bicycles').select('id', { count: 'exact' }).eq('status', 'approved'),
        supabase.from('bicycles').select('id', { count: 'exact' }).eq('status', 'rejected'),
        supabase.from('profiles').select('id', { count: 'exact' }),
      ]);

      setStats({
        pendingBicycles: pendingResult.count || 0,
        approvedBicycles: approvedResult.count || 0,
        rejectedBicycles: rejectedResult.count || 0,
        totalUsers: usersResult.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('adminDashboard')}</h1>
        <p className="text-gray-500">{t('adminAccess')}</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {t('pendingApproval')}
                </CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingBicycles}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {t('bicycles')}
                </p>
                <Button 
                  variant="link" 
                  className="px-0 py-1 h-auto text-blue-600"
                  onClick={() => navigate('/admin/bicycles')}
                >
                  {t('viewDetails')}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {t('approved')}
                </CardTitle>
                <Check className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.approvedBicycles}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {t('bicycles')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {t('rejected')}
                </CardTitle>
                <X className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.rejectedBicycles}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {t('bicycles')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {t('totalUsers')}
                </CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {t('users')}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('bicycleManagement')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-500">
                  {t('reviewAndManage')}
                </p>
                <div className="flex items-center space-x-2">
                  <Bike className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">{stats.pendingBicycles} {t('pendingReview')}</span>
                </div>
                <Button onClick={() => navigate('/admin/bicycles')}>
                  {t('manageBicycles')}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('allMessages')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-500">
                  {t('viewAndManageUserMessages')}
                </p>
                <Button onClick={() => navigate('/admin/messages')}>
                  {t('viewMessages')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
