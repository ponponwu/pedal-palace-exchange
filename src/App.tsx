
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BicycleDetail from "./pages/BicycleDetail";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import UploadBike from "./pages/UploadBike";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Messages from "./pages/Messages";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

// Admin Pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminBicyclesPage from "./pages/admin/AdminBicyclesPage";
import AdminBicyclePage from "./pages/admin/AdminBicyclePage";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/bicycle/:id" element={<BicycleDetail />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/upload" element={<UploadBike />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/bicycles" element={<AdminBicyclesPage />} />
              <Route path="/admin/bicycles/:id" element={<AdminBicyclePage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
