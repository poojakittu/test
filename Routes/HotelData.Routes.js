const jwt = require("jsonwebtoken");

const express = require("express");
const hotelDataRoutes = express.Router();

const { HotelModel } = require("../Model/Hotel.model");

const { HotelDataModel } = require("../Model/HotelData.Model");

require("dotenv").config();

const { authenticate } = require("../middleware/authentication.middleware");
const { authenticateAdmin } = require("../middleware/authenticate.Admin");
const { authenticateVendor } = require("../middleware/authenticateVendor");

hotelDataRoutes.get("/allhotel", async (req, res) => {
  try {
    const abc = await HotelDataModel.find();
    console.log(abc);
    res.send({ data: abc, total: abc.length });
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

hotelDataRoutes.get("/off", async (req, res) => {
  const sort = { length: -1 };
  const abc = await HotelDataModel.find({
    alltypes: { $elemMatch: { off: { $lt: 50 } } },
  }).sort(sort);
  console.log(abc);
  res.send(abc);
});

hotelDataRoutes.get("/", authenticate, async (req, res) => {
  const sort = req.query.sort;
  const filter = req.query.filter || "";
  const city = req.query.city || "";
  const rating = +req.query.rating || 0;

  let sortBy;
  if (sort == "low") {
    sortBy = { rating: 1 };
  } else if (sort == "high") {
    sortBy = { rating: -1 };
  } else if (sort == "phigh") {
    sortBy = { priceperNight: -1 };
  } else if (sort == "plow") {
    sortBy = { priceperNight: 1 };
  } else {
    sortBy = { _id: 1 };
  }
  const data = await HotelDataModel.find();
  console.log(data.isApprovedByAdmin);

  if (data.length > 0) {
    try {
      if (filter.length > 0) {
        const products = await HotelDataModel.find()
          .where("rating")
          .gte(rating)
          .sort(sortBy)
          .where("name")
          .in(filter)
          .where("city")
          .in(city);
        const count = await HotelDataModel.find()
          .where("rating")
          .gte(rating)
          .sort(sortBy)
          .where("priceperNight")
          .gte(rating)
          .sort(sortBy)
          .where("name")
          .in(filter)
          .where("city")
          .in(city)
          .count();

        res.send({ data: products, total: count });
      } else {
        const count = await HotelDataModel.find()
          .where("rating")
          .gte(rating)
          .sort(sortBy)

          .count();
        const products = await HotelDataModel.find()
          .where("rating")
          .gte(rating)
          .sort(sortBy);

        res.send({ data: products, total: count });
      }
    } catch (err) {
      res.send({ msg: "Could not get Hotel" });
    }
  } else {
    res.send({ msg: "Hotel Empty" });
  }
});

hotelDataRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await HotelDataModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

hotelDataRoutes.patch("/update/offer/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const data = await HotelDataModel.findById(Id);
    data.alltypes.forEach((item) => {
      if (item._id.toString() == req.query.hotelId) {
        item.off = req.body.off;
      }
    });
    await data.save();
    res.send(data.alltypes);
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

// %%%%%%%%%%%%%%%%%%%%  (vendor See his data)  %%%%%%%%%%%%%%%%%%%%%%%

hotelDataRoutes.get("/all/:id", async (req, res) => {
  const Id = req.params.id;
  console.log(typeof payload);

  try {
    const product = await HotelDataModel.find({ userId: Id });
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

hotelDataRoutes.post("/add", authenticateAdmin, async (req, res) => {
  const payload = req.body;
  const token = req.headers.authorization;

  const decoded = jwt.verify(token, process.env.key);
  // console.log(decoded.AdminId)
  const data = await HotelModel.find({ _id: payload.hotelId });
  const data1 = await HotelDataModel.findOne({ hotelId: payload.hotelId });
  const date = new Date();

  try {
    if (!data1) {
      const cart = await HotelDataModel.create({
        hotelId: payload.hotelId,
        name: data[0].name,
        image_url: data[0].image_url,
        email: data[0].email,
        quantity: data[0].quantity,
        phone: data[0].phone,
        address: data[0].address,
        city: data[0].city,
        ownerName: data[0].ownerName,
        contactName: data[0].contactName,
        date: date,
        alltypes: [],
        AdminId: decoded.AdminId,
        AgentId: data[0].AgentId,
        vendorId: payload.vendorId,
      });
      await cart.save();
      return res.status(201).send(cart);
    } else {
      return res.status(201).send({ msg: "Hotel Already added" });
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

hotelDataRoutes.post("/addrooms", authenticateVendor, async (req, res) => {
  const payload = req.body;
  console.log(payload)

  const date = new Date();

  try {
    const data = await HotelDataModel.findOne({ vendorId: req.body.vendorId });
    for (let i = 0; i < payload.alltypes.length; i++) {
      data.alltypes.push({
        type: payload.alltypes[i].type,
        numberofitem: payload.alltypes[i].numberofitem,
        price: payload.alltypes[i].price,
        facilites: payload.alltypes[i].facilites,
        availableitem: payload.alltypes[i].availableitem,
        discountprice: payload.alltypes[i].discountprice,
        description: payload.alltypes[i].description,
        off: payload.alltypes[i].off,
        img1: payload.alltypes[i].img1,
        img2: payload.alltypes[i].img2,
        img3: payload.alltypes[i].img3,
        img4: payload.alltypes[i].img4,
        img5: payload.alltypes[i].img5,
        date:date
      });
      await data.save();
    }

    await data.save();
    return res.status(201).send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

hotelDataRoutes.patch("/update/:id", authenticateVendor, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
  const token = req.headers.authorization;

  const decoded = jwt.verify(token, process.env.key);
  try {
    await HotelDataModel.findByIdAndUpdate({ _id: Id }, payload, {
      vendorId: decoded.vendorId,
    });
    await HotelDataModel.findByIdAndUpdate(
      { _id: Id },
      { vendorId: decoded.vendorId }
    );
    res.send({ msg: "updated Sucessfully" });
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

hotelDataRoutes.delete("/delete/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const note = await HotelDataModel.findOne({ _id: Id });
  const hotelId = note.created_by;
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await HotelDataModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Hotel Data");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

hotelDataRoutes.post("/review_rating/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
  // console.log(payload)

  try {
    const data = await HotelDataModel.findById(Id);

    data.rating.forEach((item) => {
      item.rating = payload.rating;
      console.log(item);
    });
    await data.save();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = {
  hotelDataRoutes,
};
