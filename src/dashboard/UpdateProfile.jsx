import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function UpdateProfile() {
  const navigateTo = useNavigate();
  const { profile } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  useEffect(() => {
    if (profile?.user) {
      setName(profile.user.name);
      setPhone(profile.user.phone);
      setPhotoPreview(profile.user.photo?.url);
    }
  }, [profile]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Name and phone are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    if (password) formData.append("password", password);
    if (photo) formData.append("photo", photo);

    try {
      setLoading(true);
      const { data } = await axios.put(
        `http://localhost:4001/api/user/update/profile`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message || "Profile updated successfully");
      navigateTo("/my-profile");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Update Profile 👤
        </h3>
        <form onSubmit={handleUpdate} className="space-y-6">

          {/* Name */}
          <div className="grid gap-2">
            <label className="text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div className="grid gap-2">
            <label className="text-lg font-medium text-gray-700">Phone</label>
            <input
              type="text"
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <label className="text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="New password (optional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Profile Image Upload */}
          <div className="grid gap-2">
            <label className="text-lg font-medium text-gray-700">Profile Photo</label>
            <div className="flex justify-center">
              <img
                src={photoPreview || "/imgPL.webp"}
                alt="Profile Preview"
                className="w-full max-w-sm h-auto rounded-md object-cover border border-gray-300 shadow-sm"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-lg transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
