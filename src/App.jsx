import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ToastContainer from "./components/ToastContainer";
import CompressPDF from "./pages/CompressPDF";
import ConvertPDF from "./pages/ConvertPDF";
import Home from "./pages/Home";
import MergePDF from "./pages/MergePDF";
import SplitPDF from "./pages/SplitPDF";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("pdfkit-theme") ?? "light");
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("pdfkit-theme", theme);
  }, [theme]);

  const pushToast = (toast) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...toast }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-hero-grid opacity-80 dark:opacity-100" />
        <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-brand-100/80 via-white/30 to-transparent blur-3xl dark:from-brand-900/40 dark:via-slate-950/20" />
        <Navbar theme={theme} onToggleTheme={() => setTheme((value) => (value === "dark" ? "light" : "dark"))} />
        <main className="mx-auto min-h-[calc(100vh-180px)] max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/merge" element={<MergePDF pushToast={pushToast} />} />
            <Route path="/compress" element={<CompressPDF pushToast={pushToast} />} />
            <Route path="/split" element={<SplitPDF pushToast={pushToast} />} />
            <Route path="/convert" element={<ConvertPDF pushToast={pushToast} />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer toasts={toasts} />
      </div>
    </div>
  );
}

export default App;
