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
                document.querySelector(`${htmlTag} ul`).innerHTML += `
                    <li>
                        <a href="${item.content}" class="navLink">
                            <span class="animAll" style="background:${item.color}"></span>
                            <b>${item.name}</b>
                        </a>
                    </li>
                `;
            }

            // initialiser la navigation
            initNavigation();

            setTimeout(() => {
                document.querySelector('body').classList.remove('loading')
            }, 500);
        })
        .catch( fetchError => {
            console.log(fetchError);
        });
    };

    const initNavigation = () => {
        // Capter le clic sur le burger menu
        document.querySelector('#burgerBtn').addEventListener('click', () => {
            // Ajouter/Supprimer une classe open à la balise #mainNavigation
            document.querySelector('#mainNavigation').classList.toggle('open');
        })

        // Capter le clic sur les balise à de la nav
        for( let item of document.querySelectorAll('.navLink') ){
            item.addEventListener('click', (event) => {
                // Bloquer le comportement par défaut de la balise a
                event.preventDefault();

                // Charger le contenu de la page
                loadPageContent( item.getAttribute('href') )
            })
        }
    }

    const loadPageContent = (content) => {
        // Utiliser la classe FETCHclass pour récupérer les données
        new FETCHclass(`http://localhost:3000/${content}`, 'GET').sendRequest()
        .then( jsonData => {
            console.log(jsonData)
        })
        .catch( fetchError => {
            console.log(fetchError);
        });
    }
//


/* 
Attendre le chargement du DOM
*/
    document.addEventListener('DOMContentLoaded', async () => {
        // Afficher la navigation
        displayNav('#mainNavigation');
    });
//