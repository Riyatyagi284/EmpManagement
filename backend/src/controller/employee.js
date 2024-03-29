import Employee from "../model/employee.js";
import User from "../model/auth.js"

// find all employees

export const allEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();

        // if no employee found
        if (!employees) {
            return res.status(400).json({
                success: false,
                message: "Employees not found !",
            })
        }

        res.status(200).json({
            success: true,
            employees,
            message: "All Employees fetch successfully!!"
        })
    } catch (error) {
        console.log("error", error.message)
        return res.status(500).json({
            success: false,
            message: "Error occured while fetching all the employee from db",
            error: error.message,
        })
    }
}

// create new Employee entry
export const createEmployee = async (req, res) => {
    try {
        // fetch data
        const { name, branch, phone, email } = req.body;

        //const { id } = req.query || req.params;

        // validate
        if (!name || !branch || !phone || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields are required to fill.",
            });
        }

        // // Check if ID is provided
        // if (!id) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "User ID is missing in the request.",
        //     });
        // }

        // Find user by ID
        //onst userDetails = await User.findById(id);

        // Check if user exists
        // if (!userDetails) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "User not found.",
        //     });
        // }

        // Create new employee entry in the db
        const employeeDetails = await Employee.create({ name, branch, phone, email });

        // Update the otherDetails field of the user with the newly created employee's ID
        // userDetails.otherDetails = employeeDetails._id;
        // await userDetails.save();

        // // Fetch the updated user data, including the populated otherDetails field
        // const userData = await User.findById(userDetails._id).populate('otherDetails');

        // Return the updated user data in the response
        return res.status(200).json({
            success: true,
            message: "Employee entry created successfully",
            employeeDetails,
        });

    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating employee new entry",
            error: error.message,
        });
    }
};


// delete Employee entry
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Employee ID is required for deletion"
            });
        }

        const deletedUser = await Employee.findByIdAndDelete(id);


        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
        });

    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({
            success: false,
            message: "Error occurred while deleting employee.",
            error: error.message
        });
    }
};


// Update Employee entry
export const updateEmployee = async (req, res) => {
    try {
        // const { id } = req.params || req.query;
        // const { id } = req.query || req.body;

        const { id } = req.body;
        console.log("id", id)
        const updateEmployee = await Employee.findByIdAndUpdate({ _id: id }, req.body, { new: true });

        return res.status(200).json({
            success: true,
            message: "employee details updated successfully",
            updateEmployee
        })


    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            success: false,
            message: "Error occured while update the employee.",
            error: error.message,
        })
    }
}

export const getLoginActivity = async (req, res) => {
    try {
        const user = await User.findById(req.user?.id);
        // console.log("user", user)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Cannot find user",
            });
        }

        return res.status(200).json({
            success: true,
            message: "loginDetails fetched success",
            lastlogin: user.lastLogin,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: "Error occured while update the employee.",
            error: error.message,
        });
    }
};

export const getAllLoginActivity = async (req, res) => {
    try {
        const user = await User.find({})?.select("-password");

        if (!user.length) {
            return res.status(401).json({
                success: false,
                message: "Cannot find users",
            });
        }

        return res.status(200).json({
            success: true,
            message: "loginDetails fetched success",
            user,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: "Error occured while update the employee.",
            error: error.message,
        });
    }
}