
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import BicycleDetails from '@/components/admin/BicycleDetails';

const AdminBicyclePage: React.FC = () => {
  return (
    <AdminLayout>
      <BicycleDetails />
    </AdminLayout>
  );
};

export default AdminBicyclePage;
