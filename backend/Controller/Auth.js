import UserModel from "../model/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check if the user is already registered
        const exitsuser = await UserModel.findOne({ email });
        if (exitsuser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedpassword = bcrypt.hashSync(password, 10);
        
        // create a new user
        const newUser = new UserModel({ name, email, password: hashedpassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // check if the user exists 

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // check if the password is correct
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // generate and send JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '5h' });
    
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 18000000,
        });
        res.status(200).json({
            message: "Logged in successfully",
            user,
            token,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const Logout = (req, res) => {
    try {
      res.clearCookie("token", { path: "/", httpOnly: true, secure: true, sameSite: "None" });
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
export { register, login, Logout };