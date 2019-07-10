var request = new XMLHttpRequest()
var limit = 10

function getAllCharacters (page, callback) {
  console.log('TCL: getAllCharacters -> page', page)
  var url = 'https://kitsu.io/api/edge/characters?page[limit]=' + limit + '&page[offset]=' + page
  request.open('GET', url, true)

  request.onload = function () {
    var retorno = JSON.parse(request.response)
    callback(retorno)
  }

  request.onerror = function () {
    alert(request.statusText)
  }

  request.send()
}
