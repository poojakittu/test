const jwt = require("jsonwebtoken");
const express = require("express");
const { authenticate } = require("../middleware/authentication.middleware");

const { CartModel } = require("../Model/Cart.Model");
const { HotelDataModel } = require("../Model/HotelData.Model");

const cartRouter = express.Router();

cartRouter.get("/", authenticate, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);

  try {
    const product = await CartModel.find({ userId: decoded.userId });
    // console.log(product);
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

cartRouter.post("/add", authenticate, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);
  const data = await HotelDataModel.find({ _id: req.body.productId });
  try {
    const cart = await CartModel.create({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      quantity: req.body.quantity,
      type: req.body.type,
      bookingDate: req.body.bookingDate,
      checkoutDate: req.body.checkoutDate,
      numberofPerson: req.body.numberofPerson,
      userId: decoded.userId,
      productId: req.body.productId,
      vendorId: data[0].vendorId,
      finalPrice: req.body.quantity * req.body.price,
    });
    return res.status(201).send(cart);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

cartRouter.patch("/update/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  const hotel = await CartModel.findOne({ _id: Id });

  const hotelId = hotel.userId.toString();
  // console.log(hotelId)
  const userId_making_req = req.body.userId;

  console.log(userId_making_req, hotelId);
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await CartModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

cartRouter.delete("/delete/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  const hotel = await CartModel.findOne({ _id: Id });

  const hotelId = hotel.userId.toString();
  // console.log(hotelId)
  const userId_making_req = req.body.userId;

  console.log(userId_making_req, hotelId);
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await CartModel.findByIdAndDelete({ _id: Id }, payload);
      res.send({ msg: "Deleted Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = { cartRouter };
