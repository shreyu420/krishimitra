import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import DashboardLayout from "./components/DashboardLayout";
import LeafDiagnosis from "./pages/LeafDiagnosis";
import VideoCropScan from "./pages/VideoCropScan";
import FarmerAdvisory from "./pages/FarmerAdvisory";
import CropHealthReport from "./pages/CropHealthReport";
import AgricultureAlerts from "./pages/AgricultureAlerts";
import MandiPriceDashboard from "./pages/MandiPriceDashboard";
import WeatherRiskAdvisory from "./pages/WeatherRiskAdvisory";
import AboutModelProof from "./pages/AboutModelProof";
import CropCalendar from "./pages/CropCalendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const WithLayout = ({ children }: { children: React.ReactNode }) => (
  <DashboardLayout>{children}</DashboardLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WithLayout><LeafDiagnosis /></WithLayout>} />
            <Route path="/video-scan" element={<WithLayout><VideoCropScan /></WithLayout>} />
            <Route path="/advisory" element={<WithLayout><FarmerAdvisory /></WithLayout>} />
            <Route path="/report" element={<WithLayout><CropHealthReport /></WithLayout>} />
            <Route path="/crop-calendar" element={<WithLayout><CropCalendar /></WithLayout>} />
            <Route path="/alerts" element={<WithLayout><AgricultureAlerts /></WithLayout>} />
            <Route path="/mandi" element={<WithLayout><MandiPriceDashboard /></WithLayout>} />
            <Route path="/weather" element={<WithLayout><WeatherRiskAdvisory /></WithLayout>} />
            <Route path="/about" element={<WithLayout><AboutModelProof /></WithLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
