const express = require("express");
const { HotelModel } = require("../Model/Hotel.model");

const AdminApprovedRoutes = express.Router();

AdminApprovedRoutes.get("/", async (req, res) => {
  const sort = req.query.sort;
  const filter = req.query.filter||"";
  const city = req.query.city||"";
  const roomType = req.query.roomType||"";
  const rating = +req.query.rating || 0;
  const priceperNight = +req.query.priceperNight || 0;
  

  let sortBy;
  if (sort == "low") {
    sortBy = { rating: 1 };
  } else if (sort == "high") {
    sortBy = { rating: -1 };
  }else if (sort == "phigh") {
    sortBy = { priceperNight: -1 };
  }else if (sort == "plow") {
    sortBy = { priceperNight: 1 };
  }else {
    sortBy = { _id: 1 };
  }
const data=await HotelModel.find({isApprovedByAdmin:"false"})
console.log(data.isApprovedByAdmin)

if(data.length>0){

  try {
    if (filter.length>0) {
        const products = await HotelModel.find({isApprovedByAdmin:"false"})
          .where("rating")
          .gte(rating)
          .sort(sortBy)
          .where("name")
          .in(filter)
          .where("city")
          .in(city)
        const count = await HotelModel.find({isApprovedByAdmin:"false"})
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
        const count = await HotelModel.find({isApprovedByAdmin:"false"})
          .where("rating")
          .gte(rating)
          .sort(sortBy)
          
          .count();
        const products = await HotelModel.find({isApprovedByAdmin:"false"})
          .where("rating")
          .gte(rating)
          .sort(sortBy)
          
        res.send({ data: products, total: count });
      }
  } catch (err) {
    res.send({ msg: "Could not get Hotel" });
  }
}else{
  res.send({ msg: "Hotel Empty" });
}

});


AdminApprovedRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await HotelModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

AdminApprovedRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  
  const payload = req.body


  try {

      await HotelModel.findByIdAndUpdate({ _id: Id },payload);
      
      res.send({ msg: "updated Sucessfully" });
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

AdminApprovedRoutes.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;

  try {
      await HotelModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Hotel Data");
    
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = { AdminApprovedRoutes };
