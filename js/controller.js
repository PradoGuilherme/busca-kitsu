var personagensBody = document.getElementById('personagens')
var maxLength = 180
var paginaAtual = 0
var buscaInput = ''

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

function addButtonsPagination (qtdTotalPersonagens) {
  var paginacao = document.getElementsByClassName('paginacao')[0]
  var qtdInicial
  if (window.innerWidth < 361) {
    qtdInicial = 3
  } else {
    qtdInicial = 6
  }

  paginacao.innerHTML = ''
  if (qtdTotalPersonagens / 10 < 1) {
    paginacao.insertAdjacentHTML('beforeend', '<li><button class="pagina-ativa" id="button-0">1</button></li>')
  } else {
    for (var i = 1; i <= ((1 + qtdInicial) - 1) && i <= qtdTotalPersonagens / 10; i++) {
      if ((i - 1) === paginaAtual) {
        paginacao.insertAdjacentHTML('beforeend', '<li><button class="pagina-ativa" id=button-' + (i - 1) + '>' + i + '</button></li>')
      } else {
        paginacao.insertAdjacentHTML('beforeend', '<li><button id=button-' + (i - 1) + '>' + i + '</button></li>')
      }
    }
  }

  var pageButton = paginacao.getElementsByTagName('button')
  for (var z = 0; z < pageButton.length; z++) {
    pageButton[z].addEventListener('click', function () {
      var self = this
      var idPagina = Number(self.id.split('-')[1])
      paginaAtual = idPagina
      window.getCharacters(paginaAtual, buscaInput, function (res) {
        document.getElementById(self.id).classList.add('pagina-ativa')
        addButtonsPagination(res.meta.count)
        mountTable(res)
      })
    })
  }
}

function nextPage () {
  var paginaBusca = paginaAtual + 1
  window.getCharacters(paginaBusca, buscaInput, function (res) {
    addButtonsPagination(res.meta.count)
    document.getElementById('button-' + paginaBusca).classList.add('pagina-ativa')
    document.getElementById('button-' + paginaAtual).classList.remove('pagina-ativa')
    paginaAtual = paginaBusca
    mountTable(res)
  })
}

function backPage () {
  var paginaBuscaBack = paginaAtual - 1
  if (paginaBuscaBack < 0) {
    document.querySelector('main').style = 'cursor: auto'
    return
  }
  window.getCharacters(paginaBuscaBack, buscaInput, function (res) {
    addButtonsPagination(res.meta.count)
    document.getElementById('button-' + paginaBuscaBack).classList.add('pagina-ativa')
    document.getElementById('button-' + paginaAtual).classList.remove('pagina-ativa')
    paginaAtual = paginaBuscaBack
    mountTable(res)
  })
}
