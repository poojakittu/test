const { mongoose } = require("mongoose");

const hotelSchema = mongoose.Schema(
  {
    name: { type: String,  unique: true },
    image_url: [{ type: String, required: true }],
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: Number, required: true },
    rating: { type: Number, required: true },
    facilites: { type: String, required: true },
    ownerName: { type: String,required: true  },
    contactName: { type: String },
    isApprovedByAdmin:{type:String, default:"false"},
    alltypes:[
      {
        type:{ type: String, required: true},
        numberofitem:{ type: Number, required: true},
        price:{ type: Number, required: true},
      }
    ],
    AgentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agent",
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
  );
  
  const HotelModel = mongoose.model("Agent_Hotels", hotelSchema);

  module.exports = {
    HotelModel,
  };