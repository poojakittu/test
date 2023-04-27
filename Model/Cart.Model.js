const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  { 
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    type:{ type: String, required: true },
    bookingDate:{ type: Number, required: true },
    checkoutDate:{ type: Number, required: true },
    numberofPerson:{ type: Number, required: true },
    finalPrice:{ type: Number },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const CartModel = mongoose.model("cart", cartSchema);

module.exports={
  CartModel
}