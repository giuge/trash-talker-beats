/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const getValidBeats = require('./src/utils/products.js')

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
      allShopifyCollection(filter: { handle: { regex: "/^beats/" } }) {
        edges {
          node {
            handle
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
        component: path.resolve('./src/components/LegalPage.js'),
        context: {
          ...edge.node,
        },
      })
    }
  })

  // Create beat pages
  const beatsCollections = allPages.data.allShopifyCollection.edges
  const previews = allPages.data.allFile.edges
  const validBeats = getValidBeats(beatsCollections, previews)

  validBeats.forEach(beat => {
    createPage({
      path: `/beats/${beat.handle}`,
      component: path.resolve('./src/components/BeatPage/BeatPage.js'),
      context: {
        ...beat,
      },
    })
  })
}
