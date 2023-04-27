const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = +process.env.saltRounds;
const { authenticate } = require("../middleware/authentication.middleware");

const { UserModel } = require("../Model/User.model");

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  const payload = req.body;
  console.log(payload)

  try {
    const email = await UserModel.findOne({ email: payload.email });
    if (email) {
      res
        .status(200)
        .send({
          msg: "Email is already Present Please try to again Email",
          error: true,
        });
    } else {
      bcrypt.hash(payload.password, saltRounds, async (err, hash) => {
        if (err) {
          throw err;
        } else {
          payload.password = hash;
          const user = new UserModel(payload);
          await user.save();
          res.status(200).send({
            msg: "Registration success",
            username: user.name,
            email:user.email,
            phone:user.phone,
            error: false,
          });
        }
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: "something went wrong while register user", error });
    console.log(error);
  }
});
UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          throw err;
        } else {
          if (result) {
            jwt.sign(
              {
                userId: user._id,
                userName: user.name,
                Email: user.email,
                userType: user.userType,
              },
              process.env.key,
              (err, token) => {
                if (err) {
                  throw err;
                } else {
                  
                  res.status(200).send({
                    msg: "logged in success",
                    token,
                    username: user.name,
                    userId: user._id,
                    Email: user.email,
                    phonne:user.phone,
                    error: false,
                  });
                }
              }
            );
          } else {
            res.send({ msg: "wrong credential", error: true });
          }
        }
      });
    } else {
      res.send({ msg: "User Not found", error: true });
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: "something went wrong while login user", error });
    console.log(error);
  }
});

UserRouter.get("/", async (req, res) => {


  try {
    const product = await UserModel.find();
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

UserRouter.patch("/update/:id",authenticate, async (req, res) => {
const Id=req.params.id;
const payload=req.body

  try {
  await UserModel.findByIdAndUpdate({_id:Id},payload)
    res.status(200).send({
      msg: "Profile Updated",payload
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

module.exports = { UserRouter };