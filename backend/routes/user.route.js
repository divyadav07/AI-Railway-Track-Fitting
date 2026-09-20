const express=require("express");
const router = express.Router();
const authMiddleware=require("../middleware/auth.middleware")
const  { getUsers } = require("../controllers/user.controller");

router.get("/getUsers", authMiddleware,  getUsers);

module.exports=router;