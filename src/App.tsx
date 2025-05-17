import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewPostPage from "./pages/NewPostPage";
import ForumPage from "./pages/ForumPage";
import ResourcesPage from "./pages/ResourcesPage";
import HelpNowButton from "./components/HelpNowButton";
import ChatWidget from "./components/ChatWidget";
import { useAuth } from "./hooks/useAuth";
import React from 'react';

const PostDetailPage = () => {
  return <div className="container mx-auto p-4 text-center">Post Detail Page (ID: {/*id*/}) - Content Coming Soon!</div>;
};

const AdminPage = () => {
  return <div className="container mx-auto p-4 text-center">Admin Dashboard - Content Coming Soon!</div>;
};

const queryClient = new QueryClient();

const AppLayout = () => {
  const { currentUser, isLoading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-lavender-light">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {!isLoading && currentUser && <HelpNowButton />}
      {!isLoading && currentUser && <ChatWidget />}
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode, roles?: string[] }> = ({ children, roles }) => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading user...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route path="/forum" element={<ProtectedRoute><ForumPage /></ProtectedRoute>} />
            <Route path="/new" element={<ProtectedRoute><NewPostPage /></ProtectedRoute>} />
            <Route path="/resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
            <Route path="/post/:id" element={<ProtectedRoute><PostDetailPage /></ProtectedRoute>} />
            
            {/* Admin Route */}
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;