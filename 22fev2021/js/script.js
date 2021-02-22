/* 
Créer une fonction pour exécuter une requête ASYNC
*/
    const getData = () => {
        // Lancer une fonction Fetch
        fetch('http://localhost:3000/posts')
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
            // Afficher la liste d'articles
            displayPosts('#postList', jsonData)
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
                <li>${item.title}</li>
            `;
        }
    }
//


/* 
Lancer l'interface
*/
    document.addEventListener('DOMContentLoaded', () => {
        // Lancer la requête HTTP GET
        getData();
    })
//