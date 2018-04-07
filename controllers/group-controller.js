const Group = require('../models/groups');
const Account = require('../models/accounts');
module.exports = {
  readAll(req, res) {
    Group.find().then(groups => {
      console.log(groups);
      res.send({ groups: groups });
    });
  },
  read(req, res) {
    const id = req.params.id;
    Group.findById({ _id: id }).then(group => {
      res.send({ group });
    });
  },
  create(req, res) {
    const label = req.body.address;
    Account.findOne({ id: req.body.userId }).then(user => {
      const Group = new Group({ address, user});
      Group.save().then(() => {
        res.send({ group: Group });
      });
    });
  },

  delete(req, res) {
    const id = req.body.id;
    Group.findByIdAndRemove({ _id: id }).then(group => {
      res.send({ group });
    });
  }
};
