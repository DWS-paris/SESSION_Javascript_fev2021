/* 
Imports
*/
    require('dotenv').config(); //=> https://www.npmjs.com/package/dotenv
    const express = require('express'); //=> https://www.npmjs.com/package/express
    const bodyParser = require('body-parser'); //=> https://www.npmjs.com/package/body-parser
    const path = require('path'); //=> https://www.npmjs.com/package/path

    // Importer le service MySql
    const MYSQLClass = require('./services/mysql.class')
//


/* 
Définition du serveur
*/
    class ServerClass{
        constructor(){
            // Injecter des propriété dans la classe
            this.server = express();
            this.port = process.env.PORT;
            this.MYSQL = new MYSQLClass;
        }

        init(){
            // Définir le moteur de rendu
            this.server.set( 'view engine', 'ejs' );

            // Définir l'url du dossier static des pages
            this.server.set( 'views', __dirname + '/www' );
            this.server.use( express.static(path.join(__dirname, 'www')) );

            // Configurer Body Parser
            this.server.use(bodyParser.json({limit: '20mb'}));
            this.server.use(bodyParser.urlencoded({ extended: true }));

            // Lancer la configuration des routes
            this.config()
        }

        config(){
            // Connecter la base de données MYsql
            this.MYSQL.connectDb()
            .then( connection => {
                // Définir la route API pour récupérer la liste des pages
                this.server.get('/api/page', (req, res) => {
                    // Récupérer la liste des pages dans la base de données
                    connection.query('SELECT * FROM page', ( err, data ) => {
                        // Renvoyer le flux JSON dans la route de l'API
                        return err
                        ? res.json({ error: err, data: null })
                        : res.json({ error: null, data: data });
                    })
                })

                // Définir la route pour afficher la page permettant de gérer les contacts
                this.server.get('/contact', (req, res) => {
                    // Récupérer la liste des pages dans la base de données
                    connection.query('SELECT * FROM contact', ( err, data ) => {
                        // Rendre dans la réponse la vue de la page d'accueil
                        return err
                        ? res.render('contact', { error: err, data: null })
                        : res.render('contact', { error: null, data: data });
                    })
                })

                // Définir la route pour afficher la page permettant de gérer le portfolio
                this.server.get('/portfolio', (req, res) => {
                    // Récupérer la liste des pages dans la base de données
                    connection.query('SELECT * FROM portfolio', ( err, data ) => {
                        // Rendre dans la réponse la vue de la page d'accueil
                        return err
                        ? res.render('portfolio', { error: err, data: null })
                        : res.render('portfolio', { error: null, data: data });
                    })
                })

                // Définir la route pour afficher la page permettant de gérer les expériences
                this.server.get('/experience', (req, res) => {
                    // Récupérer la liste des pages dans la base de données
                    connection.query('SELECT * FROM experience', ( err, data ) => {
                        // Rendre dans la réponse la vue de la page d'accueil
                        return err
                        ? res.render('experience', { error: err, data: null })
                        : res.render('experience', { error: null, data: data });
                    })
                })





                // Définir la route pour afficher la liste des pages et ajouter une page
                this.server.get('/page', (req, res) => {
                    // Récupérer la liste des pages dans la base de données
                    connection.query('SELECT * FROM page', ( err, data ) => {
                        // Rendre dans la réponse la vue de la page d'accueil
                        return err
                        ? res.render('page', { error: err, data: null })
                        : res.render('page', { error: null, data: data });
                    })
                })

                this.server.post('/create/:type', (req, res) => {
                    // Ajouter les données dans la base de données
                    connection.query(`INSERT INTO ${req.params.type} SET ?`, req.body, (err, data) => {
                        return err
                        ? res.redirect(`/${req.params.type}`)
                        : res.redirect(`/${req.params.type}`);
                    })
                })

                // Définir la route pour ajouter du contenu dans la base de données
                this.server.post('/update/:type/:id', (req, res) => {
                    // Ajouter les données dans la base de données
                    connection.query(`
                        UPDATE  ${req.params.type}
                        SET title="${req.body.title}"
                        WHERE id=${req.params.id}
                    `, (err, data) => {
                        return err
                        ? res.redirect(`/update/${req.params.type}/${req.params.id}`)
                        : res.redirect(`/update/${req.params.type}/${req.params.id}`);
                    })
                })

                // Définir la route pour ajouter du contenu dans la base de données
                this.server.get('/update/:type/:id', (req, res) => {
                    // Ajouter les données dans la base de données
                    connection.query(`SELECT * FROM ${req.params.type} WHERE id=${req.params.id}`, (err, data) => {
                        return err
                        ? res.render('update', { type: req.params.type, err: err, data: null })
                        : res.render('update', { type: req.params.type, err: null, data: data[0] });
                    })
                })

                


                // Définir la route pour supprimer du contenu de la base de données
                this.server.post('/delete/:type', (req, res) => {
                    // Ajouter les données dans la base de données
                    connection.query(`DELETE from ${req.params.type} WHERE id=${req.body.id}`, (err, data) => {
                        return err
                        ? res.redirect(`/${req.params.type}`)
                        : res.redirect(`/${req.params.type}`);
                    })
                })






                // Définir la route de la page d'accueil du backoffice
                this.server.get('/', (req, res) => {
                    res.render('index')
                })

                // Lancer le serveur
                this.launch();
            })
            .catch( connectionError => {
                console.log(`MYsql connection error: ${connectionError}`)
            })
        }

        launch(){
            this.server.listen(this.port, () => {
                console.log({
                    node: `http://localhost:${this.port}`
                })
            })
        }
    }
//


/* 
Lancer le serveur
*/
    const BACKOFFICEpwa = new ServerClass();
    BACKOFFICEpwa.init();
//