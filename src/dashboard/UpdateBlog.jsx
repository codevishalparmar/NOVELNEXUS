import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");
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
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
          }
        );

        console.log(data);
        setTitle(data.title);
        setCategory(data.category);
        setAbout(data.about);
        setBlogImagePreview(data.blogImage.url); // Keep for preview
        // Do NOT set setBlogImage with a URL
      } catch (error) {
        toast.error(
          error.response?.data?.message || "An error occurred. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !category || !about) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      setLoading(true);
      const { data } = await axios.put(
        `http://localhost:4001/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message || "Blog Updated successfully");
      navigateTo("/");
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
          Update Blog 📝
        </h3>
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Category */}
          <div className="grid gap-2">
            <label className="text-lg font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              {["Devotion", "Sports", "Coding", "Entertainment", "Business"].map(
                (cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Title */}
          <div className="grid gap-2">
            <label className="text-lg font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Image Upload */}
          <div className="grid gap-2">
            <label className="text-lg font-medium text-gray-700">Blog Image</label>
            <div className="flex justify-center">
              <img
                src={blogImagePreview
                  ? blogImagePreview
                  : blogImage
                  ? blogImage
                  : "/imgPL.webp"}
                alt="Blog Main"
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

          {/* About */}
          <div className="grid gap-2">
            <label className="text-lg font-medium text-gray-700">About</label>
            <textarea
              rows="4"
              placeholder="Write something about your blog..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBlog;
