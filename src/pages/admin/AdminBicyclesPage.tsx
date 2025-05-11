
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import BicycleManagement from '@/components/admin/BicycleManagement';

const AdminBicyclesPage: React.FC = () => {
  return (
    <AdminLayout>
      <BicycleManagement />
    </AdminLayout>
  );
};

export default AdminBicyclesPage;
