const { createUser } = require("../models/user.model");
const bcrypt=require("bcrypt");

//SIGNUP
const addUser= async (req,res)=>{
    const user=req.body;

    try{

        // Hash the password
        const hashedPassword = await bcrypt.hash(user.Password, 10);

        // Replace plain password with hashed password
        user.Password = hashedPassword;

         // Send user to model
        createUser(user,(err,data)=>{
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Failed to create user",
                error: err
            });
        }

        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: data
        });
     });

    }

    catch(err){
        return res.status(500).json({
            status: "error",
            message: "Failed to hash password",
            error: err
        });
    }
};

module.exports= {
    addUser
};
