function openModal(objCharacter) {
  window.getMoreInfoMedia(objCharacter, function (retornoInfoMedia) {
    if (retornoInfoMedia.data) {
      for (var indice in retornoInfoMedia.data) {
        if (retornoInfoMedia.data[indice].relationships &&
          retornoInfoMedia.data[indice].relationships.media &&
          retornoInfoMedia.data[indice].relationships.media.links &&
          retornoInfoMedia.data[indice].relationships.media.links.related) {
          window.getMedia(retornoInfoMedia.data[indice].relationships.media.links.related, function (res) {
            console.log(`retorno`, res)
          })
        }
      }
    }
    // retorno.data.forEach(element => {
    //   if (element.relationships &&
    //     element.relationships.media &&
    //     element.relationships.media.links &&
    //     element.relationships.media.links.related) {
    //     console.log('TCL: openModal -> element.relationships.media.links.related', element.relationships.media.links.related)
    //     window.getMedia(element.relationships.media.links.related, function (retorno) {
    //       console.log('TCL: openModal -> retorno', retorno)
    //     })
    //   }
    // })
    // console.log(retorno)
  })
}
