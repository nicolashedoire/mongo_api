const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
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
    }

}, { collection: "ACCOUNT_COLLEC" });

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;

