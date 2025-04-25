import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function MyProfile() {
  const { profile } = useAuth();

  if (!profile || !profile.user) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  const { user } = profile;
  const profileImage = user.photo?.url || "https://via.placeholder.com/150";

  return (
    <div className="flex flex-wrap justify-center items-center my-20 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-2 
          transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile Cover"
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              src={profileImage}
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-4 border-gray-700 
                transition-all duration-300 hover:border-gray-500 hover:ring-4 hover:ring-gray-400"
            />
          </div>
        </div>
        <div className="px-4 py-6 mt-6 flex flex-col items-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
          <p className="text-gray-600">{user.role}</p>
          <Link
            to={`/user/update/${user._id}`}
            className="mt-4 text-blue-500 bg-white rounded-md shadow px-4 py-2 border border-gray-400 hover:underline"
          >
            UPDATE
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
