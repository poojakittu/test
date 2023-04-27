const jwt = require("jsonwebtoken");
require("dotenv").config()
const authenticate = (req, res, next) => {
  const token=req.headers.authorization;
  // console.log(token)
 
  if(!token){
    res.send({msg:"Please login first"})
  }

  const decoded=jwt.verify(token, process.env.key);
  
  if(decoded){
   
      req.body.userId=decoded.userId;
      next()
  }else{
      res.send({msg:"Please login first"})
  }
};

module.exports = {
  authenticate
};