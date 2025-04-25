import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", isAuthenticated);

    const fetchProfile = async () => {
      try {
        // No need to manually get the token, backend will handle it
        const { data } = await axios.get(
          "http://localhost:4001/api/users/my-profile",
          {
            withCredentials: true, // Sends cookies automatically
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Profile data:", data);
        setProfile(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Unauthorized:", error.response?.data?.message);
        setProfile(null);
      }
    };



    const fetchBlogs = async () => {

      try {
        const { data } = await axios.get('http://localhost:4001/api/blogs/all-blogs', {

          withCredentials: true

        });

        console.log("Blogs Data:", data);
        setBlogs(data);
      } catch (error) {
        console.log("Unauthorized:", error.response?.data?.message);
      }
    };

    fetchBlogs();
    fetchProfile();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ blogs, profile, setProfile, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
