
function addButtonsPagination (qtdTotalPersonagens) {
  window.totalDePaginas = (qtdTotalPersonagens / 10)
  var paginacao = document.getElementsByClassName('paginacao')[0]
  var qtdPaginacao
  if (window.innerWidth < 361) {
    qtdPaginacao = 3
  } else {
    qtdPaginacao = 6
  }

  paginacao.innerHTML = ''
  for (var i = window.paginaAtual + 1; i <= (window.paginaAtual + qtdPaginacao) && i <= window.totalDePaginas; i++) {
    if ((i - 1) === window.paginaAtual) {
      paginacao.insertAdjacentHTML('beforeend', '<li><button onclick="selectPage(`button-' + (i - 1) + '`)" class="pagina-ativa" id=button-' + (i - 1) + '>' + i + '</button></li>')
    } else {
      paginacao.insertAdjacentHTML('beforeend', '<li><button onclick="selectPage(`button-' + (i - 1) + '`)" id=button-' + (i - 1) + '>' + i + '</button></li>')
    }
  }
}

function selectPage (id) {
  var idPagina = Number(id.split('-')[1])
  window.paginaAtual = idPagina
  window.getCharacters(window.paginaAtual, window.buscaInput, function (res) {
    document.getElementById(id).classList.add('pagina-ativa')
    addButtonsPagination(res.meta.count)
    window.mountTable(res)
  })
}

function nextPage () {
  var paginaBusca = window.paginaAtual + 1
  window.getCharacters(paginaBusca, window.buscaInput, function (res) {
    window.paginaAtual = paginaBusca
    addButtonsPagination(res.meta.count)
    window.mountTable(res)
  })
}

function backPage () {
  var paginaBuscaBack = window.paginaAtual - 1
  if (paginaBuscaBack < 0) {
    document.querySelector('main').style = 'cursor: auto'
    return
  }
  window.getCharacters(paginaBuscaBack, window.buscaInput, function (res) {
    window.paginaAtual = paginaBuscaBack
    addButtonsPagination(res.meta.count)
    window.mountTable(res)
  })
}
