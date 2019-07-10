var request = new XMLHttpRequest()
var limit = 10

function getCharacters (page, filtro, callback) {
  document.querySelector('main').style = 'cursor: wait'
  var url = 'https://kitsu.io/api/edge/characters?page[limit]=' + limit + '&page[offset]=' + (page * limit)
  if (filtro) {
    url = url + ('&filter[name]=' + filtro)
  }
  request.open('GET', url, true)

  request.onload = function () {
    document.getElementsByClassName('loading')[0].style = 'display: none'
    document.getElementsByClassName('content')[0].style = 'display: block'
    var retorno = JSON.parse(request.response)
    callback(retorno)
  }

  request.onerror = function () {
    window.alert(request.statusText)
  }

  request.send()
}
