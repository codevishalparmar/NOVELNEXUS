import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    `http://localhost:4001/api/blogs/single-blog/${id}`,
                    { withCredentials: true }
                );

                console.log(data);
                setBlog(data);
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (!blog) return <div className="text-center text-lg">Blog not found</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Blog Content */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Side - Blog Image */}
                <div className="md:w-1/2 w-full">
                    <img 
                        src={blog?.blogImage?.url} 
                        alt={blog.title} 
                        className="w-full h-80 object-cover rounded-lg shadow-md" 
                    />
                </div>

                {/* Right Side - Blog Content */}
                <div className="md:w-1/2 w-full flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog?.title}</h1>
                    <p className="text-gray-700 text-lg leading-relaxed">{blog?.about}</p>
                </div>
            </div>

            {/* Bottom - Author Details */}
            <div className="mt-8 pt-4 border-t w-full flex items-center">
                <img 
                    src={blog?.adminPhoto} 
                    alt={blog?.adminName} 
                    className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                    <p className="text-gray-800 font-semibold">{blog?.adminName}</p>
                    <p className="text-gray-500 text-sm">{blog?.profile}</p>
                </div>
            </div>
        </div>
    );
};

export default Detail;
