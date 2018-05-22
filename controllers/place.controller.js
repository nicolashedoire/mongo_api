const Bar = require('../models/bars');
const Food = require('../models/food');

places = [];

module.exports = {
  getAll(req, res) {
    Bar.find().then( (bars) =>{
      places = bars;
      res.send(bars);
    });
  },
  search(req, res) {
    let findedPlaces = places.filter(place =>
      place.name.includes(req.params.place)
    );

    res.send({
      status: 200,
      places: findedPlaces
    });
  },
  add(req, res) {
    const data = req.body;
    const formatted_adresss = data.formatted_address;
    const id = data.id;
    const name = data.name;
    const place_id = data.place_id;
    const vicinity = data.vicinity;
    const location = data.geometry.location;
    const photo = data.photo;

    const bar = new Bar({
      formatted_adresss: formatted_adresss,
      id: id,
      name: name,
      place_id: place_id,
      vicinity: vicinity,
      location: location,
      photo: photo
    });
    bar.save().then(
      () => {
        res.send(bar);
      },
      err => {
        res.send({
          status: 'ALREADY_EXISTS'
        });
      }
    );
  }
};
