function openModal (objCharacter, imagem, nomeCharacter, description) {
  document.querySelector('body').style = 'cursor: wait'
  document.querySelector('tbody tr').style = 'cursor: wait'
  document.querySelector('.table-main').classList.add('not-active')
  document.querySelector('.paginationList').classList.add('not-active')
  var links = []
  document.getElementById('poster').innerHTML = ''
  document.getElementById('modal-text').innerHTML = ''
  document.getElementById('nameCharacter').innerHTML = ''
  window.getMoreInfoMedia(objCharacter, function (retornoInfoMedia) {
    if (retornoInfoMedia.data) {
      for (var indice in retornoInfoMedia.data) {
        if (retornoInfoMedia.data[indice].relationships &&
          retornoInfoMedia.data[indice].relationships.media &&
          retornoInfoMedia.data[indice].relationships.media.links &&
          retornoInfoMedia.data[indice].relationships.media.links.related) {
          links.push(retornoInfoMedia.data[indice].relationships.media.links.related)
        }
      }
      window.getMedia(links, function (res) {
        document.getElementById('modal-show').style = 'display:block'
        document.querySelector('tbody tr').style = 'cursor: pointer'
        document.querySelector('body').style = 'cursor: auto'

        document.getElementById('nameCharacter').insertAdjacentHTML('afterbegin', '<h2>' + nomeCharacter + '</h2><button onclick="hideModal()" class="close"> x </button>')
        document.getElementById('poster').insertAdjacentHTML('beforeend', '<img src="' + imagem + '" />')
        document.getElementById('modal-text').insertAdjacentHTML('beforeend', '<div> <p class="title-text"> Descrição: </p> ' + description + '</div><br><p class="title-text">Mídias do personagem: </p> ')
        res.forEach(element => {
          var averageRating = element.data.attributes.averageRating || '0'
          var nomeMedia = element.data.attributes.titles.en || element.data.attributes.titles.en_jp
          document.getElementById('modal-text').insertAdjacentHTML('beforeend', '<div>' + nomeMedia + ' - Classificação: ' + averageRating + '</div>')
        })
      })
    }
  })
}

function hideModal () {
  document.querySelector('.table-main').classList.remove('not-active')
  document.querySelector('.paginationList').classList.remove('not-active')
  document.getElementById('modal-show').style = 'display:none'
}
