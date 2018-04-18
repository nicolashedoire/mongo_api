UserController = require('../controllers/user-controller');
MovieController = require('../controllers/movie-controller');
LoginController = require('../controllers/login-controller');
ActivityController = require('../controllers/activity-controller');
GroupController = require('../controllers/group-controller');
PlaceController = require('../controllers/place.controller');

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


const checkUserToken = function(req, res, next) {
    console.log(req.header('authorization'));
    const token = req.header('authorization');

    jwt.verify(token, secret, (err, decodedToken) => {
        if(err){
            console.error(err);
            return res.status(401).json({success: false, message: 'Token expected'});
        }
    });

    // TODO verify JWT
    next();
}

module.exports = (server) => {
    // Envoi les parametres req et res de facon cachée a votre fonction.

    //LOGIN
    server.post('/login', LoginController.connect);

    //USER
    server.get('/users', checkUserToken, UserController.readAll);
    server.get('/user/:id', checkUserToken, UserController.read);
    server.post('/user', checkUserToken, UserController.create);
    server.delete('/user', checkUserToken, UserController.delete);

    //ACTIVITY
    server.get('/activities', checkUserToken, ActivityController.readAll);
    server.get('/activity/:id', checkUserToken, ActivityController.read);
    server.post('/activity', checkUserToken, ActivityController.create);
    server.delete('/activity/:id', checkUserToken, ActivityController.delete);

    server.get('/activities/place/:id', checkUserToken, ActivityController.getByPlaceId);

    //GROUP
    server.get('/groups', checkUserToken, GroupController.readAll);
    server.get('/group/:id', checkUserToken, GroupController.read);
    server.post('/group', checkUserToken, GroupController.create);
    server.delete('/group', checkUserToken,  GroupController.delete);

    //PLACE
    server.get('/search/:place', checkUserToken, PlaceController.search);
    server.get('/places', checkUserToken, PlaceController.getAll);
}


