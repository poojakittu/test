const { mongoose } = require("mongoose");

const TourTravelSchema = mongoose.Schema(
  {
    
    name: { type: String },
    image_url: [{ type: String }],
    contact: { type: Number },
    city: { type: String },
    pinCode: { type: Number },
    rating: { type: Number },
    facilites: [{ type: String }],
    description: { type: String },
    price: { type: Number },
    allTypes: [
      {
        Typevehicle: { type: String },
        person: { type: Number },
        price: { type: Number },
        img: { type: String },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agent",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const TourModel = mongoose.model("tourtravel_data", TourTravelSchema);

module.exports = {
  TourModel,
};
