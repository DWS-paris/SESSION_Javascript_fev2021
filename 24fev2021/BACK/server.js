/* 
Imports
*/
    require('dotenv').config(); //=> https://www.npmjs.com/package/dotenv
    const express = require('express'); //=> https://www.npmjs.com/package/express
    const bodyParser = require('body-parser'); //=> https://www.npmjs.com/package/body-parser
    const path = require('path'); //=> https://www.npmjs.com/package/path
    const favicon = require('serve-favicon') //=> https://www.npmjs.com/package/serve-favicon'

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
            // Définir les CORS via un middleware
            this.server.use( (req, res, next) => {
                // Define allowed origins
                const allowedOrigins = process.env.ALLOWED_ORIGINS.split(', ');
                const origin = req.headers.origin;

                // Setup CORS
                if(allowedOrigins.indexOf(origin) > -1){ res.setHeader('Access-Control-Allow-Origin', origin)}
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE']);
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

                // Use next() function to continu routing
                next();
            });

            // Définir le moteur de rendu
            this.server.set( 'view engine', 'ejs' );

            // Définir l'url du dossier static des pages
            this.server.set( 'views', __dirname + '/www' );
            this.server.use( express.static(path.join(__dirname, 'www')) );

            // Configurer Body Parser
            this.server.use(bodyParser.json({limit: '20mb'}));
            this.server.use(bodyParser.urlencoded({ extended: true }));

            // Setup favicon
            this.server.use(favicon(path.join(__dirname, 'www', 'ico.ico')))

            // Lancer la configuration des routes
            this.config();
        }

        config(){
            // Connecter la base de données MYsql
            this.MYSQL.connectDb()
            .then( connection => {

                // Importer le router API
                const ApiRouterClass = require('./routers/api.router');
                const apiRouter = new ApiRouterClass( { connection } );
                this.server.use('/api', apiRouter.init())

                // Importer le router Backoffice
                const BackRouterClass = require('./routers/backoffice.router');
                const backRouter = new BackRouterClass( { connection } );
                this.server.use('/', backRouter.init())


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