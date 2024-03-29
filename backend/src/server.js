import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import fileUpload from "express-fileupload";
import cors from "cors";

import dbConnection from "./config/database.js";
//import cloudinaryConnect from "./config/cloudinary.js";

import { router as userRoute } from "./route/user.js"

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


// connections
dbConnection();
//cloudinaryConnect();


app.use("/api/v1/auth", userRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port, ${process.env.PORT}`)
});