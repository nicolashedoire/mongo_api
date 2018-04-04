const FacebookAccount = require('../models/facebookAccount');

module.exports = {    
    connect (req,res) {
        let account = new FacebookAccount(req.body).save().then(() => {
            res.send({
                status : '200'
            });
        })
    },
};
