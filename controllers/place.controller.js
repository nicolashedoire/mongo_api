places = [
  {
    id: 1,
    city: 'Lille',
    name: 'b148'
  },
  {
    id: 2,
    city: 'Lille',
    name: 'la plage'
  },
  {
    id: 3,
    city: 'Lille',
    name: 'la plage 2'
  },
  {
    id: 4,
    city: 'Lille',
    name: 'le kremlin'
  },
  {
    id: 5,
    city: 'Lille',
    name: 'la capsule'
  },
  {
    id: 6,
    city: 'Lille',
    name: 'le dernier bar avant la fin du monde'
  },
  {
    id: 7,
    city: 'Lille',
    name: 'le bar braz'
  },
  {
    id: 8,
    city: 'Lille',
    name: 'le dansy'
  },
  {
    id: 9,
    city: 'Lille',
    name: 'le bar parallèle'
  },
  {
    id: 10,
    city: 'Lille',
    name: 'le bartown'
  },
  {
    id: 11,
    city: 'Lille',
    name: 'le beerstro'
  },
  {
    id: 12,
    city: 'Lille',
    name: 'le tir na nog'
  },
  {
    id: 13,
    city: 'Lille',
    name: "l'irlandais"
  },
  {
    id: 14,
    city: 'Lille',
    name: 'le café oz the australian bar'
  },
  {
    id: 15,
    city: 'Lille',
    name: 'la pirogue'
  }
];

module.exports = {
  getAll(req, res) {
    res.send({
      status: 200,
      places: places
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
    console.log(req.body);
  }
};
