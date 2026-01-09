import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
// Pages
import Home from "./component/pages/Home";
import SocialProofToast from "./component/common/SocialProofToast";
import RegisterLayout from "./component/forms/RegisterLayout";
import ContactLayout from "./component/forms/ContactLayout";
import WorkshopDetails from "./component/pages/WorkshopDetails";

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

export default function App() {
  // const location = useLocation();
  // const isHomepage= useLocation.pathname === "/";
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="min-h-screen overflow-x-hidden bg-background">
        <Header />
        <SocialProofToast />
        <main className="pt-[96px] ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterLayout />} />
            <Route path="/contact" element={<ContactLayout />} />
            <Route path="/programs/:slug" element={<WorkshopDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
