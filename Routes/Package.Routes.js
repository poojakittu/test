const express = require("express");
const packageRoutes = express.Router();

const { authenticate } = require("../middleware/authentication.middleware");
const { AutheriseRole } = require("../middleware/AutheriseRole.middleware");
const { PackageModel } = require("../Model/Package.Model");


packageRoutes.use(authenticate);

packageRoutes.get("/",authenticate,AutheriseRole, async (req, res) => {
  const payload = req.body;
  try {
    const product = await PackageModel.find({ userId: payload.userId });
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


packageRoutes.get(
  "/allpackage",
 
  async (req, res) => {
    const sort = req.query.sort;
    const filter = req.query.filter || "";
    const city = req.query.city || "";
    const roomType = req.query.roomType || "";
    const rating = +req.query.rating || 0;
    const priceperNight = +req.query.priceperNight || 0;

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
    const data = await PackageModel.find();


    if (data.length > 0) {
      try {
        if (filter.length > 0) {
          const products = await PackageModel.find()
            .where("rating")
            .gte(rating)
            .sort(sortBy)
            .where("name")
            .in(filter)
            .where("city")
            .in(city);
          const count = await PackageModel.find()
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
          const count = await PackageModel.find()
            .where("rating")
            .gte(rating)
            .sort(sortBy)

            .count();
          const products = await PackageModel.find()
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
  }
);

packageRoutes.post("/add",authenticate,AutheriseRole, async (req, res) => {
  const payload = req.body;

  try {
    const title = await PackageModel.findOne({ packageName: payload.packageName });
    if (title) {
      res
        .status(200)
        .send({
          msg: "This Place is allready Present So please change the Name of Place",
          error: true,
        });
    } else {
      const hotel = new PackageModel(payload);
      await hotel.save();
      res.send({ msg: "Tourist Data is created" });
    }
  } catch (error) {
    res.status(400).send({ msg: "something went wrong", error });
    console.log(error);
  }
});

packageRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  const hotel = await PackageModel.findOne({ _id: Id });

  const hotelId = hotel.created_by;
  console.log(hotelId);
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await PackageModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

packageRoutes.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  const note = await PackageModel.findOne({ _id: Id });
  const hotelId = note.created_by;
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await PackageModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Data");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});



module.exports = {
  packageRoutes,
};
