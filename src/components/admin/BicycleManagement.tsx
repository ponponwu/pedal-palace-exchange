
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useBicycleManagement, BicycleStatus } from './bicycles/hooks/useBicycleManagement';
import BicycleTabsContent from './bicycles/components/BicycleTabsContent';

const BicycleManagement: React.FC = () => {
  const { t } = useTranslation();
  const { 
    bicycles, 
    loading, 
    activeTab, 
    setActiveTab,
    handleApprove,
    handleReject 
  } = useBicycleManagement();

  const statuses: BicycleStatus[] = ['pending', 'approved', 'rejected'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('bicycleManagement')}</h1>
        <p className="text-gray-500">{t('reviewAndManage')}</p>
      </div>
      
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={(value) => setActiveTab(value as BicycleStatus)}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="pending">{t('pendingApproval')}</TabsTrigger>
          <TabsTrigger value="approved">{t('approved')}</TabsTrigger>
          <TabsTrigger value="rejected">{t('rejected')}</TabsTrigger>
        </TabsList>
        
        {statuses.map((status) => (
          <BicycleTabsContent
            key={status}
            status={status}
            bicycles={status === activeTab ? bicycles : []}
            loading={status === activeTab && loading}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default BicycleManagement;
