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

        // Charger le contenu de la page d'accueil
        loadPageContent('home-page')
    }

    const loadPageContent = (content) => {
        // Afficher le loading
        document.querySelector('body').classList.add('loading')
        document.querySelector('#mainNavigation').classList.remove('open')

        // Utiliser la classe FETCHclass pour récupérer les données
        new FETCHclass(`http://localhost:3000/${content}`, 'GET').sendRequest()
        .then( jsonData => displayPage(jsonData))
        .catch( fetchError => {
            console.log(fetchError);
        });
    }

    const displayPage = (jsonData) => {
        console.log(jsonData)

        // Ajouter la classe de la page
        document.querySelector('#mainContent').classList.toggle(jsonData.section)

        // Vérifier la section à afficher
        if( jsonData.section === "homePage" ){
            document.querySelector('#mainContent').innerHTML = `
                <div>
                    <p id="siteTitle">${jsonData.title}</p>
                    <h1>${jsonData["sub-title"]}</h1>
                </div>
            `;
        }

        setTimeout(() => {
            // Masquer le loading
            document.querySelector('body').classList.remove('loading')

            // Afficher le contenu
            setTimeout(() => {
                document.querySelector('#mainContent').classList.add('display')
            }, 500);
        }, 500);
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