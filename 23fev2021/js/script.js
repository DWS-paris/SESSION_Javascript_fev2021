/* 
Déclarations
*/
//


/* 
Fonctions
*/
    const displayNav = (htmlTag) => {
        // Utiliser la classe FETCHclass pour récupérer les données
        new FETCHclass('http://localhost:3000/nav', 'GET').sendRequest()
        .then( jsonData => {
            // Modifier le DOM
            for( let item of jsonData ){
                document.querySelector(htmlTag).innerHTML += `
                    <li>
                        <a href="${item.content}" class="navLink">${item.name}</a>
                    </li>
                `;
            }

            // Capter le clic sur le burger menu
            document.querySelector('#burgerBtn').addEventListener('click', () => {
                // Ajouter/Supprimer une classe open à la balise #mainNavigation
                document.querySelector('#mainNavigation').classList.toggle('open');
            })
        })
        .catch( fetchError => {
            console.log(fetchError);
        });
    };
//


/* 
Attendre le chargement du DOM
*/
    document.addEventListener('DOMContentLoaded', async () => {
        // Afficher la navigation
        displayNav('#mainNavigation');
    });
//