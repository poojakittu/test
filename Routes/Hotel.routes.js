const express = require("express");
const { authenticateAgent } = require("../middleware/authenticate.Agent");
const hotelRoutes = express.Router();


const { HotelModel } = require("../Model/Hotel.model");


hotelRoutes.get("/",authenticateAgent, async (req, res) => {
  const payload = req.body;
  try {
    const product = await HotelModel.find({ userId: payload.userId });
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

hotelRoutes.get("/:id",authenticateAgent, async (req, res) => {
  const id = req.params.id;
  try {
    const product = await HotelModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

hotelRoutes.post("/add",authenticateAgent, async (req, res) => {
  const payload = req.body;
  try {
    const title = await HotelModel.findOne({ name: payload.name });
    if (title) {
      res
        .status(200)
        .send({
          msg: "This Hotel is allready Present So please change the Name of Hotel",
          error: true,
        });
    } else {
      const hotel = new HotelModel(payload);
      await hotel.save();
      res.send({ msg: "Hotel Data is created" });
    }
  } catch (error) {
    res.status(400).send({ msg: "something went wrong", error });
    console.log(error);
  }
});

hotelRoutes.patch("/update/:id",authenticateAgent, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  const hotel = await HotelModel.findOne({ _id: Id });

  const hotelId = hotel.created_by;
  // console.log(hotelId);
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await HotelModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

hotelRoutes.delete("/delete/:id",authenticateAgent, async (req, res) => {
  const Id = req.params.id;
  const note = await HotelModel.findOne({ _id: Id });
  const hotelId = note.created_by;
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await HotelModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Hotel Data");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  hotelRoutes,
};
