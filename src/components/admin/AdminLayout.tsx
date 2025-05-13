
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AdminNavbar from './AdminNavbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  // No authentication check anymore - direct access to admin functionality
  
  return (
    <MainLayout>
      <div className="flex">
        <AdminNavbar />
        <main className="ml-0 md:ml-64 w-full min-h-[calc(100vh-4rem)] bg-gray-50 p-4">
          {children}
        </main>
      </div>
    </MainLayout>
  );
};

export default AdminLayout;
