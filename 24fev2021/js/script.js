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
        document.querySelector('#mainContent').classList.remove('display')

        // Utiliser la classe FETCHclass pour récupérer les données
        new FETCHclass(`http://localhost:3000/${content}`, 'GET').sendRequest()
        .then( jsonData => displayPage(jsonData))
        .catch( fetchError => {
            console.log(fetchError);
        });
    }

    const displayPage = (jsonData) => {
        console.log(jsonData)

        // Appliquer la couleur de lapage
        document.querySelector('#mainColor').style.background = jsonData.color

        

        setTimeout(() => {
            // Masquer le loading
            document.querySelector('body').classList.remove('loading')

            // Afficher le contenu
            setTimeout(() => {
                // Vérifier la section à afficher
                if( jsonData.section === "homePage" ){
                    document.querySelector('#mainContent').innerHTML = `
                        <div>
                            <p id="siteTitle">${jsonData.title}</p>
                            <h1>${jsonData["sub-title"]}</h1>
                        </div>
                    `;
                }
                else if( jsonData.section === "aboutPage" ){
                    // Afficher le titre de la page
                    document.querySelector('#mainContent').innerHTML = `
                        <div>
                            <h1>${jsonData.title}</h1>
                            <p>${jsonData["sub-title"]}</p>
                        </div>
                    `;

                    // Afficher le contenu de la page
                    for( let item of jsonData.content ){
                        // Titre
                        document.querySelector('#mainContent').innerHTML += `
                            <div>
                                <h2>${item.title} <span>${item["sub-title"]}</span></h2>
                            </div>
                        `;

                        // Contenu
                        for( let body of item.content ){
                            document.querySelector('#mainContent').innerHTML += `
                                <div>
                                    <h3>${body.title}</h3>
                                    <p>${body["sub-title"]}</p>
                                    ${body.content}
                                </div>
                            `;
                        }
                    }
                }
                else if( jsonData.section === "portfolioPage" ){
                    // Afficher le titre de la page
                    document.querySelector('#mainContent').innerHTML = `
                        <div>
                            <h1>${jsonData.title}</h1>
                            <p>${jsonData["sub-title"]}</p>
                        </div>
                    `;

                    // Afficher le contenu de la page
                    for( let item of jsonData.content ){
                        // Titre
                        document.querySelector('#mainContent').innerHTML += `
                            <div>
                                <h2>${item.title}</h2>
                                <p>${item["sub-title"]}</p>
                                <a href="${item.link}" target="_blank">${item.link}</a>
                            </div>
                        `;
                    }
                }
                else{
                        // Afficher le titre de la page
                        document.querySelector('#mainContent').innerHTML = `
                        <div>
                            <h1>${jsonData.title}</h1>
                            <p>${jsonData["sub-title"]}</p>
                        </div>
                        `;

                        // Afficher le contenu de la page
                        for( let item of jsonData.content ){
                            // Titre
                            document.querySelector('#mainContent').innerHTML += `
                                <div>
                                    <a href="${item.link}" target="_blank"><i class="${item.icone}"></i> ${item.title}</a>
                                </div>
                            `;
                        }
                }

                // Ajouter la classe de la page
                document.querySelector('#mainContent').classList.remove('homePage')
                document.querySelector('#mainContent').classList.remove('aboutPage')
                document.querySelector('#mainContent').classList.remove('portfolioPage')
                document.querySelector('#mainContent').classList.remove('contactsPage')
                document.querySelector('#mainContent').classList.add(jsonData.section);
                
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