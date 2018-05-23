const Sport = require('../models/sports');

module.exports = {
  getAll(req, res) {
    Sport.find().then( (sports) =>{
      res.send(sports);
    });
  },
  add(req, res) {

    const data = req.body;
    const name = data.sportName;

    const sport = new Sport({
      name: name
    });
    sport.save().then(
      () => {
        res.send(sport);
      },
      err => {
        res.send({
          status: 'ALREADY_EXISTS'
        });
      }
    );
  }
};
