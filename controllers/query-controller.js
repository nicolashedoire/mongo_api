const Query = require('../models/queries');
module.exports = {
    readAll (req,res) {
        const id = req.query.userId
        Query.find({userId: id}).populate('activity').then( (queries) => {
            console.log(queries);
            res.send(queries);
        });
    },  
    delete(req,res){
         const id = req.body.id;
         Query.findByIdAndRemove({_id:id}).then( (query) =>{
             res.send({query});
         }); 
    },
};