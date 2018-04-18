const express = require('express');
const compression = require('compression');
const routes = require('./routes/index')
const bodyParser = require('body-parser');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const env = require('./environments/dev');

// Override mongoose promise by global promise
mongoose.Promise = global.Promise;

server.use(bodyParser.json());
server.use(compression());
server.set('json spaces', 2);

server.set('superSecret', env.secret); // secret variable

// Allow access control origin
server.use(cors())

routes(server);

server.listen(4000, () =>{
    console.log("Serveur demarré en écoute sur le porte 4000")
    mongoose.connect('mongodb://localhost/friends_finder');
    mongoose.connection
    .once('open',() => console.log("Connexion à MongoDB établie !"))
    .on('error',(error) => {
        console.warn('Warning',error);
    });
});
    