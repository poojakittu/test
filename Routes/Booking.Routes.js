const express = require("express");
const { authenticate } = require("../middleware/authentication.middleware");

const { BookingModel } =require("../Model/Booking.Model")

const BookingRouter = express.Router();

BookingRouter.get("/", authenticate, async (req, res) => {
  const payload = req.body;

  try {
    const product = await BookingModel.find({ userId: payload.userId });
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
BookingRouter.get("/allbooking", authenticate, async (req, res) => {
  const payload = req.body;

  try {
    const product = await BookingModel.find();
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

BookingRouter.post("/add", authenticate, async (req, res) => {
  const userId = req.body.userId;
  try {
    const userid = await BookingModel.find({ userId:userId });
    console.log(userid)
   
    const cart = await BookingModel.create({
      username: req.body.username,
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      quantity: req.body.quantity,
      type: req.body.type,
      bookingDate: req.body.bookingDate,
      checkoutDate: req.body.checkoutDate,
      numberofPerson: req.body.numberofPerson,
      discount:req.body.discount,
      paymentMode:req.body.paymentMode,
      address:req.body.address,
      userId: userId,
      productId:req.body.productId,
      finalPrice:req.body.price*req.body.quantity
    }
    );
    return res.status(201).send(cart);
  } catch (e) {
    res.status(500).send(e.message);
  }
});


BookingRouter.patch("/update/:id",authenticate, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
 
  const hotel = await BookingModel.findOne({ _id: Id });
  
  const hotelId = hotel.userId.toString();
  // console.log(hotelId)
  const userId_making_req = req.body.userId;

  console.log(userId_making_req,hotelId)
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await BookingModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

BookingRouter.delete("/delete/:id",authenticate, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
 
  const hotel = await BookingModel.findOne({ _id: Id });
  
  const hotelId = hotel.userId.toString();
  // console.log(hotelId)
  const userId_making_req = req.body.userId;

  console.log(userId_making_req,hotelId)
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await BookingModel.findByIdAndDelete({ _id: Id }, payload);
      res.send({ msg: "Deleted Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = { BookingRouter };
