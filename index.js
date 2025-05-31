// import dotenv from "dotenv"
// import express from 'express'
// import mongoose from "mongoose";
// import fileUpload from "express-fileupload";
// import { v2 as cloudinary } from 'cloudinary';
// import cookieParser from "cookie-parser";
// // const express = require('express')
// import userRoute from "./routes/user.route.js"
// import blogRoute from "./routes/blog.route.js"
// import cors from "cors";


// const app = express()
// dotenv.config()
// const PORT = process.env.PORT || 4001;
// const MONGO_URL = process.env.MONGO_URI

// //Middleware
// app.use(express.json());


// app.use(cors({
//     origin: 'https://novelnexus.vercel.app',   // ✅ Your frontend URL
//     credentials: true,                  // ✅ Allow cookies to be sent
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));
// app.use(cookieParser());



// //middleware fir files
// app.use(
//     fileUpload({
//         useTempFiles: true,
//         tempFileDir: "/temp",
//     }))

// //DBcode
// try {
//     mongoose.connect(MONGO_URL)
//     console.log("Connected to DB")
// } catch (error) {
//     console.log(error)

// }

// //defining routes
// app.use("/api/users", userRoute);
// app.use("/api/blogs", blogRoute);


// //Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_SECRET_KEY,
// });


// app.listen(PORT, () => {
//     console.log(`Sever is runing on port ${PORT}`)
// })







import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const MONGO_URL = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ["https://novelnexus.vercel.app", "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman or curl with no origin
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());

// Middleware for file uploads
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp", // be mindful of ephemeral file system on Render
  })
);

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB connection error:", err));

// Define routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
