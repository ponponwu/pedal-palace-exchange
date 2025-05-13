
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import SystemSettings from '@/components/admin/SystemSettings';

const AdminSettingsPage: React.FC = () => {
  return (
    <AdminLayout>
      <SystemSettings />
    </AdminLayout>
  );
};

export default AdminSettingsPage;
