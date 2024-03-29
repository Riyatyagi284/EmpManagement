import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../model/auth.js";



dotenv.config();

export const signup = async (req, res) => {
    try {
        const { username, password, accountType } = req.body;
        // Validations

        // makesure user must filled all details
        if (!username || !password) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            })
        }

        // Validate username format
        const usernameRegex = /^[a-zA-Z0-9_.]{3,16}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                success: false,
                message: "Invalid username format. Minimum 3 and maximum 16 characters are allowed. You can only use lowercase letters (a to z), uppercase letters (A to Z), digits (0 to 9) or '.', '_' as special characters.",
            })
        }

        // Validate password format
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Invalid password format. Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
            })

        }


        const userPresent = await User.findOne({ username });

        if (userPresent) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            })
        }

        // hash the password for security reason
        const hashPassword = await bcrypt.hash(password, 10);

        // create user entry in db
        // let approved = ""
        // accountType === "Admin" ? (approved = false) : (approved = true)

        const user = await User.create({
            username,
            password: hashPassword,
            accountType: accountType,
        })

        return res.status(200).json(
            {
                success: true,
                user,
                message: "User registered successfully",
            }
        )

    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            success: false,
            message: "Error occur while registering the user",
            error: error.message,
        })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            })
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: `User is not Registered with Us Please SignUp to Continue`,
            })
        }

        // check password with userDb password

        // if password is match then create token and cookie
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { id: user._id, role: user.accountType },
                process.env.JWT_SECRET,
                { expiresIn: "24h", }
            )

           user.lastLogin = new Date();
           await user.save();


            user.token = token,
                user.password = undefined,

                // user contains all the details except password

                res.cookie("token", token,
                    {
                        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }).status(200).json(
                        {
                            success: true,
                            token,
                            user,
                            message: `User Login Successfully`,
                        }

                    )

        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            })
        }

    } catch (error) {
        console.log("login-error", error.message)
        return res.status(500).json({
            success: false,
            message: "Error occured while login",
            error: error.message,
        })
    }
}