/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const policyPages = await graphql(`
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
    }
  `)

  policyPages.data.allShopifyShopPolicy.edges.forEach(edge => {
    const titleParts = edge.node.title.toLowerCase().split(' ')
    const handle = titleParts.join('-')

    if (!!edge.node.body) {
      createPage({
        path: `/${handle}`,
        component: path.resolve('./src/components/shared/PolicyPage.js'),
        context: {
         ...edge.node,
        },
      })
    }
  })
}
