/* 
Imports
*/
    const express = require('express'); //=> https://www.npmjs.com/package/express
    const bodyParser = require('body-parser'); //=> https://www.npmjs.com/package/body-parser
    const path = require('path'); //=> https://www.npmjs.com/package/path
//


/* 
Définition du serveur
*/
    class ServerClass{
        constructor(){
            // Injecter des propriété dans la classe
            this.server = express();
            this.port = 8769
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
            // Définir la route de la page d'accueil du backoffice
            this.server.get('/', (req, res) => {
                // Rendre dans la réponse la vue de la page d'accueil
                return res.render('index')
            })

            // Lancer le serveur
            this.launch();
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