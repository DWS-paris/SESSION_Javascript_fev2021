/*
Imports
*/
    // Node
    const express = require('express');

    // Importer les fonctions du controlleur
    const { getContent } = require('../controllers/api.controller');
//

/*  
Routes definition
*/
    class RouterClass {
        constructor( { connection } ){
            this.router = express.Router(); 
            this.connection = connection; 
        }

        routes(){
            // Définir la route API pour récupérer la liste des pages
            this.router.get('/page/:endpoint', async (req, res) => getContent(this.connection, req, res))
        }

        init(){
            // Get route fonctions
            this.routes();

            // Sendback router
            return this.router;
        };
    }
//

/*
Export
*/
    module.exports = RouterClass;
//