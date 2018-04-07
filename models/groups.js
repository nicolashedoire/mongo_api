const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AccountSchema = require('./accounts').schema;

const groupSchema = new Schema({
    address: {
        type : String
    },
    users: [
        {
          type: Schema.Types.ObjectId,
          ref: 'account'
        }
      ]

},{collection: "GROUP_COLLEC"});

const Group = mongoose.model('group', groupSchema);

module.exports = Group;
