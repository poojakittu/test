const express = require("express");
const adminofferRoutes = express.Router();
const jwt = require("jsonwebtoken");
const { authenticateAdmin } = require("../middleware/authenticate.Admin");
const { OfferAdminModel, OfferVendorModel } = require("../Model/offerforvendor");

// adminofferRoutes.get("/", async (req, res) => {
//   const token = req.headers.authorization;
//   const decoded = jwt.verify(token, process.env.key);
//   const x = decoded.adminId;
//   console.log(x);

//   try {
//     const product = await OfferVendorModel.find({ vendorId: x });
//     console.log(product);
//     res.send({ data: product, total: product.length });
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).send({
//       error: true,
//       msg: "something went wrong",
//     });
//   }
// });

adminofferRoutes.get("/alladminoffer", async (req, res) => {
 
    try {
      const product = await OfferAdminModel.find();
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
  


adminofferRoutes.post("/add", authenticateAdmin, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);
  const x = decoded.adminId;
  const payload = req.body;

  try {
    const comments = await OfferAdminModel.create({
        offer:payload.offer,
        price:payload.price,
        type:payload.type,
        img:payload.img,
        facilites:payload.facilites,    
        description:payload.description,
        hotelId :payload.hotelId,
        adminId:x,
        discountPrice:payload.price-payload.offer 
    });
    await comments.save();
    return res.status(201).send(comments);
  } catch (e) {
    res.status(500).send(e.message);
  }
});



module.exports = { adminofferRoutes };
