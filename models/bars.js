const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barSchema = new Schema({
    formatted_address: {
        type : String
    },
    id:{
        type : String,
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
            type: String
        },
        lng: {
            type: String
        }
    }
},{collection: "BAR_COLLEC"});

const Bar = mongoose.model('bar',barSchema);


module.exports = Bar;

