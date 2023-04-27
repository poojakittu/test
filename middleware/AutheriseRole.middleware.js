
const { UserModel } = require("../Model/User.model");

const AutheriseRole = async ( req, res, next) => {
    const user=await UserModel.findById(req.body.userId);
 // console.log(user.userType=="admin")
  try {
    if (user.userType=="admin") {
        next()
    } else {
      res.send({ error: true, message: "this user cant access this route" });
    }
  } catch (error) {
    console.log(error);
  }

};


const AutheriseRoleUser = async ( req, res, next) => {
    const user=await UserModel.findById(req.body.userId);
 // console.log(user.userType=="admin")
  try {
    if (user.userType=="user") {
        next()
    } else {
      res.send({ error: true, message: "this user cant access this route" });
    }
  } catch (error) {
    console.log(error);
  }

};


const AutheriseRolevendor = async ( req, res, next) => {
    const user=await UserModel.findById(req.body.userId);
    console.log(user)
 // console.log(user.userType=="admin")
  try {
    if (user.userType=="vendor") {
        next()
    } else {
      res.send({ error: true, message: "this user cant access this route" });
    }
  } catch (error) {
    console.log(error);
  }

};

const AutheriseRoleAgent = async ( req, res, next) => {
    const user=await UserModel.findById(req.body.userId);
 // console.log(user.userType=="admin")
  try {
    if (user.userType=="vendor") {
        next()
    } else {
      res.send({ error: true, message: "this user cant access this route" });
    }
  } catch (error) {
    console.log(error);
  }

};

const User_admin_vendor = async ( req, res, next) => {
  const user=await UserModel.findById(req.body.userId);
// console.log(user.userType=="admin")
try {
  if ((user.userType=="vendor")||(user.userType=="admin")||(user.userType=="user")) {
      next()
  } else {
    res.send({ error: true, message: "this user cant access this route" });
  }
} catch (error) {
  console.log(error);
}

};

const Access_all = async ( req, res, next) => {
  const user=await UserModel.findById(req.body.userId);
// console.log(user.userType=="admin")
try {
  if ((user.userType=="vendor")||(user.userType=="admin")||(user.userType=="user")||(user.userType=="agent")) {
      next()
  } else {
   res.send({ error: true, message: "this user cant access this route" });
  }
} catch (error) {
  console.log(error);
}

};


module.exports = { AutheriseRole,AutheriseRoleUser,AutheriseRolevendor,AutheriseRoleAgent,User_admin_vendor,Access_all };
