const mongoose = require('mongoose');
const Activity = require('./activities');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  age: Number,
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'activity'
    }
  ]
},{collection: "USER_COLLEC"});

UserSchema.virtual('countActivities').get(function() {
  return this.activities.length;
});


UserSchema.pre('remove',function(next) {
  Activity.remove({_id: {$in : this.activities}}).then(() => {
    next();
  });
});

const User = mongoose.model('user',UserSchema);
module.exports = User;
