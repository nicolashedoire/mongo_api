const Activity = require('../models/activities');
const Account = require('../models/accounts');
const Bar = require('../models/bars');
const ObjectId = require('mongoose').ObjectID;

module.exports = {
  readAll(req, res) {
    Account.findOne({ id: req.query.userId })
      .populate('activities')
      .then(user => {
        res.send({ activities: user.activities });
      });
  },
  readAllToday(req, res) {
    var startDate = new Date();
    startDate.setHours( 0,0,0,0 );
    var endDate = new Date();
    var day  = endDate.getDate() + 1;
    endDate.setDate(day);
    endDate.setHours( 0,0,0,0);

    Activity.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    })
      .populate('user')
      .populate('users')
      .then( results => {
        // show the admins in the past month
        console.log(results);
        res.send(results);
      });
  },
  read(req, res) {
    const id = req.params.id;
    Activity.findById({ _id: id }).then(activity => {
      res.send({ activity });
    });
  },
  getByPlaceId(req, res) {
    const id = req.params.id;
    Activity.find({ placeId: id })
      .populate('user')
      .then(activities => {
        res.send({ activities: activities });
      });
  },
  create(req, res) {
    const label = req.body.label;
    const city = req.body.city;
    const time = req.body.time;
    const id = req.body.placeId;
    placeName = '';

    Bar.find({ id: id }).then(bar => {
      placeName = bar[0].name;
      Account.findOne({ id: req.body.userId }).then(user => {
        const activity = new Activity({
          label: label,
          placeName: placeName,
          placeId: id,
          time: time,
          user: user
        });
        user.activities.push(activity);
        user.save().then(() => {
          activity.save().then(() => {
            Account.findOne({ id: req.body.userId })
              .populate('activities')
              .then(user => {
                res.send({ activities: user.activities });
              });
          });
        });
      });
    });
  },
  join(req, res) {
    const activityId = req.params.id;
    const user = req.body;
    Account.find({id: user.id}).then((user) => {
      Activity.findById(activityId).populate('users').populate('user').then((activity) => {
        if(activity.user.id === user.id){
          res.send('NOT_ALLOWED');
          return;
        }

        for(let i = 0; i < activity.users.length; i++){
          console.log(user[0].id, activity.users[i].id);
          if(user[0].id === activity.users[i].id){
            res.send({
              status: 'ALREADY_EXISTS'
            });
            return;
          }
        }
        activity.users.push(user[0]);
        activity.save().then(() => {
          res.send({
            status: 200
          });
        });
      });
    });
  },
  delete(req, res) {
    const id = req.params.id;
    Activity.findById(req.params.id)
      .populate('user')
      .then(activity => {
        let userId = activity.user._id;
        Account.update({ _id: userId }, { $pull: { activities: id } }).then(
          () => {
            Activity.findByIdAndRemove({ _id: id }).then(activity => {
              res.send({
                status: 200
              });
            });
          },
          err => {
            res.send({
              status: 'error'
            });
          }
        );
      });
  }
};
