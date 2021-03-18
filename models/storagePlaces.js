const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({  
  user : {
    type : Schema.Types.ObjectId,
    ref: 'User'
  }, 
    name: String, 
    address: String, 
    category: String, 
    coordinates:[Number],
    description: String, 
    rating: Number,
    tag: String
    });
    
const Place = mongoose.model("Place", placeSchema);
module.exports = Place;