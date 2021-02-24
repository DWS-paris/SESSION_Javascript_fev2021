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
                host     : process.env.MYSQL_HOST,
                port     :  process.env.MYSQL_PORT,
                user     : process.env.MYSQL_USER,
                password : process.env.MYSQL_PASS,
                database : process.env.MYSQL_DB
            })
        }

        connectDb(){
            // Renvoyer une promesse pour assurer le retour de la base de données
            return new Promise( (resolve, reject) => {
                // Tenter de connecter la base de données
                this.connection.connect( (error) => {
                    // Tester la connection
                    return error
                    ? reject(error)
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
