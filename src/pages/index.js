import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout/'
import SEO from '../components/shared/Seo'
import BeatList from '../components/BeatList/'
import Waveform from '../components/shared/Waveform'
import SignupForm from '../components/shared/SignupForm'
import getValidBeats from '../utils/products.js'

const IndexPage = props => {
  // We need products that have all the required variants and have a preview file
  const { products } = props.data.allShopifyCollection.edges[0].node
  const previews = props.data.allFile.edges
  const validProducts = getValidBeats(products, previews)

  return (
    <Layout>
      <SEO
        title="Beats"
        keywords={[
          `music store`,
          `instrumentals`,
          `beats`,
          `mp3 downloads`,
          `trash talker`,
          `trash talker beats`,
          `producer`,
          `rap`,
          `trap`,
          `hip hop`,
          `logic`,
          `fl studio`,
          `ableton`,
        ]}
      />
      <Waveform />
      <BeatList products={validProducts} {...props} />
      <SignupForm />
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

export default IndexPage
