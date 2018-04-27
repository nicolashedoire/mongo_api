UserController = require('../controllers/user-controller');
MovieController = require('../controllers/movie-controller');
LoginController = require('../controllers/login-controller');
ActivityController = require('../controllers/activity-controller');
GroupController = require('../controllers/group-controller');
PlaceController = require('../controllers/place.controller');
QuerieController = require('../controllers/query-controller');

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const env = require('../environments/dev');

const checkUserToken = function(req, res, next) {
  let token = req.header('authorization').split(' ');
  token = token[1];

  jwt.verify(token, env.secret, (err, decodedToken) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: 'Token expected' });
    }
    
    next();
  });
};

module.exports = server => {
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
  server.get('/activities/today', checkUserToken, ActivityController.readAllToday);
  server.get('/activity/:id', checkUserToken, ActivityController.read);
  server.post('/activity', checkUserToken, ActivityController.create);
  server.post('/activity/:id', checkUserToken, ActivityController.delete);
  server.post('/activity/join/:id', checkUserToken, ActivityController.join)

  server.get(
    '/activities/place/:id',
    checkUserToken,
    ActivityController.getByPlaceId
  );

  // QUERIES
  server.get('/queries', checkUserToken, QuerieController.readAll);
  server.delete('/querie/:id', checkUserToken, QuerieController.delete);
  server.get('/requests', checkUserToken, QuerieController.getFriendRequests);

  //GROUP
  server.get('/groups', checkUserToken, GroupController.readAll);
  server.get('/group/:id', checkUserToken, GroupController.read);
  server.post('/group', checkUserToken, GroupController.create);
  server.delete('/group', checkUserToken, GroupController.delete);

  //PLACE
  server.get('/search/:place', checkUserToken, PlaceController.search);
  server.get('/places', checkUserToken, PlaceController.getAll);
  server.post('/place', checkUserToken, PlaceController.add);
};
