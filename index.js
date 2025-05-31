import dotenv from "dotenv"
import express from 'express'
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";
// const express = require('express')
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import cors from "cors";


const app = express()
dotenv.config()
const PORT = process.env.PORT || 4001;
const MONGO_URL = process.env.MONGO_URI

//Middleware
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173',   // ✅ Your frontend URL
    credentials: true,                  // ✅ Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cookieParser());



//middleware fir files
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/temp",
    }))

//DBcode
try {
    mongoose.connect(MONGO_URL)
    console.log("Connected to DB")
} catch (error) {
    console.log(error)

}

//defining routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);


//Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});


app.listen(PORT, () => {
    console.log(`Sever is runing on port ${PORT}`)
})