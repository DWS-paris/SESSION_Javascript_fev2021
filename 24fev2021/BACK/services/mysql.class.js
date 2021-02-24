/* 
Import
*/
    const mysql = require('mysql'); //=> https://www.npmjs.com/package/mysql
//


/* 
Définition
*/
    class MYSQLClass {
        constructor(){
            // Injecter des propriété dans la classe
            this.connection = mysql.createConnection({
                host: 'http://localhost',
                port: 8888,
                user: 'root',
                password: 'root',
                database: 'wf3_pwa'
            })
        }

        connectDb(){
            // Renvoyer une promesse pour assurer le retour de la base de données
            return new Promise( (resolve, reject) => {
                // Tenter de connecter la base de données
                this.connection.connect( (error) => {
                    // Tester la connection
                    return error
                    ? reject(err)
                    : resolve( this.connection )
                })
            })
        }
    }
//


/* 
Export
*/
    module.exports = MYSQLClass;
//
