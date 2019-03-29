import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/'
import SEO from '../components/shared/Seo'
import GlitchedText from '../components/shared/GlitchedText'
import BeatList from '../components/BeatList/'
import LatestBeats from '../components/LatestBeats/'
import LicensingOptions from '../components/LicensingOptions'
import getValidBeats from '../utils/products.js'
import NewsletterSignup from '../components/NewsletterSignup'

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

const Container = styled.div`
  padding: 40px;

  @media (max-width: 700px) {
    padding: 40px 16px;
  }
`

const BeatListContainer = styled(Container)`
  margin-top: 80px;
  background: #0d2b40;
  padding: 40px 40px 56px 40px;
`

const NewsletterContainer = styled(Container)`
  background: #0d2b40;
  padding: 40px 40px 56px 40px;
  margin: 0 auto 80px auto;
`

const LicensingTitle = styled(Title)`
  padding: 40px 0 56px 0;
`

const IndexPage = props => {
  // We need products that have all the required variants and have a preview file
  const beatsCollections = props.data.allShopifyCollection.edges
  const previews = props.data.allFile.edges
  const validProducts = getValidBeats(beatsCollections, previews)

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
      <Container>
        <GlitchedText>
          <Title>
            Handcrafted quality beats <br />
            for your next song
          </Title>
        </GlitchedText>
        {/* <Title>
          Handcrafted quality beats <br />
          for your next song
        </Title> */}
      </Container>
      <Container>
        <LatestBeats products={validProducts.slice(0, 3)} />
      </Container>
      <BeatListContainer>
        <GlitchedText>
          <Title>All Beats</Title>
        </GlitchedText>
        <BeatList products={validProducts} {...props} />
      </BeatListContainer>
      <Container>
        <GlitchedText>
          <LicensingTitle>Licensing options</LicensingTitle>
        </GlitchedText>
        <LicensingOptions />
      </Container>
      <NewsletterContainer>
        <GlitchedText>
          <Title>Never miss a beat!</Title>
        </GlitchedText>
        <NewsletterSignup />
      </NewsletterContainer>
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

export default IndexPage
