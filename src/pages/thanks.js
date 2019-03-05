import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/'
import SEO from '../components/shared/Seo'

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  text-align: center;

  h1 {
    font-size: 1.5em;
    margin-bottom: 1.5em;
  }

  a {
    display: block;
    margin-top: 1em;
    margin-bottom: 10em;
  }
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="Thank you for registering" />
    <Container>
      <h1>Thank you!</h1>
      <p>Your email has been submitted succesfully!</p>
      <Link to="/">Go to the homepage</Link>
    </Container>
  </Layout>
)

export default NotFoundPage
