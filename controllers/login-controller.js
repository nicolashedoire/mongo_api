const FacebookAccount = require('../models/facebookAccount');

module.exports = {
    connect(req, res) {
        // console.log(req.body);
        let account = new FacebookAccount(req.body);

        account.save().then(() => {
            res.send({
                status: '200'
            });
        }, (err) => {
            res.send({
                status: 'ALREADY_EXISTS'
            });
        })
    },
};
