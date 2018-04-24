const Activity = require('../models/activities');
const Account = require('../models/accounts');
const Bar = require('../models/bars');

module.exports = {
  readAll(req, res) {
    Account.findOne({ id: req.query.userId })
      .populate('activities')
      .then(user => {
          res.send({ activities: user.activities });
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
    Activity.find({placeId: id})
      .populate('user')
      .then(activities => {
      res.send({activities: activities});
    });
  },
  create(req, res) {
    
    const label = req.body.label;
    const city = req.body.city;
    const time = req.body.time;
    const id = req.body.placeId;
    placeName = '';

    Bar.find({id: id}).then(bar => {
      placeName = bar[0].name;
      Account.findOne({ id: req.body.userId }).then(user => {
        const activity = new Activity({ label: label, placeName: placeName, placeId: id, time: time, user: user });
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

  delete(req, res) {
    const id = req.params.id;
    Activity.findByIdAndRemove({ _id: id }).then(activity => {
      res.send({ activity });
    });
  }
};
