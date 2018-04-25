const mongoose = require('mongoose');
const Activity = require('./activities');
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    idToken: {
      type: String
    },
    image: {
      type: String,
      required: true
    },
    provider: {
      type: String,
      required: true
    },
    age: {
      type: String, 
      default: null
    },
    rate: {
      type: Number,
      default: 0
    },
    hobbies: {
      type: Array,
      default: []
    },
    activities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'activity'
      }
    ]
  },
  { collection: 'ACCOUNT_COLLEC' }
);

const Account = mongoose.model('account', accountSchema);

module.exports = Account;
