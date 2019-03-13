import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/'
import SEO from '../components/shared/Seo'
import BeatList from '../components/BeatList/'
import LatestBeats from '../components/LatestBeats/'
import SignupForm from '../components/shared/SignupForm'
import getValidBeats from '../utils/products.js'

const Title = styled.h1`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 400;
  line-height: 49px;
  font-size: 38px;
  text-align: center;

  color: #dceaf4;

  @media (max-width: 700px) {
    br {
      display: none;
    }
  }
`

const BeatListContainer = styled.div`
  margin-top: 80px;
  background: #0d2b40;
  padding-top: 40px;
  padding-bottom: 56px;
`

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
      <Title>
        Handcrafted quality beats <br />
        for your next song
      </Title>
      <LatestBeats products={validProducts.slice(0, 3)} />
      <BeatListContainer>
        <Title>All Beats</Title>
        <BeatList products={validProducts} {...props} />
      </BeatListContainer>
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

export default IndexPage
