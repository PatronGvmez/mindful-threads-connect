
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; // Import RegisterPage

// Placeholder pages - we will create these later
const ForumPage = () => <div className="container mx-auto p-4 text-center">Forum Page - Coming Soon!</div>;
const NewPostPage = () => <div className="container mx-auto p-4 text-center">New Post Page - Coming Soon!</div>;
const AdminPage = () => <div className="container mx-auto p-4 text-center">Admin Page - Coming Soon!</div>;
const PostDetailPage = () => <div className="container mx-auto p-4 text-center">Post Detail Page - Coming Soon!</div>;


const queryClient = new QueryClient();

const AppLayout = () => (
  <div className="flex flex-col min-h-screen bg-lavender-light">
    <Navbar />
    <main className="flex-grow">
      <Outlet /> {/* Child routes will render here */}
    </main>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/new" element={<NewPostPage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> {/* Add RegisterPage route */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

