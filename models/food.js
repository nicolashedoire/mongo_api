const mongoose = require('mongoose')
require('mongoose-function')(mongoose);
const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    formatted_address: {
      type: String
    },
    id: {
      type: String,
      unique: true
    },
    name: {
      type: String
    },
    place_id: {
      type: String
    },
    vicinity: {
      type: String
    },
    location: {
      lat: {
        type: Number
      },
      lng: {
        type: Number
      }
    },
    photo: {
      type: String
    }
  },
  { collection: 'FOOD_COLLEC' }
);

const Food = mongoose.model('food', foodSchema);

module.exports = Food;
