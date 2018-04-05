const Account = require('../models/accounts');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

function generateToken() {
  return jwt.sign({ user: true }, 'APLMDJKN481DJNOIJSOKPCO48', { expiresIn: '1h' });
}

module.exports = {
  connect(req, res) {
    // console.log(req.body);
    let account = new Account(req.body);

    account.save().then(
      () => {
        res.send({
          status: '200',
          token: generateToken()
        });
      },
      err => {
        res.send({
          status: 'ALREADY_EXISTS',
          token: generateToken()
        });
      }
    );
  }
};
