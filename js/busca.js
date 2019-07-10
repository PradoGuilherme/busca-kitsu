var input = document.getElementById('busca-personagem-nome')
input.addEventListener('keyup', function (e) {
  window.buscaInput = input.value.toUpperCase()
  if (window.buscaInput) {
    document.getElementById('limpa-busca').style = 'display: block'
  } else {
    document.getElementById('limpa-busca').style = 'display: none'
  }
  window.getCharacters(0, input.value.toUpperCase(), function (res) {
    window.addButtonsPagination(res.meta.count)
    window.mountTable(res)
  })
})

function limpaBusca () {
  input.value = ''
  window.buscaInput = ''
  window.getCharacters(0, input.value.toUpperCase(), function (res) {
    window.addButtonsPagination(res.meta.count)
    window.mountTable(res)
  })
}
