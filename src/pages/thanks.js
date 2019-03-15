import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/'
import SEO from '../components/shared/Seo'

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  text-align: center;

  a {
    display: block;
    margin-top: 1em;
    margin-bottom: 10em;
  }
`

const Title = styled.h1`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 400;
  line-height: 49px;
  font-size: 38px;
  text-align: center;
  margin-bottom: 1.5em;

  color: #dceaf4;
`

const TanksPage = () => (
  <Layout>
    <SEO title="Thank you for registering" />
    <Container>
      <Title>Thank you!</Title>
      <p>Your email has been submitted succesfully!</p>
      <Link to="/">Go to the homepage</Link>
    </Container>
  </Layout>
)

export default TanksPage
