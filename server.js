const express = require('express');
const routes = require('./routes/index')
const bodyParser = require('body-parser');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

mongoose.Promise = global.Promise;

const secret = 'APLMDJKN481DJNOIJSOKPCO48';

server.use(bodyParser.json());
server.set('json spaces', 2);

server.set('superSecret', secret); // secret variable

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
    