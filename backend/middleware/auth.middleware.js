const jwt=require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    console.log("ALL HEADERS:", req.headers);
    console.log("AUTHORIZATION:", req.headers.authorization);
    
    //1.GETTING TOKEN AND CKECK OF ITS THERE
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token=req.headers.authorization.split(' ')[1];
    }
    console.log(token);

    // 2. Check if token exists
    if(!token)
    {
        return res.status(401).json({
        status: "error",
        message: "You are not logged in. Please provide a token."
        }); 
    }

    //3.VERIFICATION TOKEN
    try {

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);

        // 4. Store decoded user information in request
        req.user = decoded;

        // 5. Continue to protected route
        next(); 
    }

    catch(err) {

        return res.status(401).json({
            status: "error",
            message: "Invalid or expired token"
        });

    }
    
};

module.exports=authMiddleware;