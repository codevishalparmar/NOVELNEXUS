import { User } from "../models/model.user.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";

export const register = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "User photo is required" });
        }
        const { photo } = req.files;
        const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedFormats.includes(photo.mimetype)) {
            return res.status(400).json({
                message: "Invalid photo format. Only jpg and png are allowed",
            });
        }
        const { email, name, password, phone, education, role } = req.body;
        if (
            !email ||
            !name ||
            !password ||
            !phone ||
            !education ||
            !role ||
            !photo
        ) {
            return res.status(400).json({ message: "Please fill required fields" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ message: "User already exists with this email" });
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(
            photo.tempFilePath
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            phone,
            education,
            role,
            photo: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            },
        });
        await newUser.save();
        if (newUser) {
            let token = await createTokenAndSaveCookies(newUser._id, res);
            console.log("Singup: ", token);
            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    education: newUser.education,
                    avatar: newUser.avatar,
                    createdOn: newUser.createdOn,
                },
                token: token,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Please fill required fields" });
        }
        const user = await User.findOne({ email }).select("+password");
        console.log(user);
        if (!user.password) {
            return res.status(400).json({ message: "User password is missing" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        if (user.role !== role) {
            return res.status(400).json({ message: `Given role ${role} not found` });
        }
        let token = await createTokenAndSaveCookies(user._id, res);
        console.log("Login: ", token);
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server error" });
    }
};


export const getMyProfile = async (req, res) => {
    const user = await req.user;
    res.status(200).json({ user });
};

export const updateMyProfile = async (req, res) => {
    const user = await req.user;

    // Destructure the fields from request body except email
    const { name, phone, password, ...rest } = req.body;

    // Prevent updating email or any unexpected fields
    if (rest.email) {
        return res.status(400).json({ message: "Email update is not allowed." });
    }

    try {
        const updatedData = {
            name: name || user.name,
            phone: phone || user.phone,
            password: password || user.password, // You may want to hash password here
        };

        // If password is updated, hash it (if not already done in User model pre-save)
        if (password && password !== user.password) {
            const bcrypt = await import('bcrypt');
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            updatedData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};


export const getAdmins = async (req, res) => {
    const admins = await User.find({ role: "admin" });
    res.status(200).json({ admins });
};


