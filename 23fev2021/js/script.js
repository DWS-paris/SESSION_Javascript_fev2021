// Instancier une classe
let fetchRequest = new FETCHclass( 'http://localhost:3000/nav', 'GET' );

console.log( fetchRequest )

// Utilisation d'une fonction renvoyant une promesse
fetchRequest.sendRequest()
.then( data => {
    console.log(data)
})