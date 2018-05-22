const Query = require('../models/queries');
const Activity = require('../models/activities');
const Account = require('../models/accounts');

module.exports = {
  readAll(req, res) {
    const id = req.query.userId;
    Query.find({ userId: id })
      .populate('activity')
      .then(queries => {
        res.send(queries);
      });
  },
  getFriendRequests(req, res) {
    const id = req.query.userId;
    Account.findOne({id: id}).then(user => {
      Query.find()
      .populate("activity", null,  { user: user._id })
      .then(queries => {
        res.send(queries.filter((q) => !!q.activity));
      });
    });
  },
  delete(req, res) {
    const id = req.params.id;
    Query.findById(id).populate('activity').then(query => {
      let activityId = query.activityId;
      let userId = query.userId;
      Account.find({ id: userId }).then(user => {
        Activity.update(
          { _id: activityId },
          { $pull: { users: user[0]._id } }
        ).then(() => {
          Query.findByIdAndRemove({ _id: id }).then(query => {
            res.send({status: 200});
          });
        });
      });
    });
  },
  update(req, res) {
    const id = req.params.id;
    const status = req.body.status;
    Query.findByIdAndUpdate(id, { status : status}).then((response) => {
      console.log(response);
      res.send(response);
    });
  }
};
