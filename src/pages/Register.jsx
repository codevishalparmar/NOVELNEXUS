import axios from 'axios';
import React, { useState, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

function Register() {

  const { isAuthenticated,
    setIsAuthenticated, setProfile } = useAuth()

  const navigateTo = useNavigate()

  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [loading, setLoading] = useState(false);


  const changePhotoHandler = (e) => {
    console.log(e)
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPhotoPreview(reader.result)
      setPhoto(file)
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !phone || !password || !role || !education || !photo) {
      toast.error("Please fill all fields");
      return;
    }
  
    setLoading(true); // Start loading
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);
  
    try {
      const { data } = await axios.post(
        'http://localhost:4001/api/users/register',
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      toast.success(data.message || "User Registered Successfully");
      setProfile(data);
      setIsAuthenticated(true);
  
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
  
      navigateTo("/");
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
          <form onSubmit={handleRegister}>
            <div className='font-semibold text-xl items-center text-center'>
              NOVEL<span className='text-blue-500'>NEXUS</span>
            </div>
            <h1 className='text-xl font-semibold mb-6'>Register</h1>
            <select value={role} onChange={(e) => setRole(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className='mb-4'>
              <input type="text" placeholder='Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full p-2 border rounded-md' />
            </div>
            <div className='mb-4'>
              <input type="email" placeholder='Your Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 border rounded-md' />
            </div>
            <div className='mb-4'>
              <input type="number" placeholder='Your Phone Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='w-full p-2 border rounded-md' />
            </div>
            <div className='mb-4'>
              <input type="password" placeholder='Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 border rounded-md' />
            </div>
            <select value={education}
              onChange={(e) => setEducation(e.target.value)}
              className='w-full p-2 mb-4 border rounded-md'>
              <option value="">Select Your Education</option>
              <option value="BE">BE</option>
              <option value="B.Tech">B.Tech</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
            </select>

            <div className='flex items-center mb-4'>
              <div className='photo w-20 h-20 mr-4'>
                <img src={photoPreview || "https://via.placeholder.com/80"} alt="photo" className="w-20 h-20 object-cover rounded-full" />
              </div>
              <input type="file" onChange={changePhotoHandler} className='w-full p-2 border rounded-md' />
            </div>
            <p className='text-center mb-4'> Already registered?
              <Link to={"/login"} className="text-blue-600"> Login Now</Link>
            </p>

            <button
  type='submit'
  disabled={loading}
  className={`w-full p-2 flex justify-center items-center gap-2 
              ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-900'} 
              active:scale-95 duration-300 rounded-md text-white`}>

  {loading && (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  )}
  {loading ? 'Registering...' : 'Register'}
</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register