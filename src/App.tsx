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
import NewPostPage from "./pages/NewPostPage"; // Import actual NewPostPage
import ForumPage from "./pages/ForumPage"; // Import actual ForumPage
import ResourcesPage from "./pages/ResourcesPage"; // Import ResourcesPage
import HelpNowButton from "./components/HelpNowButton"; // Import HelpNowButton
import ChatWidget from "./components/ChatWidget"; // Import ChatWidget
import { useAuth } from "./hooks/useAuth";
import React from 'react';


// Placeholder pages - we will create these later
// const AdminPage = () => <div className="container mx-auto p-4 text-center">Admin Page - Coming Soon!</div>;
// const PostDetailPage = () => <div className="container mx-auto p-4 text-center">Post Detail Page - Coming Soon!</div>;
// Placeholder for PostDetailPage, to be implemented
const PostDetailPage = () => {
  // const { id } = useParams(); // Example: if you need post ID
  // For now, a simple placeholder:
  return <div className="container mx-auto p-4 text-center">Post Detail Page (ID: {/*id*/}) - Content Coming Soon!</div>;
};

// Placeholder for AdminPage, to be implemented
const AdminPage = () => {
  // This page should be protected and only accessible to admins
  return <div className="container mx-auto p-4 text-center">Admin Dashboard - Content Coming Soon!</div>;
};


const queryClient = new QueryClient();

const AppLayout = () => {
  const { currentUser, isLoading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-lavender-light">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Child routes will render here */}
      </main>
      <Footer />
      {!isLoading && currentUser && <HelpNowButton />} {/* Show only if logged in and not loading */}
      {!isLoading && currentUser && <ChatWidget />} {/* Show only if logged in and not loading */}
    </div>
  );
};

// ProtectedRoute component
const ProtectedRoute: React.FC<{ children: React.ReactNode, roles?: string[] }> = ({ children, roles }) => {
  const { currentUser, isLoading } = useAuth();
  // If you implement role fetching into useAuth, you can use it here
  // For now, just checks if user is logged in for general protected routes.
  // Role-specific protection would need currentUserProfile.role.

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading user...</div>; // Or a proper loader
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Add role-based access control here if `roles` prop is provided
  // This would require fetching the user's profile from Firestore and checking their role.
  // For example:
  // const [userProfile, setUserProfile] = useState(null);
  // useEffect(() => { getOrCreateUserProfile(currentUser.uid).then(setUserProfile); }, [currentUser]);
  // if (roles && userProfile && !roles.includes(userProfile.role)) {
  //   return <Navigate to="/" replace />; // Or a specific "unauthorized" page
  // }

  return <>{children}</>; {/* Changed to React.Fragment to ensure it's valid with React.ReactNode */}
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
            
            {/* Admin Route - further protection needed based on role */}
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}> {/* Example role protection */}
                <AdminPage />
              </ProtectedRoute>
            } />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
