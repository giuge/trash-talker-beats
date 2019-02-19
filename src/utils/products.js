const getValidBeats = (beats, previews) => {
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
