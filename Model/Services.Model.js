const mongoose = require("mongoose");
require("dotenv").config();

const ServicesSchema = new mongoose.Schema({
  services: { type: String, required: true },
  alltypes: [{
   subservices: { type: String, required: true},
   days:{ type: Number, required: true},
   minPrice:{ type: Number, required: true},
   maxPrices:{ type: Number, required: true},
   minorder:{ type: Number, required: true},
   maxorder:{ type: Number, required: true},
   likes:{ type: Number, required: true},
   likesPrices:{ type: Number, required: true},
   averageTime:{ type: Number, required: true},
   description:[{
    startTime:{ type: String, required: true},
    speed:{ type: String, required: true},
    refill:{ type: String, required: true},
    quality:{ type: String, required: true},
    props:{ type: String, required: true},
   }],
   Instructions:[{ type: String, required: true},]
}],
  
});

const servicesModel = mongoose.model("services", ServicesSchema);

module.exports = { servicesModel };