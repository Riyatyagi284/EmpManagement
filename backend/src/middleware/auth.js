import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Employee from "../model/employee.js"
import User from "../model/auth.js"

dotenv.config();


// check user's authenticity
export const verifyToken = async (req, res, next) => {
    try {
        const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

        // in case if token not there
        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }

        // if found
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);

            req.user = decode;

        } catch (error) {
            return res
                .status(401)
                .json({ success: false, message: "token is invalid" });
        }

        next();
    } catch (error) {
        console.log("error in token validation", error)
        return res.status(401).json({
            success: false,
            message: `Something Went Wrong While Validating the Token`,
        });
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const userDetails = await User.findById( req.user.id );

        if (userDetails.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Admin",
            });
        }

        next();
    } catch (error) {
        console.log("error",error)
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
}

export const isManager = async (req, res, next) => {
    try {
        const userDetails = await User.findOne(req.user.id);

        if (userDetails.accountType !== "Manager") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Manager",
            });
        }

        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
}