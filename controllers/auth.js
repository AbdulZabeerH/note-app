const User = require("../models/user");

exports.signin = (req,res)=>{
    const { email, password } = req.body;
    User.findOne({email},(err,user)=>{
        if (err || !user) {
            return res.status(400).json({
              error: "User Email Does Not Exist",
            });
          }
        if(user.password!=password || user.email != email){
            return res.status(400).json({
                error: "Check the Email and Password",
              }); 
        }
        return res.status(200).json({
            user,
            status:true,
            msg:"Login SuccessFull"
        })
    })
}