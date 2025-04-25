import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import axios from 'axios';
import toast from 'react-hot-toast';

function Navbar() {
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      const { data } = await axios.get("http://localhost:4001/api/users/logout", {
        withCredentials: true,
      });

      toast.success("Logged out successfully");
      setIsAuthenticated(false);

      setTimeout(() => {
        navigateTo("/login");
      }, 300);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        toast("You were already logged out.");
        setIsAuthenticated(false);
        navigateTo("/login");
      } else {
        toast.error("Failed to log out");
      }
    }

  };

  return (
    <>
      <nav className="shadow-lg px-2 py-2">
        <div className="flex items-center justify-between container mx-auto">
          <div className='font-semibold text-xl'>
            NOVEL<span className='text-blue-500'>NEXUS</span>
          </div>

          {/* Desktop Menu */}
          <div className='mx-6'>
            <ul className='hidden md:flex space-x-6'>
              <Link to="/" className="hover:text-blue-500">HOME</Link>
              <Link to="/blogs" className="hover:text-blue-500">BLOGS</Link>
              <Link to="/creators" className="hover:text-blue-500">CREATORS</Link>
              <Link to="/about" className="hover:text-blue-500">ABOUT</Link>
              <Link to="/contact" className="hover:text-blue-500">CONTACT</Link>
            </ul>
            <div className='md:hidden' onClick={() => setShow(!show)}>
              {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className='hidden md:flex space-x-2'>
            {isAuthenticated && profile?.user?.role === "admin" && (
              <Link
                to="/dashboard"
                className='bg-blue-600 text-white hover:bg-blue-800 duration-300 px-4 py-2 rounded'>
                DASHBOARD
              </Link>
            )}

            {!isAuthenticated ? (
              <Link
                to="/login"
                className='bg-red-600 text-white hover:bg-red-800 duration-300 px-4 py-2 rounded'>
                LOGIN
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className='bg-red-600 text-white hover:bg-red-800 duration-300 px-4 py-2 rounded'>
                LOGOUT
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        {show && (
          <div className='bg-white'>
            <ul className='flex flex-col h-screen items-center justify-center space-y-4 md:hidden text-xl'>
              <li><Link to="/" onClick={() => setShow(false)} className="hover:text-blue-500">HOME</Link></li>
              <li><Link to="/blogs" onClick={() => setShow(false)} className="hover:text-blue-500">BLOGS</Link></li>
              <li><Link to="/creators" onClick={() => setShow(false)} className="hover:text-blue-500">CREATORS</Link></li>
              <li><Link to="/about" onClick={() => setShow(false)} className="hover:text-blue-500">ABOUT</Link></li>
              <li><Link to="/contact" onClick={() => setShow(false)} className="hover:text-blue-500">CONTACT</Link></li>

              {isAuthenticated && profile?.user?.role === "admin" && (
                <li><Link to="/dashboard" onClick={() => setShow(false)} className="hover:text-blue-500">DASHBOARD</Link></li>
              )}

              {!isAuthenticated ? (
                <li>
                  <Link to="/login" onClick={() => setShow(false)} className='hover:text-blue-500'>LOGIN</Link>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => {
                      setShow(false);
                      handleLogout();
                    }}
                    className='text-red-600 hover:text-red-800'>
                    LOGOUT
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
