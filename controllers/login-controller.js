const Account = require('../models/accounts');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const env = require('../environments/dev');

function generateToken(user) {
  const token = jwt.sign({
      role: 'admin',
      email: user.email,
      id: user.id,
      image: user.image,
      name: user.name
    },
    env.secret, {
      expiresIn: '1h'
    }
  );
  // check jwt => https://jwt.io/
  return token;
}

module.exports = {
  connect(req, res) {
    Account.find({
      id: req.body.id
    }).then(result => {
      let account = new Account(req.body);
      if (result.length === 0) {
        account.save().then(
          () => {
            res.send({
              status: '200',
              token: generateToken(account)
            });
          });
      } else {
        res.send({
          status: 'ALREADY_EXISTS',
          token: generateToken(account)
        });
      }
    });
  }
};