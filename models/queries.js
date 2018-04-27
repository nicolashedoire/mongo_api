const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Activity = require('./activities');

const querySchema = new Schema(
  {
    activityId : {
      type: String
    },
    date: {
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number
      default: Date.now
    },
    userId: {
        type: String
    },
    activity: {
      type: Schema.Types.ObjectId,
      ref: 'activity'
    },
  },
  { collection: 'QUERY_COLLEC' }
);

const Query = mongoose.model('query', querySchema);

module.exports = Query;
