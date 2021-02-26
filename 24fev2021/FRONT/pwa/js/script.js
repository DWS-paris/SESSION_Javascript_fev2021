/* 
Déclarations
*/
    let activePage = 'home-page';
//


/* 
Fonctions
*/
    const displayNav = (htmlTag) => {
        // Utiliser la classe FETCHclass pour récupérer les données
        new FETCHclass('http://localhost:8769/api/navigation', 'GET').sendRequest()
        .then( apiresponse => {
            
            console.log(apiresponse)

            // Modifier le DOM
            for( let item of apiresponse.data ){
                document.querySelector(`${htmlTag} ul`).innerHTML += `
                    <li>
                        <a href="${item.content}" class="${ activePage === item.content ? 'navLink active' : 'navLink' }">
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

                // Modifier la valeur de la page active
                activePage = item.getAttribute('href');

                // Stocker la valeur de la page en cours en local storage
                localStorage.setItem('active-page', activePage)

                // Modifier le lien active
                document.querySelector('.navLink.active').classList.remove('active');
                item.classList.add('active');
            })
        }

        // Charger le contenu de la page d'accueil
        loadPageContent(activePage)
    }

    const loadPageContent = (content) => {
        
        // Afficher le loading
        document.querySelector('body').classList.add('loading')
        document.querySelector('#mainNavigation').classList.remove('open')
        document.querySelector('#mainContent').classList.remove('display')

        // Vérifier le content pour définir la bonne URL de l'API
        let apiUrl = null;
        switch(content){
            case 'home-page':
                apiUrl = 'http://localhost:8769/api/page/home';
                break;

            case 'about-page':
                apiUrl = 'http://localhost:8769/api/page/about';
                break;

            case 'portfolio-page':
                apiUrl = 'http://localhost:8769/api/page/portfolio';
                break;
            
            default:
                apiUrl = 'http://localhost:8769/api/page/contact';
                break;
        };

        // Utiliser la classe FETCHclass pour récupérer les données
        new FETCHclass(apiUrl, 'GET').sendRequest()
        .then( apiResponse => displayPage(apiResponse.data))
        .catch( fetchError => {
            console.log(fetchError);
        });
    }

    const displayPage = (jsonData) => {

        console.log('displayPage', jsonData)

        // Appliquer la couleur de lapage
        document.querySelector('#mainColor').style.background = jsonData.color

        setTimeout(() => {
            // Masquer le loading
            document.querySelector('body').classList.remove('loading')

            // Afficher le contenu
            setTimeout(() => {
                // Vérifier la section à afficher
                if( jsonData.main.section === "homePage" ){
                    document.querySelector('#overflowContent').innerHTML = `
                        <div>
                            <p id="siteTitle">${jsonData.main.title}</p>
                            <h1>${jsonData.main["sub-title"]}</h1>
                        </div>
                    `;
                }
                else if( jsonData.main.section === "aboutPage" ){
                    // Afficher le titre de la page
                    document.querySelector('#overflowContent').innerHTML = `
                        <div>
                            <h1>${jsonData.main.title}</h1>
                            <p>${jsonData.main["sub-title"]}</p>
                        </div>
                    `;

                    // Afficher le contenu de la page
                    for( let item of jsonData.professional ){
                        document.querySelector('#overflowContent').innerHTML += `
                            <div>
                                <h3>${item.title}</h3>
                                <p>${item["sub-title"]}</p>
                                ${item.content}
                            </div>
                        `;
                    }

                    // Afficher le contenu de la page
                    for( let item of jsonData.school ){
                        document.querySelector('#overflowContent').innerHTML += `
                            <div>
                                <h3>${item.title}</h3>
                                <p>${item["sub-title"]}</p>
                                ${item.content}
                            </div>
                        `;
                    }
                }
                else if( jsonData.main.section === "portfolioPage" ){
                    // Afficher le titre de la page
                    document.querySelector('#overflowContent').innerHTML = `
                        <div>
                            <h1>${jsonData.main.title}</h1>
                            <p>${jsonData.main["sub-title"]}</p>
                        </div>
                    `;

                    // Afficher le contenu de la page
                    for( let item of jsonData.projects ){
                        // Titre
                        document.querySelector('#overflowContent').innerHTML += `
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
                    document.querySelector('#overflowContent').innerHTML = `
                    <div>
                        <h1>${jsonData.main.title}</h1>
                        <p>${jsonData.main["sub-title"]}</p>
                    </div>
                    `;

                    // Afficher le contenu de la page
                    for( let item of jsonData.contacts ){
                        // Titre
                        document.querySelector('#overflowContent').innerHTML += `
                            <div>
                                <a href="${item.link}" target="_blank"><i class="${item.icon}"></i> ${item.title}</a>
                            </div>
                        `;
                    }
                }

                // Ajouter la classe de la page
                document.querySelector('#mainContent').classList.remove('homePage')
                document.querySelector('#mainContent').classList.remove('aboutPage')
                document.querySelector('#mainContent').classList.remove('portfolioPage')
                document.querySelector('#mainContent').classList.remove('contactsPage')
                document.querySelector('#mainContent').classList.add(jsonData.main.section);
                
                document.querySelector('#mainContent').classList.add('display')
            }, 500);
        }, 500);
    }
//


/* 
Attendre le chargement du DOM
*/
    document.addEventListener('DOMContentLoaded', async () => {
        // Vérifier les données en local storage
        if( localStorage.getItem('active-page') !== null ){
            // Modifier la valeur de la page active
            activePage = localStorage.getItem('active-page');
        }

        // Afficher la navigation
        displayNav('#mainNavigation');
    });
//