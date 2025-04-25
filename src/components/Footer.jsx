import React from 'react';
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <>
      {/* Footer Section */}
      <footer className='border-t bg-gray-900 text-gray-300 py-10'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6'>
          {/* Product Section */}
          <div className='text-center md:text-start'>
            <h2 className='text-lg font-semibold mb-4 text-white'>Product</h2>
            <ul className='space-y-2'>
              {["Nveen", "React", "JavaScript", "MongoDb"].map((item, index) => (
                <li key={index}>
                  <a href="#" className='text-gray-400 hover:text-blue-400 transition duration-300'>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Design to Code Section */}
          <div className='text-center md:text-start'>
            <h2 className='text-lg font-semibold mb-4 text-white'>Design to Code</h2>
            <ul className='space-y-2'>
              {["Figma Plugin", "Templates"].map((item, index) => (
                <li key={index}>
                  <a href="#" className='text-gray-400 hover:text-blue-400 transition duration-300'>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Comparison Section */}
          <div className='text-center md:text-start'>
            <h2 className='text-lg font-semibold mb-4 text-white'>Comparison</h2>
            <ul className='space-y-2'>
              {[
                "Java vs JavaScript",
                "C vs C++",
                "C++ vs C#",
                "Express.js vs Spring Boot",
                "Java vs Node"
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className='text-gray-400 hover:text-blue-400 transition duration-300'>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className='text-center md:text-start'>
            <h2 className='text-lg font-semibold mb-4 text-white'>Company</h2>
            <ul className='space-y-2'>
              {["About Us", "Contact Us", "Career", "Terms of Service", "Privacy Policy"].map((item, index) => (
                <li key={index}>
                  <a href="#" className='text-gray-400 hover:text-blue-400 transition duration-300'>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      {/* Footer Bottom Section */}
      <div className='bg-gray-800 py-4'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center px-6'>
          {/* Branding */}
          <div className='text-2xl font-semibold text-white'>
            NOVEL<span className='text-blue-500'>NEXUS</span>
          </div>

          {/* Copyright */}
          <div className='text-gray-400 text-sm text-center md:text-left'>
            <p>&copy; 2025 NOVELNEXUS PVT. LTD. All rights reserved.</p>
          </div>

          {/* Social Icons */}
          <div className='mt-4 md:mt-0 flex space-x-6'>
            <a href="#" aria-label="GitHub" className="hover:text-blue-500 transition-transform transform hover:scale-110">
              <FaGithub className="h-6 text-white" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-500 transition-transform transform hover:scale-110">
              <FaLinkedin className="h-6 text-white" />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-red-500 transition-transform transform hover:scale-110">
              <FaYoutube className="h-6 text-white" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
