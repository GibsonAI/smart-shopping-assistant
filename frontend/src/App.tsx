import { useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import ChatWidget, { ChatWidgetRef } from "./components/ChatWidget";
import Index from "./pages/Index";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const chatWidgetRef = useRef<ChatWidgetRef>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index onOpenChat={() => chatWidgetRef.current?.openWidget()} />} />
            <Route path="/products" element={<Products />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatWidget ref={chatWidgetRef} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
