import express from 'express';
import {updateMyProfile, getAdmins, getMyProfile, login, logout, register } from '../controller/user.controller.js';
import { isAuthenticated } from '../middleware/authUser.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, getMyProfile);
router.get("/admins", isAuthenticated, getAdmins);
router.put("/update/:id", updateMyProfile);

export default router;