import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    branch: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;