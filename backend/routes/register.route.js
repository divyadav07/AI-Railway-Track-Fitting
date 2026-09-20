const express=require("express");
const router=express.Router();

const {addUser}=require("../controllers/register.controller");

router.post("/signUp", addUser);

module.exports=router;