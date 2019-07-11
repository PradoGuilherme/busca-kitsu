var request = new XMLHttpRequest()
var limit = 10

function getCharacters (page, filtro, callback) {
  var offset = limit * page
  document.querySelector('body').style = 'cursor: wait'
  var url = 'https://kitsu.io/api/edge/characters?page[limit]=' + limit + '&page[offset]=' + offset
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

function getMoreInfoMedia (link, callback) {
  request.open('GET', link, true)

  request.onload = function () {
    var retorno = JSON.parse(request.response)
    callback(retorno)
  }

  request.onerror = function () {
    window.alert(request.statusText)
  }

  request.send()
}

function getMedia (links, callback) {
  var retornos = []
  var request = new XMLHttpRequest();
  (function loop (i, length) {
    if (i >= length) {
      return
    }

    request.open('GET', links[i])
    request.onreadystatechange = function () {
      if (request.readyState === request.DONE && request.status === 200) {
        var data = JSON.parse(request.responseText)
        retornos.push(data)
        if (i === (links.length - 1)) return callback(retornos)

        loop(i + 1, length)
      }
    }
    request.send()
  })(0, links.length)
}
