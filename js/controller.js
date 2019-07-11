var personagensBody = document.getElementById('personagens')
var maxLength = 180
var paginaAtual = 0
var buscaInput = ''
var totalDePaginas

window.getCharacters(paginaAtual, null, function (res) {
  addButtonsPagination(res.meta.count)
  mountTable(res)
})

window.onload = function () {
  document.querySelector('main').style = 'height: ' + window.innerHeight + 'px'
  var tamanhoTotal = 250
  if (window.innerWidth < 800) {
    tamanhoTotal = 234
  }
  document.getElementById('personagens').setAttribute('style', 'height:' + (640 - tamanhoTotal) + 'px')
}

function mountTable (elementos) {
  if (elementos.data.length) {
    personagensBody.innerHTML = ''
    for (var i = 0; i < elementos.data.length; i++) {
      var trimmedString = elementos.data[i].attributes.description.substr(0, maxLength)
      if (!trimmedString) {
        trimmedString = 'Não encontramos descrição deste personagem!'
      } else {
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + ' <span style="color: #D42026"> [...]</span>'
      }

      var item = ''
      var linkFoto = 'img/semfoto.png'
      if (elementos.data[i].attributes && elementos.data[i].attributes.image && elementos.data[i].attributes.image.original) {
        linkFoto = elementos.data[i].attributes.image.original
      }
      item += '<tr onclick="openModal(`' + elementos.data[i].relationships.mediaCharacters.links.related + '`)" data-id=' + elementos.data[i].id + '>'
      item += '<td width="25%" class="personagem-avatar"><div class="avatar"><img src="' + linkFoto + '" /></div>' + elementos.data[i].attributes.canonicalName + '</td>'
      item += '<td width="75%" class="descricao">' + trimmedString + '</td>'
      item += '</tr>'

      document.querySelector('body').style = 'cursor: auto'
      personagensBody.insertAdjacentHTML('beforeend', item)
    }
  } else {
    personagensBody.innerHTML = "<tr><td colspan='3'>Nenhum Resultado Encontrado</td></tr>"
  }
}
