import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    phone: {
        type: String
    },
    preferences: [{
        type: String
    }],
    pastTrips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    }],
    Notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },

})
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
