const mongoose = require('mongoose')
require('mongoose-function')(mongoose);
const Schema = mongoose.Schema;

const sportSchema = new Schema(
  {
    name: {
      type: String
    }
  },
  { collection: 'SPORT_COLLEC' }
);

const Sport = mongoose.model('sport', sportSchema);

module.exports = Sport;
