
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { user } = useAuth();
  
  // If user is already logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-16">
        <AuthForm type="login" />
      </div>
    </MainLayout>
  );
};

export default Login;
