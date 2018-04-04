module.exports = {    
    connect (req,res) {
        console.log(req.body);
        res.send({
            status : '200'
        });
    },
};
