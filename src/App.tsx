import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import VlookupGenerator from "./pages/VlookupGenerator";
import IfFormulaGenerator from "./pages/IfFormulaGenerator";
import SumifGenerator from "./pages/SumifGenerator";
import IndexMatchGenerator from "./pages/IndexMatchGenerator";
import PivotTableGuide from "./pages/PivotTableGuide";
import VlookupTutorial from "./pages/VlookupTutorial";
import ExcelDateFormulas from "./pages/ExcelDateFormulas";
import ExcelTipsAndTricks from "./pages/ExcelTipsAndTricks";
import CommonExcelFormulas from "./pages/CommonExcelFormulas";
import ConditionalFormattingGuide from "./pages/ConditionalFormattingGuide";
import Install from "./pages/Install";
import GoogleSheetsAddon from "./pages/GoogleSheetsAddon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/purchase-success" element={<PurchaseSuccess />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
          <Route path="/library" element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          } />
          <Route path="/vlookup-generator" element={<VlookupGenerator />} />
          <Route path="/if-formula-generator" element={<IfFormulaGenerator />} />
          <Route path="/sumif-generator" element={<SumifGenerator />} />
          <Route path="/index-match-generator" element={<IndexMatchGenerator />} />
          <Route path="/pivot-table-guide" element={<PivotTableGuide />} />
          <Route path="/vlookup-tutorial" element={<VlookupTutorial />} />
          <Route path="/excel-date-formulas" element={<ExcelDateFormulas />} />
          <Route path="/excel-tips-tricks" element={<ExcelTipsAndTricks />} />
          <Route path="/common-excel-formulas" element={<CommonExcelFormulas />} />
          <Route path="/conditional-formatting-guide" element={<ConditionalFormattingGuide />} />
          <Route path="/install" element={<Install />} />
          <Route path="/google-sheets-addon" element={
            <ProtectedRoute>
              <GoogleSheetsAddon />
            </ProtectedRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
