import logo from "./logo.svg";
import "./App.css";
import Navigator from "./components/Navigation";
import { Routes, Route, Navigate, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Settings_page from "./components/Settings";
import Support from "./components/Support";
import InvoiceBoard from "./components/InvoiceBoard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<InvoiceBoard />} />
        <Route path="/settings" element={<Settings_page />} />
        <Route path="/support" element={<Support />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;
