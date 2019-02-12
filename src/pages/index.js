import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout/'
import SEO from '../components/Seo'
import Products from '../components/Products/'

const allBeatsQuery = graphql`
{
  allShopifyCollection(filter: {handle:{eq:"beats"}}) {
    edges {
      node {
        products {
          id
          shopifyId
          title
          tags
          description
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
}
`

const IndexPage = props => (
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
    <StaticQuery
      query={allBeatsQuery}
      render={data => {
        const {products} = data.allShopifyCollection.edges[0].node

        return <Products products={products} />
      }}
    />
  </Layout>
)

export default IndexPage
