const express = require("express");
const { authenticate } = require("../middleware/authentication.middleware");
const CommentModel = require("../Model/Comment.Model");
const { HotelDataModel } = require("../Model/HotelData.Model");
const { UserModel } = require("../Model/User.model");
const CommentRoutes = express.Router();
const jwt = require("jsonwebtoken");

CommentRoutes.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);
  const x = decoded.userId;
  console.log(x);

  try {
    const product = await CommentModel.find({ userId: x });
    console.log(product);
    res.send({ data: product, total: product.length });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

CommentRoutes.get("/hotelcomment/:id", async (req, res) => {
  const payload = req.params.id;
  try {
    const product = await CommentModel.find({ hotelId: payload });
    let sum = 0;
    for (let i = 0; i < product.length; i++) {
      sum += Number(product[i].rating);
    }
    let x = sum / product.length;
    let val = { rating: x };

    res.send({ data: product, total: product.length, rating: x });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

CommentRoutes.post("/add", authenticate, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);
  const x = decoded.userId;
  const payload = req.body;
  const data = await UserModel.find({ _id: x });

  const date = new Date();

  let d = JSON.stringify(date);
  let bag = "";
  for (let i = 1; i <= 10; i++) {
    bag += d[i];
  }

  const img =
    "https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png";
  try {
    const comments = await CommentModel.create({
      comment: payload.comment,
      rating: payload.rating,
      image: img,
      hotelId: payload.hotelId,
      date: date,
      username: data[0].name,
      commentDate: bag,
      userId: x,
    });
    await comments.save();
    const product = await CommentModel.find({ hotelId: payload.hotelId });
    let sum = 0;
    for (let i = 0; i < product.length; i++) {
      sum += Number(product[i].rating);
    }
    let xx = sum / product.length;
    let val = { rating: xx,review:product.length};

    const bb = await HotelDataModel.findByIdAndUpdate(
      { _id: payload.hotelId },
      val
    );
    console.log(bb);
    return res.status(201).send(comments);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

CommentRoutes.get("/:id", async (req, res) => {
  const payload = req.params.id;
  try {
    const product = await CommentModel.find({ _id: payload });
    console.log(product);
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

CommentRoutes.patch("/update/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const note = await CommentModel.findOne({ _id: Id });
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);
  const x = JSON.stringify(note.userId);
  const y = JSON.stringify(decoded.userId);

  try {
    if (y !== x) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await CommentModel.findByIdAndUpdate({ _id: Id }, req.body);
      res.send({ msg: "update comment" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

CommentRoutes.patch("/delete/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const note = await CommentModel.findOne({ _id: Id });
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);
  const x = JSON.stringify(note.userId);
  const y = JSON.stringify(decoded.userId);

  try {
    if (y !== x) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await CommentModel.findOneAndDelete({ _id: Id });
      res.send({ msg: "update comment" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = { CommentRoutes };
