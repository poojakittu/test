const express = require("express");

const { HotelDataModel } = require("../Model/HotelData.Model");

const AllhotelRoutes = express.Router();

AllhotelRoutes.get("/", async (req, res) => {
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
const data=await HotelDataModel.find()
console.log(data.isApprovedByAdmin)

if(data.length>0){

  try {
    if (filter.length>0) {
        const products = await HotelDataModel.find()
          .where("rating")
          .gte(rating)
          .sort(sortBy)
          .where("name")
          .in(filter)
          .where("city")
          .in(city)
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



AllhotelRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await HotelDataModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});






module.exports = { AllhotelRoutes };
