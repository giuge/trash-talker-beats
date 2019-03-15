import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../Layout/'
import BeatDetails from './BeatDetails'
import getValidBeats from '../../utils/products.js'

const BeatPage = props => {
  const beatsCollections = props.data.allShopifyCollection.edges
  const previews = props.data.allFile.edges
  const validProducts = getValidBeats(beatsCollections, previews)

  return (
    <Layout>
      <BeatDetails beat={props.pageContext} products={validProducts} />
    </Layout>
  )
}

export const query = graphql`
  {
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
              localFile {
                childImageSharp {
                  fixed(width: 500, height: 500) {
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
