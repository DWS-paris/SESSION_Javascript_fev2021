/* 
Créer une fonction pour exécuter une requête ASYNC
*/
    const getData = (type, id = null) => {
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
                : console.log(jsonData)
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
Créer une fonction pour afficher la liste d'articles
*/
    const displayPosts = ( htmlTag, data ) => {
        // Faire une boucle sur la collection data
        for( let item of data ){
            // Modifier le DOM
            document.querySelector(htmlTag).innerHTML += `
                <li>
                    <a href="${item.id}" class="postLink">${item.title}</a>
                </li>
            `;
        }

        // Capter le click sur les balise ".postLink"
        getLinkClick('.postLink')
    }
//

/* 
Créer une fonction pour capter le click sur les balise ".postLink"
*/
    const getLinkClick = (htmlTags) => {
        // Faire une boucle sur la collection de liens
        for( let item of  document.querySelectorAll(htmlTags)){
            // Capter le click sur chaque balise ".postLink"
            item.addEventListener('click', (event) => {
                // Bloquer le comportement par défaut de la balise a
                event.preventDefault();

                // Lancer la requête HTTP GET
                getData('posts', event.target.getAttribute('href'));
            })
        }
    }
//


/* 
Lancer l'interface
*/
    document.addEventListener('DOMContentLoaded', () => {
        // Lancer la requête HTTP GET
        getData('posts');
    })
//