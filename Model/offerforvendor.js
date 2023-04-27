var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var offerSchema = new Schema(
  {
    offer: { type: Number, required: true },
    price: { type: Number, required: true },
    img: [{ type: String }],
    type: { type: String, default: "basic" },
    facilites: [{ type: String, default: "basic" }],
    description: [{ type: String, default: "basic" }],
    discountPrice: { type: Number, required: true },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotel",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
    },
    AdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const OfferVendorModel = mongoose.model("offerVendor", offerSchema);
const OfferAdminModel = mongoose.model("offerAdmin", offerSchema);
module.exports = { OfferVendorModel, OfferAdminModel };
