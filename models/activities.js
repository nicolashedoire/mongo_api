const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AccountSchema = require('./accounts').schema;

const activitySchema = new Schema(
  {
    label: {
      type: String
    },
    city: {
      type: String
    },
    time: {
      type: String
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
