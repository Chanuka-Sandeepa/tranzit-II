import jwt from 'jsonwebtoken';
import UserModel from '../model/user.js'

const isAdmin = async (req, res, next) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token found" });
        }

        // Verify the token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user based on the token's decoded ID
        const user = await UserModel.findById(decode.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user has admin privileges
        if (user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized" });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { isAdmin };
