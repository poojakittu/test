const express = require("express");
const vendorofferRoutes = express.Router();
const jwt = require("jsonwebtoken");
const { authenticateVendor } = require("../middleware/authenticateVendor");
const { OfferVendorModel } = require("../Model/offerforvendor");

vendorofferRoutes.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);
  const x = decoded.vendorId;
  console.log(x);

  try {
    const product = await OfferVendorModel.find({ vendorId: x });
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

vendorofferRoutes.get("/allvendoroffer", async (req, res) => {
 
    try {
      const product = await OfferVendorModel.find();
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
  


vendorofferRoutes.post("/add", authenticateVendor, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);
  const x = decoded.vendorId;
  const payload = req.body;

  try {
    const comments = await OfferVendorModel.create({
        offer:payload.offer,
        img:payload.img,
        price:payload.price,
        type:payload.type,
        facilites:payload.facilites,    
        description:payload.description,
        hotelId :payload.hotelId,
        vendorId:x,
        discountPrice:payload.price-payload.offer 
    });
    await comments.save();
    return res.status(201).send(comments);
  } catch (e) {
    res.status(500).send(e.message);
  }
});



module.exports = { vendorofferRoutes };
