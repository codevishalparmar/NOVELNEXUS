import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Creator() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/users/admins", {
          withCredentials: true,
        });
        setAdmin(data.admins || []);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-6'>Popular Creators</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5'>
        {admin.length > 0 ? (
          admin.slice(0, 8).map((element, index) => (
            <div key={element.id || index} className='flex flex-col items-center'>
              <Link
                to="/"
                className="rounded-full overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={element.photo?.url || "/default-avatar.png"}
                  alt={element.name || "Creator"}
                  className="w-40 h-40 md:w-56 md:h-56 object-cover border border-black rounded-full"
                />
              </Link>
              <div className='text-center mt-2'>
                <p className='font-medium'>{element.name}</p>
                <p className='text-gray-600 text-xs'>{element.role}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No creators found.</p>
        )}
      </div>
    </div>
  );
}

export default Creator;
