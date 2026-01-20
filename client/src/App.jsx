import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
// Pages
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Blog from "./component/pages/Blog";
import Register from "./component/pages/Register";
import Contact from "./component/pages/Contact";
import BlogDetail from "./component/pages/BlogDetail";
import BookingModal from "./component/common/BookingModal";
import WorkshopModal from "./component/common/WorkshopModal";
import  PrivacyPolicy  from "./component/pages/PrivacyPolicy";
import  TermsAndConditions  from "./component/pages/TermsAndCondition";


function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const element = document.getElementById(hash.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <ScrollToHash />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={<About onBookClick={() => setIsBookingOpen(true)} />}
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-session" element={<BookingModal />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>

      <Footer />
      {/* MODALS */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      {location.pathname === "/" && <WorkshopModal />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
