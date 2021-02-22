/* 
Créer une fonction pour utiliser la méthode HTTP GET
*/
    const getData = (type, id = null, update = false) => {
        // Définir le endpoint
        let endpoint = null;

        id === null 
        ? endpoint = type
        : endpoint = `${type}/${id}`;

        // Lancer une fonction Fetch
        fetch(`http://localhost:3000/${endpoint}`)
        .then( reponse => {
            // Vérifier l'état de la réponse
            if( reponse.ok === false ){
                // Afficher l'erreur dans la console
                console.log(reponse)
            }
            else{
                // Extraire les données JSON de la réponse
                return reponse.json()
            }
        })
        .then( jsonData => {
            // Tester le paramêtre type
            if( type === 'posts' ){
                // Tester le paramêtre id
                id === null
                ? displayPosts('#postList', jsonData)
                : displaySinglePost('#mainContent', jsonData, update)
            }
            else{
                console.log(type)
            }
        })
        .catch( error => {
            console.log(error)
        });
    }
//

/* 
Créer une fonction pour utiliser la méthode HTTP POST
*/
    const postData = (endpoint, data) => {
        // Mise en place d'une fonction Fetch en POST
        fetch(`http://localhost:3000/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( reponse => {
            // Vérifier l'état de la réponse
            if( reponse.ok === false ){
                // Afficher l'erreur dans la console
                console.log(reponse)
            }
            else{
                // Extraire les données JSON de la réponse
                return reponse.json()
            }
        })
        .then( jsonData => {
            // Réinitialiser le formulaire
            resetForm();

            // Recharger le contenu de l'API
            getData('posts');

            console.log(jsonData)
        })
        .catch( error => {
            console.log(error)
        });
    }
//

/* 
Créer une fonction pour utiliser la méthode HTTP PUT
*/
    const putData = (endpoint, id, data) => {
        // Mise en place d'une fonction Fetch en PUT
        fetch(`http://localhost:3000/${endpoint}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( reponse => {
            // Vérifier l'état de la réponse
            if( reponse.ok === false ){
                // Afficher l'erreur dans la console
                console.log(reponse)
            }
            else{
                // Extraire les données JSON de la réponse
                return reponse.json()
            }
        })
        .then( jsonData => {
            // Réinitialiser le formulaire
            resetForm();

            // Recharger le contenu de l'API
            getData('posts');

            console.log(jsonData)
        })
        .catch( error => {
            console.log(error)
        });
    }
//

/* 
Créer une fonction pour utiliser la méthode HTTP DELETE
*/
    const deletePost = (endpoint, id) => {
        // Mise en place d'une fonction Fetch en POST
        fetch(`http://localhost:3000/${endpoint}/${id}`, {
            method: 'DELETE'
        })
        .then( reponse => {
            // Vérifier l'état de la réponse
            if( reponse.ok === false ){
                // Afficher l'erreur dans la console
                console.log(reponse)
            }
            else{
                // Extraire les données JSON de la réponse
                return reponse.json()
            }
        })
        .then( jsonData => {
            // Recharger le contenu de l'API
            getData('posts');

            console.log(jsonData)
        })
        .catch( error => {
            console.log(error)
        });
    }
//

/* 
Créer une fonction pour afficher la liste d'articles
*/
    const displayPosts = ( htmlTag, data ) => {
        // Réinitialiser la liste d'article
        document.querySelector(htmlTag).innerHTML = '';

        // Faire une boucle sur la collection data
        for( let item of data ){
            // Modifier le DOM
            document.querySelector(htmlTag).innerHTML += `
                <li>
                    <a href="${item.id}" class="postLink">${item.title}</a>
                    <button type="button" class="deleteBtn" data-id="${item.id}"><i class="fas fa-times"></i></button>
                    <button type="button" class="updateBtn" data-id="${item.id}"><i class="fas fa-pen"></i></button>
                </li>
            `;
        }

        // Capter le click sur les balise ".postLink"
        getLinkClick('.postLink', '.deleteBtn', '.updateBtn')
    }
//

/* 
Créer une fonction pour capter le click sur les balise ".postLink"
*/
    const getLinkClick = (linkTags, deleteTags, updateTags) => {
        // Faire une boucle sur la collection de liens
        for( let item of  document.querySelectorAll(linkTags)){
            // Capter le click sur chaque balise ".postLink"
            item.addEventListener('click', (event) => {
                // Bloquer le comportement par défaut de la balise a
                event.preventDefault();

                // Lancer la requête HTTP GET
                getData('posts', event.target.getAttribute('href'));
            })
        }

        // Faire une boucle sur la collection de boutons
        for( let item of  document.querySelectorAll(deleteTags)){
            // Capter le click sur chaque balise ".postLink"
            item.addEventListener('click', (event) => {
                // Lancer la requête HTTP DELETE
                deletePost('posts', item.getAttribute('data-id'))
            })
        }

        // Faire une boucle sur la collection de boutons
        for( let item of  document.querySelectorAll(updateTags)){
            // Capter le click sur chaque balise ".postLink"
            item.addEventListener('click', (event) => {
                // Lancer la requête HTTP PUT
                getData('posts', item.getAttribute('data-id'), true );
            })
        }
    }
//

/* 
Créer une fonction pour afficher le contenu d'un article
*/
    const displaySinglePost = ( htmlTag, data, update ) => {
        // Vérifier le paramêtre update
        if( update === false ){
            // Afficher l'article
            document.querySelector(htmlTag).innerHTML = `
                <h1>${data.title}</h1>
                <p>${data.content}</p>
                <p>Par ${data.author}</p>
            `;
        }
        else{
            // Mettre à jour les champs du formulaire
            document.querySelector('#addPost form').setAttribute('method', 'PUT');
            document.querySelector('[name="title"]').value = data.title;
            document.querySelector('[name="content"]').value = data.content;
            document.querySelector('[name="post-id"]').value = data.id;

            // Mettre à jour le bouton du formulaire
            document.querySelector('[type="submit"]').innerHTML = 'Mettre à jour';
        }
        
    }
//


/* 
Créer une fonction pour capter le submit du formulaire
*/
    const getFormSubmit = (htmlTag) => {
        document.querySelector(htmlTag).addEventListener('submit', (event) => {
            // Bloquer le comportement par défaut du formulaire
            event.preventDefault();

            // TODO: vérifier les champs du formulaire

            // Créer un objet à envoyer dans le body de la requête
            const bodyData = {
                title: document.querySelector('[name="title"]').value,
                content: document.querySelector('[name="content"]').value,
                author: 'Julien'
            }

            // Vérifier la méthode du formulaire
            if( event.target.getAttribute('method') === 'POST' ){
                // Utiliser la fonction postData pour ajouter un nouvel article dans la BDD
                postData('posts', bodyData);
            }
            else{
                // Utiliser la fonction putData pour modifier un article dans la BDD
                putData('posts', document.querySelector('[name="post-id"]').value, bodyData);
            }
        })
    }
//

/* 
Créer une méthode pour réinitialiser le formulaire
*/
    const resetForm = () => {
        // Réinitialiser les champs du formulaire
        document.querySelector('#addPost form').reset();

        // Réinitialiser la méthode du formulaire
        document.querySelector('#addPost form').setAttribute('method', 'POST');

        // Réinitialiser le bouton du formulaire
        document.querySelector('[type="submit"]').innerHTML = 'Ajouter'
    }
//


/* 
Lancer l'interface
*/
    document.addEventListener('DOMContentLoaded', () => {
        // Lancer la requête HTTP GET
        getData('posts');

        // Capter la soumission du formulaire
        getFormSubmit('#addPost form');
    })
//