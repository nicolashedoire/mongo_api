const mongoose = require('mongoose')
require('mongoose-function')(mongoose);
const Schema = mongoose.Schema;

const barSchema = new Schema(
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
  { collection: 'BAR_COLLEC' }
);

const Bar = mongoose.model('bar', barSchema);

module.exports = Bar;
