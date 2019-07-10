var personagensBody = document.getElementById('personagens')
var maxLength = 180
var paginaAtual = 0
var buscaInput = ''
var totalDePaginas

window.getCharacters(paginaAtual, null, function (res) {
  addButtonsPagination(res.meta.count)
  mountTable(res)
})

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
      item += '<tr data-id=' + elementos.data[i].id + '>'
      item += '<td class="personagem-avatar"><div class="avatar"><img src="' + linkFoto + '" /></div>' + elementos.data[i].attributes.canonicalName + '</td>'
      item += '<td class="descricao">' + trimmedString + '</td>'
      item += '</tr>'

      document.querySelector('main').style = 'cursor: auto'
      personagensBody.insertAdjacentHTML('beforeend', item)
    }
  } else {
    personagensBody.innerHTML = "<tr><td colspan='3'>Nenhum Resultado Encontrado</td></tr>"
  }
}
