/*  
Controller definition
*/
    const getContent = ( connection, req, res ) => {
            // Vérifier le endpoint pour renvoyer les bonnes données dans la route
            if( req.params.endpoint === 'home' ){
                // Récupérer le contenu de la page home
                connection.query('SELECT * FROM page WHERE section="homePage"', (err, data) => {
                    return err
                    ? res.json({ err: err, data: null })
                    : res.json({ err: null, data: data })
                })
            }
            else if( req.params.endpoint === 'about' ){
                // Récupérer le contenu de la page about
                connection.query('SELECT * FROM page WHERE section="aboutPage"', (err, mainContent) => {
                    // Récupérer les éxpériences scolaires
                    connection.query('SELECT * FROM experience WHERE category="school"', (err, school) => {
                        // Récupérer les éxpériences pro
                        connection.query('SELECT * FROM experience WHERE category="professional"', (err, professional) => {
                            // Renvoyer les données dans la route
                            return res.json({ err: null, data: { main: mainContent, school, professional  } })
                        })
                        
                    })
                })
            }
            else if( req.params.endpoint === 'portfolio' ){
                // Récupérer le contenu de la page portfolio
                connection.query('SELECT * FROM page WHERE section="portfolioPage"', (err, mainContent) => {
                    // Récupérer les projet
                    connection.query('SELECT * FROM portfolio', (err, projects) => {
                        // Renvoyer les données dans la route
                        return res.json({ err: null, data: { main: mainContent, projects  } })
                    })
                })
            }
            else if( req.params.endpoint === 'contact' ){
                // Récupérer le contenu de la page portfolio
                connection.query('SELECT * FROM page WHERE section="contactsPage"', (err, mainContent) => {
                    // Récupérer les projet
                    connection.query('SELECT * FROM contact', (err, contacts) => {
                        // Renvoyer les données dans la route
                        return res.json({ err: null, data: { main: mainContent, contacts  } })
                    })
                })
            }
            else{
                return res.json( { err: "Endpoint unknow", data: null } );
            }
    }

    const getNav = ( connection, req, res ) => {
        // Récupérer le contenu de la page portfolio
        connection.query('SELECT * FROM navigation', (err, mainContent) => {
            return res.json({ err: null, data: { main: mainContent } })
        })
    }
//

/*
Export
*/
    module.exports = {
        getContent,
        getNav
    };
//