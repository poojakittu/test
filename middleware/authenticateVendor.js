const jwt = require("jsonwebtoken");
require("dotenv").config()
const authenticateVendor = (req, res, next) => {
  const token=req.headers.authorization;
 
  if(!token){
    res.send({msg:"Please login first"})
  }

  const decoded=jwt.verify(token, process.env.key);
  
  if(decoded){
      req.body.vendorId=decoded.vendorId;
      next()
  }else{
      res.send({msg:"Please login first"})
  }
};

module.exports = {
    authenticateVendor
};