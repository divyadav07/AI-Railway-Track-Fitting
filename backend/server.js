const express=require("express");
const db=require("./config/database");
require("dotenv").config();

const app=express();

app.use(express.json());

const userRouter = require("./routes/user.route");
app.use("/api", userRouter);

const loginRouter=require("./routes/login.route");
app.use("/api",loginRouter);

const registerRouter=require("./routes/register.route");
app.use("/api",registerRouter);

const assetRouter=require("./routes/asset.route");
app.use("/api",assetRouter);

const dashboardRouter=require("./routes/dashboard.route");
app.use("/api", dashboardRouter);

const qrRouter=require("./routes/qr.route");
app.use("/api", qrRouter);

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})