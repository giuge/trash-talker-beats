/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const allPages = await graphql(`
    {
      allShopifyShopPolicy {
        edges {
          node {
            body
            title
            type
          }
        }
      }
      allShopifyCollection(filter: { handle: { eq: "beats" } }) {
        edges {
          node {
            products {
              id
              shopifyId
              title
              tags
              description
              handle
              images {
                originalSrc
              }
              productType
              vendor
              variants {
                shopifyId
                title
                price
                availableForSale
              }
            }
          }
        }
      }
      allFile(filter: { sourceInstanceName: { eq: "previews" } }) {
        edges {
          node {
            name
            extension
            publicURL
            modifiedTime
            prettySize
          }
        }
      }
    }
  `)

  // Create legal pages
  allPages.data.allShopifyShopPolicy.edges.forEach(edge => {
    const titleParts = edge.node.title.toLowerCase().split(' ')
    const handle = titleParts.join('-')

    if (!!edge.node.body) {
      createPage({
        path: `/${handle}`,
        component: path.resolve('./src/components/shared/LegalPage.js'),
        context: {
          ...edge.node,
        },
      })
    }
  })

  // Create beat pages
  const { products } = allPages.data.allShopifyCollection.edges[0].node
  const previews = allPages.data.allFile.edges
  const productsWithRequiredVariants = products.filter(
    p => p.variants.length === 4
  )

  const validProducts = productsWithRequiredVariants.reduce((acc, b) => {
    const beatTitleParts = b.title.toLowerCase().split(' ')
    const beatSlug = beatTitleParts.join('_')
    const preview = previews.find(t => t.node.name.includes(beatSlug))

    if (!!preview) {
      acc.push(Object.assign(b, { preview: { ...preview.node } }))
    }

    return acc
  }, [])

  validProducts.forEach(product => {
    if (!!product) {
      createPage({
        path: `/beats/${product.handle}`,
        component: path.resolve('./src/components/shared/BeatPage/BeatPage.js'),
        context: {
          ...product,
        },
        layout: 'index',
      })
    }
  })
}
