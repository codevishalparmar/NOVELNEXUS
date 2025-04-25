import React from 'react';
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import Footer from "../src/components/Footer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Blogs from "./pages/Blogs";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Dashboard from "../src/pages/Dashboard";
import Creators from "../src/pages/Creators";
import { useAuth } from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import UpdateBlog from './dashboard/UpdateBlog';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import UpdateProfile from './dashboard/UpdateProfile';


const App = () => {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);
  
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/dashboard" element={<Dashboard />} />

        {/* Update Page Route */}
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />
           {/* Update User Route */}
           <Route exact path="/user/update/:id" element={<UpdateProfile />} />
        {/* Single Blog Detail Page Route */}
        <Route exact path="/blog/:id" element={<Detail />} />
        {/* Universal Not Found Page Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default App;
