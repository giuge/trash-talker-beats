import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout/'
import SEO from '../components/Seo'
import Products from '../components/Products/'

const IndexPage = props => {
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
      <Products products={validProducts} {...props} />
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
