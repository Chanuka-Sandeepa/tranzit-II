import UserModel from "../model/user.js"
import mongoose from "mongoose"

// Helper to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id)

export const createUser = async (req, res) => {
  try {
    const { name, email, phone, password, role = 'User' } = req.body;

    // Validate input data more thoroughly
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: "Valid name is required" });
    }

    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
      return res.status(400).json({ message: "Valid phone number is required" });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ 
        message: "Password is required and must be at least 6 characters" 
      });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingUser) {
      return res.status(409).json({ 
        message: "User with this email or phone number already exists" 
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new UserModel({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password: hashedPassword,
      role: ['User', 'Admin'].includes(role) ? role : 'User', // Validate role
      active: true,
      preferences: {},
      createdAt: new Date()
    });

    // Save the user
    const savedUser = await newUser.save();

    // Remove sensitive information before sending response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle specific mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({
        message: "Validation Error",
        errors
      });
    }

    // Handle duplicate key error (in case unique indexes weren't caught earlier)
    if (error.code === 11000) {
      return res.status(409).json({ 
        message: "User with this email or phone number already exists" 
      });
    }

    // Generic server error
    res.status(500).json({ 
      message: "Internal server error while creating user",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
// Get all users (Admin Only)
export const getAllUsers = async (req, res) => {
  try {
    // Check if user is admin (assuming req.user contains user data with role)

    const users = await UserModel.find().select("-password") // Exclude password
    res.status(200).json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    res.status(500).json({ message: "Error fetching users" })
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received ID:", id);  // Log the ID received

    // Validate MongoDB ObjectId format
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Find the user by ID and exclude the password from the response
    const user = await UserModel.findById(id).select("-password");

    console.log("User found:", user);  // Log the result to see if the user is found

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Successfully return the user data
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);

    // Return a generic server error message
    res.status(500).json({
      message: "Error fetching user",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};


// Update user details - Allow any authenticated user to update any profile
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params

    // Validate MongoDB ID
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID format" })
    }

    const { name, phone, preferences } = req.body

    // Validate input data
    if (name && typeof name !== "string") {
      return res.status(400).json({ message: "Name must be a string" })
    }

    if (phone && typeof phone !== "string") {
      return res.status(400).json({ message: "Phone must be a string" })
    }

    if (preferences && typeof preferences !== "object") {
      return res.status(400).json({ message: "Preferences must be an object" })
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, phone, preferences },
      { new: true, runValidators: true },
    ).select("-password")

    if (!updatedUser) return res.status(404).json({ message: "User not found" })

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    res.status(500).json({
      message: "Error updating user",
      error: error.name === "ValidationError" ? error.message : undefined,
    })
  }
}

// Delete user - Allow any authenticated user to delete any profile
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    // Validate MongoDB ID
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID format" })
    }

    const deletedUser = await UserModel.findByIdAndDelete(id)
    if (!deletedUser) return res.status(404).json({ message: "User not found" })

    res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Error deleting user:", error)
    res.status(500).json({ message: "Error deleting user" })
  }
}

