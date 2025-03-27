import express from "express";
import {createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../Controller/User.js";

const router = express.Router();

// Routes
router.post("/", createUser); // Create new user
router.get("/", getAllUsers); // Get all users (Admin)
router.get("/user/:id", getUserById); // Get user by ID
router.put("/:id", updateUser); // Update user details
router.delete("/:id", deleteUser); // Delete user

export default router;
