import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

function Tech() {
  const { blogs } = useAuth();
  const techBlogs = blogs?.filter((blog) => blog.category === "Tech") || []; 

  return (
    <div className='container mx-auto my-12 p-4'>
      <h1 className='text-2xl font-bold mb-6'>AI & Tech</h1>
      <p className='text-center mb-8'>
        The Emerging Technology <br /> Artificial Intelligence is The Future
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
        {techBlogs.length > 0 ? (
          techBlogs.map((blog, index) => (
            <Link
              to={`/blog/${blog._id}`}
              key={index}
              className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
            >
              <div className="group relative">
                <img
                  src={blog.blogImage?.url || "/default-blog.png"}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className='absolute inset-0 bg-black opacity-30'></div>
                <div className='absolute bottom-4 left-4 text-white'>
                 
                  <h2 className='text-lg font-semibold transition-colors duration-300 group-hover:text-yellow-700'>
                    {blog.title}
                  </h2>
                  <p className='text-sm'>{blog.category}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No Tech blogs available.</p>
        )}
      </div>
    </div>
  );
}

export default Tech;
