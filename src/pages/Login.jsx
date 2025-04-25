import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

function Login() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !role) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        'http://localhost:4001/api/users/login',
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          },
        }
      );

      toast.success(data.message || "User logged in successfully");

      setProfile(data);
      setIsAuthenticated(true);

      // Reset form
      setEmail("");
      setPassword("");
      setRole("");

      // Navigate to home
      navigateTo('/');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error?.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
        <form onSubmit={handleLogin}>
          <div className='font-semibold text-xl items-center text-center mb-4'>
            NOVEL<span className='text-blue-500'>NEXUS</span>
          </div>
          <h1 className='text-xl font-semibold mb-6 text-center'>Login</h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='w-full p-2 mb-4 border rounded-md'
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className='mb-4'>
            <input
              type="email"
              placeholder='Your Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded-md'
              required
              autoFocus
            />
          </div>

          <div className='mb-4'>
            <input
              type="password"
              placeholder='Your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded-md'
              required
            />
          </div>

          <p className='text-center mb-4'>
            New User?
            <Link to={"/register"} className="text-blue-600 ml-1">Register Now</Link>
          </p>

          <button
            type='submit'
            disabled={loading}
            className='w-full p-2 bg-blue-500 hover:bg-blue-900 active:scale-95 duration-300 rounded-md text-white cursor-pointer'
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
