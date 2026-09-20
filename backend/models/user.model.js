const db=require("../config/database");

const createUser= (user, callback)=>{
    const sql="INSERT INTO users (Name, Email, Phone, Password, Role) VALUES (?, ?, ?, ?, ?)";

    const values=[
        user.Name,
        user.Email,
        user.Phone,
        user.Password,
        user.Role
    ];

    db.query(sql,values, (err,data)=>{
        if (err){
            callback(err, null);
        }
        else{
            callback(null, data);
        }
    })
}

const getUserByEmail=(Email,callback)=>{
    const sql="SELECT * FROM users WHERE Email=?";

    db.query(sql, [Email] , (err,data)=>{
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

const getAllUsers=(callback)=>{
    const sql="SELECT * FROM users";

    db.query(sql,(err,data)=>{
        if (err) {
            callback(err,null);
        }
        else {
            callback(null,data);
        }
    });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail
};