const FacebookAccount = require('../models/facebookAccount');

module.exports = {
    connect(req, res) {
        // console.log(req.body);
        let account = new FacebookAccount(req.body);

        FacebookAccount.find({ id : account.id }).then((response) => {
            if (response.length) {
                res.send({
                    status: 'ALREADY_EXISTS'
                });
            } else {
                account.save().then(() => {
                    res.send({
                        status: '200'
                    });
                })
            }
        });
    },
};
