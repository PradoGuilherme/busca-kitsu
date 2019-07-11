var charactersBody = document.getElementById('characters')
var maxLength = 180
var currentPage = 0
var searchInput = ''
var totalPages

window.getCharacters(currentPage, null, function (res) {
  addButtonsPagination(res.meta.count)
  mountTable(res)
})

window.onload = function () {
  document.querySelector('main').style = 'height: ' + window.innerHeight + 'px'
  var totalSize = 312 + 41
  if (window.innerWidth < 420) totalSize = totalSize - 123
  document.getElementById('characters').setAttribute('style', 'height:' + (window.innerHeight - totalSize) + 'px')
}

function mountTable (elements) {
  if (elements.data.length) {
    charactersBody.innerHTML = ''
    for (var i = 0; i < elements.data.length; i++) {
      var trimmedString = elements.data[i].attributes.description.substr(0, maxLength)
      if (!trimmedString) {
        trimmedString = 'Não encontramos descrição deste personagem!'
      } else {
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + ' <span style="color: #D42026"> [...]</span>'
      }

      var item = ''
      var photoLink = 'img/semfoto.png'
      if (elements.data[i].attributes && elements.data[i].attributes.image && elements.data[i].attributes.image.original) {
        photoLink = elements.data[i].attributes.image.original
      }
      item += '<tr onclick="openModal(`' + elements.data[i].relationships.mediaCharacters.links.related + '`, `' + photoLink + '`' + ', `' + elements.data[i].attributes.canonicalName + '`, `' + elements.data[i].attributes.description.replace(/["|']/g, '') + '` )">'
      item += '<td width="25%" class="personagem-avatar"><div class="avatar"><img src="' + photoLink + '" /></div>' + elements.data[i].attributes.canonicalName + '</td>'
      item += '<td width="75%" class="descricao">' + trimmedString + '</td>'
      item += '</tr>'

      document.querySelector('body').style = 'cursor: auto'
      charactersBody.insertAdjacentHTML('beforeend', item)
    }
  } else {
    charactersBody.innerHTML = "<tr><td colspan='3'>Nenhum Resultado Encontrado</td></tr>"
  }
}
