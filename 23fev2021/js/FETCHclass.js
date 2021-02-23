// Définition d'une classe (ES^6)
class FETCHclass {

    // Ajouter un construreur pour injecter des valeurs dans la classe
    constructor( url, requestType, bodyData = null ){
        this.url = url;
        this.requestType = requestType;
        this.bodyData = bodyData;

        // Vérifier le type de requête pour définir le header
        if( this.requestType === "GET" ){
            this.fetchOptions = {
                method: this.requestType
            }
        }
    }

    // Créer une méthode pour lancer la requête
    sendRequest(){
        // Renvoyer une promesse pour gérer une requête ASYNC
        return new Promise( ( resolve, reject ) => {
            // Exécuter une requête HTTP en utilisant l'API Fetch
            fetch(this.url, this.fetchOptions)
            .then( response => {
                // Vérifier l'état de la réponse
                return !response.ok
                ? reject(response)
                : response.json();
            })
            .then( jsonData => resolve(jsonData) )
            .catch( error => reject(error) );
        })
    }
}
