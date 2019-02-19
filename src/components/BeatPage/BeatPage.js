import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../Layout/'
import BeatDetails from './BeatDetails'
import getValidBeats from '../../utils/products.js'

const BeatPage = props => {
  const { products } = props.data.allShopifyCollection.edges[0].node
  const previews = props.data.allFile.edges
  const validProducts = getValidBeats(products, previews)

  return (
    <Layout>
      <BeatDetails beat={props.pageContext} products={validProducts} />
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
