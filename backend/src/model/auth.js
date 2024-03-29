import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    branch: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        unique: true,
     },
    password: {
        type: String,
    },
    phone: {
        type: String,
        trim: true,
    },
    accountType: {
        type: String,
        enum: ["Admin", "Manager", "Employee"],
        default: "Employee",
    },
    active: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date
    },
    approved: {
        type: Boolean,
        default: true, // for employee and manager
    },
    token: {
        type: String,
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;