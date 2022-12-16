import logo from "./logo.svg";
import "./App.css";
import Navigator from "./components/Navigation";
import { Routes, Route, Navigate, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Settings_page from "./components/Settings";
import Support from "./components/Support";
import InvoiceBoard from "./components/InvoiceBoard";
import PricingPage from "./components/PricingPlans";
import CurrencyPage from "./components/CurrencyPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<InvoiceBoard />} />
        <Route path="/settings" element={<Settings_page />} />
        <Route path="/support" element={<Support />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/settings/currency-settings" element={<CurrencyPage />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;
