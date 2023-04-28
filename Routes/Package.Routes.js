const express = require("express");
const { servicesModel } = require("../Model/Services.Model");
const ServicesRoutes = express.Router();


ServicesRoutes.get("/", async (req, res) => {
  const payload = req.body;
  try {
    const product = await servicesModel.find();
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



ServicesRoutes.post("/add", async (req, res) => {
  const payload = req.body;

  try {
      const hotel = new servicesModel(payload);
      await hotel.save();
      res.send({ msg: "Data is Added" });

  } catch (error) {
    res.status(400).send({ msg: "something went wrong", error });
    console.log(error);
  }
});

// ServicesRoutes.patch("/update/:id", async (req, res) => {
//   const Id = req.params.id;
//   const payload = req.body;

//   const hotel = await servicesModel.findOne({ _id: Id });

//   const hotelId = hotel.created_by;
//   console.log(hotelId);
//   const userId_making_req = req.body.created_by;
//   try {
//     if (userId_making_req !== hotelId) {
//       res.send({ msg: "You are not authorized" });
//     } else {
//       await servicesModel.findByIdAndUpdate({ _id: Id }, payload);
//       res.send({ msg: "updated Sucessfully" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ err: "Something went wrong" });
//   }
// });

// ServicesRoutes.delete("/delete/:id", async (req, res) => {
//   const Id = req.params.id;
//   const note = await servicesModel.findOne({ _id: Id });
//   const hotelId = note.created_by;
//   const userId_making_req = req.body.created_by;
//   try {
//     if (userId_making_req !== hotelId) {
//       res.send({ msg: "You are not Recognized" });
//     } else {
//       await servicesModel.findByIdAndDelete({ _id: Id });
//       res.send("Deleted the Data");
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ msg: "Something went wrong" });
//   }
// });



module.exports = {
  ServicesRoutes,
};
