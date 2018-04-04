const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const facebookAccountSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    token: {
        type: String
    },
    image: {
        type: String
    },
    provider: {
        type: String
    }

}, { collection: "FACEBOOK_COLLEC" });

const FacebookAccount = mongoose.model('facebookAcount', facebookAccountSchema);


module.exports = FacebookAccount;

