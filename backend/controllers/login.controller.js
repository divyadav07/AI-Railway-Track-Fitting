const {getUserByEmail}= require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

//LOGIN
const loginUser= (req,res)=>{
    const {Email, Password, Role} = req.body;

    // Check required fields
    if(!Email || !Password || !Role) {
        return res.status(400).json({
            status: "error",
            message: "Email and Password are required"
        })
    }

    // Find user by email
    getUserByEmail(Email, async (err,data)=>{

        // Database error
        if (err) {
            return res.status(500).json({
            status: "error",
            message: "Database error",
            error: err
            });
        }

        // Email doesn't exist
        if (data.length===0) {
            return res.status(401).json({
            status: "error",
            message: "Invalid email or password"
            });
        }

        const user = data[0];

        // Compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(
            Password,
            user.Password
        );

        // Password doesn't match
        if(!passwordMatch) {
            return res.status(400).json({
                status: "error",
                message: "Invalid email or password"
            })
        }

        // Check role
        if (user.Role !== Role) {
            return res.status(403).json({
            status: "error",
            message: "You are not authorized to login with this role"
            });
        }

        // CREATE JWT TOKEN
        const token=jwt.sign(
            {
                ID: user.ID,
                Email: user.Email,
                Role: user.Role  
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        // Login successful
        return res.status(200).json({
            status: "success",
            token,
            message: "Login successful",
            data: {
                ID: user.ID,
                Name: user.Name,
                Email: user.Email,
                Phone: user.Phone,
                Role: user.Role
            }
        });
    });
};

module.exports = {
    loginUser
};