import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout/'
import SEO from '../components/Seo'
import Products from '../components/Products/'

const allProductsQuery = graphql`
  query AllProductsQuery {
    allShopifyProduct {
      edges {
        node {
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
`

const IndexPage = props => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <StaticQuery
      query={allProductsQuery}
      render={data => {
        const products = data.allShopifyProduct.edges
        return <Products products={products} />
      }}
    />
  </Layout>
)

export default IndexPage
