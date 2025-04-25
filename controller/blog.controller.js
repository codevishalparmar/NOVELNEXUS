import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import mongoose from "mongoose";

export const createBlog = async (req, res) => {
    try {

        if (!req.files || Object.keys(req.files).length == 0) {
            return res.status(400).json({ message: " Blog is required" });
        }

        const { blogImage } = req.files;
        const allowedFormates = ["image/jpeg", "image/png", "image/webp"]
        if (!allowedFormates.includes(blogImage.mimetype)) {
            return res.status(400).json({ message: " Invalid photo formate" });
        }
        const { title, category, about } = req.body;
        if (!title || !category || !about) {
            return res.status(400).json({ message: "title, category and about are required Fields" });
        }

        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo?.url;
        const createdBy = req?.user?._id;

        const cloudinaryResponse = await cloudinary.uploader.upload(
            blogImage.tempFilePath
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
        }
        fs.unlinkSync(blogImage.tempFilePath);

        const blogData = {
            title,
            about,
            category,
            adminName,
            adminPhoto,
            createdBy,
            blogImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            },
        }
        const blog = await Blog.create(blogData);
        // res.json(" in the create method")

        return res.status(201).json({ message: "Blog created successfully", blog });


    } catch (error) {
        return res.status(500).json({ error: " internal Sserver error" })

    }
};

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" })
    }
    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" })

};

export const getAllBlogs = async (req, res) => {
    const allBlogs = await Blog.find()
    res.status(200).json(allBlogs);
};

export const getSingleBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: " Invalid Blog Id" });
    }
    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
};

export const getMyBlogs = async (req, res) => {
    try {
        const createdBy = req.user._id;
        console.log("User ID:", createdBy); // Logs the user ID correctly

        const myBlogs = await Blog.find({ createdBy });
        res.status(200).json({ success: true, blogs: myBlogs }); // Structured response
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const updateBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: " Invalid Blog Id" })
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) {
        return res.status(400).json({ message: " Blog not found" });
    }
    res.status(200).json(updatedBlog);
};
