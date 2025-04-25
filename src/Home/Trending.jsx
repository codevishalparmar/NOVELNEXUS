import React from 'react'
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Trending() {

  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-semibold mb-4'>Trending</h1>
      <Carousel responsive={responsive}>
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 6).map((element, index) => {
            return (
              <div
                key={element.id || index}
                className='p-4 bg-white border border-gray-400 rounded-lg shadow-md mx-2'
              >
                <Link
                  to={`/blog/${element._id}`}
                  className="bg-white rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="group relative">
                    <img
                      src={element.blogImage.url}
                      alt=""
                      className="w-full h-48 object-cover"
                    />

                    {/* Category Badge - Positioned on Image */}
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold uppercase px-3 py-1 rounded-full shadow-lg backdrop-blur-md bg-opacity-80">
                      {element.category || "Uncategorized"}
                    </span>
                    
                    <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-600 transition-colors duration-300">
                      {element.title}
                    </h1>
                  </div>



                  <div className="flex items-center p-6">
                    <img
                      src={element.adminPhoto}
                      alt="Admin"
                      className="w-12 h-12 rounded-full border-2 border-yellow-400 "
                    />
                    <div className='ml-4'>
                      <p className="text-xs text-gray-400 font-sans">{element.adminName}</p>
                      <p className="text-xs text-green-400 ">New</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </Carousel>
    </div>
  )
}

export default Trending