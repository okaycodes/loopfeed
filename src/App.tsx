import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import queryClient from "./lib/react-query/queryClient";
import LandingPage from "./pages/Landing.page";
import { QueryClientProvider } from "@tanstack/react-query";
import FeedPage from "./pages/Feed.page";
import DashboardLayout from "./modules/common/components/DashboardLayout";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/feed" element={<FeedPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
