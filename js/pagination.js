
function addButtonsPagination (qtdTotalCharacters) {
  window.totalPages = (qtdTotalCharacters / 10)
  var pagination = document.getElementsByClassName('pagination')[0]
  pagination.innerHTML = ''
  var qtdNavigation
  if (window.innerWidth < 420) {
    qtdNavigation = 3
  } else {
    qtdNavigation = 6
  }

  for (var i = window.currentPage + 1; i <= (window.currentPage + qtdNavigation) && i <= window.totalPages; i++) {
    if ((i - 1) === window.currentPage) {
      pagination.insertAdjacentHTML('beforeend', '<li><button onclick="selectPage(`button-' + (i - 1) + '`)" class="pagina-ativa" id=button-' + (i - 1) + '>' + i + '</button></li>')
    } else {
      pagination.insertAdjacentHTML('beforeend', '<li><button onclick="selectPage(`button-' + (i - 1) + '`)" id=button-' + (i - 1) + '>' + i + '</button></li>')
    }
  }
}

function selectPage (id) {
  var idPage = Number(id.split('-')[1])
  window.currentPage = idPage
  window.getCharacters(window.currentPage, window.searchInput, function (res) {
    document.getElementById(id).classList.add('pagina-ativa')
    addButtonsPagination(res.meta.count)
    window.mountTable(res)
  })
}

function nextPage () {
  var searchPage = window.currentPage + 1
  window.getCharacters(searchPage, window.searchInput, function (res) {
    window.currentPage = searchPage
    addButtonsPagination(res.meta.count)
    window.mountTable(res)
  })
}

function backPage () {
  var searchPageBack = window.currentPage - 1
  if (searchPageBack < 0) {
    document.querySelector('body').style = 'cursor: auto'
    return
  }
  window.getCharacters(searchPageBack, window.searchInput, function (res) {
    window.currentPage = searchPageBack
    addButtonsPagination(res.meta.count)
    window.mountTable(res)
  })
}
