
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import UserManagement from '@/components/admin/UserManagement';
import PhoneVerificationManagement from '@/components/admin/PhoneVerificationManagement';
import { useTranslation } from 'react-i18next';

const AdminUsersPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <AdminLayout>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="users">{t('userManagement')}</TabsTrigger>
          <TabsTrigger value="phone-verification">{t('phoneVerification')}</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="phone-verification">
          <PhoneVerificationManagement />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminUsersPage;
