import UserModel from '../model/user.js';

const GetUser = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json({ user }); 
        
    } catch (err) {
        console.error("Error in GetUser route:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
const AdminLogout = async (req, res) => {
    try {
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).json({ message: "Failed to log out" });
            }
            // Clear the session cookie
            res.clearCookie('connect.sid'); // Replace 'connect.sid' with your session cookie name
            res.status(200).json({ message: "Admin logged out successfully" });
        });
    } catch (err) {
        console.error("Error in AdminLogout route:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { GetUser, AdminLogout };