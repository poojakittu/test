const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  { 
    username:{ type: String, },
    name: { type: String, },
    image: { type: String, },
    price: { type: Number, },
    quantity: { type: Number, default: 1, min: 1 },
    type:{ type: String, },
    bookingDate:{ type: Number, },
    checkoutDate:{ type: Number, },
    numberofPerson:{ type: Number, },
    discount:{ type: Number, },
    paymentMode:{type: String, },
    address:{type: String, },
    finalPrice:{type:Number},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
     
    }
  },
  {
    versionKey: false,
    timestamps: true,
  },
  
);


const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports={
    BookingModel
}