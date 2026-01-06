import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
// Pages
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Blog from "./component/pages/Blog";
import Register from "./component/pages/Register";
import Contact from "./component/pages/Contact";
import PrgramDetail from "./component/pages/PrgramDetail";
import BlogDetail from "./component/pages/BlogDetail";
//import SocialProofToast from "./component/common/SocialProofToast";

export default function App() {
  // const location = useLocation();
  // const isHomepage= useLocation.pathname === "/";
  return (
    <BrowserRouter>
      <div className="min-h-screen overflow-x-hidden bg-background">
        <Header />
        {/* <SocialProofToast /> */}
        <main className="pt-[96px] ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/programs/:slug" element={<PrgramDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
