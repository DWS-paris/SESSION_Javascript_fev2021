/*  
Controller definition
*/
    const createType = (connection, req, res) => {
        // Ajouter les données dans la base de données
        connection.query(`INSERT INTO ${req.params.type} SET ?`, req.body, (err, data) => {
            return err
            ? res.redirect(`/${req.params.type}`)
            : res.redirect(`/${req.params.type}`);
        })
    }

    const updateType = (connection, req, res) => {
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
    }

    const getTypeId = (connection, req, res) => {
        // Ajouter les données dans la base de données
        connection.query(`SELECT * FROM ${req.params.type} WHERE id=${req.params.id}`, (err, data) => {
            return err
            ? res.render('update', { type: req.params.type, err: err, data: null })
            : res.render('update', { type: req.params.type, err: null, data: data[0] });
        })
    }

    const deleteTypeId = (connection, req, res) => {
        // Ajouter les données dans la base de données
        connection.query(`DELETE from ${req.params.type} WHERE id=${req.body.id}`, (err, data) => {
            return err
            ? res.redirect(`/${req.params.type}`)
            : res.redirect(`/${req.params.type}`);
        })
    }

    const getEndpoint = (connection, req, res) => {
        // Récupérer la liste des pages dans la base de données
        connection.query(`SELECT * FROM ${req.params.endpoint}`, ( err, data ) => {
            // Rendre dans la réponse la vue de la page d'accueil
            return err
            ? res.render(req.params.endpoint, { error: err, data: null })
            : res.render(req.params.endpoint, { error: null, data: data });
        })
    }
//

/*
Export
*/
    module.exports = {
        createType,
        updateType,
        getTypeId,
        deleteTypeId,
        getEndpoint
    };
//