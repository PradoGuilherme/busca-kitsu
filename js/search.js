var input = document.getElementById('findCharacterByName')

function searchCharacter () {
  window.currentPage = 0
  window.searchInput = input.value.toUpperCase()
  if (window.searchInput) {
    document.getElementById('cleanSearch').style = 'display: block'
  } else {
    document.getElementById('cleanSearch').style = 'display: none'
  }
  window.getCharacters(0, input.value.toUpperCase(), function (res) {
    window.addButtonsPagination(res.meta.count)
    window.mountTable(res)
  })
}

function cleanSearch () {
  input.value = ''
  window.searchInput = ''
  document.getElementById('cleanSearch').style = 'display: none'
  window.getCharacters(0, input.value.toUpperCase(), function (res) {
    window.addButtonsPagination(res.meta.count)
    window.mountTable(res)
  })
}
