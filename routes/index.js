UserController = require('../controllers/user-controller');
MovieController = require('../controllers/movie-controller');
LoginController = require('../controllers/login-controller');
ActivityController = require('../controllers/activity-controller');
GroupController = require('../controllers/group-controller');
PlaceController = require('../controllers/place.controller');

module.exports = (server) => {
    // Envoi les parametres req et res de facon cachée a votre fonction.

    //LOGIN
    server.post('/login', LoginController.connect);

    //USER
    server.get('/users', UserController.readAll);
    server.get('/user/:id', UserController.read);
    server.post('/user', UserController.create);
    server.delete('/user', UserController.delete);

    //MOVIE
    server.get('/movies', MovieController.readAll);
    server.get('/movie/:id', MovieController.read);
    server.post('/movie', MovieController.create);
    server.delete('/movie', MovieController.delete);

    //ACTIVITY
    server.get('/activities', ActivityController.readAll);
    server.get('/activity/:id', ActivityController.read);
    server.post('/activity', ActivityController.create);
    server.delete('/activity', ActivityController.delete);

    server.get('activities/place/:id', ActivityController.getByPlaceId);

    //GROUP
    server.get('/groups', GroupController.readAll);
    server.get('/group/:id', GroupController.read);
    server.post('/group', GroupController.create);
    server.delete('/group', GroupController.delete);

    //PLACE
    server.get('/search/:place', PlaceController.search);
    server.get('/places', PlaceController.getAll);
}


