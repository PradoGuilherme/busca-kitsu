function openModal (objCharacter, imagem, nomeCharacter, description) {
  document.querySelector('body').style = 'cursor: wait'
  document.querySelector('tbody tr').style = 'cursor: wait'
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
        document.getElementById('modal-text').insertAdjacentHTML('beforeend', '<div>' + description + '</div><br>Mídias do personagem: ')
        res.forEach(element => {
          var nomeMedia = element.data.attributes.titles.en || element.data.attributes.titles.en_jp
          document.getElementById('modal-text').insertAdjacentHTML('beforeend', '<div>' + nomeMedia + '</div>')
        })
      })
    }
  })
}

function hideModal () {
  document.getElementById('modal-show').style = 'display:none'
}
