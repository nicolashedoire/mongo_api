const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const activitySchema = new Schema({
    label: {
        type : String
    },
     city:{
         type : String
     }

},{collection: "ACTIVITY_COLLEC"});

const Activity = mongoose.model('activity',activitySchema);


module.exports = Activity;

