
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import MessageManagement from '@/components/admin/MessageManagement';

const AdminMessagesPage: React.FC = () => {
  return (
    <AdminLayout>
      <MessageManagement />
    </AdminLayout>
  );
};

export default AdminMessagesPage;
