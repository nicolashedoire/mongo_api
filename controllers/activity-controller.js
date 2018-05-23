const Activity = require('../models/activities');
const Account = require('../models/accounts');
const Query = require('../models/queries');
const Bar = require('../models/bars');
const Food = require('../models/food');
const ObjectId = require('mongoose').ObjectID;

module.exports = {
  readAll(req, res) {
    Account.findOne({
        id: req.query.userId
      })
      .populate('activities')
      .then(user => {
        res.send({
          activities: user.activities
        });
      });
  },
  readAllToday(req, res) {
    var startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    var endDate = new Date();
    var day = endDate.getDate() + 1;
    endDate.setDate(day);
    endDate.setHours(0, 0, 0, 0);

    Activity.find({
        user: req.query.userId,
        date: {
          $gte: startDate,
          $lte: endDate
        }
      })
      .populate('user')
      .populate('users')
      .then(results => {
        // show the admins in the past month
        res.send(results);
      });
  },
  read(req, res) {
    const id = req.params.id;
    Activity.findById({
      _id: id
    }).then(activity => {
      res.send({
        activity
      });
    });
  },
  getByPlaceId(req, res) {
    var startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    var endDate = new Date();
    var day = endDate.getDate() + 1;
    endDate.setDate(day);
    endDate.setHours(0, 0, 0, 0);

    const id = req.params.id;
    Activity.find({
        placeId: id,
        date: {
          $gte: startDate,
          $lte: endDate
        }
      })
      .populate('user')
      .then(activities => {
        res.send({
          activities: activities
        });
      });
  },
  create(req, res) {
    const label = req.body.label;
    const city = req.body.city;
    const time = req.body.time;
    const id = req.body.placeId;
    placeName = '';

    Bar.find({
      id: id
    }).then(bar => {
      placeName = bar[0].name;
      Account.findOne({
        id: req.body.userId
      }).then(user => {
        const activity = new Activity({
          label: label,
          placeName: placeName,
          placeId: id,
          time: time,
          user: user
        });
        user.activities.push(activity);
        user.isActive = true;
        user.save().then(() => {
          activity.save().then(() => {
            Account.findOne({
                id: req.body.userId
              })
              .populate('activities')
              .then(user => {
                res.send({
                  activities: user.activities
                });
              });
          });
        });
      });
    });
  },
  createFood(req, res) {
    const label = req.body.label;
    const city = req.body.city;
    const time = req.body.time;
    const id = req.body.placeId;
    placeName = '';

    Food.find({
      id: id
    }).then(food => {
      placeName = food[0].name;
      Account.findOne({
        id: req.body.userId
      }).then(user => {
        const activity = new Activity({
          label: label,
          placeName: placeName,
          placeId: id,
          time: time,
          user: user
        });
        user.activities.push(activity);
        user.isActive = true;
        user.save().then(() => {
          activity.save().then(() => {
            Account.findOne({
                id: req.body.userId
              })
              .populate('activities')
              .then(user => {
                res.send({
                  activities: user.activities
                });
              });
          });
        });
      });
    });
  },
  join(req, res) {
    const activityId = req.params.id;
    const user = req.body;
    Account.find({
      id: user.id
    }).then(user => {
      Activity.findById(activityId)
        .populate('users')
        .populate('user')
        .then(activity => {
          if (activity.user.id === user[0].id) {
            res.send({
              status: 'NOT_ALLOWED'
            });
            return;
          }
          for (let i = 0; i < activity.users.length; i++) {
            if (user[0].id === activity.users[i].id) {
              res.send({
                status: 'ALREADY_EXISTS'
              });
              return;
            }
          }
          activity.users.push(user[0]);
          activity.save().then(() => {
            query = new Query({
              activityId: activityId,
              userId: user[0].id,
              activity: activity
            });

            query.save().then(() => {
              res.send({
                status: 200
              });
            });
          });
        });
    });
  },
  delete(req, res) {
    const id = req.params.id;
    Activity.findById(id)
      .populate('user')
      .then(activity => {
        let userId = activity.user._id;
        Account.update({
          _id: userId
        }, {
          $pull: {
            activities: id
          }
        }).then(
          () => {
            Activity.findByIdAndRemove({
              _id: id
            }).then(activity => {
              Account.findById(userId).then((user) => {
                if (user.activities.length === 0) {
                  user.isActive = false;

                  user.save().then(() => {
                    res.send({
                      status: 200
                    });
                  })
                } else {
                  res.send({
                    status: 200
                  });
                }
              })
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