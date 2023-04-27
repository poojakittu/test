var mongoose = require('mongoose');
var Schema = mongoose.Schema

var CommentsModel = new Schema({
comment :{ type: String, required: true },
rating: { type: String, required: true }, 
username:{ type: String, required: true },
image:{ type: String, required: true },
date:{ type: String, required: true },
commentDate:{ type: String, required: true },
hotelId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotel",
  },
userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
},
{
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

module.exports = mongoose.model('Comments', CommentsModel);