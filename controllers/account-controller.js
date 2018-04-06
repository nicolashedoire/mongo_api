const Account = require('../models/accounts');
module.exports = {
    
    readAll (req,res) {
        Account.find().then( (accounts) =>{
             res.send(accounts);
        });
    },
    read (req,res) {
        const id = req.params.id;
        Account.findById({_id:id}).then( (account) => {
             res.send({account});
        })
       
    },
        
    delete(req,res){
         const id = req.body.id;
         Account.findByIdAndRemove({_id:id}).then( (account) =>{
             res.send({account});
         }); 
    },

    
};