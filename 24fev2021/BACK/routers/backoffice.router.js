/*
Imports
*/
    // Node
    const express = require('express');

    // Importer les fonctions du controller
    const { createType, updateType, getTypeId, deleteTypeId, getEndpoint } = require('../controllers/backoffice.controller');
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
            // Définir la route pour créer un contenu
            this.router.post('/create/:type', (req, res) => createType(this.connection, req, res))

            // Définir la route pour ajouter du contenu dans la base de données
            this.router.post('/update/:type/:id', (req, res) => updateType(this.connection, req, res))

            // Définir la route pour ajouter du contenu dans la base de données
            this.router.get('/update/:type/:id', (req, res) => getTypeId(this.connection, req, res))


            // Définir la route pour supprimer du contenu de la base de données
            this.router.post('/delete/:type', (req, res) => deleteTypeId(this.connection, req, res))

            // Définir la route pour afficher les page de création/edition
            this.router.get('/:endpoint', (req, res) => getEndpoint(this.connection, req, res))


            // Définir la route de la page d'accueil du backoffice
            this.router.get('/', (req, res) => { res.render('index') })

            // Rediriger les routes inconnues
            this.router.get('/*', (req, res) => { res.redirect('/') })
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