const {getAllUsers} = require("../models/user.model");


const getUsers = (req, res) => {

    getAllUsers((err, data) => {

        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Failed to get users",
                error: err
            });
        }

        res.status(200).json({
            status: "success",
            message: "Users fetched successfully",
            data: data
        });
    });
};


module.exports = {
    getUsers,
};