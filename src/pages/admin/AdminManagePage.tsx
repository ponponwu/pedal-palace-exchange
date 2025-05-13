
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminManagement from '@/components/admin/AdminManagement';

const AdminManagePage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminManagement />
    </AdminLayout>
  );
};

export default AdminManagePage;
