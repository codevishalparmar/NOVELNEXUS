import React, { useEffect, useState } from "react";
import axios from "axios";

function Creators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/users/admins", {
          withCredentials: true,
        });
        setCreators(data.admins || []);
      } catch (error) {
        console.error("Error fetching admins:", error);
        setError("Failed to load creators. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) {
    return <div className="text-center text-xl py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-10">{error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center items-center my-20 bg-gray-100">
      {creators.map((creator) => (
        <div
          key={creator.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-2 
            transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="relative">
            <img
              src={creator.photo?.url || "https://via.placeholder.com/150"}
              alt="avatar"
              className="w-full h-40 object-cover"
            />
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src={creator.photo?.url || "https://via.placeholder.com/150"}
                alt="avatar"
                className="w-20 h-20 rounded-full mx-auto border-4 border-gray-700 
                  transition-all duration-300 hover:border-gray-500 hover:ring-4 hover:ring-gray-400"
              />
            </div>
          </div>
          <div className="px-4 py-6 mt-4">
            <h2 className="text-center text-xl font-semibold text-gray-800">{creator.name}</h2>
            <p className="text-center text-gray-600 mt-2">{creator.email}</p>
            <p className="text-center text-gray-600 mt-2">{creator.phone}</p>
            <p className="text-center text-gray-600 mt-2">{creator.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Creators;
