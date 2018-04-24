const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AccountSchema = require('./accounts').schema;

const activitySchema = new Schema(
  {
    label: {
      type: String
    },
    placeName: {
      type: String
    },
    placeId: {
      type: String
    },
    time: {
      type: String
    },
    date: {
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number
      default: Date.now
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'account'
    }
  },
  { collection: 'ACTIVITY_COLLEC' }
);

const Activity = mongoose.model('activity', activitySchema);

module.exports = Activity;
