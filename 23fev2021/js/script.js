document.addEventListener('DOMContentLoaded', async () => {
    let fetchRequest = new FETCHclass( 'http://localhost:3000/nav', 'GET' );

    fetchRequest.sendRequest()
    .then( jsonData => {
        console.log(jsonData)
    })
    .catch( fetchError => {
        console.log(fetchError)
    })

})