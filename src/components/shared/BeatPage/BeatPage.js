import React from 'react'

import Layout from '../../Layout/'
import BeatDetails from './BeatDetails'

const BeatPage = props => {

    // We need products that have all the required variants and have a preview file
    const { products } = props.data.allShopifyCollection.edges[0].node
    const previews = props.data.allFile.edges

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



    return (
      <Layout>
        <BeatDetails beat={props.pageContext} products={validProducts}/>
      </Layout>
    )
}

export const query = graphql`
  {
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
              localFile {
                childImageSharp {
                  fixed(width: 300, height: 300) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
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
`

export default BeatPage