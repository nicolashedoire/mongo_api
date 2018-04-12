places = [
    {
        city: 'Lille',
        name: 'b148'
    },
    {
        city: 'Lille',
        name: 'la plage'
    },
    {
        city: 'Lille',
        name: 'le kremlin'
    },
];



module.exports = {
    
    search (req,res) {
     // TODO
     console.log(req.params.place);

     let findedPlaces = places.filter(place => place.name.includes(req.params.place));

     res.send({
         status: 200,
         places: findedPlaces 
     });  
    }
};