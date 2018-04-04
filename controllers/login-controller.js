const Account = require('../models/accounts');

module.exports = {
    connect(req, res) {
        // console.log(req.body);
        let account = new Account(req.body);

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
