
import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import AdminNavbar from './AdminNavbar';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isAdmin, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      </MainLayout>
    );
  }
  
  // Redirect if not admin
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
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
