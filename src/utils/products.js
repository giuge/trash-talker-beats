const getValidBeats = (beatsCollections, previews) => {
  // We pass all collections here. Beats have two collections, one is Beats and the
  // other is Beats-Genre (eg. beats-Trap). We need to normalize it.
  const arrayOfBeats = beatsCollections
    .map(collection => {
      if (collection.node.handle === 'beats') {
        return false
      }

      const genre = collection.node.handle
        .split('-')
        .splice(1)
        .join('-')

      return collection.node.products.map(product => {
        return {
          ...product,
          genre,
        }
      })
    })
    .filter(b => !!b)

  const beats = [].concat.apply([], arrayOfBeats)

  // Are considered valid, beats that have 4 variants and a preview file

  const beatsWithRequiredVariants = beats.filter(p => p.variants.length === 4)
  const validBeats = beatsWithRequiredVariants.reduce((acc, b) => {
    const beatTitleParts = b.title.toLowerCase().split(' ')
    const beatSlug = beatTitleParts.join('_')
    const preview = previews.find(t => t.node.name.includes(beatSlug))

    if (!!preview) {
      acc.push(Object.assign(b, { preview: { ...preview.node } }))
    }

    return acc
  }, [])

  return validBeats
}

// This function is used in gatsby-node.js as well. That's why we use ES5 module syntax.
module.exports = getValidBeats
