var personagensBody = document.getElementById('personagens')
var maxLength = 180

getAllCharacters(0, function (res) {
  addButtonsPagination(res.meta.count)
  mountTable(res)
})

function mountTable(elementos) {
  if (elementos.data.length) {
    personagensBody.innerHTML = ''
    for (var i = 0; i < elementos.data.length; i++) {
      var trimmedString = elementos.data[i].attributes.description.substr(0, maxLength)
      trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + ' <span style="color: #D42026"> [...]</span>'
      var item = ''
      item += '<tr data-id=' + elementos.data[i].id + '>'
      item += '<td class="eventos"><div class="avatar"><img src="' + elementos.data[i].attributes.image.original + '" /></div>' + elementos.data[i].attributes.canonicalName + '</td>'
      item += '<td class="eventos">' + trimmedString + '</td>'
      item += '</tr>'

      personagensBody.insertAdjacentHTML('beforeend', item)
    }
  } else {
    personagensBody.innerHTML = "<tr><td colspan='3'>Nenhum Resultado Encontrado</td></tr>"
  }
}

function addButtonsPagination(qtdTotalPersonagens) {
  var pagination = document.getElementsByClassName('pagination')[0]
  var qtdInicial
  if (window.innerWidth < 361) {
    qtdInicial = 3
  } else {
    qtdInicial = 6
  }

  pagination.innerHTML = ''
  for (var i = 1; i <= ((1 + qtdInicial) - 1) && i <= qtdTotalPersonagens; i++) {
    if (i === 1) {
      pagination.insertAdjacentHTML('beforeend', '<li><button data-page=' + (i - 1) + ' class="ativo">' + i + '</button></li>')
    } else {
      pagination.insertAdjacentHTML('beforeend', '<li><button data-page=' + (i - 1) + '>' + i + '</button></li>')
    }
  }

  var pageButton = pagination.getElementsByTagName('button')
  for (var i = 0; i < pageButton.length; i++) {
    pageButton[i].addEventListener('click', function () {
      var page = this.dataset.page
      getAllCharacters(page, function (res) {
        addButtonsPagination(res.meta.count)
        mountTable(res)
      })
    })
  }
}
