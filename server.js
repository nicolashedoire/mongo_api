const express = require('express');
const routes = require('./routes/index')
const bodyParser = require('body-parser');
const server = express();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

server.use(bodyParser.json());
server.set('json spaces', 2);
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
    